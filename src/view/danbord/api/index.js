import { Fetch } from "@/api/http";
export const getImageList = (params = {}) => {
  return Fetch({
    url: "/getcarouse",
    methods: "get",
    params
  });
};
