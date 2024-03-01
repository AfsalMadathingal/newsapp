const request = require('request');


const parsedDate = new Date();


const year = parsedDate.getFullYear();
const month = parsedDate.getMonth() + 1; 
const day = parsedDate.getDate();

const formattedDate = `${month}/${day}/${year}`;


const options = {
  method: 'POST',
  url: 'https://newsnow.p.rapidapi.com/newsv2',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'newsnow.p.rapidapi.com'
  },
  body: {
    query: 'kerala',
    time_bounded: true,
    from_date: formattedDate,
    to_date: formattedDate,
    location: 'IN',
    language: 'en',
    page: 1
  },
  json: true
};


const getNews =  function  (callback) {

     request(options, function (error, response, body) {
        if (error){


          
          return  callback(error)
        } 
      
        

        console.log(body);

        callback(body)

    });



    
}


module.exports = getNews






