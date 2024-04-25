var http = require('http');
var url = require('url'); 
const MongoClient =  require('mongodb').MongoClient;
const port = process.env.PORT || 8080; 
console.log("Here"); 

http.createServer(function (req, res) {
  
    res.writeHead(200, {'Content-Type': 'text/html'});
    var queryObject = url.parse(req.url, true).query; 
    var pathName = url.parse(req.url, true).pathname;  

    if (pathName == "/") {
      html = "<form method='GET' action='/process'>" +
      "<label for='stock'>Search by stock symbol or company name</label></br>" +
      "<input type='text' id='stock' name='stock'></input></br>" + 
      "<input type='radio' id='symbol' name='radio' value='symbol'></input>" + 
      "<label for='symbol'>Symbol</label></br>" +
      "<input type='radio' id='name' name='radio' value='name'></input>" +
      "<label for='name'>Name</label></br>" + 
      "<input type='submit' value='Search'>" +
      "</form>";
      res.write(html);
  }
  else if (pathName == "/process")
    var stock = queryObject.stock;
    if (queryObject.radio == "symbol") {
        query = { "tickerSymbol": `${stock}`};
        console.log("Here"); 
    } 
    if (queryObject.radio == "name"){
      query = { "name": `${stock}`}; 
    }


  res.end();
  
}).listen(port);
