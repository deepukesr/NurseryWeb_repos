const express = require("express");
const app = express();
const port = 8080;
// port
const path = require("path");
const { v4: uuidv4 } = require('uuid'); // this will create the unique ID's . to generate id's we just have to write "uuidv4();"  uuidv4 = this is just a variable we can change it where we are requiring the "uuid".

const methodOverride = require("method-override");



app.use(express.urlencoded({extended: true})); // this is there to understand the url encoded data.
app.use(methodOverride("_method"));


// middlewares
app.set("view engine", "ejs");  // setting the view engine as "ejs".
app.set("views", path.join(__dirname,"views")); // setting path for "views" folder.
app.set(express.static(path.join(__dirname,"public"))); // setting path for "public" folder.

app.use(express.static("public")); 
app.use(express.static(path.join(__dirname,"public/CSS"))); //this is important to use static files out of the parent directory.
app.use(express.static(path.join(__dirname,"public/JS")));  // 


// variable array that contains post data.
let posts = [
    {
        id:uuidv4(),
        username: "Jay",
        content: "Ask, Believe and Receive."
    },

    {
        id:uuidv4(),
        username: "Beena",
        content: "I love food."
    },

    {
        id:uuidv4(),
        username: "Raju",
        content: "Bussiness is the best job I prefer."
    }
]



// rout for the main page
app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
})

// rout to create the new post
app.get("/posts/new", (req, res) => {
    res.render("newPost.ejs");
});

// route to add data to your database(posts array) and redirect.
app.post("/posts", (req, res) => {
    let {username, content}= req.body; // taking data from form and storing it.
    let id = uuidv4();
    posts.push({id,username,content});  // adding data to the "posts array" (DataBase) in index.js file.
    res.redirect("/posts");
});

// route to see the post in detail
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;

    let idsPost = posts.find((p) => p.id.toString() === id);
    res.render("viewFullPost.ejs",{idsPost});
});


// route to render the edit post form.
app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let idsPost = posts.find((p) => p.id == id);
    res.render("editPost.ejs",{idsPost});
});

// Route to edit post
app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let idsPost = posts.find((p) => p.id.toString() === id);
    idsPost.content = newContent;
    res.redirect("/posts");
});




// route to delete the post
app.delete("/posts/:id",(req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);

});