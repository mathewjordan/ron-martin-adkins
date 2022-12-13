import { IIIFBuilder } from "iiif-builder";
import type { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import { csvToJson, EntryShape } from "../../services/csv";
import fs from "fs";
import absoluteUrl from "next-absolute-url";
import { Collection } from "@iiif/presentation-3";

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  const { origin } = absoluteUrl(request);
  const url = origin.concat(request.url as string);

  const path = resolve(process.cwd(), `assets/assets.csv`);
  const csv = fs.readFileSync(path) as unknown as string;
  const json = csvToJson(csv) as unknown as EntryShape[];

  const builder = new IIIFBuilder();
  const newCollection = builder.createCollection(url, (collection) => {
    collection.addLabel("Photography of Ron Martin-Adkins", "en");
    json.forEach((entry) =>
      collection.createManifest(
        origin.concat(`/api/manifest/${entry.id}`),
        (manifest) => {
          manifest.addLabel(entry.title as string, "en");
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

  const generatedCollection = builder.toPresentation3({
    id: newCollection.id,
    type: "Collection",
  }) as Collection;

  const jsonCollection = {
    ...generatedCollection,
    items: generatedCollection.items.map((item) => {
      return {
        ...item,
        homepage: [
          {
            id: origin.concat(`/photo/${item.id.split("/").pop()}`),
            type: "Text",
            label: item.label,
          },
        ],
      };
    }),
  };

  response.status(200).json(jsonCollection);
};

export default handler;
