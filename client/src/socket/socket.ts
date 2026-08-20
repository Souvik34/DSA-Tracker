/* eslint-disable prettier/prettier */
import { io } from "socket.io-client";


   export const socket = io(
    "http://15.252.139.152:5000",
    {
        autoConnect: false,
        transports: ["websocket"],
    }
);