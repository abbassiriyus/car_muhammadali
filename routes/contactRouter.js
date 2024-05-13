
const pool =require("../db");
const router=require('express').Router()

// Ma'lumotlarni olish
router.get('/contacts', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM contact');
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Ma'lumot qo'shish
  router.post('/contacts', async (req, res) => {
    const { lastname, firstname, phone, email, password } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO contact (lastname, firstname, phone, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [lastname, firstname, phone, email, password]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Ma'lumotni yangilash
  router.put('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const { lastname, firstname, phone, email, password } = req.body;
    try {
      const result = await pool.query(
        'UPDATE contact SET lastname = $1, firstname = $2, phone = $3, email = $4, password = $5, time_update = current_timestamp WHERE id = $6 RETURNING *',
        [lastname, firstname, phone, email, password, id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Ma'lumotni o'chirish
  router.delete('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM contact WHERE id = $1 RETURNING *', [id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  module.exports=router