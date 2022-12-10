import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  res.redirect(`${req.url}/info.json`);

export default handler;
