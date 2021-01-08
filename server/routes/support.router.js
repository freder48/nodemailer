const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//POST support
router.post('/', (req, res) => {
    const support = req.body;
    const queryText = `INSERT INTO "support" ("name", "email", "message")
                       VALUES ($1, $2, $3);`;
    pool.query(queryText, [support.name, support.email, support.message])
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error completing POST server query', err);
        res.sendStatus(500);
      });
  
  });

  //GET ALL support
//GET routes
router.get('/', (req, res) => {
  // Find all feedback and return them
  pool.query('SELECT * FROM "support" ORDER BY id DESC;').then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error GET support', error);
    res.sendStatus(500);
  });
}) //end get

  //DELETE support ON ADMIN PAGE
  router.delete('/:id', (req, res) => {
    let id = req.params.id
    console.log('delete support', id)
    const sqlText = 'DELETE FROM support WHERE id=$1';
    pool.query(sqlText, [id])
    .then(() => {res.sendStatus(200);})
    .catch((err)=>{
      console.log('Error completing DELETE query', err);
      res.sendStatus(500);
    });
  });
  

  



module.exports = router;