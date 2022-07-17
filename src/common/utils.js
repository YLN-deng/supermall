// 防抖函数 ：频繁刷新时使用
// export function debounce(func, delay) {
//   let timer = null;
//   return function (...args) {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this.args);
//     }, delay);
//   };
// }