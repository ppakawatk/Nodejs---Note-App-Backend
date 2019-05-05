var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        note = {text: req.body.body, title: req.body.title}
        console.log('[Note] Updating ID: ', id)
        console.log(note)
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').update(details, note, (err, result) => {
          if (err) {
            res.send({'error':'An error has occurred'});
            console.log('[Note] Update error');
          } else {
            res.send(result);
            console.log('[Note] Update complete');
            console.log(result);
          } 
        });
      });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        console.log('[Note] Deleting ID: ', id)
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
            console.log('[Note] ID ', id, ' deleting error');
          } else {
            res.send('ID ' + id + ' had been deleted!');
            console.log('[Note] ID ', id, ' had been deleted!');
          } 
        });
      });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        console.log('[Note] Finding ID: ', id)
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
            console.log('[Note] Find error');
          } else {
            res.send(item);
            console.log('[Note] Find complete');
            console.log(item);
          } 
        });
      });


    app.post('/notes', (req, res) => {
      
        console.log(req.body)
        note = {text: req.body.body, title: req.body.title}
        db.collection('notes').insert(note, (err, result) => {
            if (err) { 
              res.send({ 'error': 'An error has occurred' }); 
              console.log('[Note] Insert error');
            } else {
              res.send(result.ops[0]);
              console.log('[Note] Insert complete ');
              console.log(result.ops);
            }
          });
    });
  };

