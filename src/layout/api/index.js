import { Fetch } from "@/API/http.js";

let key = "8480960731a6564117bc3d5f05b4a0ec";
export const weather = function(data) {
  return Fetch({
    url: "/list/weather/index",
    method: "get",
    params: { ...data, key }
  });
};
