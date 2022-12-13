import dynamic from "next/dynamic";
import { resolve } from "path";
import fs from "fs";
import { csvToJson, EntryShape } from "../../services/csv";
import {
  PhotoBackdrop,
  PhotoImage,
  PhotoImageWrapper,
  Underlay,
} from "../../components/Photo/Photo.styled";

const PanZoom = dynamic(() => import("../../components/PanZoom"), {
  ssr: false,
});

const Photo: React.FC<EntryShape> = ({ id }) => {
  const background = `/api/image/${id}/full/3,/0/default.jpg`;
  const src = `/api/image/${id}/full/1600,/0/default.jpg`;

  return (
    <>
      {/* <PanZoom uri={`http://localhost:3000/api/image/${id}`} /> */}
      <PhotoImageWrapper>
        <PhotoImage src={src} alt="" fill={true} />
      </PhotoImageWrapper>
      {/* <Underlay /> */}
      {/* <PhotoBackdrop css={{ backgroundImage: `url(${background})` }} /> */}
    </>
  );
};

export async function getStaticPaths() {
  const path = resolve(process.cwd(), `assets/assets.csv`);
  const csv = fs.readFileSync(path) as unknown as string;
  const json = csvToJson(csv) as unknown as EntryShape[];

  const paths = json.map((entry) => ({
    params: { ...entry },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: EntryShape }) {
  return {
    props: { ...params },
  };
}

export default Photo;
