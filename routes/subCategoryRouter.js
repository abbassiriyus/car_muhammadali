const pool =require("../db");
const router=require('express').Router()

// GET all subcategory
router.get('/subcategory', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM subcategory');
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // GET a subcategory by id
  router.get('/subcategory/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await pool.query('SELECT * FROM subcategory WHERE id = $1', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // CREATE a new subcategory
  router.post('/subcategory', async (req, res) => {
    try {
      const { category_id, title } = req.body;
      const { rows } = await pool.query(
        'INSERT INTO subcategory (category_id, title) VALUES ($1, $2) RETURNING *',
        [category_id, title]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // UPDATE a subcategory
  router.put('/subcategory/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { category_id, title } = req.body;
      const { rows } = await pool.query(
        'UPDATE subcategory SET category_id = $1, title = $2, time_update = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
        [category_id, title, id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // DELETE a subcategory
  router.delete('/subcategory/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await pool.query('DELETE FROM subcategory WHERE id = $1 RETURNING *', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  });


module.exports=router