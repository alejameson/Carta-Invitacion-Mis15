const sharp = require('sharp');
sharp('public/DSC_4999.jpg').metadata().then(console.log).catch(console.error);
