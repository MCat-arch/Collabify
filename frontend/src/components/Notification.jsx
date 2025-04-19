import React, { useState, useEffect, useRef } from "react";
import { BiSolidBell } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function Notification() {
  const notficationsMessages = useSelector((state) => state.appReducer.notficationsMessages);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const handleProfileClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      <button className="bg-blue-350 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none" onClick={handleProfileClick}>
        <span className="relative inline-block">
          <BiSolidBell className="w-6 h-6" />
          {notficationsMessages.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {notficationsMessages.length}
            </span>
          )}
        </span>
      </button>
      {isPopupOpen && (
        <div ref={popupRef} className="absolute right-0 mt-2 py-2 w-48 rounded-md shadow-xl max-h-[50vh] p-2 overflow-y-auto bg-gradient-to-r from-purple-600 via-fuchsia-500 to-green-400/80 text-white">
          {notficationsMessages.length === 0 && <p className="text-sm text-white text-center">No Notifications.</p>}

          {notficationsMessages?.map((item) => (
            <div key={item._id} className="bg-white/20 backdrop-blur-md mb-3 m-2 border border-white/30 rounded-lg p-2">
              <span className="text-sm font-bold text-white">{item.sender.name}</span>
              <span className="text-xs text-white/70"> - {new Date(item.createdAt).toLocaleTimeString()}</span>
              <h4 className="text-xs font-medium text-white truncate">{item.message}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
