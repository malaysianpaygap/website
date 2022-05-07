// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import reader from 'xlsx';

import { IEmploymentOptions } from '@/shared/interface';

const SHEETS = {
  industries: 'Industry',
  specialisation: 'Job Specialisation',
};

export default function constant(_: NextApiRequest, res: NextApiResponse) {
  const filename = path.join(
    process.cwd(),
    '/public/Industry__Job_Specs_List.xlsx'
  );
  const file = reader.readFile(filename);

  const data: IEmploymentOptions = {
    industries: [],
    specialisation: [],
  };

  Object.keys(SHEETS).map((k) => {
    const sheetKey = k as keyof typeof SHEETS;
    reader.utils
      .sheet_to_json<string[]>(file.Sheets[SHEETS[sheetKey]], { header: 1 })
      .forEach((res) => {
        if (!res.length) return;

        const value = res[0].trim();
        if (!value) return;

        data[sheetKey].push(value);
      });
  });

  res.status(200).json({ data });
}
