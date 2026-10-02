// Cloudflare Pages Function -- handles both the lead form and the review form.
// Replaces Web3Forms: this keeps the sending API key secret server-side
// (set as the RESEND_API_KEY environment variable in the Cloudflare Pages
// project settings, never in client code or the repo) and lets us send a
// real branded HTML email instead of a third party's plain field table.

const NOTIFY_TO = 'venturevidyahindi@gmail.com';
const BRAND = 'EV Charger One';
const BRAND_URL = 'https://evchargerone.com';

const COLORS = {
  bg: '#f1f5f9',
  card: '#ffffff',
  ink: '#0f172a',
  dim: '#475569',
  accent: '#047857',
  accentLight: '#d1fae5',
  border: '#e2e8f0',
  headerBg: '#020617'
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fieldRow(label, value) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:${COLORS.dim};text-transform:uppercase;letter-spacing:0.04em;width:160px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${COLORS.ink};font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`;
}

function starRow(rating) {
  const n = parseInt(rating, 10) || 0;
  const stars = '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
  return fieldRow('Rating', `${stars}  (${n} / 5)`);
}

function renderEmail({ badge, heading, rows }) {
  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:${COLORS.bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${COLORS.card};border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:${COLORS.headerBg};padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#ffffff;letter-spacing:0.02em;">⚡ ${BRAND}</td>
                  <td align="right">
                    <span style="display:inline-block;background:${COLORS.accentLight};color:${COLORS.accent};font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;padding:5px 10px;border-radius:999px;">${escapeHtml(badge)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:${COLORS.ink};">${escapeHtml(heading)}</h1>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${rows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px;background:${COLORS.bg};border-top:1px solid ${COLORS.border};">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${COLORS.dim};">Sent automatically from <a href="${BRAND_URL}" style="color:${COLORS.accent};text-decoration:none;">${BRAND_URL.replace('https://', '')}</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildLeadEmail(data) {
  const rows = [
    fieldRow('Name', data.name),
    fieldRow('Phone', data.phone),
    fieldRow('City', data.city),
    fieldRow('EV Model', data.vehicle),
    fieldRow('Service Requested', data.service)
  ].join('');
  return {
    subject: `🔥 New lead: ${data.name || 'Unknown'} (${data.city || 'Unknown city'})`,
    html: renderEmail({ badge: 'New Lead', heading: 'New Estimate Request', rows })
  };
}

function buildReviewEmail(data) {
  const rows = [
    fieldRow('Name', data.name),
    fieldRow('City', data.city),
    fieldRow('Email', data.email),
    starRow(data.rating),
  ].join('') + `
    <tr>
      <td colspan="2" style="padding:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:${COLORS.dim};text-transform:uppercase;letter-spacing:0.04em;">Review</td>
    </tr>
    <tr>
      <td colspan="2" style="padding:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${COLORS.ink};line-height:1.6;">${escapeHtml(data.review)}</td>
    </tr>`;
  return {
    subject: `⭐ New review: ${data.name || 'Unknown'} (${data.rating || '?'}/5)`,
    html: renderEmail({ badge: 'New Review', heading: 'New Review Submitted', rows })
  };
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();

    if (!data || !data.name) {
      return Response.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    const isReview = data.form_type === 'review';
    const { subject, html } = isReview ? buildReviewEmail(data) : buildLeadEmail(data);

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json({ success: false, message: 'Email service is not configured yet.' }, { status: 500 });
    }

    const fromAddress = env.RESEND_FROM_EMAIL || 'EV Charger One <onboarding@resend.dev>';

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [NOTIFY_TO],
        reply_to: data.email || undefined,
        subject,
        html
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend API error:', resendRes.status, errText);
      return Response.json({ success: false, message: 'Email provider rejected the message.' }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('submit function error:', err);
    return Response.json({ success: false, message: 'Unexpected server error.' }, { status: 500 });
  }
}
