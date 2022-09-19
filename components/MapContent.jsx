import Image from "next/image";
import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRecoilState } from "recoil";
import { placeState } from "../atoms/placeAtom";
import PublicIcon from "@mui/icons-material/Public";
import Link from "next/link";

function MapContent({ data }) {
  const [activePlace, setActivePlace] = useRecoilState(placeState);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: null,
    longitude: null,
    zoom: 13.5,
  });
  const [centerCoordinate, setCenterCoordinate] = useState(null);

  useEffect(() => {
    if (activePlace) {
      setViewport({
        ...viewport,
        zoom: 15,
        longitude: activePlace["Longitude"],
        latitude: activePlace["Latitude"],
      });
    }

    if (!activePlace && centerCoordinate) {
      setViewport({
        ...viewport,
        zoom: 13.5,
        latitude: centerCoordinate?.latitude,
        longitude: centerCoordinate?.longitude,
      });
    }
  }, [activePlace]);

  useEffect(() => {
    if (data) {
      let coordinates = data?.map((item) => ({
        longitude: item["Longitude"],
        latitude: item["Latitude"],
      }));

      let center = getCenter(coordinates);
      if (center) {
        setViewport({
          ...viewport,
          latitude: center.latitude,
          longitude: center.longitude,
        });
      }
      setCenterCoordinate(getCenter(coordinates));
    }
  }, [data]);

  return (
    <div className="min-h-screen h-full relative overflow-hidden">
      <Map
        mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        {...viewport}
        onMove={(e) => setViewport(e.viewport)}
      >
        {data?.map((result, index) => (
          <div key={result["Longitude"] + index}>
            <Marker
              longitude={result["Longitude"]}
              latitude={result["Latitude"]}
              anchor="bottom"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePlace(result);
                }}
              >
                <LocationOnIcon
                  className={`cursor-pointer ${
                    activePlace["Longitude"] === result["Longitude"]
                      ? "!text-[7rem]"
                      : "!text-[3rem]"
                  } relative`}
                  name="pin-map"
                ></LocationOnIcon>
                <div
                  className={`absolute min-w-fit top-[15%] left-[25%] h-[40%] ${
                    activePlace["Longitude"] === result["Longitude"]
                      ? "bg-[#92D72E] px-6"
                      : "bg-[#282C37] text-[.5rem] px-4"
                  }    rounded-l-full`}
                >
                  <span className=" text-white whitespace-nowrap font-extralight block">
                    {result["Place Name"]}
                  </span>
                  {activePlace["Longitude"] === result["Longitude"] && (
                    <span className=" text-white text-[.5rem] leading-tight whitespace-nowrap font-extralight">
                      {activePlace["Place Description"]?.split(".")[0]}
                    </span>
                  )}
                </div>
              </div>
            </Marker>
          </div>
        ))}
      </Map>
      <div
        className={`absolute flex flex-col top-0 right-0 opacity-0 ${
          activePlace && "opacity-100"
        } transition ease-in-out duration-150 h-full w-[25%] bg-primaryDark`}
      >
        <div className="relative w-full aspect-[3/2]">
          <Image
            src={activePlace && `/${activePlace["Image"]}`}
            layout="fill"
            alt="user-icon"
          />
        </div>
        <h1 className="text-white bg-[#72CDD2] px-5 py-1 font-semibold">
          {activePlace["Place Name"]}
        </h1>
        <div className="text-[.7rem] text-[#CCCCCC] flex flex-col gap-3  px-5 leading-tight tracking-tight pt-4">
          <p>{activePlace["Place Description"]?.split(".")[0]}</p>
          <p>{activePlace["Place Description"]?.split(".").slice(1)}</p>
          <div className="flex items-center gap-2 mt-3">
            <LocationOnIcon
              type="address"
              name="pin-description"
              className="text-xs"
            />
            <span>{activePlace["Address"]}</span>
          </div>
          <Link href={activePlace ? activePlace["Official Website"] : ""}>
            <a target="_blank">
              <div className="flex items-center gap-2">
                <PublicIcon
                  type="website"
                  name="pin-description"
                  className="text-xs"
                />
                <p>{activePlace["Official Website"]}</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MapContent;
