// import path from "path";
// import data from "./src/data/articles.json";
const { glob } = require("glob");
const path = require("path");

const templateCompPathMap = {
  "src/data": "./src/templates/articles.jsx",
  "src/data/articles": "./src/templates/articles.jsx",
  "src/data/column": "./src/templates/articles.jsx",
};

exports.createPages = ({ actions }) => {
  glob("./src/data/**/*.json").then((data) => {
    console.log(data);
    data.forEach((tmp) => {
      const templateBaseName = path.basename(tmp);
      const pathDir = path.dirname(tmp);
      console.log("templateBaseName: ", templateBaseName);
      console.log("pathDir: ", pathDir);
      console.log("map: ", templateCompPathMap[pathDir]);

      const { createPage } = actions;
      //   const templatePath = path.resolve("./src/templates/articles.jsx");
      const templatePath = path.resolve(templateCompPathMap[pathDir]);
      const jsonObj = require(`./${tmp}`);
      console.log("jsonObj: ", jsonObj);
      jsonObj.forEach((articleObject) => {
        const pathName = `${pathDir.replace(/.*src\/data/, "")}/${
          articleObject.slug
        }`;
        createPage({
          path: pathName,
          component: templatePath,
          context: articleObject,
        });
      });
    });
  });
};
// const data = require("./src/data/articles.json");
