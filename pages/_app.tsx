import globalStyles from "../styles/global";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
