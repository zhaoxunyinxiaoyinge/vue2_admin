import { Fetch } from "@/api/http";

export const getUserList = params => {
  return Fetch({
    url: "/getUserList",
    methods: "get",
    params
  });
};
