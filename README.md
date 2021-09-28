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

![webSocket](./img/webSocket.jpg)

> HTTP
    > user가 request하면 Server 가 response하는 프로토콜이며 서버는 항상 네가 누군지 잊는다. 그것이 stateless라고 한다.

> WebSocket
    > user가 WebSocket을 이용한 리퀘스트를 하고 WebSocket connection 응답하면 연결
    > 계속 연결되어있어서 서버가 우리가 누군지 알고있다.
    > 양방향 이다.
    > 간단하게 말하면 전화통화 하는 것 과 비슷하다.

