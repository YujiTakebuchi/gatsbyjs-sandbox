const { glob } = require("glob");
const path = require("path");

const templateCompPathMap = {
  "src/data": "./src/templates/articles.jsx",
  "src/data/articles": "./src/templates/articles.jsx",
  "src/data/column": "./src/templates/articles.jsx",
};

exports.createPages = ({ actions }) => {
  glob("./src/data/**/*.json").then((data) => {
    data.forEach((tmp) => {
      const pathDir = path.dirname(tmp);

      const { createPage } = actions;
      const templatePath = path.resolve(templateCompPathMap[pathDir]);
      const jsonObj = require(`./${tmp}`);
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
