const express = require('express');
const Journel = require('../models/journel');
const router = express.Router();

router.route('/')
  .post((req, res) => {
    let journel = new Journel();
    journel.save((err, journel) => {
      if( err ) {
        return res.json({ message: 'There was an error creating the journel' })
      }
      res.json({ message: 'New journel created' })
    })
  })

router.route('/:id')
  .get((req, res) => {
    Journel.findOne({accountID: req.params.id}, (err, journel) => {
      if(err)
        res.send(err)
      res.json(journel)
    })
  })

router.route('/add-entry')
  .post((req, res) => {
    let query = {accountID: req.user._id};
    console.log(query);
    let entry = { $push: { "entries": {date: new Date(), entry: req.body.entry} }};
    console.log(entry);
    let options = { safe: true, upsert: true, new : true };
    Journel.findOneAndUpdate(query, entry, options, (err, journel) => {
      if(err) res.send(err)
      return res.send(journel)
    })
  })

module.exports = router;
