const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

// Assign server path...
const port = 3000;


app.get('/api/products', async (req, res) => {
  try {

    // Use Website URl to making Web Scrapping.....
    const response = await axios.get('http://kokkokm.com/shop');
    const html = response.data;
    const $ = cheerio.load(html);


    // Product Detail List
    const productDetails = [];

    // Replace this selector and extraction logic with your specific requirements
    $('form.card.oe_product_cart').each((index, formElement) => {
      const productName = $(formElement).find('h6.o_wsale_products_item_title a').text().trim();
      const productImage = $(formElement).find('div.oe_product_image img').attr('src');
      const productPrice = $(formElement).find('div.product_price span.oe_currency_value').text().trim();

    //Response to need display
      productDetails.push({
        name: productName,
        image: productImage,
        price: productPrice,
      });
    });

    // Send the scraped data as JSON
    res.json({ products: productDetails });

  } catch (error) {
    console.error('Error:', error);

    // Return Response error or Failure
    res.status(500).send('Internal Server Error');
  }
});


// Check the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
