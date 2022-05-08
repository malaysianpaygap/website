import getConstant from './getConstant';

const startScripts = async () => {
  await getConstant();
};

try {
  startScripts();
} catch (err) {
  console.log(err);
}
