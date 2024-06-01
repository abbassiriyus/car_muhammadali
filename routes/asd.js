const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.get('/categories', async (req, res) => {
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

    res.json(categories);
  
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message});
  }
});

module.exports = router;