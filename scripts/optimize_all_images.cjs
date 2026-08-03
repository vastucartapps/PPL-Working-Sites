const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '../public/images');
const files = fs.readdirSync(imagesDir);

async function optimizeImages() {
  console.log('Optimizing all images in public/images/...');
  for (const file of files) {
    if (file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.png')) {
      const filePath = path.join(imagesDir, file);
      const tempPath = path.join(imagesDir, `temp_${file}`);

      try {
        const metadata = await sharp(filePath).metadata();
        let pipeline = sharp(filePath);

        if (metadata.width && metadata.width > 1000) {
          pipeline = pipeline.resize(1000, null, { withoutEnlargement: true });
        }

        if (file.endsWith('.webp')) {
          pipeline = pipeline.webp({ quality: 78, effort: 6 });
        } else if (file.endsWith('.jpg')) {
          pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });
        }

        await pipeline.toFile(tempPath);
        fs.renameSync(tempPath, filePath);
        const stats = fs.statSync(filePath);
        console.log(`Optimized ${file}: ${Math.round(stats.size / 1024)} KB`);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }
  console.log('All images optimized successfully!');
}

optimizeImages();
