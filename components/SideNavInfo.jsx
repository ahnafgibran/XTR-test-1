import React from "react";
import DropdownFilter from "./DropdownFilter";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRecoilState } from "recoil";
import { placeState } from "../atoms/placeAtom";

function PlaceInfo({ item }) {
  const [activePlace, setActivePlace] = useRecoilState(placeState);

  const isActive = (place) => {
    return place["Place Name"] === activePlace["Place Name"]
      ? "bg-activePlace text-[#92D72E]"
      : "";
  };

  if (item.hasOwnProperty("Sub Areas")) {
    return (
      <Accordion type="accordion" onClick={() => setActivePlace(item)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon type="icon-accordion" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          type="accordion-summary"
        >
          <p
            className={`w-full px-4 py-[.3rem] ${isActive(item)} font-semibold`}
          >
            {item["Place Name"]}
          </p>
        </AccordionSummary>
        <AccordionDetails type="accordion-details">
          {item["Sub Areas"].map((area) => (
            <p
              key={area}
              className="text-gray-500 ml-4 mt-2 tracking-tighter font-semibold"
            >
              {area}
            </p>
          ))}
        </AccordionDetails>
      </Accordion>
    );
  }
  return (
    <p
      onClick={() => setActivePlace(item)}
      className={`px-4 py-[.3rem] ${isActive(item)} font-semibold`}
    >
      {item["Place Name"]}
    </p>
  );
}

function SideNavInfo({ data }) {
  return (
    <div className="min-h-screen bg-primaryDark w-[230px] flex flex-col">
      <DropdownFilter />

      <div className="flex flex-col border-gray-800 border-y mt-7 divide-y divide-gray-800 mx-4">
        {data?.map((items) => (
          <div
            key={items["Place Name"]}
            className="py-2 text-white text-xs cursor-pointer"
          >
            {<PlaceInfo item={items} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideNavInfo;
