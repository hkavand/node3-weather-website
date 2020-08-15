const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const partialspath = path.join(__dirname,'../partials')
const pubdir = path.join(__dirname,'../public')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')



hbs.registerPartials(partialspath)
app.use(express.static(pubdir))

app.set('view engine','hbs')

app.get('',(req,res)=>{
    res.render('index',{
        title:'this is weather app',
        name: 'Hossein Kavand'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'Hossein Kavand'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name : 'Hossein Kavand',
        helptext : 'this is the help page'
    })
})



app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You need to provide address'
        })
    }

    const address = req.query.address
    let result = 'default'
     geocode(address,(error,data = {})=>{
        if (error){
            return res.send({error})
        }
    
        forecast(data.latitude,data.longitude,(error,forecastdata)=>{
            if (error){
                return res.send({error})
            }
            
            result = ('the Qurrent temperature for     ' + forecastdata.location + '     is     ' + forecastdata.temp + ' Celsius   And the weather description is ' + forecastdata.desc)
            res.send({
                location : data.location,
                address : req.query.address,
                forecast : result
            })
        })
    
    })

})
app.get('/help/*',(req,res)=>{
    res.render('error',{title:'Help article not found'})
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Page not found',
        errormessage: '404',
        name: 'Hossein Kavand'
    })
})

app.listen(3000, () =>{
    console.log('server is up on port 3000')
})

