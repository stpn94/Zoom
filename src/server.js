import http from"http"
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
app.listen(3000, handleListen);

// 노드를 했다면 셋팅하는 것이 쉬울 것이다.
    // 정리하면 express 를 사용하는데 이번 강의에서는 Express로 views를 설정하고,
    // render 해주는거고 나머지는 websocket 에서 실시간으로 일어남.
    // Express 끝

    // Pug = view 엔진
    // Express = template 지정해주기 public url 생성 유저에게 파일을 공유
    // home.pug를 render 해주는 route handler  