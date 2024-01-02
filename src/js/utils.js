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
