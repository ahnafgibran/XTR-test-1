import "../styles/globals.css";
import "../styles/muiComponents.css";
import Layout from "../components/Layout";
import { RecoilRoot } from "recoil";
import 'mapbox-gl/dist/mapbox-gl.css'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
