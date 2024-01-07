export default function replaceType(type) {
  return type.replace(/\/\w+/, '');
}

export function formatData(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const mount = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${hours}:${minutes} ${day}.${mount}.${year}`;
}

export function linkGenerator(str) {
  return str.replace(/https?:\/\/[^\s]+/gm, (link) => `<a href='${link}' target='_blank'>${link}</a>`);
}
