import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import PostsList from "../../PostsList/PostsList";

import { postsSlice } from "../../../redux/postSlice";

function Posts() {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const graphQLQuery = {
      query: `
        query getPost($id: String!){
          getPost(userInput: {id: $id}) {
            _id
            title
            content
            creatorName
            createdAt
            images
            imagesUrl
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
        console.log(response);
        if (response.data === null) {
        } else {
          dispatch(postsSlice.actions.init(response.data.getPost));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
      <PostsList />
    </div>
  );
}

export default Posts;
