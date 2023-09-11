const { glob } = require("glob");
const path = require("path");

const templateCompPathMap = {
  "src/data/articles": "./src/templates/articles.jsx",
  "src/data/column": "./src/templates/articles.jsx",
};

exports.createPages = async ({ actions }) => {
  const jsonPathList = await glob("./src/data/**/*.json");
  jsonPathList.forEach((jsonPath) => {
    const pathDir = path.dirname(jsonPath);

    const { createPage } = actions;
    const templatePath = path.resolve(templateCompPathMap[pathDir]);
    const jsonObj = require(`./${jsonPath}`);
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
};
