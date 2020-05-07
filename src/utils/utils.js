export function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection != "undefined"
          && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
  }
}
export function fetchAndUpdateData(url, STORAGEKEY) {
  // case 1, updating data on every search
  fetch(url).then(res=> res.json()).then(userData => {
    localStorage.setItem(STORAGEKEY, JSON.stringify(userData));
    let e = new Event('storageUpdated');
    document.dispatchEvent(e);
  });
  // case 2, fetching data on every time interval (1sec, 1min, 1hr etc)
}