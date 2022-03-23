import { NextApiRequest, NextApiResponse } from 'next';

// todo: auth
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  const isHuman = await _validateHuman(token);
  if (!isHuman) {
    res.status(400);
    res.json({ errors: ['Please dont fool us bot :)'] });
    return;
  }

  res.status(201);
  res.json({ message: 'Success!' });
}

async function _validateHuman(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: 'POST',
    }
  );
  const data: { success: boolean; score: number } = await response.json();
  // eslint-disable-next-line no-console
  console.log(data);
  return data.success;
}
