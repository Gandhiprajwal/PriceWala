import { Product } from "@/types";
import { PriceHistoryItem } from "@/types";


const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;

export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    // if (priceText) {
    //   // const cleanInput = priceText.replace(/\.\d{1,3}(,\d{3})?/g, "");
    //   // return cleanInput.split(".")[0];
    //   return priceText.split(".")[0].replace(/\D/g, "");
    //   // return priceText.replace(/\D/g, "");
    // }
    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, "");

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      }

      return firstPrice || cleanPrice;
    }
  }
  return "";
}

export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

export function extractDescription($: any) {
  const selectors = [".a-unordered-list .a-list-item"];
  for (const selector of selectors) {
    const element = $(selector);
    if (element.length > 0) {
      const textContent = element
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("/n");
      return textContent;
    }
  }
  return "";
}

export function extractCategory(element: any) {
  const text = element.text().trim();
  const match = text.match(/(.*?)\n/);
  if (match) {
    return match[1].trim();
  }
  return "";
}

export function extractReviewCount(element: any) {
  // for (const element of elements) {
  const text: any = element.text().trim();
  // console.log(text);
  const match = text.match(/(\d{1,3}(,\d{3})*)\s+ratings/);
  if (match) {
    return match[1].replace(/,/g, "");
  }
  return "10";
  // }
}

export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}

// export const getEmailNotifType = (
//   scrapedProduct: Product,
//   currentProduct: Product
// ) => {
//   const lowestPrice = getLowestPrice(currentProduct.priceHistory);

//   if (scrapedProduct.currentPrice < lowestPrice) {
//     return Notification.LOWEST_PRICE as keyof typeof Notification;
//   }
//   if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
//     return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
//   }
//   if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
//     return Notification.THRESHOLD_MET as keyof typeof Notification;
//   }

//   return null;
// };

export const formatNumber = (num: number = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};