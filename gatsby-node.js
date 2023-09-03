// import path from "path";
// import data from "./src/data/articles.json";
const { glob } = require("glob");
const path = require("path");

glob("./src/data/**/*.json").then((data) => {
  console.log(data);
});
const data = require("./src/data/articles.json");

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  const templatePath = path.resolve("./src/templates/articles.jsx");
  console.log(data.basename);
  data.forEach((articleObject) => {
    const pathName = `${articleObject.dir}/${articleObject.slug}`;
    createPage({
      path: pathName,
      component: templatePath,
      context: articleObject,
    });
  });
};
