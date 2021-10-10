import { Fetch } from "@/API/http";

export const getLoadMore = params => {
  return Fetch({
    url: "/getmoredata",
    methods: "get",
    params
  });
};
