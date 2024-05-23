const pool = require("../db");
const router = require('express').Router();

// Create a new favorite
router.post('/favorite', async (req, res) => {
  const { user_id, car_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO favorite (user_id, car_id) VALUES ($1, $2) RETURNING *',
      [user_id, car_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all favorites
router.get('/favorite', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM favorite');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific favorite by ID
router.get('/favorite/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const car = await pool.query('SELECT * FROM car');
    // console.log(car.rows);
    const result = await pool.query('SELECT * FROM favorite WHERE user_id = $1', [id]);
    console.log(result.rows);
    var send1=[]
    for (let i = 0; i < car.rows.length; i++) {
     for (let j = 0; j < result.rows.length; j++) {
     if(car.rows[i].id==result.rows[j].car_id){
      car.rows[i].id1=result.rows[j].id
     send1.push(car.rows[i])
     }
     }
    }


    res.json(send1);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error:error.message });
  }
});

// Update a favorite
router.put('/favorite/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id, car_id } = req.body;

  try {
    const result = await pool.query(
      'UPDATE favorite SET user_id = $1, car_id = $2, time_update = current_timestamp WHERE id = $3 RETURNING *',
      [user_id, car_id, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a favorite
router.delete('/favorite/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM favorite WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;