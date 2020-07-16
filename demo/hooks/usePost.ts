import { useQuery } from "react-query";

const getPostById = async (_, postId) => {
  const { data } = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)).json()
  return data;
};

export default function usePost(postId) {
  return useQuery(["post", postId], getPostById);
}
