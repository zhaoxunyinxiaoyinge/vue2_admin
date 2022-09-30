import { Fetch } from "@/api/http";
export const getBananer = params => {
  return Fetch({
    url: "/egg/api/bananer",
    method: "get",
    params
  });
};

export const createBananer = data => {
  return Fetch({
    url: "/egg/api/bananer",
    method: "post",
    data
  });
};

export const updateBananer = data => {
  return Fetch({
    url: "/egg/api/bananer/" + data.id,
    method: "put",
    data
  });
};

export const deleteBananer = params => {
  return Fetch({
    url: "/egg/api/bananer/" + params.id,
    method: "delete"
  });
};
