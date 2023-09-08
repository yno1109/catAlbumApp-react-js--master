const START_URL = `https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/`;

export const api = async (id) => {
  const targetURL = id ? `${START_URL}${id}` : START_URL;
  try {
    const res = await fetch(targetURL);
    return res.json();
  } catch (e) {
    throw e;
  }
};
