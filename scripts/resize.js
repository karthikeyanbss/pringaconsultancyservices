const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const dir = path.join(__dirname, '..', 'src', 'assets', 'illustrations');
  const candidates = ['pringa.jpg', 'pringa.jpeg', 'pringa.png'];
  let srcFile = null;
  for (const c of candidates) {
    const p = path.join(dir, c);
    if (fs.existsSync(p)) { srcFile = p; break; }
  }

  if (!srcFile) {
    console.error('Source image not found. Place Pringa image as one of:', candidates.join(', '));
    process.exit(1);
  }

  const outPng = path.join(dir, 'pringa-300.png');
  try {
    await sharp(srcFile)
      .rotate() // respect EXIF
      .resize(300, 300, { fit: 'cover', position: 'centre' })
      .png({ quality: 90 })
      .toFile(outPng);
    console.log('Created', outPng);

    // Also create a WebP optimized version (300x300)
    const outWebp300 = path.join(dir, 'pringa-300.webp');
    await sharp(srcFile)
      .rotate()
      .resize(300, 300, { fit: 'cover', position: 'centre' })
      .webp({ quality: 80 })
      .toFile(outWebp300);
    console.log('Created', outWebp300);

    // Create a larger WebP (responsive fallback)
    const outWebpLarge = path.join(dir, 'pringa.webp');
    await sharp(srcFile)
      .rotate()
      .resize(1000, null, { fit: 'inside' })
      .webp({ quality: 80 })
      .toFile(outWebpLarge);
    console.log('Created', outWebpLarge);
  } catch (err) {
    console.error('Error processing image:', err);
    process.exit(1);
  }
}

run();
