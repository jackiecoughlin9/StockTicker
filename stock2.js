var http = require('http');
var url = require('url'); 
const MongoClient =  require('mongodb').MongoClient;
const port = process.env.PORT || 8080; 

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
        query = { "symbol": `${stock}`};
    } 
    if (queryObject.radio == "name"){
      query = { "name": `${stock}`}; 
    }

  //connect to mongo
  const connStr = "mongodb+srv://jackiecoughlin99:Jackiec18@cluster0.mlvh003.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  MongoClient.connect(connStr, async function(err, db) {   
    if (err) { console.log(err); }
    else {
        // Select db and collection
        var db_object = db.db("Stock");
        var collection = db_object.collection('PublicCompanies');
        // Find matching documents
        const results = collection.find(query);

        // // Print a message if no documents were found
        // if ((await collection.countDocuments(query)) === 0) {
        //     console.log("Stock not found");
        // }

//         // Print document info
//         for await (const doc of results) {
//             console.dir("Name: " + doc.name);
//             console.dir("Symbol: " + doc.symbol);
//             console.dir("Price: " + doc.price);
//         }
//         // Close database
//         await db.close();
    } // end else
}) // end client.connect


  res.end();
  
}).listen(port);
