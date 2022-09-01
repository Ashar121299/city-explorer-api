'use strict'
require ('dotenv').config();
const express= require ('express');
const server =express(); 
const cors=require ('cors');
server.use(cors());
const axios =require('axios');
const PORT=process.env.PORT || 3000; 



//http://localhost:3000
server.get('/',(req,res)=>res.send ('hi from home route'));


server.use('*',(req,res)=>res.status(404).send('page not found'));


const weatherData=require('./data/weather.json');




server.get('/weather',handleWeather);

function handleWeather(req,res){
    let {searchQuery,latitude,longitude}=req.query;
    const city=weatherData.find(city=>city.city_name.toLowerCase()=== searchQuery.toLowerCase);

    try {
        const weatherArr=city.data.map(day=>new Forecast(day));
        res.status(200).send(weatherArr);
    }
    catch  {
        res.send ('error request');

    }


}


function Forecast(day){ 
    this.date=day.valid_date;
    this.description=day.weather.description;
}





server.listen(PORT,()=>{
    console.log(`Hello,Im listen on ${PORT}`)
})