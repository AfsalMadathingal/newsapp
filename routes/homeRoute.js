const route = require('express').Router();
const newsDB = require('../model/newsModel')
const getNews= require('../utils/googleNews.js')


route.get('/', async (req, res) => {

    let date = new Date();
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString().slice(2);
    let formattedDate = `${day}/${month}/${year}`;

   const response=  await  newsDB.find({date:formattedDate})


   if (response.length === 0) {

     getNews(async (data)=>{


        console.log("data",data);

        data.date = formattedDate

    await newsDB.insertMany(data)

        
      return  res.render('home',
        {
            data:data.news
            
        })
        
    })

   }else{

    const data = await newsDB.findOne({date:formattedDate})
 
   
   
    res.render('home',
       {
           data:data.news
           
       })
   }



   



  
})

route.get('/details', async (req, res) => {

    const url = req.query.news
    const data = await newsDB.findOne({})
    let news
    data.news.forEach(element => {
        if (element.url === url) {
            news= element
        }
    })

    console.log(data);

    res.render('details', {
        data: news
    })

})





module.exports = route