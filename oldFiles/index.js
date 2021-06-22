const excelToJson = require('convert-excel-to-json');
const { getGross } = require('./getGross');

checkPosPurch = (prodPurch, seq) => {
  for (i = 1; i < seq.length - 1; i += 2) {
    if(prodPurch[seq[i]] > 0) {
      return true
    } 
  }
  return false
}

// const stockNow = excelToJson({
//   sourceFile: './Gross profit/current stock.xlsx'
// }).Εκτύπωση;
const purchases = excelToJson({
  sourceFile: './Gross profit/1.3-15.3/agores 1.8-15.3.xlsx'
}).Εκτύπωση;
const sales_eshop = excelToJson({
  sourceFile: './Gross profit/1.3-15.3/e-shop 1.3-15.3.xlsx'
}).Εκτύπωση;
const sales_pharm = excelToJson({
  sourceFile: './Gross profit/1.3-15.3/pharm 1.3-15.3.xlsx'
}).Εκτύπωση;

const seq = Object.keys(purchases[1])

let fullGrossProfit = 0
let noPurch = []

let noPurchSum = 0
// let count = 0
for(prodEshop of sales_eshop.slice(2)){
  let prodID = prodEshop.A
  let prodPharm = sales_pharm.slice(2).filter(obj => obj.A == prodID)
  let prodPurch = purchases.slice(2).filter(obj => obj.A == prodID)
  // let prodStock = stockNow.slice(1).filter(obj => obj.A == prodID)

  // console.log('ID')
  // console.log(prodID)
  // console.log('eshop')
  // console.log(prodEshop)
  // console.log('pharm')
  // console.log(prodPharm)
  // console.log('stock')
  // console.log(prodStock)
  // console.log('purch')
  // console.log(prodPurch)

  if(prodPurch.length > 0 && checkPosPurch(prodPurch[0], seq)) {

    // if(prodStock.length == 0) {
    //   prodStock = [{A: prodID, B: 0}]
    // }

    if(prodPharm.length == 0) {
      prodPharm = [{A:prodID}]
    }
    fullGrossProfit += getGross(undefined, prodPurch[0], prodEshop, prodPharm[0], seq)
    // fullGrossProfit += getGross(prodStock[0], prodPurch[0], prodEshop, prodPharm[0], seq)
    // console.log(fullGrossProfit)
    // console.error('YES')
  } else {
    //console.log('no purchases')
    let fullprice = 0
    let prodNum = 0
    for (i = 1; i < seq.length + 1; i += 2){
      if(prodEshop[seq[i]] && prodEshop[seq[i+1]]){
        fullprice += prodEshop[seq[i+1]]
        prodNum += prodEshop[seq[i]]
      }
    }
    // fullGrossProfit += fullprice
    noPurchSum += fullprice
    noPurch.push({'id': prodEshop.A, 'num': prodNum})
  }
  // console.log(count)
  // console.log(fullGrossProfit)
  // count++
}

console.log(`Gross Profit: ${fullGrossProfit}`)
//console.log(noPurch)
console.log(`No purchase Sum: ${noPurchSum}`)
