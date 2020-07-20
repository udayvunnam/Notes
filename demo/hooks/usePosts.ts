import { useQuery } from "react-query";

const getPosts = async () => {
  return await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
};

export default function usePosts() {
  return useQuery("posts", getPosts);
}
