const excelToJson = require('convert-excel-to-json')

const {
  showSingle
} = require('./showSingle');
const {
  subStock
} = require('./subStock');

const yearEndBonus = excelToJson({
  sourceFile: './Gross profit/1.3-15.3/full products.xlsx'
}).Sheet1;


exports.getGross = (jsonStock, jsonPurchase, jsonSale, jsonPharm, seq) => {
  let yeb_disc = 1
  let prodID = jsonSale.A
  let yeb = yearEndBonus.filter(obj => obj.A == prodID)[0]
  if(yeb) {
    yeb_disc = 1 - (yeb.B * 0.01) 
  }
  
  let newJsonPurchase = showSingle(jsonPurchase, seq)
  let grossProfit = 0;

  let fullprice = 0
  let prodNum = 0
  for (i = 1; i < seq.length + 1; i += 2){
    if(jsonPurchase[seq[i]] > 0){
      if(jsonPurchase[seq[i+1]]){
        fullprice += jsonPurchase[seq[i+1]]
      }
      prodNum += jsonPurchase[seq[i]]
    }
  }

  let last_price = fullprice / prodNum

  // console.log(last_price)

  // newJsonPurchase = subStock(jsonStock.B, newJsonPurchase, seq, last_price).object

  for (i = 1; i < seq.length - 1; i += 2) {

    if (jsonSale[seq[i]] && jsonSale[seq[i + 1]]) {
      let salesNum = jsonSale[seq[i]]
      let salesSum = jsonSale[seq[i + 1]]
      let result = subStock(salesNum, newJsonPurchase, seq, last_price)
      // console.log('eshop')
      // console.log(result)
      // console.log(result.purchasePrice)
      newJsonPurchase = result.object
      // console.log(salesSum)
      grossProfit += (salesSum - result.purchasePrice * yeb_disc)
      console.log(grossProfit)
    }
    if (jsonPharm[seq[i]]) {
      let salesNum = jsonPharm[seq[i]]
      let result = subStock(salesNum, newJsonPurchase, seq, last_price)
      // console.log('pharm')
      // console.log(result)
      result.purchasePrice = 0
      newJsonPurchase = result.object
    }
  }
  return grossProfit
}

