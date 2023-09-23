import React from "react";
import {
  HomeIcon,
  HashtagIcon,
  ClipboardListIcon,
  InboxIcon,
  BookmarkIcon,
  BellIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { signOutUser } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@/firebase";
import { closeLoginModal, closeSignupModal } from "@/redux/modalSlice";
import Link from "next/link";

export default function Sidebar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
    dispatch(closeSignupModal());
    dispatch(closeLoginModal());
  }

  return (
    <div className="h-full hidden md:flex flex-col fixed xl:ml-24">
      <nav className="h-full relative xl:space-y-1.5">
        <Link href={"/"}>
          <div className="flex justify-center py-3 xl:p-3 xl:justify-start">
            <Image
              alt="pfp"
              src={"/assets/twitter-logo.png"}
              width={34}
              height={34}
            ></Image>
          </div>
          <SidebarLink Icon={HomeIcon} text={"Home"} />
          <SidebarLink Icon={HashtagIcon} text={"Explore"} />
        </Link>
        <SidebarLink Icon={BellIcon} text={"Notifications"} />
        <SidebarLink Icon={InboxIcon} text={"Messages"} />
        <SidebarLink Icon={BookmarkIcon} text={"Bookmarks"} />
        <SidebarLink Icon={UserIcon} text={"Profile"} />
        <SidebarLink Icon={DotsCircleHorizontalIcon} text={"More"} />
        <button className="hidden xl:inline bg-[#1d9bf0] active:bg-[#1d9bf0]  hover:bg-[#1d9cf0bb] cursor-not-allowed duration-100 rounded-full h-[52px] w-[200px] text-lg font-bold mt-2">
          Post
        </button>
        <div
          onClick={handleSignOut}
          className="hover:bg-white hover:bg-opacity-10 bottom-2 rounded-full cursor-pointer duration-200
        absolute flex justify-center items-center space-x-3
        xl:p-3
        "
        >
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={user.photoUrl || "assets/pfp.png"}
          />
          <div className="hidden xl:inline">
            <h1 className="font-bold whitespace-nowrap">{user.username}</h1>
            <h1 className="text-gray-500">@{user.username}</h1>
          </div>
          <DotsHorizontalIcon className="h-5 hidden xl:inline" />
        </div>
      </nav>
    </div>
  );
}

function SidebarLink({ text, Icon }) {
  return (
    <li className="hoverAnimation flex mb-3 items-center text-xl space-x-3 justify-center xl:justify-start duration-200">
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </li>
  );
}
