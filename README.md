# Noom
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

<<<<<<< HEAD
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

http.create
=======
![webSocket](./img/webSocket.jpg)

> HTTP
    > user가 request하면 Server 가 response하는 프로토콜이며 서버는 항상 네가 누군지 잊는다. 그것이 stateless라고 한다.

> WebSocket
    > user가 WebSocket을 이용한 리퀘스트를 하고 WebSocket connection 응답하면 연결
    > 계속 연결되어있어서 서버가 우리가 누군지 알고있다.
    > 양방향 이다.
    > 간단하게 말하면 전화통화 하는 것 과 비슷하다.

>>>>>>> 8e520a960b0f9d88a4365dbea7e4c40802d4742c
