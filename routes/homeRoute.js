const route = require('express').Router();
const request = require('request');
const newsDB = require('../model/newsModel')
const getNews= require('../utils/googleNews.js')
const YoutubeDB= require('../model/youtubeSearch')
const axios = require('axios')


route.get('/', async (req, res) => {

    let date = new Date();
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString().slice(2);
    let formattedDate = `${day}/${month}/${year}`;

   const response=  await  newsDB.find({date:formattedDate})
   let youtubeResponse  = await YoutubeDB.findOne({date:formattedDate})

   

   if (!youtubeResponse) {

    console.log("inside if");

    try {
        youtubeResponse = await getYouTubeResponse();
        youtubeResponse.date= formattedDate
        await YoutubeDB.insertMany(youtubeResponse)
       
    } catch (error) {

        console.error("Error fetching YouTube response:", error);
    }
 
   }

   youtubeResponse  = await YoutubeDB.findOne({date:formattedDate})
  


   if (!response.length) {

     getNews(async (data)=>{

    data.date = formattedDate

    if(data.news.length == 0)
    {
       return res.redirect('/')
    }

    await newsDB.insertMany(data)


    
      return  res.render('home',
        {
            data:data.news,
            youtube:youtubeResponse.result
            
        })
        
    })

   }else{

   
 


    const response=  await  newsDB.findOne({date:formattedDate})

   
    res.render('home',
       {
           data:response.news,
           youtube:youtubeResponse.result
           
       })


   }



   



  
})

route.get('/details', async (req, res) => {

    let date = new Date();
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString().slice(2);
    let formattedDate = `${day}/${month}/${year}`;

    const url = req.query.news

    const data = await newsDB.findOne({date:formattedDate})
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


const getYouTubeResponse = () => {
  return new Promise((resolve, reject) => {
      const options = {
          method: 'POST',
          url: 'https://google-api31.p.rapidapi.com/videosearch',
          headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': process.env.YOUTUBE_KEY,
              'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
          },
          body: {
              text: "kerala news today",
              safesearch: 'off',
              timelimit: '',
              duration: '',
              resolution: '',
              region: 'IN',
              max_results: 20
          },
          json: true
      };

      request(options, (error, response, body) => {
          if (error) {
              reject(error);
          } else {
              resolve(body);
          }
      });
  });
};





module.exports = route