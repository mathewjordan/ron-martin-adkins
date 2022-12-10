import type { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import IIIF from "iiif-processor";
import absoluteUrl from "next-absolute-url";
import { createReadStream } from "fs";
import { resolve } from "path";

const streamResolver = ({ id }: { id: string; baseUrl?: string }) => {
  const imagePath = resolve(process.cwd(), `assets/images/${id}.jpg`);
  return createReadStream(imagePath);
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { origin } = absoluteUrl(request);
  const url = origin.concat(request.url as string);

  const processor = new IIIF.Processor(url, streamResolver, {
    pathPrefix: "/api/image/",
  });

  const result = await processor.execute();
  response.setHeader("Content-Type", "image/jpeg");
  response.send(result.body);
};

export const getServerSideProps: GetServerSideProps = async (props) => {
  props.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86000"
  );

  return {
    props: {},
  };
};

export default handler;
