const express = require('express');
const dotenv = require('dotenv');
const dbInteract = require('./dbInteract');

const db = new dbInteract();

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.static('./public'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "./public/index.html");
});

db.allTables().then(result => {
    console.log('Tables : ', result);
}).catch(error => {
    console.log("Error : ", error);
});

db.getAllEmailAndPass().then(result => {
    console.log('All email and password', result);
}).catch(error =>{
    console.log('Error : ', error);
});

app.listen(PORT, () => console.log(`Server is running... localhost:${PORT}`));
