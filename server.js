//get the data from the file
const wordlistData=require('./wordlist.json'); //just pretend this came from mysql or mongodb :) [cuz its over kill]

//express
const express=require('express');
const cors=require('cors');
const app=express();
const PORT=3030;

//dir locations
const UI_LOCATION=`${__dirname}/view/`;

//middleware
app.use(cors());
app.use(express.static(UI_LOCATION));

app.get('/data',(req,res)=>{
    res.json(wordlistData);
})

app.listen(PORT,()=>{console.log(`Listening on port ${PORT}...`)});