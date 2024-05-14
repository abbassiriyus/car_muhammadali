const pool =require("../db");
const router=require('express').Router()


// Ma'lumotlarni olish
router.get('/category', async (req, res) => {
    try {
      const category = await pool.query('SELECT * FROM category');
      const subcategory = await pool.query('SELECT * FROM subcategory');
for (let i = 0; i < category.rows.length; i++) {
  category.rows[i].sub=[]
for (let j = 0; j < subcategory.rows.length; j++) {
if(category.rows[i].id==subcategory.rows[j].category_id){
  category.rows[i].sub.push(subcategory.rows[j])
}
}
}
      res.json(category.rows);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Ma'lumot qo'shish
  router.post('/category', async (req, res) => {
    const { title } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO category (title) VALUES ($1) RETURNING *',
        [title]
      );
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Ma'lumotni yangilash
  router.put('/category/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE category SET title = $1, time_update = current_timestamp WHERE id = $2 RETURNING *',
        [title, id]
      );
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Ma'lumotni o'chirish
  router.delete('/category/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('DELETE FROM category WHERE id = $1 RETURNING *', [id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports=router