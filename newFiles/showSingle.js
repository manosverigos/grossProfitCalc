exports.showSingle = (obj, seq) => {
  let new_obj = {}

  new_obj.B = obj.B

  for (let i = 4; i < seq.length+1; i += 2){
    if(obj[seq[i]]){
      let singlePrice = obj[seq[i]] / obj[seq[i-1]]
      new_obj[seq[i-1]] = obj[seq[i-1]]
      new_obj[seq[i]] = singlePrice
    }
  }
  return new_obj
}