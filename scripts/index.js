/* eslint-disable @typescript-eslint/no-var-requires */
const getConstant = require('./getConstant');

const startScripts = async () => {
  await getConstant();
};

try {
  startScripts();
} catch (err) {
  console.log(err);
}
