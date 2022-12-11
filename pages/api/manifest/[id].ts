import { IIIFBuilder } from "iiif-builder";
import type { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import { csvToJson, EntryShape } from "../../../services/csv";
import fs from "fs";
import absoluteUrl from "next-absolute-url";

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  const { origin } = absoluteUrl(request);
  const url = origin.concat(request.url as string);
  const { id } = request.query;

  const path = resolve(process.cwd(), `assets/assets.csv`);
  const csv = fs.readFileSync(path) as unknown as string;
  const json = csvToJson(csv) as unknown as EntryShape[];
  const entry = json.find((item) => item.id === id) as EntryShape;

  const builder = new IIIFBuilder();
  const newManifest = builder.createManifest(url, (manifest) => {
    manifest.addLabel(entry.title as string, "en");
    manifest.addThumbnail({
      id: origin.concat(`/api/image/${entry.id}/square/300,/0/default.jpg`),
      type: "Image",
      format: "image/jpeg",
      width: 300,
      height: 300,
    });

    const canvasId = url.concat("/canvas");
    manifest.createCanvas(canvasId, (canvas) => {
      canvas.width = 1600;
      canvas.height = 1600;
      canvas.createAnnotation(canvasId.concat("/annotation"), {
        id: canvasId.concat("/annotation"),
        type: "Annotation",
        motivation: "painting",
        body: {
          id: origin.concat(`/api/image/${entry.id}/full/full/0/default.jpg`),
          type: "Image",
          format: "image/jpg",
          height: 1600,
          width: 1600,
        },
      });
    });
  });

  const jsonManifest = builder.toPresentation3({
    id: newManifest.id,
    type: "Manifest",
  });

  response.status(200).json(jsonManifest);
};

export default handler;
