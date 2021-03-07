import { values } from "lodash";

export function getElementRect(ele) {
  return ele.getBoundingClientRect();
}

const radiusKeys = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
];

export function getChildInfo(child) {
  const { width, height, left, top } = getElementRect(child);
  const childStyle = window.getComputedStyle(child);
  const childInfo = {
    width,
    height,
    left,
    top,
  };
  copyFromStyle(radiusKeys, childInfo, childStyle);
  return childInfo;
}

export function copyFromStyle(keys, to, from) {
  keys.forEach((key) => {
    const styleValue = from[key];
    if (typeof styleValue === "number") {
      to[key] = styleValue;
    } else if (typeof styleValue === "string" && styleValue.endsWith("px")) {
      const value = Number(styleValue.slice(0, -2));
      if (!isNaN(value)) {
        to[key] = value;
      }
    }
  });
}

export function isSameInfo(preInfo, newInfo) {
  let ret = true;
  for (const key in preInfo) {
    if (Object.hasOwnProperty.call(preInfo, key)) {
      if (Array.isArray(preInfo[key])) {
        if (!isSameArray(preInfo[key], newInfo[key])) {
          ret = false;
          break;
        }
      } else {
        if (preInfo[key] !== newInfo[key]) {
          ret = false;
          break;
        }
      }
    }
  }
  return ret;
}

function isSameArray(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

export const getPerformanceTime = (function () {
  let date;
  if ("performance" in window) {
    date = window.performance;
  } else {
    date = Date;
  }
  return function () {
    return date.now();
  };
})();

const hints = new Set();
export function warn(force, hint) {
  let _hint = "";
  if (typeof force === "boolean") {
    _hint = hint;
  } else {
    _hint = force;
    force = false;
  }
  if (typeof _hint !== "string") {
    return;
  }
  if (force) {
    console.warn(_hint);
  } else {
    if (!hints.has(_hint)) {
      hints.add(_hint);
      console.warn(_hint);
    }
  }
}
