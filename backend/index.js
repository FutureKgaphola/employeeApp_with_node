require("dotenv").config();
const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');

const { senduserMail } = require('./utils/sendEmail');

const app = express(); 
const PORT = 4000; 
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{ 
    res.status(200); 
    res.send("Welcome to root URL of Server"); 
}); 

app.post('/signup', (req, res)=>{ 
    const {email,name} = req.body; 
      console.log(email,name);
      senduserMail(email,name);
    res.json({"message":"succesfully registered"}); 
}) 

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
