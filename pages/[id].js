import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import Tweet from "@/components/Tweet";
import { db } from "@/firebase";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import Moment from "react-moment";
import { useSelector } from "react-redux";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const formattedData = {
    username: data?.username,
    name: data?.name,
    photoUrl: data?.photoUrl,
    text: data?.tweet,
    comments: data?.comments || null,
    timestamp: JSON.stringify(data?.timestamp.toDate()),
    image: data?.image || null,
  };

  return {
    props: {
      tweetData: formattedData,
    },
  };
}

export default function CommentsPage({ tweetData }) {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <div className="flex bg-black min-h-screen text-[#e7e9ea] first-letter max-w-[1400px] mx-auto">
        <Sidebar />
        <div className="sm:ml-16 xl:ml-80 max-w-2xl flex-grow border-gray-700 border-x">
          <div className="flex space-x-3 px-3 py-2 text-lg sm:text-xl font-bold border-b border-gray-700 sticky top-0 z-100">
            <Link href={"/"}>
              <ArrowLeftIcon className="w-7 cursor-pointer" />
            </Link>
            <h1>Posts</h1>
          </div>

          <div className="border-b border-gray-700">
            <div className="flex space-x-3 p-3 ">
              <img
                src={tweetData.photoUrl}
                className="w-11 h-11 rounded-full object-cover"
              />

              <div>
                <div className="flex items-center space-x-2 text-gray-500 mb-1">
                  <h1 className="text-white font-bold">{tweetData.name}</h1>
                  <span className="">@{tweetData.username}</span>
                  <span className="w-1 bg-gray-500 h-1 rounded-full"></span>
                  <Moment fromNow>{JSON.parse(tweetData.timestamp)}</Moment>
                </div>
                <span>{tweetData.text}</span>
                {tweetData.image && (
                  <img
                    className="object-cover rounded-md mt-3 max-h-80 border border-gray-700"
                    src={tweetData.image}
                  />
                )}
              </div>
            </div>
          </div>

          {/* <div className="flex items-center justify-between border-b border-gray-700 p-2">
            <div className="flex justify-center items-center p-1 space-x-2">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={user.photoUrl}
              />
              <h1 className="text-gray-500">Post your reply...</h1>
            </div>

            <button
              disabled={true}
              className="bg-[#1d9bf0] active:bg-[#1d9bf0] duration-100 rounded-full px-4 py-1 mr-1 text-sm font-bold
            disabled:opacity-50"
            >
              Post
            </button>
          </div> */}

          {tweetData.comments?.map((comment) => (
            <div className="border-b border-gray-700">
              <div className="flex space-x-3 p-3 ">
                <img
                  src={comment.photoUrl}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2 text-gray-500 mb-1">
                    <h1 className="text-white font-bold">{comment.name}</h1>
                    <span className="">@{comment.username}</span>
                  </div>
                  <span>{comment.comment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Trending />
      </div>
    </div>
  );
}
