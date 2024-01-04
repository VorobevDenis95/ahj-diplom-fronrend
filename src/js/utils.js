export default function replaceType(type) {
  return type.replace(/\/\w+/, '');
}

export function formatData(date) {
  const hours = newDate.getHours().toString().padStart(2, '0');
  const minutes = newDate.getMinutes().toString().padStart(2, '0');
  const day = newDate.getDate().toString().padStart(2, '0');
  const mount = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear();
  return `${hours}:${minutes} ${day}.${mount}.${year}`;
}

export function linkGenerator(str) {
  // return str.replace(/(https?:\/\[^\s]+)/g, '<a href=$1>$1</a>');
  // return str.replace(/(https?:\/\/?[a-z0-9~_\-\\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?)/g, '<a href="$1">$1</a>');
  return str.replace(/https?:\/\/[^\s]+/gm, (link) => `<a href='${link}' target='_blank'>${link}</a>`);
}
