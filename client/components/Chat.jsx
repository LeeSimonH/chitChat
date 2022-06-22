import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import React, { useEffect, useState } from "react";
import Message from './Message';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (currentMessage !== "") {
      const messageData = {
        user: username,
        room: room,
        sentBy: username,
        message: currentMessage,
        timeStamp: new Date(Date.now()).toLocaleTimeString()
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <Container className="chat-window"
      sx={{
        padding:"3rem",
        minWidth:"400px",
        width: "90vw",
      }}
    >
      <Typography component="h1" variant="h5">
        Chat Room {room}
      </Typography>
      <Container className="chat-body">
        <Container className="message-container" sx={{padding: "1em 0"}} >
          {messageList.map((messageContent) => {
            const { message, sentBy, timeStamp } = messageContent;
            return (
              <Message 
                currentUser={username}
                message={message}
                sentBy={sentBy}
                timeStamp={timeStamp}
              />
            );
          })}
        </Container>
      </Container>
      <Container className="chat-footer">
        <Box 
          component="form" 
          onSubmit={e => sendMessage(e)} 
          noValidate 
          sx={{ 
            display: "flex",
            alignItems: "center",
            gap: "1em"
          }}
        >
          <TextField value={currentMessage}
            sx={{
              height: "100%",
              alignSelf: "stretch",
            }}
            margin="normal"
            required
            name="message"
            placeholder="type message..."
            type="text"
            autoComplete="off"
            fullWidth
            autoFocus
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
          />
          <Button type="submit" variant="contained" >
            Send
          </Button>
        </Box>
      </Container>
    </Container>
  );
}

export default Chat;