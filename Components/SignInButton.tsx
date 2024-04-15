import React, { useRef, useState } from "react";
import {UserAuth} from "@/context/AuthContext";

const SignInButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, googleSignIn, logOut } = UserAuth()

  const handleSignIn = async () => {
    try {
      googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogOut = async () => {
    try {
      logOut()
    } catch (error) {
      console.log(error)
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: any) => {

    if (
      dropdownRef.current &&
        // @ts-ignore
      !dropdownRef.current.contains(event.relatedTarget)
    ) {
      setIsOpen(false);
    }
  };

  // const { data: session } = useSession();

  if (user) {
    const userImage = user.photoURL || "";
    const userName = user.displayName || "";
    const userEmail = user.email || "";

    return (
      <>
        <div className="relative inline-block text-left">
          <button
            id="dropdownInformationButton"
            onClick={toggleDropdown}
            onBlur={closeDropdown} 
            className="gap-2 focus:ring-4 focus:outline-none focus:ring-[#89060b] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            <img
              className="rounded-full h-12"
              alt="Foto Profil"
              src={userImage}
            ></img>
            <div className="flex justify-center items-center text-md font-medium">
              <p>{userName}</p>
            </div>
            <div>
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </div>
          </button>

          {isOpen && (
            <div
              ref={dropdownRef} 
              id="dropdownInformation"
              className="absolute right-0 w-fit mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="w-fit px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{userName}</div>
                <div className="font-medium truncate">{userEmail}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownInformationButton"
              >
                <li>
                  <a
                    href="/RiwayatPembelian"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Riwayat Pembelian
                  </a>
                </li>
              </ul>
              <div className="py-2 w-full">
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <button type="button" onClick={handleSignIn}>
      <div className="lg:flexBetween cursor-pointer">
        <div
          className={`py-4 px-8 flexCenter gap-3 rounded-full tracking-wider border bg-[#f14310]`}
        >
          <p className={`bold-14 whitespace-nowrap text-white`}>Login</p>
        </div>
      </div>
    </button>
  );
};

export default SignInButton;
