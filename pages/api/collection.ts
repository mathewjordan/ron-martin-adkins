import { IIIFBuilder } from "iiif-builder";
import type { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import { csvToJson } from "../../services/csv";
import fs from "fs";
import absoluteUrl from "next-absolute-url";

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  const { origin } = absoluteUrl(request);
  const url = origin.concat(request.url as string);

  const path = resolve(process.cwd(), `assets/assets.csv`);
  const csv = fs.readFileSync(path);
  const json = csvToJson(csv);

  const builder = new IIIFBuilder();
  const newCollection = builder.createCollection(url, (collection) => {
    collection.addLabel("Photography of Ron Martin-Adkins", "en");
    json.forEach((entry) =>
      collection.createManifest(
        origin.concat(`/api/manifest/${entry.id}`),
        (manifest) => {
          manifest.addLabel(entry.title, "en");
          manifest.addThumbnail({
            id: origin.concat(
              `/api/image/${entry.id}/square/300,/0/default.jpg`
            ),
            type: "Image",
            format: "image/jpeg",
            width: 300,
            height: 300,
          });
        }
      )
    );
  });

  const jsonCollection = builder.toPresentation3({
    id: newCollection.id,
    type: "Collection",
  });

  response.status(200).json(jsonCollection);
};

export default handler;
