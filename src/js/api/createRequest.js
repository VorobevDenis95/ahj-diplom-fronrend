export const createRequest = async (url, options = {}) => {
  try {
    const request = await fetch(url);
    const data = await request.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
