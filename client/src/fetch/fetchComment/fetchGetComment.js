async function fetchGetCommentsInitial(comments) {
  const graphQLQuery = {
    query: `
        query GetComments($commentIdArray: [String!]!){
          getComments(commentInput:{commentIdArray: $commentIdArray}) {
            id
            text
            creatorName
            creatorId
            comments
            createdAt
            level
          }
        }
      `,
    variables: {
      commentIdArray: comments,
    },
  };

  const bodyJSON = JSON.stringify(graphQLQuery);
  const myHeaders = new Headers();
  myHeaders.append("Content-type", "application/json");

  const result = await fetch(process.env.REACT_APP_SERVER_API, {
    method: "POST",
    body: bodyJSON,
    headers: myHeaders,
  })
    .then((jsonResponse) => jsonResponse.json())
    .then(async (response) => {
      if (response.data === null) {
        throw Error("Error ocurred");
      } else {
        const returnedComments = response.data.getComments;
        const moreReturnedComments = await Promise.all(
          returnedComments.map(async (comment) => {
            return await fetchGetCommentsInitial(comment.comments);
          })
        );
        return [...returnedComments, ...moreReturnedComments.flat()];
      }
    });

  return result;
}

export { fetchGetCommentsInitial };
