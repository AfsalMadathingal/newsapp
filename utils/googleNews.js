const request = require('request');



const options = {
  method: 'POST',
  url: 'https://newsnow.p.rapidapi.com/newsv2_top_news_site',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'newsnow.p.rapidapi.com'
  },
  body: {
    language: 'en',
    site: 'https://www.onmanorama.com/',
    page: 1
  },
  json: true
};











const getNews =  function  (callback) {

  request(options, function (error, response, body)
   {
        if (error){


          console.log(error);
          
          return  callback(error)
        } 
      
      
        callback(body)

    });



    
}


module.exports = getNews






