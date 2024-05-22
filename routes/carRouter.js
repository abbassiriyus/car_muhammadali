const pool =require("../db");
const router=require('express').Router()



// Ma'lumotlarni olish
router.get('/cars', async (req, res) => {
    try {
      const car = await pool.query('SELECT * FROM car');
      const car_image = await pool.query('SELECT * FROM car_image');
for (let i = 0; i < car.rows.length; i++) {
  car.rows[i].all_img=[{"image":car.rows[i].image}]
 for (let j = 0; j < car_image.rows.length; j++) {

 if(car.rows[i].id==car_image.rows[j].car_id){
  car.rows[i].all_img.push(car_image.rows[j])
 }
 }}
 var a=car.rows
if (req.query.category) {
 a=a.filter(item=>item.category==req.query.category)
}
if (req.query.subcategory) {
 
 a=a.filter(item=>item.subcategory==req.query.subcategory)
}
if (req.query.year) {
 a=a.filter(item=>item.year==req.query.year)
}
console.log(a);
      res.json(a);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: error.message });
    }
  });
  

  router.get('/cars/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Increment the 'looking' value
      await pool.query('UPDATE car SET looking = looking + 1 WHERE id = $1', [id]);
  
      // Fetch the updated car
      const car = await pool.query('SELECT * FROM car WHERE id = $1', [id]);
      if (car.rows.length === 0) {
        return res.status(404).json({ message: 'Car not found' });
      }

      const car_image = await pool.query('SELECT * FROM car_image WHERE car_id = $1', [car.rows[0].id]);
      const category = await pool.query('SELECT * FROM category WHERE id = $1', [car.rows[0].category]);
      const subcategory = await pool.query('SELECT * FROM subcategory WHERE id = $1', [car.rows[0].subcategory]);

car.rows[0].make=category.rows[0].title
car.rows[0].all_img=car_image.rows
if(car.rows[0].image){
  car.rows[0].all_img.unshift({image:car.rows[0].image})
}
car.rows[0].model=subcategory.rows[0].title
      res.json(car.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  // Ma'lumot qo'shish
  router.post('/cars', async (req, res) => {
    const {
      title,
      image,
      listing_id,
      price,
      year,
      interior_color,
      exterior_color,
      transmission,
      odometer,
      subcategory,
      category,
      power_windows,
      air_conditioning,
      power_brakes,
      engine_condition,
      location,
      description,
    } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO car (title, image, listing_id, price, year, interior_color, exterior_color, transmission, odometer, subcategory, category, power_windows, air_conditioning, power_brakes, engine_condition, location, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17,) RETURNING *',
        [
          title,
          image,
          listing_id,
          price,
          year,
          interior_color,
          exterior_color,
          transmission,
          odometer,
          subcategory,
          category,
          power_windows,
          air_conditioning,
          power_brakes,
          engine_condition,
          location,
          description,
        ]
      );
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: error.message});
    }
  });
  
  // Ma'lumotni yangilash
  router.put('/cars/:id', async (req, res) => {
    const { id } = req.params;
    const {
      title,
      image,
      listing_id,
      price,
      year,
      interior_color,
      exterior_color,
      transmission,
      odometer,
      subcategory,
      category,
      power_windows,
      air_conditioning,
      power_brakes,
      engine_condition,
      location,
      description,
    } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE car SET title = $1, image = $2, listing_id = $3, price = $4, year = $5, interior_color = $6, exterior_color = $7, transmission = $8, odometer = $9, subcategory = $10, category = $11, power_windows = $12, air_conditioning = $13, power_brakes = $14, engine_condition = $15, location = $16, description = $17, time_update = current_timestamp WHERE id = $18 RETURNING *',
        [
          title,
          image,
          listing_id,
          price,
          year,
          interior_color,
          exterior_color,
          transmission,
          odometer,
          subcategory,
          category,
          power_windows,
          air_conditioning,
          power_brakes,
          engine_condition,
          location,
          description,
          id,
        ]
      );
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: error.message});
    }
  });
  
  // Ma'lumotni o'chirish
  router.delete('/cars/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('DELETE FROM car WHERE id = $1 RETURNING *', [id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: error.message});
    }
  });
  
  module.exports=router