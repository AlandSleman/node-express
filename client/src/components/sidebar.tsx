/** @format */

import Link from "next/link";
import { useState, useEffect } from "react";
import { UseProgramContext } from "../contexts/programContextProvider";
import { setCookie, getCookie } from "cookies-next";
import { IMAGE_SERVER_URL } from "../../config";

let marketPlaceIcon = (
 <svg
  xmlns="http://www.w3.org/2000/svg"
  className="rotate-90 h-6 w-6"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}>
  <path
   strokeLinecap="round"
   strokeLinejoin="round"
   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  />
 </svg>
);

let profileIcon = (
 <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="feather feather-user">
  <script />
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
  <circle cx="12" cy="7" r="4" />
 </svg>
);
let homeIcon = (
 <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}>
  <path
   strokeLinecap="round"
   strokeLinejoin="round"
   d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  />
 </svg>
);
export const Sidebar = ({ active }: { active: number | undefined }) => {
 const programContext = UseProgramContext()!;

 return (
  <div className="flex z-20  flex-col">
   <div className="flex w-52 z-20   h-full bg-slate-800 flex-col left-0 fixed">
    <div className="h-20 w-52  mb-2 border-gray-700  z-10 top-0 bg-slate-800 inline-flex items-center"></div>
    <Button icon={homeIcon} index={0} active={active} href="/" text="Home" />
    <Button icon={profileIcon} index={1} active={active} href="/leaderboard" text="Leaderboard" />
    <Button icon={profileIcon} index={2} active={active} href="/captcha" text="Captcha" />
    {true && (
     <div className=" mb-8 ml-6 mt-auto">
      <div className="flex cursor-pointer items-center">
       <Link href="/settings">
        <div className="cursor-pointer items-center">
         <div className="pb- pr-2">
          <img
           className="w-10 h-10  rounded-full"
           src={`${IMAGE_SERVER_URL}/${
            programContext.state.user.imageUrl ? programContext.state.user.imageUrl : "defaultt.png"
           }`}
          />
         </div>
         <span className=" text-2xl hover:text-slate-400 ">
          {programContext.state.user.username}
         </span>
        </div>
       </Link>
       <svg
        onClick={() => {
         programContext!.changeState({ action: "logout", token: "" });
         setCookie("token", "");
        }}
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 ml-2 h-6 hover:fill-slate-400 fill-slate-300"
        viewBox="0 0 512 512">
        <path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z" />
       </svg>
      </div>
     </div>
    )}
   </div>
  </div>
 );
};

export const Button = ({ href, text, index, active, icon }: any) => {
 const [clss, setClss] = useState("bg-transparent dark:hover:bg-slate-700");
 useEffect(() => {
  let show = index === active;
  if (show) {
   setClss(" bg-sky-600 hover:bg-sky-500 ");
  } else {
   setClss(" dark:bg-transparent dark:hover:bg-slate-700 ");
  }
 }, [active]);

 return (
  <Link href={href}>
   <button
    className={
     clss +
     " px-5 mb-2 mx-1 rounded-md py-3 inline-flex items-center  bg-transparent w-48 flex-row   transition duration-300  text-white  tracking-wider font-semibold text-sm sm:text-xl whitespace-nowrap"
    }>
    <div className="mr-3">{icon}</div>
    {text}
   </button>
  </Link>
 );
};
