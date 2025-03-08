const express = require('express');
const router = express.Router();
const Note = require('../models/note');



// Home Page - Display all Notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.render('home', { notes });
  } catch (err) {
    console.log(err);
  }
});

// Note Detail Page
router.get('/note/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.render('noteDetail', { note });
  } catch (err) {
    console.log(err);
  }
});




module.exports = router;
