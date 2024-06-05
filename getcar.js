

const puppeteer = require('puppeteer');
const pool = require("./db");

async function dataGet(categoryid,subcategoryid,reqcate,reqsub){
    try{
        
        var subcategory=reqsub.toLowerCase().replaceAll(' ','-')
  var category=reqcate.toLowerCase().replaceAll(' ','-')
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
  const carInfo = await page.evaluate(() => { const listing_id = document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-productID > span.w50.d-inline-block.b.fs-14.gray'); const title = document.querySelector('#listing-detail-content > div:nth-child(5) > div.vehicle-details > ul > li.border-btm.p-name > span');
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
   carInfo.link=all_link[k].href
    carDetails.push(carInfo);
  }  
  var as=[]
  for (let r = 0; r < carDetails.length; r++) {
    var push=true
  for (let t = 0; t < as.length; t++) {
  if(carDetails[r].title==as[t].title){
  push=false
  }
  }
  
  if(push){
  as.push(carDetails[r])
  }
  }
  carDetails=as
  
  for (var car of carDetails) {
    await page.goto(car.link)
  
      const {listing_id, title, price,location,year,make,model,interior_color,exterior_color,transmission,odometer,state,engine_condition,description,image} = car;
          const result = await pool.query(
              'INSERT INTO car (listing_id, title, price,location,year,make,model,interior_color,exterior_color,transmission,odometer,state,engine_condition,description,image,category,subcategory) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *',[listing_id, title, price,location,year,make,model,interior_color,exterior_color,transmission,odometer,state,engine_condition,description,image,categoryid,subcategoryid  ]
          );
         
      
     var  imageSources = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('#MCThumbsRapper .swiper-wrapper .swiper-slide'));
          return images.map(img => img.getAttribute('data-jumbo'));
        }); 
       
       var imageSources3=imageSources.filter(item=>item.length>2 && item.includes('photos.classiccar'))
  
  
  for (const image of imageSources3) {
  
    await pool.query(
      'INSERT INTO car_image (car_id, image) VALUES ($1, $2)',
      [result.rows[0].id, image]
    );
  }
       
        }
  console.log("ishladi toga");
  await browser.close();  
    
      }catch(err){
      console.log("dabdala");
      console.log(err);
      }
}

async function data2() {
    const categoriesResult = await pool.query('SELECT * FROM category');
for (let i = 47; i < categoriesResult.rows.length; i++) {
    const { rows } = await pool.query('SELECT * FROM subcategory WHERE category_id = $1', [categoriesResult.rows[i].id]);

  for (let j = 0; j <rows.length; j++) {
    console.log(categoriesResult.rows[i].id,rows[j].id);
    console.log(categoriesResult.rows[i].title,rows[j].title);
 await dataGet(categoriesResult.rows[i].id,rows[j].id,categoriesResult.rows[i].title,rows[j].title)
   
  }
    
}

}
data2()
