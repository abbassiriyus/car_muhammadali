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
  console.log("23");
 a=a.filter(item=>item.category==req.query.category)
}
if (req.query.subcategory) {
  console.log("23");
 
 a=a.filter(item=>item.subcategory==req.query.subcategory)
}
if (req.query.year) {
  console.log("23");
 
 a=a.filter(item=>item.year==req.query.year)
}
console.log(a);
      res.json(a);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: error.message });
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
      make,
      model,
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
        'INSERT INTO car (title, image, listing_id, price, year, make, model, interior_color, exterior_color, transmission, odometer, subcategory, category, power_windows, air_conditioning, power_brakes, engine_condition, location, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *',
        [
          title,
          image,
          listing_id,
          price,
          year,
          make,
          model,
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
      res.status(500).json({ error: 'Internal server error' });
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
      make,
      model,
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
        'UPDATE car SET title = $1, image = $2, listing_id = $3, price = $4, year = $5, make = $6, model = $7, interior_color = $8, exterior_color = $9, transmission = $10, odometer = $11, subcategory = $12, category = $13, power_windows = $14, air_conditioning = $15, power_brakes = $16, engine_condition = $17, location = $18, description = $19, time_update = current_timestamp WHERE id = $20 RETURNING *',
        [
          title,
          image,
          listing_id,
          price,
          year,
          make,
          model,
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
      res.status(500).json({ error: 'Internal server error' });
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
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports=router