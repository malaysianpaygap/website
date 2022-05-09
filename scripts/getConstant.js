/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const reader = require('xlsx');

const SHEETS = {
  industries: 'Industry',
  specialisation: 'Job Specialisation',
};

const getConstant = async () => {
  const filename = path.join(
    process.cwd(),
    '/public/Industry__Job_Specs_List.xlsx'
  );
  const file = reader.readFile(filename);

  const directory = path.join(process.cwd(), `public/constants`);

  Object.keys(SHEETS).map((sheetKey) => {
    const temp = [];

    reader.utils
      .sheet_to_json(file.Sheets[SHEETS[sheetKey]], { header: 1 })
      .forEach((res) => {
        if (!res.length) return;

        const value = res[0].trim();
        if (!value) return;

        temp.push({ value, label: value, desc: value });
      });

    fs.writeFileSync(
      path.join(directory, `${sheetKey}.json`),
      JSON.stringify(temp, null, 2)
    );
  });
};

module.exports = getConstant;
