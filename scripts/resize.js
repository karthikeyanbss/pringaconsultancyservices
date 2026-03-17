const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '..', 'src', 'assets', 'illustrations');

async function processFounder(name, candidates) {
  let srcFile = null;
  for (const c of candidates) {
    const p = path.join(dir, c);
    if (fs.existsSync(p)) { srcFile = p; break; }
  }

  if (!srcFile) {
    console.warn(`[${name}] Source image not found. Expected one of: ${candidates.join(', ')} — skipping.`);
    return;
  }

  console.log(`[${name}] Processing ${srcFile}...`);

  const base = path.join(dir, name);

  await sharp(srcFile)
    .rotate()
    .resize(300, 300, { fit: 'cover', position: 'centre' })
    .png({ quality: 90 })
    .toFile(`${base}-300.png`);
  console.log(`[${name}] Created ${base}-300.png`);

  await sharp(srcFile)
    .rotate()
    .resize(300, 300, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80 })
    .toFile(`${base}-300.webp`);
  console.log(`[${name}] Created ${base}-300.webp`);

  await sharp(srcFile)
    .rotate()
    .resize(1000, null, { fit: 'inside' })
    .webp({ quality: 80 })
    .toFile(`${base}.webp`);
  console.log(`[${name}] Created ${base}.webp`);
}

async function run() {
  await processFounder('pringa',      ['pringa.jpg', 'pringa.jpeg', 'pringa.png']);
  await processFounder('ramavarman',  ['ramavarman.jpg', 'ramavarman.jpeg', 'ramavarman.png']);
  console.log('Done!');
}

run().catch(err => { console.error(err); process.exit(1); });
