var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

// var db;
// mongoClient.connect('mongodb://ccarrjoh:Whaats220@ds117111.mlab.com:17111/project0', (err, client) => {
//   if (err) return console.log(err);
//   db = client.db('project0');
//   app.listen(5001);
// });

// app.post('/card', (req,res) => {
//   db.collection('card').save(req.body, (err,result) =>{
//     if (err) return console.log(err);
//     console.log('saved to database');
//     res.redirect('/');
//   })
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))

});
app.get('/edit-deck', (req, res) => {
  res.sendFile(path.join(__dirname, './edit-deck.html'))

});

app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.listen(5001);