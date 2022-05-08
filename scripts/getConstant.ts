import fs from 'fs';
import path from 'path';
import reader from 'xlsx';

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

  Object.keys(SHEETS).map((k) => {
    const temp: { value: string; label: string; desc: string }[] = [];

    const sheetKey = k as keyof typeof SHEETS;
    reader.utils
      .sheet_to_json<string[]>(file.Sheets[SHEETS[sheetKey]], { header: 1 })
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

export default getConstant;
