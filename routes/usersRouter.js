const jwt = require("jsonwebtoken");
const pool =require("../db");
const router=require('express').Router()

router.post('/users', async (req, res) => {
    try {
      const { lastname, firstname, phone, email, password } = req.body;
      const time_create = new Date();
      const time_update = time_create;
  
      const query = 'INSERT INTO users (lastname, firstname, phone, email, password, time_create, time_update) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const values = [lastname, firstname, phone, email, password, time_create, time_update];
  
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
      const values = [email, password];
  
      const result = await pool.query(query, values);
      const user = result.rows[0];
  
      if (user) {
        const token = jwt.sign({ userId: user.id }, "secretKey");
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  router.get('/users', async (req, res) => {
    try {
      const query = 'SELECT * FROM users';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  router.put('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { lastname, firstname, phone, email, password } = req.body;
      const time_update = new Date();
  
      const query = 'UPDATE users SET lastname = $1, firstname = $2, phone = $3, email = $4, password = $5, time_update = $6 WHERE id = $7 RETURNING *';
      const values = [lastname, firstname, phone, email, password, time_update, id];
  
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.delete('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const query = 'DELETE FROM users WHERE id = $1';
      const values = [id];
  
      await pool.query(query, values);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports=router