"use client"

import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io("https://feed-application-backend.onrender.com/", {
            transports: ["websocket"],
        });
    }
    return socket;
};