import { Fetch } from "@/API/http";

export const getUserList = params => {
  return Fetch({
    url: "/getUserList",
    methods: "get",
    params
  });
};
