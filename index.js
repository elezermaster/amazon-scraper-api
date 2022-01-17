const express = require('express')
const request = require('request-promise')

const app = express()
const PORT = process.env.PORT || 5002;

//const apiKey = '0a2afad3a1a640989a0886854bf59183'
const generateScraperUrl = (apikey) => `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`
//const base_url = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Welcome to amazon scraper API')
})
app.get('/products/:productId', async(req,res)=>{
    const {productId} = req.params
    const {api_key} = req.query
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(JSON.parse(response))
    } catch(error) {
        res.json(error)
    }
})
app.get('/products/:productId/reviews', async(req,res)=>{
    const {productId} = req.params
    const {api_key} = req.query
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(JSON.parse(response))
    } catch(error) {
        res.json(error)
    }
})
app.get('/products/:productId/offers', async(req,res)=>{
    const {productId} = req.params
    const {api_key} = req.query
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))
    } catch(error) {
        res.json(error)
    }
})
// GET Search Results
app.get('/search/:searchQuery', async(req,res)=>{
    const {searchQuery} = req.params
    const {api_key} = req.query
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=/${searchQuery}`)
        res.json(JSON.parse(response))
    } catch(error) {
        res.json(error)
    }
})

app.listen(PORT, ()=> console.log(`Server runnin on port  ${PORT}`))