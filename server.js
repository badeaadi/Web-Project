
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const uuidv1 = require('uuid/v1');
const fs = require("fs");
const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());


app.post("/users", (req, res) => {
    const userList = readUsers();
    const newUser = req.body;
    newUser.id = uuidv1();
    userList.push(newUser);
    writeUsers(userList);
    res.json(newUser);
});

app.get("/users", (req, res) => {
    const userList = readUsers();
    res.json(userList);
});
function readUsers() {
    return JSON.parse(fs.readFileSync("login.json"))["users"];
}

function writeUsers(content) {
    fs.writeFileSync(
        "login.json",
        JSON.stringify({users: content}),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}
//  Start the server
app.listen("3000", () =>
    console.log("Server started at: http://localhost:3000")
);
