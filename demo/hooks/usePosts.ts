import { useQuery } from "react-query";

const getPosts = async () => {
  const { data } = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
  return data;
};

export default function usePosts() {
  return useQuery("posts", getPosts);
}
