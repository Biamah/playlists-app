import fs from 'fs'

// File destination.txt will be created or overwritten by default.
fs.copyFile('.env.example', '.env', (err) => {
  if (err) throw err;
  console.log('>>> .env.example was copied to .env');
});
