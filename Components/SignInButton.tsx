import {useRef, useState} from "react";
import {UserAuth} from "@/context/AuthContext";
import { ShoppingCartIcon, ArrowSmLeftIcon, UserCircleIcon,  } from '@heroicons/react/solid';
import Link from "next/link";

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

  if (user) {
    const userImage = user.photoURL || "";
    const userName = user.displayName || "";
    const userEmail = user.email || "";

    return (
      <>
        <div className="relative w-fit">
          <button
            id="dropdownInformationButton"
            onClick={toggleDropdown}
            onBlur={closeDropdown} 
            className={`font-medium rounded-lg w-fit text-sm px-2 py-2.5 text-center flex items-center`}
          >
            <div className="grid grid-cols-5 w-fit">
              <div className="col-span-2 flex justify-center items-center">
                <img
                  className="rounded-full h-12"
                  alt="Foto Profil"
                  src={userImage}
                />
              </div>
              <div className="col-span-2 flex justify-center items-center text-md font-medium">
                <p>{userName}</p>
              </div>
              <div className="col-span-1 flex justify-center items-center h-full">
                <svg className={`w-2.5 h-2.5 ms-3 transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </div>
            </div>
          </button>

          {isOpen && (
            <div
              ref={dropdownRef} 
              id="dropdownInformation"
              className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{userName}</div>
                <div className="font-medium truncate">{userEmail}</div>
              </div>
              <ul
                className="text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownInformationButton"
              >
                <li>
                  <Link
                    href="/riwayat-pembelian"
                  >
                    <div className="flex gap-2 px-2 py-3 border-b border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      <ShoppingCartIcon height={24} />
                      <p>Riwayat Pembelian</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/info-profil"
                  >
                    <div className="flex gap-2 px-2 py-3 border-b border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      <UserCircleIcon height={24} />
                      <p>Informasi Akun</p>
                    </div>
                  </Link>
                </li>
              </ul>
              <div className="w-full">
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="flex w-full gap-2 text-left px-2 py-3 text-sm rounded-b-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <ArrowSmLeftIcon height={24}/>
                  <p>Sign out</p>
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
