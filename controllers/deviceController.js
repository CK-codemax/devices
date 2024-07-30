const fs = require("fs");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const getDevices = require("../utils/getDevice");
const Device = require("../models/deviceModel");

const appleDevices = JSON.parse(
  fs.readFileSync("./data/smartphones/apple.json", "utf8")
);
const appleDevicesDetails = JSON.parse(
  fs.readFileSync("./data/smartphones/apple-details.json", "utf8")
);

exports.getAllBrandSmartphones = catchAsync(async (req, res, next) => {
  // const arrangedDevices = appleDevices.map((device) => {
  //   const newDevice = {
  //     name: device.name,
  //     img: device.img,
  //     description: device.description,
  //   };
  //   return newDevice;
  // });

  // await Device.insertMany(arrangedDevices);

  const devices = await Device.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: devices.length,
    data: {
      devices,
    },
  });
});

exports.getBrandSmartPhoneDetails = catchAsync(async (req, res, next) => {
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: appleDevicesDetails.length,
    data: {
      appleDevicesDetails,
    },
  });
});
