import { Fetch } from "./../../api/http";
export function getLogin(params) {
  return Fetch({
    url: "/login",
    methods: "get",
    params
  });
}
