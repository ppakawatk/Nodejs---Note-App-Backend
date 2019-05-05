const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const app            = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, client) => {
    if (err) return console.log(err)

    const collection = client.db(db.db_notes).collection(db.collection_notes);
    console.log('[Database connected] Database name: ', db.db_notes,', Collection name: ', db.collection_notes)

    require('./app/routes')(app, client.db(db.db_notes));
    app.listen(port, () => {
      console.log('Server is live on ' + port);
    });    
     
    // client.close();
});














// Original from MongoDB web
// MongoClient.connect(uri, function(err, client) {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
//   });


// From Tutorial https://medium.freecodecamp.org/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2
// MongoClient.connect(db.url, (err, database) => {
//     if (err) return console.log(err)

//     const db_name = database.db("note-api")
//     require('./app/routes')(app, db_name);

//     app.listen(port, () => {
//       console.log('We are live on ' + port);
//     });               
//   })