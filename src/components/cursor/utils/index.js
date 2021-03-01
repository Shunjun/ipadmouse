export function getElementPos(ele) {
  return ele.getBoundingClientRect();
}

export function getElementSize(ele) {
  return [ele.offsetWidth, ele.offsetHeight];
}
