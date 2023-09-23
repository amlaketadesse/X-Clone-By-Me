import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeSignupModal, openSignupModal } from "@/redux/modalSlice";
import Image from "next/image";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

export default function SignupModal() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  async function handleSignIn() {
    await signInWithEmailAndPassword(auth, email, password);
  }

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `./assets/profilePictures/pfp${Math.ceil(
        Math.random() * 6
      )}.png`,
    });

    router.reload();
  }

  async function handleGuestSignIn() {
    await signInWithEmailAndPassword(auth, "test123@gmail.com", "123456");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      console.log(currentUser);

      // redux slice to store users information to use all over the site

      dispatch(
        setUser({
          username: currentUser.email.split("@")[0],
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <button
        className="bg-white  text-black w-[120px] rounded-full h-[40px] font-bold hover:bg-[#d3d0d0] ease-in-out duration-300"
        onClick={() => dispatch(openSignupModal())}
      >
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        className="flex justify-center items-center"
      >
        <div className="flex justify-center w-[90%]  bg-black text-white md:w-[560px]  border border-gray-700 rounded-2xl">
          <div className="w-[90%] flex flex-col p-6 px-12">
            <Image
              alt="logo"
              src={"/assets/twitter-logo.png"}
              width={34}
              height={34}
              className="flex justify-center items-center mx-auto my-4"
            ></Image>
            <button
              className="bg-white text-black w-full font-bold text-lg p-2 mb-1 rounded-full hover:bg-[#d3d0d0] ease-in-out duration-300"
              onClick={handleGuestSignIn}
            >
              Recruiters 
              Sign In as Guest
            </button>
            <h1 className="text-center my-2 font-bold text-lg">or</h1>
            <h1 className="text-center font-bold text-4xl">
              Create your account
            </h1>

            <input
              type={"text"}
              placeholder="Full Name..."
              className="h-10 mt-6 rounded-lg bg-transparent border border-gray-700 p-6"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type={"email"}
              placeholder="Valid Email..."
              className="h-10 mt-6 rounded-lg bg-transparent border border-gray-700 p-6"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type={"password"}
              placeholder="6 Character Password..."
              className="h-10 mt-6 rounded-lg bg-transparent border border-gray-700 p-6"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-white text-black w-full font-bold text-lg p-2 mt-8 rounded-full hover:bg-[#d3d0d0] ease-in-out duration-300"
              onClick={handleSignUp}
            >
              Create account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
