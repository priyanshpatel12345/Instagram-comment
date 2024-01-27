const exp = require("constants");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4:uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded( {extended : true}));
app.use(methodOverride("_method"));


app.set("view engine" , "ejs");
app.set("views", path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "public")));

let posts = [
    {
        id : uuidv4(),
        username : "Priyansh",
        comment : "This meme Funny...",
    },
    {
        id : uuidv4(),
        username : "korat",
        comment : "Related..",
    },
    {
        id : uuidv4(),
        username : "karan",
        comment : "Wow , Funny",
    }
];
app.get("/posts/new" , (req,res) => {
    res.render("new.ejs");
});

app.get("/posts" , (req,res) => {
    res.render("index.ejs" , {posts });
});

app.post("/posts" , (req,res) => {
    let { username , comment} = req.body;
    let id = uuidv4();
    posts.push({ id,username , comment });
    res.redirect("/posts");
});

app.get("/posts/:id" , (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs" , { post });
});

app.patch("/posts/:id" , (req ,res) => {
    let { id } = req.params;
    let newComment = req.body.comment;
    let post = posts.find((p) => id === p.id);
    post.comment = newComment;
    res.redirect("/posts");
});

app.get("/posts/:id/edit" , (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" , { post});
});

app.delete("/posts/:id" , (req,res) => {
    let { id }= req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port , (req,res) => {
    console.log(`The usable port is ${port}`);
});