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
