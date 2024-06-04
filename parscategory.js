const express = require('express');
const puppeteer = require('puppeteer');
const pool = require("./db");



async function  getcategory() {
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
       
          INSERT INTO category (title, count, time_create, time_update)
          VALUES
          ${uniqueCategories.map(c => `('${c.name}', ${c.count}, current_timestamp, current_timestamp)`).join(', ')};
       
          COMMIT;
        `);
       console.log(uniqueCategories, 'barcha ketegoryalar olindi sohib');        
      } catch (error) {
        console.error('Error:', error);
        console.log("xatolik bor");
      }}


  getcategory() 
