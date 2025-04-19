import React from "react";
import UserProfile from "./UserProfile";
import SearchUsers from "./SearchUsers";
import Notification from "./Notification";
import { useSelector } from "react-redux";
import SmallScreenAllChats from "./Home/AllChats/SmallScreenAllChats";
import logo from "../assets/Logo Collabify.png";

export default function Navbar() {
  const sign_in_success = useSelector((state) => state.authReducer.sign_in_success);

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-green-400 shadow-md sticky top-0 z-0">
      {/* display only if user signin */}
      {sign_in_success && (
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 px-10">
          <section className="flex flex-wrap gap-2 items-center">
            {/* Hide SmallScreenAllChats on large screens */}
            <div className="lg:hidden">
              <SmallScreenAllChats />
            </div>
            <SearchUsers />
          </section>
          <section className="hidden lg:flex flex-wrap items-center">
            <a href="#" className="flex items-center mb-4 text-2xl font-semibold text-white">
              <img className="w-8 h-9 mr-0.5" src={logo} alt="logo" />
              Colabify
            </a>
          </section>
          <section className="flex flex-wrap gap-4 items-center">
            <Notification />
            <UserProfile />
          </section>
        </div>
      )}
    </nav>
  );
}
