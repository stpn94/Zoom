// "hello";
// Front-end 를 수정할 때 마다 서버를 재시작하는게 싫고, views나 서버를 수정할 때만 nodemon이 재시작되게하자.
// 그렇게 하기 위해서는 nodemon.json으로 가서 폴더하나를 무시하게 해줘야한다. "ignore": ["src/public/*"] 추가
// alert("hi");
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

// 메세지 받기
// 오픈(일반 적인 메서드 호출)
function handleOpen() {
  console.log("Connected to Server ✅");
}

socket.addEventListener("open", handleOpen);

// message호출(빈 함수()호출)
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);

});
// 닫기 
socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});


function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value))
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);

