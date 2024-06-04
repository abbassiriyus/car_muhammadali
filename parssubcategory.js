const puppeteer = require('puppeteer');
const pool = require("./db");

async function getsubcategory() {
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
    console.log(categoryUrl);
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
              'INSERT INTO subcategory (category_id, title, count) VALUES ($1, $2, $3)',
              [categoryid, name, count]
            );
          }
        await browser.close();   
  suball.concat(subcategories)
  console.log(subcategories);
  }
   
  
  console.log(suball,"hammasini olib bo`ldik yana nima kerak sohib");
  
        
    
       
      } catch (error) {
        console.error('Xatolik yuz berdi:', error);

      } finally {
        // PostgreSQL ulanishini yopish
        await pool.end();
      }
}
getsubcategory()