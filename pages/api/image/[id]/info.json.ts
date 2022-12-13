import type { NextApiRequest, NextApiResponse } from "next";
import absoluteUrl from "next-absolute-url";

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  const { origin } = absoluteUrl(request);
  const url = origin.concat(request.url as string);
  const id = url.replace(/\/info\.json/, "");

  const template = {
    "@context": "http://iiif.io/api/image/2/context.json",
    type: "ImageService2",
    profile: "level1",
    protocol: "http://iiif.io/api/image",
    extraFormats: ["webp"],
    preferredFormats: ["webp", "jpg"],
    tiles: [
      {
        scaleFactors: [1, 2, 4, 8],
        width: 256,
      },
    ],
  };

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.status(200).json({ ...template, id: id, width: 1600, height: 1600 });
};

export default handler;
