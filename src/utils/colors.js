function getRgbNum(sColor) {
  if (sColor.length === 4) {
    let sColorNew = "#";
    for (let i = 1; i < 4; i++) {
      //补全颜色值 例如：#eee,#fff等
      sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
    }
    sColor = sColorNew;
  }
  //处理六位颜色值
  let sColorChange = [];
  for (let i = 1; i < 7; i += 2) {
    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
  }
  return sColorChange;
}

export function lightOrDarkenColor(color, percent) {
  let colorArr = getRgbNum(color);
  let newColor = colorArr.map((cNum) => {
    if (percent === 0) {
      return cNum;
    } else if (percent < 0) {
      let cPercent = percent < -1 ? -percent / 100 : -percent;
      cNum = checkColor(Math.floor(cNum * cPercent));
      return cNum;
    } else {
      let cPercent = percent > 1 ? percent / 100 : percent;
      cNum = checkColor(Math.floor(cNum + (255 - cNum) * cPercent));
      return cNum;
    }
  });

  function checkColor(cNum) {
    if (cNum < 0) {
      return 0;
    } else if (cNum > 255) {
      return 255;
    } else {
      return cNum;
    }
  }

  return (newColor = newColor.reduce((str, cNum) => {
    str += parseInt(cNum, 16);
    return str;
  }, "#"));
}
