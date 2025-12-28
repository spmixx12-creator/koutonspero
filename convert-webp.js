
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_DIR = path.join(__dirname, 'public', 'images');

async function convertDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            await convertDir(fullPath);
        } else if (/\.(png|jpg|jpeg|gif)$/i.test(file)) {
            const outPath = fullPath.replace(/\.(png|jpg|jpeg|gif)$/i, '.webp');
            console.log(`Converting: ${file} -> ${path.basename(outPath)}`);
            try {
                await sharp(fullPath)
                    .webp({ quality: 80 })
                    .toFile(outPath);
            } catch (err) {
                console.error(`Failed to convert ${file}:`, err);
            }
        }
    }
}

convertDir(TARGET_DIR).then(() => console.log('Conversion complete.'));
