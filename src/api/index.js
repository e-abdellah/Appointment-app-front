import axiosRoot from "axios";

// const baseUrl = "http://localhost:9000/api";
const baseUrl = import.meta.env.VITE_API_URL;

const axios = axiosRoot.create({
  baseURL: baseUrl,
  // headers: {
  //   "Content-Type": "application/json",
  // },
})

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
}

export const getById = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export const getAll = async (url) => {
  const { data } = await axios.get(url);
  console.log(url);
  return data.items;
};

export const deleteById = async (url, { arg: id }) => {
  await axios.delete(url/{id});
};

// export const deleteById = async (url, id) => {
//   await axiosInstance.delete(`${url}/${id}`);
// };

// export const save = async (url, { arg: body }) => {
//   const { id, ...values } = body;
//   await axios({
//     method: id ? 'PUT' : 'POST',
//     url: $url/${id ?? ''}`,
//     data: values,
//   });
// };

export const post = async (url, { arg }) => {
  const { data } = await axios.post(url, arg);
  return data;
};

export const put = async (url, { arg }) => {
  const { data } = await axios.put(url, arg);
  return data;
}
