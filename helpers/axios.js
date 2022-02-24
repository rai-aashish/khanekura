import axios from "axios";

export const rssApi = axios.create({
  baseURL: "https://uat.ordering-boafresh.ekbana.net/api/v4/",
  headers: {
    "Api-key":
      "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545",
    "Warehouse-Id": "1",
  },
});

export const userApi = axios.create({
  baseURL: "https://uat.ordering-boafresh.ekbana.net/api/v4/",
  headers: {
    "Api-key":
      "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545",
    "Warehouse-Id": "1",
  },
});

export const authApi = axios.create({
  baseURL: "https://uat.ordering-boafresh.ekbana.net/api/v4/auth",
});
