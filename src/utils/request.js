const API_DOMAIN = process.env.REACT_APP_API_URL || "http://localhost:3003/";

export const get = async (path) => {
  const res = await fetch(API_DOMAIN + path);
  const data = await res.json();
  return data;
};

export const post = async (options, path) => {
  const res = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await res.json();
  return result;
};

export const del = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};

export const patch = async (option, path) => {
  const respone = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });
  const result = await respone.json();
  return result;
};
