const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.use(authenticate);
router.use(authorizeAdmin);


function convertToDownloadLink(viewLink) {
  const match = viewLink.match(/\/d\/(.*?)\//);
  if (match && match[1]) {
      return `https://drive.google.com/uc?id=${match[1]}&export=download`;
  } else {
      return viewLink;
  }
}


// Admin Panel to add/edit notes (authentication required)
router.get('/',async (req, res) => {
    try {
        const notes = await Note.find();
        res.render('adminPanel', { notes, admin: req.user });
    } catch (err) {
        console.log(err);
    }
});

router.get('/add', async (req, res) => {
    try {
        res.render('addNote');
    } catch (err) {
        console.log(err);
    }
});

// Add New Note
router.post('/add',  async (req, res) => {
    try {
        const newNote = new Note({
            name: req.body.name,
            title: req.body.title,
            imageURL: req.body.imageURL,
            description: req.body.description,
            downloadURL: convertToDownloadLink(req.body.downloadURL) ,
            showNotesURL: req.body.showNotesURL,
        });
        await newNote.save();
        res.redirect('/admin');
    } catch (err) {
        console.log(err);
    }
});

// Edit Note
router.get('/edit/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.render('editNote', { note });
    } catch (err) {
        console.log(err);
    }
});

// Update Note
router.post('/edit/:id',  async (req, res) => {
    try {
        await Note.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            title: req.body.title,
            imageURL: req.body.imageURL,
            description: req.body.description,
            downloadURL: convertToDownloadLink(req.body.downloadURL) ,
            showNotesURL: req.body.showNotesURL,
        });
        res.redirect('/admin');
    } catch (err) {
        console.log(err);
        res.redirect('/admin');
    }
});

// Delete Note
router.post('/delete/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (err) {
        console.log(err);
        res.redirect('/admin');
    }
});

module.exports = router;