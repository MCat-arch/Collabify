import React, { useEffect, useRef, useState } from "react";
import AllChats from "../components/Home/AllChats";
import ChatBox from "../components/Home/ChatBox";
import { io } from "socket.io-client";
import * as types from "../redux/appReducer/actionType";
import { useDispatch } from "react-redux";
const ENDPOINT = "https://chatc.onrender.com"; // Pastikan URL ini benar untuk koneksi WebSocket

const Home = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const socketRef = useRef();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("chat-app-login-user-data"));

    if (!userData) {
      console.warn("⚠️ Tidak ada data user di localStorage.");
      setIsLoading(false);
      return;
    }

    // Inisialisasi socket dengan memaksa websocket transport
    socketRef.current = io(ENDPOINT, {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected.");
      setIsLoading(false);
      setSocketConnected(true);
    });

    // Tangani error jika WebSocket gagal terhubung
    socketRef.current.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
      setIsLoading(false);
    });

    // Emit setup user ke server saat socket terhubung
    socketRef.current.emit("setup", userData);

    // Simpan socket di Redux
    dispatch({ type: types.WEB_SOCKET_CONNECTED, payload: socketRef.current });

    // Cleanup saat komponen unmount untuk menghindari memory leak
    return () => {
      socketRef.current.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="flex flex-wrap justify-between h-screen max-h-full">
      <div className="w-full h-full lg:w-1/4 bg-primary-350 hidden lg:block">{isLoading ? <p className="text-white p-4">Loading chats...</p> : <AllChats />}</div>
      <div className="w-full h-full lg:w-3/4 bg-primary-350 p-4">{isLoading ? <p className="text-white p-4">Loading chatbox...</p> : <ChatBox />}</div>
    </div>
  );
};

export default Home;
