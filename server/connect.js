const express = require('express');
const router = express.Router();
const mysql = require('mysql'); //importing mysql module

const connection = mysql.createConnection({ //create connection between node js and the database
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'CodeNotes'
});

let notes = [];

connection.connect(function (error) {
  if (error) throw error;
});



// GET ALL DATA FROM NOTES TABLE
getData = () => {
  connection.query('SELECT * FROM notes', (error, results) => {
    notes = results
    console.log(notes);
  })
} 

getData();



//GET ALL DATA FROM FOLDERS TABLE (DATABASE)
router.get('/folders', function (req, res) {
  connection.query('SELECT * FROM folders', (error, results, fields) => {
    if (error) throw error;
    console.log('Folders : ', results); //use results[0].folder_id for specific data
    res.status(200).send(results)
  });
});



// SEARCH FOR A FOLDER BY FOLDER NAME
// router.post('/folders', function (req, res) {
//   connection.query(`SELECT LOCATE('${req.body.search}', folder_name) FROM folders;`, (error, results, fields) => {
//       if (error) throw error;
//       res.status(200).send(results)
//     })
// })



//CREATE A NEW FOLDER
router.post('/folders/:folderId', function (req, res) {
  connection.query(
    `INSERT INTO folders (folder_name) 
     VALUES ('${req.body.folder_name}')`, (error, results, fields) => {
    if (error) throw error;
    res.status(200).send("Folder created successfully")
  })
})



// GET NOTES OF A SPECIFIC FOLDER
router.get('/folders/:folderId/notes', function (req, res) {
  connection.query(`SELECT * FROM notes WHERE folder_id = ${req.params.folderId}`, (error, results, fields) => {
    if (error) throw error;
    res.status(200).send(results)
  });
});



// GET NOTE CONTENT OF A SPECIFIC NOTE
router.get('/folders/:folder_id/:note_id/note', function (req, res) {
  connection.query(`SELECT note_content FROM notes WHERE note_id = ${req.params.note_id}`, (error, results, fields) => {
    if (error) throw error;
    res.status(200).send(results)
  })
})



// ADD CONTENT TO A SPECIFIC NOTE
router.post('/folders/:folderId/:noteId/note', function (req, res) {
  connection.query(`UPDATE notes SET note_content = '${req.body.noteContent}' WHERE note_id = ${req.params.noteId}`, (error, results, fields) => {
    if (error) throw error;
    res.status(200).send("Note saved !")
  })
})



//CREATE A NEW NOTE
router.post('/folders/:folderId/:noteId', function (req, res) {
  connection.query(`INSERT INTO notes (folder_id, note_title) VALUES ('${req.params.folderId}', '${req.body.note_title}')`, (error, results, fields) => {
    if (error) throw error;
    res.status(200).send("Note saved !")
  })
});



//GET LIST OF GENERAL NOTES TITLES
router.get('/notes', function(req, res) {
  connection.query(`SELECT note_name FROM notes;` , (error, results, fields) => {
    if (error) throw error;
    res.status(200).send(results)
  })
})



//GET ALL GENERAL NOTES CONTENTS
router.get('/notes', function(req, res) {
  connection.query(`SELECT note_content FROM notes;` , (error, results, fields) => {
    if (error) throw error;
    res.status(200).send(results)
  })
})



// SEARCH FOR A NOTE BY TITLE
// router.post('/notes', function(req, res) {
//   connection.query(`SELECT LOCATE('${req.body.search}', note_title) FROM notes;` , (error, results, fields) => {
//     if (error) throw error;
//     res.status(200).send(results)
//   })
// })



// SEARCH FOR A NOTE BY NOTE CONTENT
// router.post('/notes', function(req, res) {
//   console.log(req.body)
//   connection.query(`SELECT LOCATE('${req.body.search}', note_content) FROM notes;` , (error, results, fields) => {
//     if (error) throw error;
//     res.status(200).send(results)
//   })
// })




// end the connection betweem nodeJs and db
function endconnection() {
  connection.end(function (error) {
    if (error) {
      return console.log('error:' + err.message);
    }
    console.log('Database connection has ended');
  });
}

module.exports = router;