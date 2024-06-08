const gsmarena = require('gsmarena-api');

exports.getSmartphones = async (id) => {
    const devices = await gsmarena.catalog.getBrand(id);
    return devices;
}

exports.getBrands = async () => {
    const brands = await gsmarena.catalog.getBrands();
    return brands;
}

exports.getDetails = async (id) => {
    const device = await gsmarena.catalog.getDevice(id);
    return device;
}