# 🔑 PPL PORTFOLIO - UNIFIED ACCESS & CREDENTIALS REGISTRY

This registry serves as the **Single Source of Truth (SSOT)** for all Cloudflare, Google Search Console, Google Analytics 4, Web3Forms, Firebase, and GitHub developer access credentials across the PPL Site Network.

---

## ☁️ 1. Cloudflare Infrastructure Access

* **Cloudflare Account ID:** `844389a20cf2c9cacbff51ecee4a9d84`
* **Account Owner Email:** `venturevidyahindi@gmail.com`
* **Cloudflare Pages API Token (Deployments):**  
  `CLOUDFLARE_PAGES_API_TOKEN` (Stored in local `.env` file)
* **Cloudflare DNS API Token (Zone & CNAME Management):**  
  `CLOUDFLARE_DNS_API_TOKEN` (Stored in local `.env` file)
* **Master Zone ID (`evchargerone.com`):** `bbae2da68f24b0a0096430452a55b819`

### **Command Line Deployment Template:**
```bash
CLOUDFLARE_API_TOKEN="[YOUR_CLOUDFLARE_PAGES_TOKEN]" \
CLOUDFLARE_ACCOUNT_ID="844389a20cf2c9cacbff51ecee4a9d84" \
npx -y wrangler pages deploy dist --project-name={{PROJECT_NAME}} --branch=main
```

---

## 📬 2. Lead Dispatch & Form Processing (Web3Forms)

* **Web3Forms Master Access Key:** `ef4bd7cc-691e-4c20-b08e-5e5e4ca79e77`
* **Primary Notification Destination:** `venturevidyahindi@gmail.com`
* **AJAX Endpoint:** `https://api.web3forms.com/submit`

---

## 🔍 3. Google Search Console & Indexing API Access

* **Google Cloud Project ID:** `pplsi-cc51f`
* **Firebase Browser API Key:** `AIzaSyC8r9lrcneA_pwMelqIRcEk545qnIJCHmo`
* **Service Account Email:** `firebase-adminsdk-fbsvc@pplsi-cc51f.iam.gserviceaccount.com`
* **Service Account Key File Path:**  
  `./Resources/pplsi-cc51f-firebase-adminsdk-fbsvc-4a8c9508d8.json`
* **APIs Enabled:**
  1. Search Console API (`searchconsole.googleapis.com`)
  2. Indexing API v3 (`indexing.googleapis.com`)
  3. PageSpeed Insights API (`pagespeedonline.googleapis.com`)
  4. Analytics Data API (`analyticsdata.googleapis.com`)

---

## 📊 4. Google Analytics 4 (GA4) Properties

* **EV Charger One Property ID:** `G-QZT2JJ7QXP`
* **Event Tracking Standard:** `click_to_call` (zero-overhead link delegation)

---

## 🐙 5. GitHub Repository Access

* **GitHub Organization / Account:** `venturevidyahindi` / `vastucartapps`
* **Working Sites Repository:** `https://github.com/vastucartapps/PPL-Working-Sites.git`
* **SSH Host Alias:** `git@github.com-venturevidya`
