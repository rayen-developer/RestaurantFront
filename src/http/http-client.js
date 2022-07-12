import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8000",
});

const requestHandler = (request) => {
  const token = localStorage.getItem("token");
  request.headers.Authorization = "Bearer " + token;
  return request;
};
const responseHandler = (response) => {
  if (response.status === 401) {
    localStorage.clear();
    alert('Session expired!');
    window.location = "/";
  }

  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};
httpClient.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

httpClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default httpClient;
