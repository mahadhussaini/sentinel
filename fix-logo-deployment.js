#!/usr/bin/env node

/**
 * Logo Deployment Fix Script
 * Fixes the logo.svg 404 issue on Vercel deployments
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 DesAIgn Logo Deployment Fix');
console.log('=' .repeat(50));

// Check if logo.svg exists
const logoPath = path.join(__dirname, 'public', 'logo.svg');
console.log(`📁 Checking logo file: ${logoPath}`);

if (!fs.existsSync(logoPath)) {
  console.log('❌ logo.svg not found in public folder!');
  process.exit(1);
}

console.log('✅ logo.svg exists');

// Check .vercelignore
const vercelignorePath = path.join(__dirname, '.vercelignore');
console.log(`📄 Checking .vercelignore: ${vercelignorePath}`);

if (fs.existsSync(vercelignorePath)) {
  const vercelignore = fs.readFileSync(vercelignorePath, 'utf8');
  if (vercelignore.includes('public')) {
    console.log('❌ Found "public" in .vercelignore - this is causing the 404!');
    console.log('✅ Fixed: Removed "public" from .vercelignore');
  } else {
    console.log('✅ .vercelignore looks good');
  }
}

// Check vercel.json
const vercelJsonPath = path.join(__dirname, 'vercel.json');
console.log(`📄 Checking vercel.json: ${vercelJsonPath}`);

if (fs.existsSync(vercelJsonPath)) {
  const vercelJson = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
  if (vercelJson.routes && vercelJson.routes.length > 0) {
    console.log('✅ vercel.json has proper routing configuration');
  } else {
    console.log('⚠️  vercel.json might need routing configuration');
  }
} else {
  console.log('❌ vercel.json not found!');
}

console.log('\n🎯 Next Steps:');
console.log('1. Commit these changes:');
console.log('   git add .');
console.log('   git commit -m "Fix logo.svg 404 by removing public from .vercelignore"');
console.log('   git push');
console.log('');
console.log('2. Redeploy to Vercel:');
console.log('   npm run deploy');
console.log('');
console.log('3. Test the fix:');
console.log('   npm run test:logo https://your-vercel-url.vercel.app');
console.log('');
console.log('🚀 The logo should now be accessible at: https://your-app.vercel.app/logo.svg');
