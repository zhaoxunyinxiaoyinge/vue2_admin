import { Fetch } from "./../../API/http";
export function getLogin(params) {
  return Fetch({
    url: "/login",
    methods: "get",
    params
  });
}
