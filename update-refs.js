
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, 'src');
const PUBLIC_DIR = path.join(__dirname, 'public');

const extensionsToReplace = ['.png', '.jpg', '.jpeg', '.gif'];
const fileTypesToUpdate = ['.jsx', '.js', '.html', '.css'];

function updateFileContent(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    extensionsToReplace.forEach(ext => {
        // We use a regex to find extensions preceded by any character that isn't alphanumeric or a dot (like a path separator or quote)
        // and followed by a quote or end of string.
        // Simplified: replace any occurrence of the extension that looks like a filename extension.
        const regex = new RegExp(`\\${ext}(?!\\w)`, 'gi');
        if (regex.test(content)) {
            content = content.replace(regex, '.webp');
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                walk(fullPath);
            }
        } else if (fileTypesToUpdate.includes(path.extname(file))) {
            updateFileContent(fullPath);
        }
    }
}

console.log('Updating references in src...');
walk(SRC_DIR);
console.log('Updating references in public...');
walk(PUBLIC_DIR);
console.log('References updated.');
