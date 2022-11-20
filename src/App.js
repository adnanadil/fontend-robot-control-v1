import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

// const socket = io.connect("http://localhost:3001");
// const socket = io.connect("192.168.100.6:3001");
const socket = io.connect("server-test-socketio.herokuapp.com");
// const socket = io.connect("server-test-socketio.herokuapp.com", {'connect timeout': 1});

function App() {
  const [direction, setdirection] = useState("");

  // const handleEvent = (event) => {
  //   if (event.type === "mousedown") {
  //     socket.emit("send_message", { message, room })
  //   } else {
  //     socket.emit("send_message", { message, room })
  //     }
  //  }

  const sendMessage_1 = () => {
    socket.emit("send_message", { message: "I", room: "16" });
    console.log("we are here");
  };

  const sendMessage_2 = () => {
    socket.emit("send_message", { message: "O", room: "16" });
  };

  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      {/* <button onMouseDown={ handleEvent } onMouseUp={ handleEvent}> Press to keep LED ON!!!</button> */}
      <h1> Message:</h1>
      <div>{`Message: ${messageReceived}`}</div>
      <button onClick={sendMessage_1} style={{"height" : "100px", "width" : "50%"}}> LED ON</button>
      <button onClick={sendMessage_2} style={{"height" : "100px", "width" : "50%"}}> LED OFF</button>
    </div>
  );
}

export default App;
