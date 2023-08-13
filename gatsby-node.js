// import path from "path";
// import data from "./src/data/articles.json";
const path = require("path");
const data = require("./src/data/articles.json");

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  const templatePath = path.resolve("./src/templates/articles.jsx");
  console.log(templatePath);
  data.forEach((articleObject) => {
    const pathName = `articles/${articleObject.slug}`;
    createPage({
      path: pathName,
      component: templatePath,
      context: articleObject,
    });
  });
};
