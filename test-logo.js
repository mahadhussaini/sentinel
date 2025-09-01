// Simple test script to verify logo.svg is accessible
const https = require('https');

function testLogo(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Logo is accessible!');
          console.log(`📊 Status: ${res.statusCode}`);
          console.log(`📄 Content-Type: ${res.headers['content-type']}`);
          console.log(`📏 Content-Length: ${res.headers['content-length']} bytes`);
          resolve(true);
        } else {
          console.log('❌ Logo is not accessible');
          console.log(`📊 Status: ${res.statusCode}`);
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (err) => {
      console.log('❌ Error accessing logo:', err.message);
      reject(err);
    });

    req.setTimeout(5000, () => {
      console.log('⏰ Request timed out');
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Test with the current Vercel URL
const vercelUrl = process.argv[2] || 'https://sentinel-smoky.vercel.app';

if (!vercelUrl) {
  console.log('❌ Usage: node test-logo.js <vercel-url>');
  console.log('📝 Example: node test-logo.js https://sentinel-smoky.vercel.app');
  process.exit(1);
}

console.log(`🧪 Testing logo accessibility at: ${vercelUrl}/logo.svg`);
console.log('=' .repeat(50));

testLogo(`${vercelUrl}/logo.svg`)
  .then(() => {
    console.log('\n🎉 Logo test passed! Your deployment is working correctly.');
  })
  .catch((err) => {
    console.log('\n❌ Logo test failed. The issue may still exist.');
    console.log('🔧 Try redeploying with the updated configuration.');
  });
