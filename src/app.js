const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// defining path for express config
const viewsPath = path.join(__dirname, '../template/views')
const publicDirectorypath = path.join(__dirname, '../public')
const partialPath =path.join(__dirname, '../template/partials')
//setup handlebars engine and view location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)
// setup static content to server
app.use(express.static(publicDirectorypath))

app.get('', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather App',
        name: 'vish'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'weather app',
        name: 'vish'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        title: 'weather-app',
        name: 'vish'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'no address is provided '
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, fordata) => {
            if (error) {
                return res.send({ error })
            }
        
            res.send({
                forcast: fordata,
                location: location,
                address:req.query.address
            })
        })
    })
})

app.get('/product', (req, res) => {

})

app.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        title: 'weather-app',
        name: 'vish',
        errormsg: 'help article not found'
    })
})

app.get('*', (req, res)=> {
    res.render('404.hbs', {
        title: '404',
        name: 'vish',
        errormsg: 'article not found'
    })
})

app.listen(3000, () => {
    console.log('server is up at 3000')
})

