import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const exts = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.PNG']);

async function collectFiles(dir) {
  const result = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...await collectFiles(fullPath));
    } else if (exts.has(path.extname(entry.name))) {
      result.push(fullPath);
    }
  }
  return result;
}

async function convertFile(file) {
  const parsed = path.parse(file);
  const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);
  await sharp(file).webp({ quality: 82 }).toFile(webpPath);
  await fs.unlink(file);
  return { original: file, converted: webpPath };
}

async function main() {
  const targets = [
    path.resolve('src/assets'),
  ];

  const converted = [];

  for (const dir of targets) {
    const files = await collectFiles(dir);
    for (const file of files) {
      converted.push(await convertFile(file));
    }
  }

  for (const { original, converted: convertedPath } of converted) {
    console.log(`Converted ${original} -> ${convertedPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
