const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '../public/images');
const files = fs.readdirSync(imagesDir);

async function create658wImages() {
  console.log('Generating crisp 658w and 800w WebP variants...');
  for (const file of files) {
    if (file.endsWith('.webp') && !file.includes('-658w') && !file.includes('-800w')) {
      const filePath = path.join(imagesDir, file);
      const nameWithoutExt = file.replace('.webp', '');
      const out658Path = path.join(imagesDir, `${nameWithoutExt}-658w.webp`);
      const out800Path = path.join(imagesDir, `${nameWithoutExt}-800w.webp`);

      try {
        // 658w variant for mid-section body images
        await sharp(filePath)
          .resize(658, null, { withoutEnlargement: true })
          .webp({ quality: 75, effort: 6 })
          .toFile(out658Path);
        
        // 800w variant for hero background preloaded images
        await sharp(filePath)
          .resize(800, null, { withoutEnlargement: true })
          .webp({ quality: 75, effort: 6 })
          .toFile(out800Path);

        const stats658 = fs.statSync(out658Path);
        const stats800 = fs.statSync(out800Path);
        console.log(`Created ${nameWithoutExt}: 658w = ${Math.round(stats658.size / 1024)} KB, 800w = ${Math.round(stats800.size / 1024)} KB`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
  console.log('Finished creating 658w and 800w variants!');
}

create658wImages();
