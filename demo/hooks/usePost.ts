import { useQuery } from "react-query";

const getPostById = async (_, postId) => {
  return await (await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)).json()
};

export default function usePost(postId) {
  return useQuery(["post", postId], getPostById);
}
