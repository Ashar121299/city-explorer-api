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
server.get('/movie',handleMovie);

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
function handleMovie(req,res){
    const name = req.query.cityName;
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;
    
    axios.get(URL).then( Movie => {
        let result = Movie.data.results.map( item => {
            return new MovieData(item);
        })

        return res.status(200).send(result);
    }).catch(error => {
        return res.status(404).send(error)
    })
}





class MovieData {
    constructor (item){

        this.title = item.title;
        this.overview = item.overview;
        this.vote_average = item.vote_average;
        this.vote_count = item.vote_count;
        this.poster_path = "https://image.tmdb.org/t/p/w500/" + item.poster_path;
        this.popularity = item.popularity;
        this.release_date = item.release_date;
    
    }
}





function Forecast(day){ 
    this.date=day.valid_date;
    this.description=day.weather.description;
}





server.listen(PORT,()=>{
    console.log(`Hello,Im listen on ${PORT}`)
})