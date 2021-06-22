exports.subStock = (stock, obj, seq, last_price_arg) => {
  let new_obj = {}
  let stockNow = stock
  let purchasePrice = 0
  let last_price = last_price_arg

  new_obj.B = obj.B

  for (let i = 3; i < seq.length - 1; i += 2) {
    if (obj[seq[i]]>0) {
      
      let diff = obj[seq[i]] - stockNow
      if (diff >= 0) {
        let newNum = obj[seq[i]] - stockNow
        new_obj[seq[i]] = newNum
        new_obj[seq[i + 1]] = obj[seq[i + 1]]
        purchasePrice += stockNow * new_obj[seq[i + 1]]
        stockNow = 0
      } else {
        new_obj[seq[i]] = 0
        new_obj[seq[i + 1]] = 0
        stockNow -= obj[seq[i]]
        purchasePrice += obj[seq[i]] * obj[seq[i + 1]]
        last_price = obj[seq[i + 1]]
      }
    }
  }
  if(stockNow > 0) {
    purchasePrice +=  (stockNow * last_price)
  }
  return {
    'object': new_obj,
    'purchasePrice': purchasePrice
  }
}