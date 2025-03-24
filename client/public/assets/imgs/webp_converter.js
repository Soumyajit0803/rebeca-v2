import fs from 'fs/promises';
import sharp from "sharp"

const inputDir = './public/assets/imgs/team/';
const outputDir = './public/assets/imgs/team/JSmodified/';

// Ensure output directory exists
fs.mkdir(outputDir, { recursive: true })
  .catch(err => console.error(err));

// Function to resize and convert image to WEBP format
async function resizeAndConvert(inputPath, outputPath) {
  await sharp(inputPath)
    .resize({ width: 700, height: 700, fit: 'inside' })
    .webp({ quality: 80 })
    .toFile(outputPath);
}

async function convertImages() {
  let count = 0;
  let failed = Array()
  try {
    const files = await fs.readdir(inputDir);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.jpg')) {
        const inputPath = inputDir + file;
        const outputPath = outputDir + file.replace(/\.jpg$/i, '.webp');
        console.log(inputPath);
        try {
            await resizeAndConvert(inputPath, outputPath);
        } catch (error) {
            console.log("Failed to convert: "+inputPath);
            failed.push(inputPath)
            count--;
        }
        count++;
        
      }
    }
    console.log("CONVERSION COMPLETE");
    console.log("Converted", count, "files.");
    console.log("Failed conversions: ");
    console.log(failed);
  } catch (err) {
    console.log("Some error occured, see description:\n");
    console.error(err);
  }
}

convertImages();
