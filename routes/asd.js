const express = require('express');
const puppeteer = require('puppeteer');
const pool = require("../db");
const router = express.Router();

router.get('/categories1', async (req, res) => {
 try {
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
  
   // Sayt URL'ini o'rnating
   await page.goto('https://classiccars.com/listings/find?price-min=250000');
  
   // Sahifadagi kategoriyalarni olish
   const categories = await page.evaluate(() => {
     const categoryElements = document.querySelectorAll('#BrowseByPop > ul > li');
       
     return Array.from(categoryElements).map(el => {
       const [name, count] = el.textContent.trim().split(' (');
       return {
         name,
         count: parseInt(count, 10)
       };
     });
  
   });
  
   await browser.close();
  
   // Kategoriyalar ro'yxatidagi takrorlanishlarni olib tashlash
   const uniqueCategories = categories.reduce((acc, category) => {
     if (!acc.some(c => c.name === category.name)) {
       acc.push(category);
     }
     return acc;
   }, []);
  
   // Kategoriyalarni ma'lumotlar bazasiga qo'shish
   await pool.query(`
     BEGIN TRANSACTION;
  
     INSERT INTO category (title, looking, time_create, time_update)
     VALUES
     ${uniqueCategories.map(c => `('${c.name}', ${c.count}, current_timestamp, current_timestamp)`).join(', ')};
  
     COMMIT;
   `);
  
   res.json(uniqueCategories);
    
 } catch (error) {
   console.error('Error:', error);
   res.status(500).json({ error: error.message});
 }
 });
 router.get('/category-data', async (req, res) => {
    try {
      // PostgreSQL dan kategoriyalar ma'lumotlarini olish
      const categoriesResult = await pool.query('SELECT * FROM category');
      const categories = categoriesResult.rows;
  console.log(categories);
      // Har bir kategoriya uchun link yaratish va parsing qilish
      for (const category of categories) {
        const { title: categoryTitle, id } = category;
        console.log(id);
        const categoryUrl = `https://classiccars.com/listings/find/all-years/${categoryTitle.toLowerCase().replace(" ", '-')}`;
         console.log(categoryUrl);
        // Brauzerni ochish
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
  
        // Sahifani yuklash
        await page.goto(categoryUrl);
  
        // Subcategoriyalarni olish
        const subcategories = await page.$$eval('#BrowseByPop > ul > li', (items) =>{
            console.log(items)
          items.map((item) => ({
            // title: item.querySelector('#BrowseByPop > ul > li').innerHTML,
            looking: 0,
            // category_id:id   
          }))}
        );
  console.log(subcategories);
        // // Subcategoriyalarni PostgreSQL-ga saqlash
        // for (const subcategory of subcategories) {
        //   const { title, looking } = subcategory;
        //   await pool.query(
        //     'INSERT INTO subcategory (category_id, title, looking) VALUES ($1, $2, $3)',
        //     [categoryId, title, looking]
        //   );
        // }
  
        // // Kategoriya ma'lumotlarini saqlash
        // await pool.query(
        //   'INSERT INTO category (title, content) VALUES ($1, $2)',
        //   [categoryPageTitle, categoryContent]
        // );
  
        // Brauzerni yopish
        await browser.close();
      }
  
      // Natijalarni qaytarish
      res.json({ message: 'Kategoriya va subcategoriya ma\'lumotlari muvaffaqiyatli saqlab olindi' });
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
      res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    } finally {
      // PostgreSQL ulanishini yopish
      await pool.end();
    }
  });
module.exports = router;