const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://dbuser4:W18nc289XX1WXy6n@cluster0.wgdho.mongodb.net/<dbname>?retryWrites=true&w=majority";
const dbName = "booklist";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('data').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('data').save({
    date: req.body.date,
    author: req.body.author,
    comment: req.body.comment,
    }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/messages', (req, res) => {
  db.collection('data').findOneAndDelete({date: req.body.date, author: req.body.author, comment: req.body.comment}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
