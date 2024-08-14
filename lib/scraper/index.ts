import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractCurrency,
  extractPrice,
  extractDescription,
  extractCategory,
  extractReviewCount,
} from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;
  // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_e274f1ae-zone-pricewala:j9jbr0f2xbvz -k "https://geo.brdtest.com/mygeo.json"
  // BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password: password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };
  try {
    // fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);
    // console.log(response);
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $("span #tp_price_block_total_price_in"),
      $("span .a-price .a-price-whole")
    );
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );
    const outOfStock =
      $(`#availablity span`).text().trim().toLowerCase() ===
      "currently unavailable";
    const images: any =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image");
    const imageUrls = Object.keys(JSON.parse(images));
    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".reinventPriceSavingsPercentageMargin")
      .text()
      .replace(/[-%]/g, "");
    const description = extractDescription($);
    const category = extractCategory($(".a-link-normal"));
    const ratingCount = extractReviewCount(
      // $('#acrCustomerReviewText'),
      $("span .a-size-base")
    );
    // console.log(ratingCount);
    // console.log({
    //   title,
    //   currentPrice,
    //   originalPrice,
    //   outOfStock,
    //   imageUrls,
    //   currency,
    //   discountRate,
    //   description
    // });
    // construct data oject with scraped information
    const data = {
      title,
      currency: currency || "$",
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      discountRate: Number(discountRate),
      priceHistory: [],
      category: category,
      isOutOfStock: outOfStock,
      url,
      image: imageUrls[0],
      reviewCount: Number(ratingCount),
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };
    // console.log(data);
    return data;
  } catch (err: any) {
    throw new Error(`Failed to scrape product: ${err.message}`);
  }
}
function extractCurrent(arg0: cheerio.Cheerio<import("domhandler").Element>) {
  throw new Error("Function not implemented.");
}
