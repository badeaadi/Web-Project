
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




function readUsers() {
    return JSON.parse(fs.readFileSync("login.json"))["users"];
}

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




function readMessages() {
    return JSON.parse(fs.readFileSync("db.json"))["messages"];
}

app.get("/messages", (req, res) => {
    const userList = readMessages();
    res.json(userList);
});

app.post("/messages", (req, res) => {
    const messageList = readMessages();
    const newMessage = req.body;
    newMessage.id = uuidv1();
    messageList.push(newMessage);
    writeJSONFile(messageList);
    res.json(newMessage);
});

app.get("/messages/:id", (req, res) => {
    const messageList = readMessages();
    const id = req.params.id;
    let flag = false;
    let Message;

    messageList.forEach(currentMessage => {
        if (id == currentMessage.id) {
            flag = true;
            Message = currentMessage;
        }
    });

    if (flag) {
        res.json(Message);
    } else {
        res.status(404).send('Message ${id} was not found');
    }
});
app.put("/messages/:id", (req, res) => {
    const messageList = readMessages();
    const id = req.params.id;
    const newMessage = req.body;

    newMessage.id = id;
    let flag = false;

    const newMessageList = messageList.map((Message) => {
        if (Message.id == id) {
            flag = true;
            return newMessage;
        }
        return Message;
    });

    writeJSONFile(newMessageList);

    if (flag == true) {
        res.json(newMessage);
    } else {
        res.status(404).send('Message ${id} was not found');
    }
});


app.delete("/messages/:id", (req, res) => {
    const messageList = readMessages();
    const id = req.params.id;
    const newMessageList = messageList.filter((Message) => Message.id != id);

    if (messageList.length !== newMessageList.length) {
        res.status(200).send('Message ${id} was removed');
        writeJSONFile(newMessageList);
    } else {
        res.status(404).send('Message ${id} was not found');
    }
});

function writeJSONFile(content) {
    fs.writeFileSync(
        "db.json",
        JSON.stringify({messages: content}),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}






//  Starting the server
app.listen("3000", () =>
    console.log("Server started at: http://localhost:3000")
);
