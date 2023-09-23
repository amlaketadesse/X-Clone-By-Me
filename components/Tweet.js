import React, { useEffect, useState } from "react";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  TrashIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { HeartIcon as FilledH } from "@heroicons/react/solid";
import Moment from "react-moment";
import {
  openCommentModal,
  openLoginModal,
  setCommentTweet,
} from "@/redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

export default function Tweet({ data, id }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user);

  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  async function deleteTweet(e) {
    e.stopPropagation();
    await deleteDoc(doc(db, "posts", id));
  }

  async function likeComment(e) {
    e.stopPropagation();

    if (!user.username) {
      dispatch(openLoginModal());
      return;
    }

    if (likes.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayUnion(user.uid),
      });
    }
  }

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(doc(db, "posts", id), (doc) => {
      setLikes(doc.data()?.likes);
      setComments(doc.data()?.comments);
    });
    return unsubscribe;
  }, []);

  return (
    <div
      onClick={() => router.push("/" + id)}
      className="border-b border-gray-700 cursor-pointer hover:bg-[#131313c9] duration-200"
    >
      <TweetHeader
        username={data?.username}
        name={data?.name}
        timestamp={data?.timestamp?.toDate()}
        text={data?.tweet}
        photoUrl={data?.photoUrl}
        image={data?.image}
      />
      <div className="p-3 ml-16 text-gray-500 flex space-x-14">
        <div
          className="flex space-x-2 items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            if (!user.username) {
              dispatch(openLoginModal());
              return;
            }
            dispatch(
              setCommentTweet({
                id: id,
                tweet: data?.tweet,
                photoUrl: data?.photoUrl,
                name: data?.name,
                username: data?.username,
              })
            );
            dispatch(openCommentModal());
          }}
        >
          <div className="hover:text-green-400 duration 300 flex items-center justify-center space-x-2">
            <ChatIcon className="w-5 cursor-pointer duration-300"></ChatIcon>
            {comments?.length > 0 && (
              <span className="text-sm duration-300">{comments.length}</span>
            )}
          </div>
        </div>

        <div
          className="flex space-x-2 items-center justify-center"
          onClick={likeComment}
        >
          {likes.includes(user.uid) ? (
            <FilledH className="w-5 h-5 text-pink-500" />
          ) : (
            <HeartIcon className="w-5 cursor-pointer hover:text-pink-500 duration-300" />
          )}
          {likes.length > 0 && <span className="text-sm">{likes.length}</span>}
        </div>
        {user.uid === data?.uid && (
          <div
            onClick={deleteTweet}
            className="hover:text-red-600 duration-300"
          >
            <TrashIcon className="w-5 h-5" />
          </div>
        )}
        <ChartBarIcon className="w-5 cursor-not-allowed" />
        <UploadIcon className="w-5 cursor-not-allowed" />
      </div>
    </div>
  );
}

export function TweetHeader({
  username,
  name,
  timestamp,
  text,
  photoUrl,
  image,
}) {
  return (
    <div className="flex space-x-3 p-3 ">
      <img
        src={photoUrl || "/assets/twitter-logo.png"}
        className="w-11 h-11 rounded-full object-cover"
      />
      <div>
        <div className="flex items-center space-x-2 text-gray-500 mb-1">
          <h1 className="text-white font-bold">{name}</h1>
          <span className="">@{username}</span>
          <span className="w-1 bg-gray-500 h-1 rounded-full"></span>
          <Moment fromNow>{timestamp}</Moment>
        </div>
        <span>{text}</span>

        {image && (
          <img
            className="object-cover rounded-md mt-3 max-h-80 border border-gray-700"
            src={image}
          />
        )}
      </div>
    </div>
  );
}
