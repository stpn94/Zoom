import http from"http"
// 노드에 이미깔려씨다.
import WebSocket from "ws";
import express from "express";
// 여기에 app을 만들거다.

const app = express();

    // pug 페이지들을 렌더하기위해 pug 설정을 해야 함
app.set('view engine', "pug");
app.set("views", __dirname + "/views");

    // 유일한 route
    // res.render 를 한다. home을 렌더하는 거다.
app.get("/", (req, res) => res.render("home"));
    //유저가 /public으로 가게되면 __dirname+"/public" 폴더를 보여주게 해야한다.
app.use("/public", express.static(__dirname + "/public"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);

// 노드를 했다면 셋팅하는 것이 쉬울 것이다.
// 정리하면 express 를 사용하는데 이번 강의에서는 Express로 views를 설정하고,
// render 해주는거고 나머지는 websocket 에서 실시간으로 일어남.
// Express 끝

// Pug = view 엔진
// Express = template 지정해주기 public url 생성 유저에게 파일을 공유
// home.pug를 render 해주는 route handler  

//  10
// app.listen(3000, handleListen); 
const server =http.createServer(app);
const wss = new WebSocket.Server({server});
// 2개의 protocal  다 같은 port를 공유하는 거다
//  wss 를 쓸때는 항상 이렇게 하지 않아도 된다.
//  wss 만 써도 된다는 소리다.

function handleConnection(socket){
    console.log(socket);
    //callback 으로 socket을 받는다
//socket은 연결된 어떤 사람 = 연결된 브라우저와의 연락라인이다. 그래서 우리는 이걸 어디 저장해야함

}


// websokect 이벤트
// 이건 event를 받고 funtion 도 받아.

wss.on("connection", (socket) => {
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("Disconnected from the Browser ❌"));
    socket.on("message", (message) => {
        console.log(message.toString('utf8'))
        });
    socket.send("hello!!!");
  });

server.listen(3000,handleListen);

