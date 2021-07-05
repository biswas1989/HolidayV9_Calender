const express = require('express')
let bodyParser = require('body-parser')
const app = express()
const port = 3000


app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


app.get('/cities', (req, res) => {
    res.send([{ cityName: 'CityA' }, { cityName: 'CityB' }, { cityName: 'CityC' }, { cityName: 'CityD' }])
})

app.post('/monthly', (req, res) => {
    arrayIndex=0;
    if(parseInt(req.body.month)>=4&&parseInt(req.body.month)<8)
    {
        arrayIndex=parseInt(req.body.month)-4;

    }

    if(parseInt(req.body.month)>7&&parseInt(req.body.month)<12)
    {
        arrayIndex=parseInt(req.body.month)-8;
    }

    holidays=[
        [
            {
                date: '02/',
                id: 131,
                holidayName: 'new Holiday'
              }, {
                date: '07/',
                id: 132,
                holidayName: 'new Holiday Two'
              }, {
                date: '29/',
                id: 134,
                holidayName: 'new Holiday'
              },
              {
                date: '22/',
                id: 135,
                holidayName: 'new Holiday Two'
              }
        ],
        [
            {
                date: '02/',
                id: 411522,
                holidayName: 'new Holiday One'
              }, {
                date: '07/',
                id: 55555,
                holidayName: 'new Holiday Two'
              }, {
                date: '15/',
                id: 87484848,
                holidayName: 'new Holiday One'
              },
              {
                date: '14/',
                id: 15554,
                holidayName: 'new Holiday'
              }
        ],
        [
            {
                date: '01/',
                id: 411522,
                holidayName: 'new Holiday One'
              }, {
                date: '08/',
                id: 55555,
                holidayName: 'new Holiday Two'
              }, {
                date: '11/',
                id: 87484848,
                holidayName: 'new Holiday One'
              },
              {
                date: '14/',
                id: 15554,
                holidayName: 'Holiday'
              } 
        ],
        [
            {
                date: '02/',
                id: 411522,
                holidayName: 'new Holiday One'
              }, {
                date: '07/',
                id: 55555,
                holidayName: 'new Holiday Two'
              }, {
                date: '15/',
                id: 87484848,
                holidayName: 'new Holiday One'
              },
              {
                date: '14/',
                id: 15554,
                holidayName: 'new Holiday'
              }
        ]
    ]

    let ff=holidays[arrayIndex]
    for(let index=0;index<ff.length;index++)
    {
        ff[index].date=ff[index].date+(parseInt(req.body.month)<10?'0'+req.body.month:req.body.month)+'/'+req.body.year;
    }
    res.send(ff)
})
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err)

})
app.listen(port, () => console.log(`listening on port ${port}!`))

