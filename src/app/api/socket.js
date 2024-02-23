import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket_io",
    addTrailingSlash: false,
  });

  io.on("connection", (socket) => {
    console.log("New connection established");
    socket.emit("receive-message", "hi");
  });

  console.log("Setting up socket");
  res.end();
}
