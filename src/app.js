const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) =>
{
    res.render('index',
        {
            title: 'Weather App',
            name: 'Dolev Lazar'
        })
})

app.get('/about', (req, res) =>
{
    res.render('about',
        {
            title: 'About Me',
            name: 'Dolev Lazar'
        })
})

app.get('/help', (req, res) =>
{
    res.render('help',
    {
        title: "Help Page",
        help_message: 'This is the help page',
        name: 'Denis Sicun'
    })
})

app.get('/weather', (req, res) =>
{
    if (!req.query.address)
    {
        return res.send({error: "You must provide an address"})
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>
    {
        if (error)
        {
            return res.send({error})
        }
        forecast(latitude, longitude,(error, {weather, temperature, feelslike, humidity, visibility}) =>
        {
            if (error)
            {
                return res.send({error})
            }
            res.send({
                forecast: weather + ". It is currently " + temperature + ". It feels like " + feelslike + " out",
                location: location,
                address: req.query.address,
                humidity: humidity,
                visibility: visibility
            })
        })
    })
})

app.get('/products', (req, res) =>
{
    if (!req.query.search)
    {
        return res.send({error: 'You must provide a search term'})
    }
    console.log(req.query.search)
    res.send(
        {
            products: []
        }
    )
})

app.get('/help/*', (req, res) =>
{
    res.render('help_error',
{
            title: 'Help Error',
            error_message: "Help page wasn't found",
            name: 'Dolev Lazar'
        })
})

app.get('*', (req, res) =>
{
    res.render("error",
        {
            title: 'Error',
            error_message: "Page wasn't found",
            name: 'Dolev Lazar'
        })
})

app.listen(port, () =>
{
    console.log("Server is up on port 3000.")
})