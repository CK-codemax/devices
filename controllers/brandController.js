const fs = require('fs');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const getDevices = require('../utils/getDevice');
// const brandsFile = require('../data/brands/brands.json');

const fileContents = JSON.parse(fs.readFileSync('./data/smartphones/details.json', 'utf8'));


exports.getAllBrands = catchAsync(async (req, res, next) => {
  fs.readFile('./data/brands/brands.json', 'utf8', (err, data) => {
    if (err) {
        console.error('An error occurred:', err);
        return;
    }
    console.log('File contents:', JSON.parse(data));
});
   const brands = await getDevices.getBrands();

   fs.writeFile('./data/brands/brands.json', JSON.stringify(brands, null, 2), { encoding: 'utf-8', flag: 'a' }, (err) => {
    if (err) {
        console.error('An error occurred:', err);
    } else {
        console.log('Content appended to the file.');
    }
});

  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: brands.length,
      data: {
        brands,
      }
    });
  });

  exports.getBrandSmartphones = catchAsync(async (req, res, next) => {
      const brandId = req.params.brandId + '';
      // console.log(brandId);
      
      const devices = await getDevices.getSmartphones(brandId);
      // console.log(devices); 
        fs.writeFile('./data/smartphones/apple.json', JSON.stringify(devices, null, 2), { encoding: 'utf-8', flag: 'a' }, (err) => {
          if (err) {
              console.error('An error occurred:', err);
          } else {
              console.log('Content appended to the file.');
          }
      });
      
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: devices.length,
        data: {
          devices,
        }
      });
    });


  exports.getDeviceListDetails = catchAsync(async (req, res, next) => {
  
      const brandId = req.params.brandId + '';
       console.log(brandId);
      
      const devices = await getDevices.getSmartphones(brandId);
      const detailedDevicesPromises = devices.map(async (device) => await getDevices.getDetails(device.id));
      const reorderedDevices = await Promise.all(detailedDevicesPromises);
        fs.writeFile('./data/smartphones/details.json', JSON.stringify(reorderedDevices, null, 2), { encoding: 'utf-8', flag: 'a' }, (err) => {
          if (err) {
              console.error('An error occurred:', err);
          } else {
              console.log('Content appended to the file.');
          }
      });
      
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: 'devices',
        data: {
          devices : reorderedDevices,
        }
      });
    });

    exports.getApple = catchAsync(async (req, res, next) => {
   
    // SEND RESPONSE
        res.status(200).json({
          status: 'success',
          results: fileContents.length,
          data: {
            fileContents
          }
        });
      });
    
