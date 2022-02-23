import { Fetch } from "@/api/http";

export const getLoadMore = params => {
  return Fetch({
    url: "/getmoredata",
    methods: "get",
    params
  });
};
