// scripts/update-sitemap.js
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://wellness-gadget-insider.vercel.app';
const OUTPUT_DIR = path.join(process.cwd(), 'public');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'sitemap.xml');

// Ensure public directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Download sitemap function
function downloadSitemap(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadSitemap(response.headers.location)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        return reject(new Error(`Request failed with status code ${response.statusCode}`));
      }

      const file = fs.createWriteStream(OUTPUT_PATH);
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(OUTPUT_PATH, () => reject(err));
      });
    }).on('error', reject);
  });
}

// Main function
async function main() {
  try {
    console.log('Downloading latest sitemap...');
    await downloadSitemap(`${SITE_URL}/sitemap.xml`);
    
    console.log('✅ Sitemap updated successfully!');
    console.log(`➡️ Sitemap saved to: ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('❌ Error updating sitemap:', error);
  }
}

main();