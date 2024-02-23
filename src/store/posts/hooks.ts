import { useSelector } from "react-redux";
import { RootState, getPostSelector } from "..";
import { PostParams } from "@/types";

export const useGetPost = (params: PostParams) => useSelector((state: RootState) => getPostSelector(state, params));

