import { Fetch } from "./../../api/http";
export function getLogin(params) {
  return Fetch({
    url: "/egg/api/login",
    methods: "GET",
    params
  });
}

export const uploadImage = function(data) {
  return Fetch({
    url: "/egg/uploadImage",
    method: "post",
    data
  });
};
