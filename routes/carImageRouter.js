
const pool =require("../db");
const router=require('express').Router()

// Ma'lumotlarni olish
router.get('/car_images', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM car_image');
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Ma'lumot qo'shish
  router.post('/car_images', async (req, res) => {
    const { car_id, image } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO car_image (car_id, image) VALUES ($1, $2) RETURNING *',
        [car_id, image]
      );
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Ma'lumotni yangilash
  router.put('/car_images/:id', async (req, res) => {
    const { id } = req.params;
    const { car_id, image } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE car_image SET car_id = $1, image = $2, time_update = current_timestamp WHERE id = $3 RETURNING *',
        [car_id, image, id]
      );
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Ma'lumotni o'chirish
  router.delete('/car_images/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('DELETE FROM car_image WHERE id = $1 RETURNING *', [id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports=router