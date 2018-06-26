var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))

  });
app.route('/edit-deck')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, './edit-deck.html'))
  });

mongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    console.log(err);
    client.close();
  } else {
    let db = client.db('project0');
    app.listen(5001, () => {
      console.log('listening to server')
    });
    let flashcard = db.collection('flashcard');
    app.post('/card', (req, res) => {
      flashcard.save(req.body, (err, result) => { //.save acts as insert when there is no id attached, insert when there is
        if (err) {
          console.log(err)
        } else {
          console.log('saved');
        }
      })
      flashcard.find({}).toArray().then((data) => {
        console.log(data);
      });
    })
  }
})



