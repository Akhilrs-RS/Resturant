const fs = require('fs');
const path = require('path');

const API_BASE_URL = 'http://localhost:5210/api/catalog/prices';
const ASSETS_DIR = path.join(__dirname, 'Frontend', 'src', 'assets');

const mapping = {
  'suite_deluxe': 'm10.jpg',
  'suite_ocean': 'm6.jpg',
  'suite_honeymoon': 'm1.jpg',
  'suite_presidential': 'm1.jpg'
};

async function seed() {
  for (const [itemKey, fileName] of Object.entries(mapping)) {
    const filePath = path.join(ASSETS_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.error(`Asset not found: ${filePath}`);
      continue;
    }

    console.log(`Processing ${fileName} for ${itemKey}...`);
    const fileBuffer = fs.readFileSync(filePath);
    const base64Image = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;

    try {
      // First, get the current price record to make sure we don't zero it out
      const getRes = await fetch(`${API_BASE_URL}`);
      if (!getRes.ok) {
        throw new Error(`Failed to fetch catalog list`);
      }
      const list = await getRes.json();
      const currentRecord = list.find(p => p.itemKey === itemKey);
      if (!currentRecord) {
        throw new Error(`Record ${itemKey} not found in database`);
      }

      const res = await fetch(`${API_BASE_URL}/${itemKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          price: currentRecord.price,
          displayName: currentRecord.displayName,
          description: currentRecord.description,
          imageUrl: base64Image
        })
      });

      if (res.ok) {
        console.log(`Successfully uploaded ${fileName} to database for key ${itemKey}!`);
      } else {
        const errText = await res.text();
        console.error(`Failed to upload ${fileName} for key ${itemKey}: ${errText}`);
      }
    } catch (err) {
      console.error(`Error processing ${itemKey}:`, err.message);
    }
  }
}

seed();
