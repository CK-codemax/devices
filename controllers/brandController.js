const fs = require("fs");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const getDevices = require("../utils/getDevice");
const Smartphone = require("../models/smartphoneModel");
// const brandsFile = require('../data/brands/brands.json');

const fileContents = JSON.parse(
  fs.readFileSync("./data/smartphones/apple-details.json", "utf8")
);
const tokenList = JSON.parse(
  fs.readFileSync("./data/smartphones/tokens.json", "utf8")
);
const devices = JSON.parse(
  fs.readFileSync("./data/smartphones/apple-details.json", "utf8")
);

exports.getAllBrands = catchAsync(async (req, res, next) => {
  //   fs.readFile('./data/brands/brands.json', 'utf8', (err, data) => {
  //     if (err) {
  //         console.error('An error occurred:', err);
  //         return;
  //     }
  //     console.log('File contents:', JSON.parse(data));
  // });
  const brands = await getDevices.getBrands();

  //    fs.writeFile('./data/brands/brands.json', JSON.stringify(brands, null, 2), { encoding: 'utf-8', flag: 'a' }, (err) => {
  //     if (err) {
  //         console.error('An error occurred:', err);
  //     } else {
  //         console.log('Content appended to the file.');
  //     }
  // });

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: brands.length,
    data: {
      brands,
    },
  });
});

exports.getBrandSmartphones = catchAsync(async (req, res, next) => {
  const brandId = req.params.brandId + "";
  console.log(brandId);

  const devices = await getDevices.getSmartphones(brandId);
  // console.log(devices);
  fs.writeFile(
    "./data/smartphones/one-plus.json",
    JSON.stringify(devices, null, 2),
    { encoding: "utf-8", flag: "a" },
    (err) => {
      if (err) {
        console.error("An error occurred:", err);
      } else {
        console.log("Content appended to the file.");
      }
    }
  );

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: devices.length,
    data: {
      devices,
    },
  });
});

exports.getDeviceListDetails = catchAsync(async (req, res, next) => {
  const brandId = req.params.brandId + "";
  console.log(brandId);

  const devices = await getDevices.getSmartphones("infinix-phones-119");
  console.log(devices);
  const detailedDevicesPromises = devices.map(
    async (device) => await getDevices.getDetails(device.id)
  );
  const reorderedDevices = await Promise.all(detailedDevicesPromises);
  fs.writeFile(
    "./data/smartphones/infinix-details.json",
    JSON.stringify(reorderedDevices, null, 2),
    { encoding: "utf-8", flag: "a" },
    (err) => {
      if (err) {
        console.error("An error occurred:", err);
      } else {
        console.log("Content appended to the file.");
      }
    }
  );

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: "devices",
    data: {
      devices: reorderedDevices,
    },
  });
});

exports.getApple = catchAsync(async (req, res, next) => {
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: fileContents.length,
    data: {
      fileContents,
    },
  });
});

exports.fixTokens = catchAsync(async (req, res, next) => {
  const tokenOrdered = tokenList
    .filter((token) => token.logo !== null)
    .map((token) => {
      const newToken = {};
      return newToken;
    });

  fs.writeFile(
    "./data/smartphones/modified-tokens.json",
    JSON.stringify(tokenOrdered, null, 2),
    { encoding: "utf-8", flag: "a" },
    (err) => {
      if (err) {
        console.error("An error occurred:", err);
      } else {
        console.log("Content appended to the file.");
      }
    }
  );

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: "tokens",
    length: tokenOrdered.length,
    data: {
      tokens: tokenOrdered,
    },
  });
});

exports.pushDevicesToDB = catchAsync(async (req, res, next) => {
  const arrangedDevices = devices.map((device) => {
    const fullDetails = device.map((dev) => {
      const details = {};

      return details;
    });
    const newDevice = {
      name: device.name,
      img: device.img,
      fullDetails: [...device.detailSpec],
      quickSpecs: [device.quickSpec],
    };

    return newDevice;
  });

  await Smartphone.insertMany(arrangedDevices);

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: arrangedDevices.length,
    data: {
      devices: arrangedDevices,
    },
  });
});
