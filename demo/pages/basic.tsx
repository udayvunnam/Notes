import React from "react";
import { useQuery, queryCache } from "react-query";

const Basic = () => {
  const [postId, setPostId] = React.useState(-1);

  return (
    <>
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </>
  );
}

function usePosts() {
  return useQuery("posts", async () => {
    const { data } = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
    return data;
  });
}

function Posts({ setPostId }) {
  const { status, data, error, isFetching } = usePosts();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((post) => (
                <p key={post.id}>
                  <a
                    onClick={() => setPostId(post.id)}
                    href="#"
                    style={
                      // We can use the queryCache here to show bold links for
                      // ones that are cached
                      queryCache.getQueryData(["post", post.id])
                        ? {
                            fontWeight: "bold",
                            color: "green",
                          }
                        : {}
                    }
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

const getPostById = async (key, id) => {
  const { data } = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)).json();
  return data;
};

function usePost(postId) {
  return useQuery(["post", postId], getPostById, {
    enabled: postId,
  });
}

function Post({ postId, setPostId }) {
  const { status, data, error, isFetching } = usePost(postId);

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          Back
        </a>
      </div>
      {!postId || status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}

export default Basic;
