import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import "./../style.scss";
import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from "socket.io-client";

import Chat from "./Chat";

// connecting frontend to backend
const SERVER_PORT = 3000;
const socket = io.connect(
  `http://localhost:${SERVER_PORT}/`,
  { transports: ['websocket', 'polling'] },
  { timeout: 2000 }
);


const Home = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="Home">
      {!showChat ? (
        <Container className="joinChatContainer">
          <Box 
            component="form" 
            onSubmit={joinRoom} 
            noValidate 
            sx={{ 
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Join A Chat
            </Typography>
            <TextField id="nickname"
              margin="normal"
              required
              label="nickname"
              name="nickname"
              placeholder="nickname"
              type="text"
              autoComplete="off"
              autoFocus
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <TextField id="room-id"
              margin="normal"
              required
              label="room ID"
              name="room"
              placeholder="room ID"
              type="text"
              autoComplete="off"
              autoFocus
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Join Room
            </Button>
          </Box>
        </Container>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Home;