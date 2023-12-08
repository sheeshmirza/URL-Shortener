const utils = require('./utils');

const cht = "qr";
const chs = "450x450";
const choe = "UTF-8";

const generateQR = async (url) => {
  const googleAPI = `https://chart.googleapis.com/chart?cht=${cht}&chs=${chs}&chl=${url}&choe=${choe}`;
  const response = await fetch(googleAPI);
  if (response.status != 200) {
    utils.logger.error('google-qr-generator', response.status);
    throw new Error("unable to generate QR_Code");
  }
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  utils.logger.log('google-qr-generator', 'qr generated');
  return "data:image/png;base64," + base64;
};

module.exports = generateQR;