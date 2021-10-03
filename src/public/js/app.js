// "hello";
// Front-end 를 수정할 때 마다 서버를 재시작하는게 싫고, views나 서버를 수정할 때만 nodemon이 재시작되게하자.
// 그렇게 하기 위해서는 nodemon.json으로 가서 폴더하나를 무시하게 해줘야한다. "ignore": ["src/public/*"] 추가
// alert("hi");

const socket = new WebSocket(`ws://${window.location.host}`);

// 메세지 받기

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
  });
  
  socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);
  });
  
  socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌");
  });
  
  setTimeout(() => {
    socket.send("hello from the browser!");
  }, 10000);