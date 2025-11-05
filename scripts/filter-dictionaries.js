const fs = require('fs');
const path = require('path');

const DICT_DIR = path.join(__dirname, '../public/dictionaries');

// Word limits per language (optimized for game performance)
const LIMITS = {
  en: 100000,  // English: top 100k most common words
  fr: 80000,   // French: top 80k words
  it: 80000,   // Italian: top 80k words
  de: 100000,  // German: top 100k (reduced from 1.9M!)
  es: 80000,   // Spanish: top 80k words
};

function filterDictionary(lang) {
  const inputFile = path.join(DICT_DIR, `${lang}.txt`);
  const outputFile = path.join(DICT_DIR, `${lang}-filtered.txt`);
  
  if (!fs.existsSync(inputFile)) {
    console.log(`⚠️  ${lang}.txt not found, skipping`);
    return;
  }
  
  console.log(`\n📖 Processing ${lang}.txt...`);
  const lines = fs.readFileSync(inputFile, 'utf-8').split('\n');
  console.log(`   Original: ${lines.length.toLocaleString()} words`);
  
  const filtered = lines
    .map(w => w.trim().toLowerCase())
    .filter(w => w.length >= 2 && w.length <= 15) // Reasonable word length
    .filter(w => /^[a-zàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿß]+$/i.test(w)) // Only letters (including accents)
    .filter(w => !w.includes('-')) // Remove hyphenated words
    .filter(w => !w.includes("'")) // Remove contractions
    .filter((w, i, arr) => arr.indexOf(w) === i) // Remove duplicates
    .slice(0, LIMITS[lang]); // Keep only top N words
  
  fs.writeFileSync(outputFile, filtered.join('\n'), 'utf-8');
  
  const reduction = ((1 - filtered.length / lines.length) * 100).toFixed(1);
  const originalSizeKB = (fs.statSync(inputFile).size / 1024).toFixed(0);
  const filteredSizeKB = (fs.statSync(outputFile).size / 1024).toFixed(0);
  const sizeSaved = ((1 - filteredSizeKB / originalSizeKB) * 100).toFixed(1);
  
  console.log(`   ✅ Filtered: ${filtered.length.toLocaleString()} words (-${reduction}%)`);
  console.log(`   📦 Size: ${originalSizeKB} KB → ${filteredSizeKB} KB (-${sizeSaved}%)`);
  console.log(`   💾 After gzip/brotli: ~${(filteredSizeKB * 0.2).toFixed(0)}-${(filteredSizeKB * 0.3).toFixed(0)} KB expected`);
}

console.log('🎯 Filtering dictionaries for optimal game performance...');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

['en', 'fr', 'it', 'de', 'es'].forEach(filterDictionary);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ All dictionaries filtered successfully!\n');
console.log('📝 Next steps:');
console.log('   1. Review *-filtered.txt files in public/dictionaries/');
console.log('   2. Test a few common words to verify quality');
console.log('   3. Backup originals:');
console.log('      cd public/dictionaries');
console.log('      mv en.txt en-original.txt');
console.log('      mv fr.txt fr-original.txt');
console.log('      mv it.txt it-original.txt');
console.log('      mv de.txt de-original.txt');
console.log('      mv es.txt es-original.txt');
console.log('   4. Replace with filtered versions:');
console.log('      mv en-filtered.txt en.txt');
console.log('      mv fr-filtered.txt fr.txt');
console.log('      mv it-filtered.txt it.txt');
console.log('      mv de-filtered.txt de.txt');
console.log('      mv es-filtered.txt es.txt');
console.log('   5. Build and test: npm run build');
console.log('\n🚀 Expected result: 70-90% size reduction per dictionary!');
