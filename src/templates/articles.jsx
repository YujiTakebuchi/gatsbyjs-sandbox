import { graphql } from "gatsby";
import React from "react";

export default ({ data }) => {
  console.log(data);
  const article = data.allSitePage.edges[0].node.pageContext;
  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      {article.tags.map((tag) => (
        <span>{tag}</span>
      ))}
    </>
  );
};

export const query = graphql`
  query ($path: String!) {
    allSitePage(filter: { path: { eq: $path } }) {
      edges {
        node {
          pageContext
        }
      }
    }
  }
`;
