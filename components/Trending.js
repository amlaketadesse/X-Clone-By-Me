import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import React from "react";

export default function Trending() {
  return (
    <div className="hidden lg:flex flex-col p-10 pt-0 mt-4">
      <div className="flex space-x-3 bg-[#16181c]  w-[350px] h-[44px] p-3 rounded-3xl">
        <SearchIcon className="w-6 text-gray-600" />
        <input
          placeholder="Search"
          className="bg-transparent
        focus:outline-none placeholder:text-gray-600"
        />
      </div>

      <div className="w-[350px] bg-[#16181c]  rounded-3xl mt-3 p-5">
        <h1 className="font-bold text-xl ">Subscribe to Premium</h1>
        <p className="font-bold text-[15px] py-3">
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <button className="bg-[#1d9bf0] active:bg-[#1d9bf0]  hover:bg-[#1d9cf0bb] duration-100 text-l px-5 py-2 rounded-3xl font-bold cursor-not-allowed">
          Subscribe
        </button>
      </div>

      <div className="w-[350px] bg-[#16181c]  rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">What's happening</h1>
        <div className="p-3 relative cursor-not-allowed  hover:bg-[#373a41b0] duration-200">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Anime</p>
          <h1 className="text-[15px] font-bold">Sword Art Online</h1>
          <p className="text-xs text-gray-500">340k Posts</p>
        </div>
        <div className="p-3 relative cursor-not-allowed hover:bg-[#373a41b0] duration-200">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in California</p>
          <h1 className="text-[15px] font-bold">Computer Science</h1>
          <p className="text-xs text-gray-500">3,170 Posts</p>
        </div>
        <div className="p-3 relative cursor-not-allowed hover:bg-[#373a41b0] duration-200">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Music</p>
          <h1 className="text-[15px] font-bold">Drake</h1>
          <p className="text-xs text-gray-500">220k Tweets</p>
        </div>
        <div className="p-3 relative cursor-not-allowed hover:bg-[#373a41b0] duration-200">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in United States</p>
          <h1 className="text-[15px] font-bold">#SpiderVerse</h1>
          <p className="text-xs text-gray-500">125k Posts</p>
        </div>
        <div className="p-3 relative cursor-not-allowed hover:bg-[#373a41b0] duration-200 hover:rounded-3xl hover:rounded-t-none">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in My Mind</p>
          <h1 className="text-[15px] font-bold">Frontend Development</h1>
          <p className="text-xs text-gray-500">1,240 Tweets</p>
        </div>
      </div>
      <div className="w-[350px] bg-[#16181c] rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">Who to Follow</h1>

        <div className="flex justify-between p-3 cursor-not-allowed hover:bg-[#373a41b0] duration-200">
          <div className="flex space-x-3">
            <img
              className="w-11 h-11 rounded-full object-cover"
              src="/assets/miketyson.jpg"
            ></img>
            <div>
              <div className="flex space-x-1 ">
                <h1 className="font-bold">Mike Tyson</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-500" />
              </div>
              <h1 className="text-[12px] text-gray-500 mt-1">
                @MikeTysonOfficial
              </h1>
            </div>
          </div>
          <button className="bg-white text-black text-sm w-20 h-8 rounded-3xl font-bold cursor-not-allowed">
            Follow
          </button>
        </div>
        <div className="flex justify-between p-3 cursor-not-allowed hover:bg-[#373a41b0] duration-200">
          <div className="flex space-x-3">
            <img
              className="w-11 h-11 rounded-full object-cover"
              src="/assets/jcolepfp.jpg"
            ></img>
            <div>
              <div className="flex space-x-1 ">
                <h1 className="font-bold">J.Cole</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-500" />
              </div>
              <h1 className="text-[12px] text-gray-500 mt-1">@J.Cole</h1>
            </div>
          </div>
          <button className="bg-white text-black text-sm w-20 h-8 rounded-3xl font-bold cursor-not-allowed">
            Follow
          </button>
        </div>
        <div className="flex justify-between p-3 cursor-not-allowed hover:bg-[#373a41b0] duration-200 rounded-3xl hover:rounded-t-none">
          <div className="flex space-x-3 ">
            <img
              className="w-11 h-11 rounded-full object-cover"
              src="/assets/boku.jpg"
            ></img>
            <div>
              <div className="flex space-x-1 ">
                <h1 className="font-bold">Boku</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-500" />
              </div>
              <h1 className="text-[12px] text-gray-500 mt-1">@BokuAcademia</h1>
            </div>
          </div>
          <button className="bg-white text-black text-sm w-20 h-8 rounded-3xl font-bold cursor-not-allowed ">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
