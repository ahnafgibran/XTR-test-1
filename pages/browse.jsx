import Head from "next/head";
import React, { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import SideNavInfo from "../components/SideNavInfo";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { placeState } from "../atoms/placeAtom";
import MapContent from "../components/MapContent";

function Browse() {
  const [dataAttractions, setDataAttractions] = useState(null);
  const [activePlace, setActivePlace] = useRecoilState(placeState)


  useEffect(() => {
    axios.get("/api/tourist-attractions").then((res) => {
      setDataAttractions(res.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Browse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow flex h-full">
        <SideNavInfo data={dataAttractions}/>
        <div className='flex flex-col flex-grow'>
          <div className="bg-white h-[80px] w-full p-8 flex items-center justify-between">
            <h1 className="text-black font-bold tracking-tighter">
              TOP-RATED TOURIST ATTRACTIONS IN SINGAPORE
            </h1>
            <div className="flex justify-center items-center gap-3 ">
              <SettingsIcon className="cursor-pointer" />
              <HelpIcon className="cursor-pointer" />
              <CancelIcon onClick={() => setActivePlace('')} className="cursor-pointer" />
            </div>
          </div>
          <MapContent data={dataAttractions} />
          
        </div>
      </main>
    </>
  );
}

export default Browse;
