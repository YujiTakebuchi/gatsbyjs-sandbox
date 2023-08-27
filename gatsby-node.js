// import path from "path";
// import data from "./src/data/articles.json";
const fs = require("fs");
const path = require("path");

fs.readdir("./src/data", (err, files) => {
  console.log(err);
  console.log(files);
  //   files.forEach((file) => {
  //     console.log(file);
  //   });
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
