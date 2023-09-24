import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSignupModal,
  openSignupModal,
  openLoginModal,
  closeLoginModal,
} from "@/redux/modalSlice";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default function LoginModal() {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();
  console.log(isOpen);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function handleGuestSignIn() {
    await signInWithEmailAndPassword(auth, "test123@gmail.com", "123456");
  }

  return (
    <>
      <button
        className="bg-transparent border border-white text-white w-[120px] rounded-full h-[40px] font-bold hover:bg-[#73c7ff4f] ease-in-out duration-300"
        onClick={() => dispatch(openLoginModal())}
      >
        Log In
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center"
      >
        <div className="flex justify-center w-[90%]  bg-black text-white md:w-[560px] border border-gray-700 rounded-xl">
          <div className="w-[90%] flex flex-col py-12 px-6 pt-4">
            <Image
              src={"/assets/twitter-logo.png"}
              width={34}
              height={34}
              className="flex justify-center items-center mx-auto my-4"
            ></Image>

            <h1 className="text-center mt-4 font-bold text-4xl">
              Sign in to your account
            </h1>

            <input
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="h-10 mt-6 rounded-md bg-transparent border border-gray-700 p-6"
            />
            <input
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-10 mt-6 rounded-md bg-transparent border border-gray-700 p-6"
            />
            <button
              className="bg-white text-black w-full font-bold text-md p-2 mt-8 rounded-full hover:bg-[#d3d0d0] ease-in-out duration-300"
              onClick={handleSignIn}
            >
              Log in
            </button>
            <h1 className="text-center my-4 font-bold text-lg">or</h1>
            <button
              className="bg-transparent text-white w-full font-bold text-md p-2 rounded-full border-[1px] border-white hover:bg-[#d3d0d0] ease-in-out duration-300"
              onClick={handleGuestSignIn}
            >
              Recruiters - Sign in as guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
