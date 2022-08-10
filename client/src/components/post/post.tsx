/** @format */

import Link from "next/link";
import { useState } from "react";
import { BookmarkButton, LikeButton, TipButton } from "./buttons";
import { ShareButton, CommentButton } from "./buttons";
import { Comment, NewComment } from "./comment";
import * as anchor from "@project-serum/anchor";
import moment from "moment";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { UseProgramContext } from "../../contexts/programContextProvider";
import { useEffect } from "react";
interface Props {
 likes: anchor.web3.PublicKey[];
 content: string;
 username: string;
 date: string;
 publickeyString: string;
 block: string;
 tip: number;
 postPubkey: anchor.web3.PublicKey;
 commentCount: number;
}

export function Post({
 likes,
 content,
 username,
 date,
 publickeyString,
 block,
 tip,
 postPubkey,
 commentCount,
}: Props) {
 //  @ts-ignore
 const { state, postProgram, commentProgram, getWallet, userProgram, changeState } =
  UseProgramContext();
 const [commentsVisible, setCommentsVisible] = useState(false);
 const [postComments, setPostComments]: any = useState("");
 const [showTipModal, setShowTipModal] = useState(false);
 function displayComments() {
  setCommentsVisible(!commentsVisible);
  setPostComments(
   <>
    <Comment
     key={"comment.publicKey"}
     content={"comment.content"}
     //  postPubKey={"comment.postPublicKey"}
     //  pubKey={"comment.key"}
     authorPubkeyString={"comment.authorDisplay"}
     name={"comment.username"}
     date={"comment.createdAgo"}
    />
   </>
  );
 }
 const [postedAt, setPostedAt] = useState(
  moment(new Date(parseInt(date) * 1000).toUTCString()).fromNow()
 );

 useEffect(() => {
  const interval = setInterval(() => {
   setPostedAt(moment(new Date(parseInt(date) * 1000).toUTCString()).fromNow());
  }, 1000);
  return () => {
   clearInterval(interval);
  };
 }, [getWallet]);

 return (
  <div className="pl- break-all w-full border-gray-700 grow  ">
   <div className="flex  justify-start   border-b-2 border-gray-700  flex-col">
    {/* margin y nabe yakam dana ^^^^^^^^^^^^^ */}
    <div className="flex justify-start items-center flex-row">
     <div className="flex flex-col">
      <div className="flex justify-start   items-center flex-row">
       <Link href={`/users?pubkey=${publickeyString}`}>
        <div className="flex cursor-pointer items-center">
         <div className="pb- pr-2">
          <img
           className="w-10 h-10  rounded-full"
           src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
           alt="Rounded avatar"
          />
         </div>
         <span className=" text-2xl ">{username}</span>
        </div>
       </Link>
       <span>&nbsp;•&nbsp;</span>
       <span className="text-base">{postedAt}</span>
       <span className="text-base ml-2 cursor-pointer hover:text-sky-700  text-sky-600">
        <span className=" tracking-widest">#</span>
        {block}
       </span>
      </div>
      <Link href={`/users?pubkey=${publickeyString}`}>
       <p
        style={{ marginTop: -9, marginLeft: 49 }}
        className=" cursor-pointer   text-sm underline text-blue-500 hover:text-blue-600 visited:text-purple-600 truncate w-44">
        {publickeyString}
       </p>
      </Link>
     </div>
    </div>
    <p className=" w-fit p- break-words">{content}</p>
    <div className="flex   justify-around items-stretch flex-row">
     <LikeButton
      likes={likes}
      postPubkey={postPubkey}
      unlikePost={"unlikePost"}
      likePost={"likePost"}
     />
     <CommentButton commentCount={commentCount} setCommentsVisible={() => displayComments()} />
     {/* <div className="tooltip" data-tip="Coming Soon"> */}
     {/* <ShareButton /> */}
     {/* </div> */}
     <TipButton setShowTipModal={setShowTipModal} />
    </div>

    {tip > 0 && (
     <div className="flex  mb-2  items-center">
      <div className="tooltip flex items-center" data-tip="Sol Received From tips">
       <img className=" mx-1 h-7 w-7 rounded-full  " src="/icons/sol-icon.png" />{" "}
       <span className="">{tip / LAMPORTS_PER_SOL}</span>
      </div>
     </div>
    )}
    {commentsVisible && (
     <>
      {postComments}
      {!postComments && <div className="divider"></div>}
      <NewComment postPubkey={postPubkey} />
     </>
    )}
   </div>
  </div>
 );
}
