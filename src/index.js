require('dotenv').config(); 
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require('hbs');

app.set('trust proxy', true);

app.use(express.static(path.join(__dirname,"../public")));
app.use('/',require(path.join(__dirname, '../routes/route.js')))

app.set("view engine","hbs");
app.set("views",path.join(__dirname,"../templates/views"))
hbs.registerPartials(path.join(__dirname,"../templates/partials"))

app.listen(port,()=>{
    console.log(`The website is working at http://localhost:${port}`);
})