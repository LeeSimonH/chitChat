import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Message(props) {
  const { currentUser, message, sentBy, timeStamp } = props;
  
  return (
    <Box id={currentUser === sentBy ? "you" : "other"} className="message" >
      <Typography className="message-content" component="span" variant="string" 
      sx={{
        width: "auto",
        height: "auto",
        minHeight: "25px",
        minWidth: "30%",
        maxWidth:"70%",
        backgroundColor: "#43a047",
        borderRadius: "5px",
        color: "white",
        // display: "flex",
        alignItems: "center",
        padding: ".5em",
        overflowWrap: "break-word",
        wordBreak: "break-word"
      }}>
        {message}
      </Typography>
      <Box className="message-meta" sx={{display: "flex", gap: ".5em"}} >
        <Typography component="span" variant="caption" sx={{fontWeight:"bold"}} >
          {sentBy}
        </Typography>
        <Typography component="span" variant="caption" sx={{fontWeight:"lighter"}}>
          {timeStamp}
        </Typography>
      </Box>
    </Box>
  )
}