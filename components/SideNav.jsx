import React from "react";
import PublicIcon from "@mui/icons-material/Public";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

function SideNavIcon({ keys, url }) {
  const { pathname } = useRouter();
  const isActive =
    pathname === url
      ? "text-white bg-activeNav"
      : "text-navText bg-secondaryDark";

  return (
    <Link href={`${url}`}>
      <a
        className={`w-full px-2 flex flex-col items-center justify-center h-[85px] border border-gray-800 ${isActive}`}
      >
        {
          {
            Browse: <PublicIcon className="!text-[2rem]" />,
            "Suggest Attraction":
              pathname === url ? (
                <div className="relative w-[32px] aspect-square">
                  <Image
                    src="/icon-active.png"
                    layout="fill"
                    alt="merlion-icon"
                  />
                </div>
              ) : (
                <div className="relative w-[32px] aspect-square">
                  <Image
                    src="/icon-inactive.png"
                    layout="fill"
                    alt="merlion-icon"
                  />
                </div>
              ),

            Videos: <OndemandVideoIcon className="!text-[2rem]" />,
            Blog: <SpeakerNotesIcon className="!text-[2rem]" />,
            About: <InfoIcon className="!text-[2rem]" />,
          }[keys]
        }
        <span className="text-xs text-center leading-3">{keys}</span>
      </a>
    </Link>
  );
}

function SideNav() {
  return (
    <div className="min-h-screen w-[100px] bg-secondaryDark flex flex-col items-center">
      <SideNavIcon url="/browse" keys="Browse" />
      <SideNavIcon url="/suggest-attraction" keys="Suggest Attraction" />
      <SideNavIcon url="/videos" keys="Videos" />
      <SideNavIcon url="/blog" keys="Blog" />
      <SideNavIcon url="/about" keys="About" />
    </div>
  );
}

export default SideNav;
