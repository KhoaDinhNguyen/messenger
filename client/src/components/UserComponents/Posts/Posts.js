import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import PostsList from "../../PostsList/PostsList";

import { fetchGetCommentsInitial } from "../../../fetch/fetchComment/fetchGetComment";

import { postsSlice } from "../../../redux/postSlice";
import { commentSlice } from "../../../redux/commentSlice";

function Posts() {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(commentSlice.actions.cleanComments());
    const graphQLQuery = {
      query: `
        query getPost($id: String!){
          getPost(userInput: {id: $id}) {
            _id
            title
            content
            creatorName
            creatorId
            creatorImageUrl
            createdAt
            images
            imagesUrl
            comments
            emoji
          }
        }
      `,
      variables: {
        id: params.userid,
      },
    };

    const bodyJSON = JSON.stringify(graphQLQuery);
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    fetch(process.env.REACT_APP_SERVER_API, {
      method: "POST",
      body: bodyJSON,
      headers: myHeaders,
    })
      .then((jsonResponse) => jsonResponse.json())
      .then((response) => {
        if (response.data === null) {
        } else {
          const postsList = response.data.getPost;
          dispatch(postsSlice.actions.init(postsList));
          if (postsList.length > 0) {
            postsList.forEach(async (post) => {
              const returnedComments = await fetchGetCommentsInitial(
                post.comments
              );
              dispatch(commentSlice.actions.init(returnedComments));
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, params.userid]);

  return (
    <div>
      <PostsList />
    </div>
  );
}

export default Posts;
