const express = require('express');
const Journel = require('../models/journels');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    Journel.find((err, list) => {
      if(err)
        res.json(err);
      res.json(list);
    })
  })
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
    Journel.findById(req.params.id, (err, journel) => {
      if(err)
        res.send(err)
      res.json(journel)
    })
  })
  .put((req, res) => {
    Journel.findByIdAndUpdate(req.params.id,
      { $push: { "entries": {date: new Date(), entry: req.body.entry} } },
      { safe: true, upsert: true, new : true },
      (err, journel) => {
      if(err)
        res.send(err)
      res.json(journel)
    })
  })

module.exports = router;
