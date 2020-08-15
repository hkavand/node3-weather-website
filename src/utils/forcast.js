const request = require('request')

const forecast = (long,lat,callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&appid=0b8994d9f16182c37b6ee216f28d7d51&units=metric'

    request({ url:url , json:true },(error,response)=>{
        console.log(url)
        if (error){
            callback('unable to connect to the forcast server',undefined)
        }else if(response.body.cod == '400'){
            callback('unable to find the location in forcast server',undefined)
        }else{
            callback(undefined,{
                temp : response.body.main.temp,
                location : response.body.name,
                desc : response.body.weather[0].description
            })
        }
    })
}

module.exports = forecast;