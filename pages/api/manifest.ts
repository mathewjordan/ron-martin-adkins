import type { NextApiRequest, NextApiResponse } from "next";

type Data = {};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({});
};

export default handler;
