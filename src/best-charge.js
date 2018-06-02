function bestCharge(selectedItems) {
  var items = loadAllItems();
  let discount = loadPromotions();
  var inputs = selectedItems;
  const cartItems = [];
  var r = [];
  const splitedInputs = inputs.map(input => input.split('x'))          //把数组从 x 分割
  //0: Array [ "ITEM0001 ", " 1" ],1: Array["ITEM0013 ", " 2"],2: Array["ITEM0022 ", " 1"]
  for (let splitedInput of splitedInputs) {
    let item = items.find(item => item.id === splitedInput[0].trim())   //.trim()去掉空格
    cartItems.push({ item, count: parseInt(splitedInput[1]) })          //把count和items放到一个数组cartItems里
    r.push(splitedInput[0].trim());                                     //r 只存储它的餐名
  }
  var sum = 0;
  var hcount = 0, rcount = 0, lcount = 0;
  var sum1 = 0, total = 0, sum2 = 0;
  var hcount1, rcount1;
  var type, reduce = 0;
  var output;


  if (r.length === 3) {                                      //当点三个餐的时候的方法
    hcount = cartItems[0].count * cartItems[0].item.price;
    rcount = cartItems[1].count * cartItems[1].item.price;
    lcount = cartItems[2].count * cartItems[2].item.price;
    sum1 = hcount + rcount + lcount;
    total = sum1;
    if (sum1 >= 30) {
      sum1 -= 6;
    }
    if (r.includes(discount[1].items[0], discount[1].items[1]) === true) {
      hcount1 = hcount / 2;
      lcount1 = lcount / 2;
    }
    sum2 = hcount1 + rcount + lcount1;
    if (sum1 > sum2) {
      sum = sum2;
      type = discount[1].type;
    }
    else {
      sum = sum1;
      type = discount[0].type;
    }
    reduce = total - sum;

    output = "============= 订餐明细 =============\n" +
      cartItems[0].item.name + " x " + cartItems[0].count + " = " + hcount + "元\n" +
      cartItems[1].item.name + " x " + cartItems[1].count + " = " + rcount + "元\n" +
      cartItems[2].item.name + " x " + cartItems[2].count + " = " + lcount + "元\n" +
      "-----------------------------------\n" +
      "使用优惠:\n" +
      type + "(" + cartItems[0].item.name + "，" + cartItems[2].item.name + ")，省" + reduce + "元\n" +
      "-----------------------------------\n" +
      "总计：" + sum + "元\n" +
      "==================================="
    return output;
  }




  if (r.length === 2) {                                      //当点两个餐的时候的方法
    hcount = cartItems[0].count * cartItems[0].item.price;
    rcount = cartItems[1].count * cartItems[1].item.price;
    sum1 = hcount + rcount;
    total = sum1;
    if (sum1 >= 30) {
      sum1 -= 6;
    }
    if (r.includes(discount[1].items[0], discount[1].items[1]) === true) {
      hcount1 = hcount / 2;
      rcount1 = rcount / 2;
    }
    sum2 = hcount1 + rcount1;
    if (sum1 > sum2) {
      sum = sum2;
      type = discount[1].type;
    }
    else {
      sum = sum1;
      type = discount[0].type;
    }
    reduce = total - sum;
    output = "============= 订餐明细 =============\n" +
      cartItems[0].item.name + " x " + cartItems[0].count + " = " + hcount + "元\n" +
      cartItems[1].item.name + " x " + cartItems[1].count + " = " + rcount + "元\n" +
      "-----------------------------------\n" +
      "使用优惠:\n" +
      type + "，省" + reduce + "元\n" +
      "-----------------------------------\n" +
      "总计：" + sum + "元\n" +
      "==================================="
    return output;
  }


  if (r.length === 1) {                                      //当点一个餐的时候的方法
    hcount = cartItems[0].count * cartItems[0].item.price;
    sum = hcount;
    output = "============= 订餐明细 =============\n" +
      cartItems[0].item.name + " x " + cartItems[0].count + " = " + hcount + "元\n" +
      "-----------------------------------\n" +
      "总计：" + sum + "元\n" +
      "==================================="
    return output;

  }
} 