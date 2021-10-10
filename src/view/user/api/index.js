import { Fetch } from "@/API/http";

export function getList(params) {
  return Fetch({
    url: "/getPersonInfo",
    method: "get",
    params,
    responseType: "csv"
  });
}
