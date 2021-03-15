export function fixNumber(num) {
  num = typeof num === "number" ? num : Number(num);
  if (isNaN(num)) {
    return;
  }
  return num < 10 ? `0${num}` : `${num}`;
}

export function fixRp(num) {
  let str = typeof num === "string" ? num : String(num);
  const res = [];
  while (str.length > 0) {
    res.push(str.slice(-3));
    str = str.slice(0, -3);
  }
  return res.reverse().join(".");
}

export function getNumberFromStyle(styleValue) {
  if (!styleValue) {
    return;
  }
  if (typeof styleValue === "string" && styleValue.endsWith("px")) {
    return Number(styleValue.slice(0, -2));
  } else {
    const num = Number(styleValue);
    return isNaN(num) ? undefined : num;
  }
}

export function getRandomItemFormList(arr) {
  let values;
  if (Array.isArray(arr)) {
    values = arr;
  } else if (isPlainObject(arr)) {
    values = Object.values(arr);
  } else {
    return;
  }
  if (!values.length) {
    return;
  }
  const len = values.length;
  const rand = Math.floor(Math.random() * len);
  return values[rand];
}

export function isPlainObject(obj) {
  if (Object.prototype.toString.call(obj) !== "[object Object]") {
    return false;
  }
  let proto = Object.getPrototypeOf(obj);
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

export function getRandomAmount() {
  return (Math.floor(Math.random() * 35) + 10) * 1000;
}
