# 줌 클론코딩(WebSockets, SocketIO, WebRTC )
## 필요한 것들 
"Zoom Clone using Node.js ,WebRTC and Websockets"

npm i nodemon -D
npm i @babel/core @babel/cli @babel/node -D
npm i @babel/preset-env -D
```
    /* bable.config.json에는 유일한 "preset"이 입력되어 있다. */
    /* package.json의 script에 있는 "dev"는 nodemon을 호출 -> nodemon이 nodemon.json을 살펴보고 거기에 있는 코드 실행한다. */
    /* nodemon.json의 "exec"는 src/server.js에 대해 babel-node 명령문을 실행 */
```
npm i express
npm i pug

npm run dev
http://localhost:3000/ 에 들어가면 Cannot GET /  == 서버가 구동되고 있다는 뜻

MVP CSS

#1.2
protocol 은 어떤사람들인 어딘가에 있는 방에 만나고 어떤 방식으로 진행할지 결정하는것
프로그래머는 이 규칙을 가지고 따르는 코드를 만들어서 실행
ws is only implementation . WebSocket의 핵심부분임
채팅기능을 만들려면 WebSocket으로 로직을짜야한다.
하지만 ws를 사용한 나중에 배울 Framework에는 이미 채팅방기능이 다 있다.
먼저 ws 기초부터 알고 Framwork로 넘어간다.
webSocket inplementation for node.js

npm i ws
그리고 서버 만들껀데 ws서버는 안만듬.
대신 express 서버를 놓고 함께 합친다.
다른 protocol이기 때문이다.
http://localhost:3000

지금 express는 http를 다룬다.

ws://localhost:3000
express로, 같은 서버에 ws기능 설치

## http.create (약간의 이론)
***
![webSocket](/src/img/webSocket.jpg)

> HTTP
    > user가 request하면 Server 가 response하는 프로토콜이며 서버는 항상 네가 누군지 잊는다. 그것이 stateless라고 한다.

> WebSocket
    > user가 WebSocket을 이용한 리퀘스트를 하고 WebSocket connection 응답하면 연결
    > 계속 연결되어있어서 서버가 우리가 누군지 알고있다.
    > 양방향 이다.
    > 간단하게 말하면 전화통화 하는 것 과 비슷하다.

#### WebSocket 정리 1

이벤트를 listen 했을 뿐이니까
우리는 두 곳에서 이벤트를 listen 하고 있다

한 곳은 backend
다른 한 곳은 frontend

backend에서는 websocket  server를 만듦

그리고 지금은 connection이라는 이벤트를 listen하고 있다
connection event가 발생하면 반응 해야함 
이때 우리는 event를 listen 해 줘야 함
```
wss.on("connection", (socket) => {
    ...
    ...
  });
```

그리고 connection이 생기면 여기 socket에서 누가 연결했는지 알 수 있다
JavaScript는 연결된 socket을 넣어 줄 꺼다

이제 브라우저마다 연결된 socket에서 이벤트를 listen 할 수 있어

```
    socket.on("close", () => console.log("Disconnected from the Browser ❌"));
```

socket이 connection을 종료시키면
예를 들어서, 브라우저의 탭을 닫거나, 컴퓨터가 잠자기 모드에 들어가면
우리는 무언가를 해 줌

```
socket.on("message", (message) => {
        console.log(message.toString('utf8'))
        ...
        ...
        }
```
또한 우리는 특정 socket에서 메시지를 기다림
이게 바로 특정 socket이야

그래서 나는 이 특정 socket에 event listener를 등록했어
나는 서버에 event listener를 등록하지 않았어
왜냐하면, 이 event listener는 backend와 연결한 각 브라우저를 위한 거니까


그리고 이건 서버 전체를 위한 거야, wss는 서버 전체를 위한 거지
socket.on message는 특정 socket에서 메시지를 받았을 때 발생할거야
봤다시피 새로운 브라우저가 내 서버에 들어오면, 같은 코드를 실행 시켜줄거야. 

다시 정리하자면, 우리는 여기서 event listener를 추가 해줬어
그리고 메시지를 브라우저로 전달했어
그리고 브라우저에서는 backend와 connection을 열어 주고 있어 
그리고 다시, event listener을 등록했지

전에 button.addEventListener('click') 같은걸 많이 했었잖아
이게 전부야. 지금까지 이벤트를 listen하는걸 만들었어

보다시피 front-end가 back-end로 뭔가 보낼 수 있어
그리고 back-end에서도 Font-end로 뭔가 보내고 있어

frontend에서는, addEvnetListener(“message”)를 썼고
Backend에서는 socket.on(“message”)를 썼어, 큰 차이는 없지?


나는 여기서 익명 함수를 사용했어
이런게 익명 함수야, 이름이 없는 function이지. 알겠지? 
<!-- () => console.log() -->
익명 함수가 익숙하지 않으면
```
funtion onSocketClose(){};
```
이 형식으로
그러면 socket 코드는 더 짧아질거야, 대신 분리된 function이 생기겠지

```
// app.js code 입니다.
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

```

***
#### WebSocket 정리 2(server.js Code)

-   node.js 경로설정 코드 ↓↓↓↓↓↓

```
import http from "http"
import WebSocket from "ws";
import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => res.render("home"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function handleConnection(socket) {
    console.log(socket);
}

const sockets = [];
```


***


```
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon"
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("Disconnected from the Browser ❌"));
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch (message.type) {
            case "new_message":
                const messageString = message.toString('utf8');
                sockets.forEach((aSocket) =>
                    aSocket.send(`${socket.nickname}: ${message.payload}`)
                );
            case "nickname":
                socket["nickname"] = message.payload;
        }
    });
});
```

-   ↑↑↑↑↑↑ wss.on("connection", (socket) 의 실행 과정 
    -   예를 들어 firefox가 연결했어, firefox를 socket array에
        저장해줄 꺼야 
        
        어떻게 하는 지 알고 있지 

        그리고 즉시, 그 socket에 nickname을 줄거야
        익명이지(Anonymous)
        
        console.log를 해주고
        close를 listen해주고
        그리고 여기서는 socket이 메시지를 보낼 때까지 기다릴 꺼야
        socket이 new_message type 메시지를 보내면, 
        다른 모두에게 그 익명의 socket이 보낸 메시지를 전달 할 꺼야 
        이 부분은 익명(Anon)이 되겠지
        
        그리고 message payload 를 줄거야
        나중에 firefox가 nickname type의 메시지를 전송할 수도 있겠지 
        
        그래서, 메시지에 뭐가 있든지 그것을 firefox의 nickname으로 바꿔 줄 꺼야 

***
***

### SOCKET.IO 
#### 위의 코드를 쉽게 만들어줄 Framework
#### SOKET.IO 란?

-   socket IO가 하는 역할 
    -   socket IO는 실시간, 양방향, event 기반의 통신을 가능하게 해 
        websocket하고 매우 매우 비슷함,

        websocket도  실시간으로 작동하고, 
        
        양방향으로 통신하고,  브라우저와 back-end의 양방향을 의미
        
        둘다, 메시지를 주고 받고 할 수 있음
        
        또 event 기반의 통신을 하고 있음
        
        이전 강의에서 짠 코드와 똑같아 보여 
        
        왜냐하면 우리는 event를 다룸
        
        여기서 message, close, connection event를 쓰고
        
-   socket IO는 뭐가  다른 걸까? 

    -   Socket IO는 websocket을 실행하는게 아님

        Socket IO는 framework인데

        실시간, 양방향, event 기반 통신을 제공

        다른 여러 선택지 중에서 websocket을 이용

        Socket IO는 websocket보다 탄력성이 뛰어남

        websocket은  Socket IO가 실시간, 양방향, event 기반 통신을 제공하는 방법 중 하나

        만약 예를 들어 너의 브라우저가 websocket을 지원하지 않으면

        그렇게 websocket에 문제가 생겨도 socket IO는 계속 작동을 함

        다시 설명하면, socket IO는 “websocket의 부가기능”이 아님 

        Socket IO는 가끔 websocket을 이용해서

        실시간, 양방향, event 기반 통신을 제공하는 framework

        만약 websocket 이용이 불가능하면, socket IO는 다른 방법을 이용해서 계속 작동


#### SOKET.IO setting

```

import http from "http"
import SocketIO from "socket.io";
// SocketIO import
import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);
// IO 서버 만들어 줬다.

wsServer.on("connection", (socket) => {
    console.log(socket);
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);

```

-   socket IO를 설치 해주는 것으로 Socket IO는 url을 준다.
    -   URL은  /socket.io/socket.io.js



이렇게 해야하는 이유는 말했다시피 socketIO가 websocket의 부가기능이 아니기 때문 
Socket IO는 재연결 같은 부가기능이 존재
또는
websocket을 사용할 수 없을 때 socket IO는 다른 것을 사용

즉, 너가 socketIO를 서버에 설치한 것 처럼 client에도 socketIO를 설치를 해야 함
왜냐면, 다시 말하지만, socket IO는 websocket의 부가기능이 아님

과거에는 back-end에 아무것도 설치할 필요가 없었음
왜냐하면, 	브라우저가 제공하는 websocket API를 사용하면 되었으니까

하지만 브라우저가 주는 websocket은 socket IO와 호환이 안돼
왜냐면, socketIO가 더 많은 기능을 주기 때문이야

그래서 socket IO를 브라우저에 설치를 해야 돼 
그래서 이 URL을 준거야, front-end에서는 이걸 쉽게 import 할 수 있어

그럼 HTML에 URL를 받아올수있는 경로를 지정해 주면 된다.

***
```
//home.pug
script(src="/socket.io/socket.io.js") //추가
```
이번에는 room부터 시작
user가 chat에 참가하고 싶으면 room을 먼저 만들도록 한다.
이제 더 이상 public chat을 사용하지 않음

이것을 해주기 전에 socketIO를 꼭 설치해야 함

그냥 script src라고 해주고 
/socket.io/socket.io.js
***
```
//app.js (Front End)
const socket = io // 써주면 끝남
```

끝
port, ws를 쓸 필요 없음
io function은 알아서 socket.io를 실행하고 있는 서버를 찾음

## SETTING 끝

***
***
### Room 만들기
room 개념
user가 웹사이트로 가면 방을 만들거나, 방에 참가할 수 있는 form을 보게 됨
이렇게 하면, socket IO로 room 개념을 소개 해줄 수 있음
왜냐하면, socket IO에는 이미 room 기능이 있음

Socket IO를 이용하면 방에 참가하고 떠나는 것이 매우 간단 
또 이걸 통해서 socketIO의 다른 기능도 배울 수 있음

예를 들어 방에 메시지를 보내는 것도 할 수 있음
전부 다 다뤄볼꺼야

하지만 먼저, front-end 부터.
그럼 먼저, form을 만들고, 
이 form은 welcome이라고 div 안에 만듦
그럼, 이 form을 만들어 주고..

이미 만들어진 방에 참가하는 것과 방을 만드는 것에는 차이가 없음
같은걸 하는거

존재 하지 않는 방에 참가하면 방을 만들고
한 명만 있는 방이 됨

만약 이미 존재하는 방에 참가하더라도, 같은 일을 하는 거고
그냥 방에 들어 가는 거임
방의 유무와 상관 없이 그냥 방에 들어가는 거임
```
//home.pug 수정된 코드
header 
            h1 It works! 
        main
            div#welcome
                from
                    input(placeholder="room name", required, type="text")
                    button Enter Room 
```
자, 이제 app.js에서 welcome div에서 form을 가져오자 
```
//app.js

const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done!");
  });
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

```
socket.send 안쓴다.
socket.emit 쓴다.
그리고 우리는 메시지를 보낼 필요 없고,
우리가 원하는 것을 emit 해주면 된다.

지금과 같은 경우에는 room이라는 event를 emit해주면 된다.
너가 만들고 싶은 어떤 event라도 만들 수 있다.

emit을 하면 argument를 보낼 수 있다

argument은 object가 될 수 있다.

전에는 그냥 메시지만 전송하면 되었다
그리고 object도 보낼 수 없었다
먼저 object를 string으로 변환시키고 그 다음에 string을 전송 할 수 있었다.

Socket IO를 이용하면 이렇게 할 필요 없다
보다시피, socket IO가 이걸 다 알아서 해준다

첫째, 특정한 event를 emit해 줄 수 있다,  어떤 이름이든 상관없다.
둘째, object를 전송 할 수 있다
전처럼 string만 전송 할 필요가 없다
이제 room 메시지를 전송하고 있다

중요한건 한번더.

첫째, 우리가 직접 만든 event가 있다
꼭 message 가 아니여도 됨

우리가 원하는 어떠한 event도 상관 없다

둘째, front-end에서 object를 전송할 수 있다
Socket IO는 object를 string으로 바꾸어 주고 
다시 알아서 Javascript object로 만들어 준다.

#### callback
Callback은 서버로 부터 실행되는 function

이번에는 socket.emit의 3번째 argument로 function을 넣어 줄 꺼야

console.log(“sever is done”)를 해주자 
```
//app.js
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit(
      "enter_room", 
      { payload: input.value }, 
      () => {console.log("server is done!");
  });
  input.value = "";
}
```

```
//server.js
wsServer.on("connection", (socket) => {

  socket.on(
      "enter_room", 
      (msg, done) => {
           console.log(msg);
           setTimeout(() => {done();
       },10000);
  });
});
```


//app.js
socket.emit("enter_room", { payload: input.value } , () => {console.log("server is done!");
//server.js
socket.on("enter_room",(msg, done) => {console.log(msg); setTimeout(() => {done();},10000);})
!!!!!매우 중요함
첫번째 socket.emit을 사용하고 있어
//app.js
String"enter_room"
//server.js
String"enter_room"
두번째 argument에는 event 이름이 들어가
//app.js
{payload : input.value} // JSON object
//server.js
(msg, ----) => {console.log(msg); ----;})
세번째 argument에는 서버에서 호출하는 function이 들어가 
//app.js
() => {console.log("server is done!")
//server.js
(---, done) => {-----; setTimeout(() => {done();},10000);}

### 이해 못하겠다.... 복습 또 복습 하자.

