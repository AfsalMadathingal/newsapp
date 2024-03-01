const route = require('express').Router();
const newsDB = require('../model/newsModel')
const getNews= require('../utils/googleNews.js')
const axios = require('axios')


route.get('/', async (req, res) => {

    let date = new Date();
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString().slice(2);
    let formattedDate = `${day}/${month}/${year}`;

   const response=  await  newsDB.find({date:formattedDate})

//     const youtbeResponse = await getYouTubeResponse('kerala latest news');

//     console.log("youtbeResponse",youtbeResponse);

//    const items = youtbeResponse.items.slice(0, 5);

//    console.log("items",items);

   if (!response.length) {

     getNews(async (data)=>{

    data.date = formattedDate

    await newsDB.insertMany(data)


    

    
      return  res.render('home',
        {
            data:data.news,
            items:items
            
        })
        
    })

   }else{

    const data = await newsDB.findOne({date:formattedDate})
 


  
   
    res.render('home',
       {
           data:data.news,
           items:items
           
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



async function getYouTubeResponse(query) {
    
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: query,
          type: 'video',
          key: process.env.YOUTUBE_KEY,
        },
      });
  
     
      return response.data;
    } catch (error) {
      
      return error
     
     
    }
  }
  



module.exports = route