/** @format */

import Link from "next/link";
import { useRef } from "react";

import { PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
interface Props {
 name: string;
 date: string;
 content: string;
 authorPubkeyString: string;
}
export const Comment = ({ name, date, content, authorPubkeyString }: Props) => {
 return (
  <div>
   <div className="h-1 border-b-2 my-2 border-gray-700"></div>
   <div className="flex break-all flex-col">
    <div className=" mt-1 mx-5 flex justify-start items-center flex-row">
     <div className="pb- pr-2">
      <img
       className="w-10 h-10  rounded-full"
       src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
       alt="Rounded avatar"
      />
     </div>
     <div className="flex break-all flex-col">
      <div>
       <span className=" text-xl ">{name}</span> <span>&nbsp;•&nbsp;</span>
       <span className="text-1xl"> {date}</span>
      </div>
      <Link href={`/users?pubkey=${authorPubkeyString}`}>
       <p
        style={{ marginTop: -7 }}
        className=" text-sm text-blue-500 hover:underline truncate  w-44">
        {authorPubkeyString}
       </p>
      </Link>
     </div>
    </div>
    <span className="ml-5 ">{content}</span>
   </div>
  </div>
 );
};
interface NewCommentProps {
 postPubkey: PublicKey;
}

import { UseProgramContext } from "../../contexts/programContextProvider";
import { useNotifier } from "react-headless-notifier";

export const NewComment = ({ postPubkey }: NewCommentProps) => {
 let commentInputRef: any = useRef();

 const { notify } = useNotifier();
 let programContext = UseProgramContext()!;
 
 async function newComment0(e: { preventDefault: () => void }) {
  e.preventDefault();
 
 }

 return (
  <form onSubmit={newComment0}>
   <div className="flex my-4 flex-row">
    <input
     required
     ref={commentInputRef}
     type="text"
     placeholder="Comment"
     className="input  grow "
    />
    <button className="btn w-32 ml-5  btn-square">Commment</button>
   </div>
  </form>
 );
};
