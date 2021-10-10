import { Fetch } from "@/API/http";
export const getImageList = (params = {}) => {
  return Fetch({
    url: "/getcarouse",
    methods: "get",
    params
  });
};
