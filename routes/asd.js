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
 
var suball=[]
for (let i = 0; i < categories.length; i++) {
 var  categoryTitle=categories[i].title
 var categoryid=categories[i].id
  const categoryUrl = `https://classiccars.com/listings/find/all-years/${categoryTitle.toLowerCase().replace(" ", '-')}`;
  const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(categoryUrl);
        console.log(categoryUrl);
        const subcategories = await page.evaluate(() => {
        const subcategoryElements = document.querySelectorAll('#BrowseByPop > ul > li');
    
  return Array.from(subcategoryElements).map(el => {
    const [name, count] = el.textContent.trim().split(' (');
    return {
      name,
      count: parseInt(count, 10),
    };
  });
});


        for (const subcategory of subcategories) {
          const { name, count } = subcategory;
          await pool.query(
            'INSERT INTO subcategory (category_id, title, looking) VALUES ($1, $2, $3)',
            [categoryid, name, count]
          );
        }
      await browser.close();   
suball.concat(subcategories)
console.log(subcategories);
}
 

console.log(suball);

      
  
      // Natijalarni qaytarish
      res.json(suball);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
      res.status(500).json({ error: error.message });
    } finally {
      // PostgreSQL ulanishini yopish
      await pool.end();
    }
  });



  router.get('/getcar/:id/:subid', async (req,res)=>{
    try{
      var categoryid=req.params.id
      var subcategoryid=req.params.subid
      var subcategory=(req.query.subcategory).toLowerCase().replaceAll(' ','-')
var category=(req.query.category).toLowerCase().replaceAll(' ','-')
 var url =`https://classiccars.com/listings/find/all-years/${category}/${subcategory}?ps=60`

 const browser = await puppeteer.launch();
 const page = await browser.newPage();
 await page.goto(url);
 const all_link = await page.evaluate(() => {
   const routcass = document.querySelectorAll('#ClunkyHide .search-result-item a');
 
   return Array.from(routcass).map(el => {
     return {
       href: el.href
     };
   });
 });

var carDetails = [];
for (let k = 0; k < all_link.length; k++) {
 await page.goto(all_link[k].href);
   const carInfo = await page.evaluate(() => {
    const listing_id = document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-productID > span.w50.d-inline-block.b.fs-14.gray');
    const title = document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-name > span');
    const price = document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-price > span.w50.d-inline-block.b.fs-18.red');
    const location = document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-address > span.w40.d-inline-block.b.fs-14.gray');
    // Boshqa kerakli ma'lumotlarni ham shu tarzda oling
const year=document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.dt-start > span.w50.d-inline-block.b.fs-14.gray');
const make=document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-manufacturer > span.w50.d-inline-block.b.fs-14.gray');
const model=document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-model > span.w40.d-inline-block.b.fs-14.gray');
const interior_color=document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li:nth-child(9) > span.w50.d-inline-block.b.fs-14.gray');
const exterior_color=document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-color > span.w50.d-inline-block.b.fs-14.gray');
const transmission=document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-transmission > span.w50.d-inline-block.b.fs-14.gray');
const odometer=document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-odometer > span.w50.d-inline-block.b.fs-14.gray');
const state=document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-address > span.w40.d-inline-block.b.fs-14.gray');
const power_windows=false;
const air_conditioning=false;
const power_brakes=false;
const engine_condition=document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-condition > span.w50.d-inline-block.b.fs-14.gray');
const description=document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-description.pad-sm.bg-lt-gray.h-card > div.p-description.font-hostile-takeover');
const image=document.querySelector('#ListingCarousel  img')
let priceString = price?price.textContent:'';

// Remove the dollar sign
priceString = priceString.replace('$', '');

// Remove the commas
priceString = priceString.replace(',', '');

    return {
      listing_id:listing_id?listing_id.textContent:'',
      title:title?title.textContent:'',
      price:priceString,
      location:location?location.textContent:'',
      year:year?year.textContent:'',
      make:make?make.textContent:'',
      model:model?model.textContent:'',
      interior_color:interior_color?interior_color.textContent:'',
      exterior_color:exterior_color?exterior_color.textContent:'',
      transmission:transmission?transmission.textContent:'',
      odometer:odometer?odometer.textContent:'',
      state:state?state.textContent:'',
      engine_condition:engine_condition?engine_condition.textContent:'',
      description:description?description.textContent:'',
      image:image?image.src:'',
    };
  });
  carDetails.push(carInfo);
}  
let uniqueNames = {};
 carDetails = carDetails.filter(item => {
  // If the name is not in the uniqueNames object, add it and keep the item
  if (!uniqueNames.hasOwnProperty(item.name)) {
    uniqueNames[item.name] = item;
    return true;
  }
  // Otherwise, skip the item
  return false;
});

console.log(carDetails);

for (const car of carDetails) {
    const {listing_id, title, price,location,year,make,model,interior_color,exterior_color,transmission,odometer,state,engine_condition,description,image} = car;
        const result = await pool.query(
          'INSERT INTO car (listing_id, title, price,location,year,make,model,interior_color,exterior_color,transmission,odometer,state,engine_condition,description,image,category,subcategory) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *',[listing_id, title, price,location,year,make,model,interior_color,exterior_color,transmission,odometer,state,engine_condition,description,image,categoryid,subcategoryid  ]
        );
   
        const imageSources = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('#ListingCarousel img'));
          return images.map(img => img.src);
        });
     var   imageSources3=imageSources.filter(item=>item.length>2)
     imageSources3.splice(0,1)
for (const image of imageSources3) {

  await pool.query(
    'INSERT INTO car_image (car_id, image) VALUES ($1, $2)',
    [result.rows[0].id, image]
  );
}
      }
 res.status(200).send("bajarildi")
await browser.close();  
  
    }catch(err){
    res.status(500).send({error:err.message })
    console.log(err);
    }

  })
module.exports = router;