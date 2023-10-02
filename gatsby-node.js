const { glob } = require("glob");
const path = require("path");

// const templateCompPathMap = {
//   "src/data/articles": "./src/templates/articles.jsx",
//   "src/data/column": "./src/templates/articles.jsx",
// };
const templateCompPathMap = {
  articles: "./src/templates/articles.jsx",
  "articles/prefectures": "./src/templates/articles.jsx",
  column: "./src/templates/articles.jsx",
};

const createPagesByPathList = ({ jsonPathList, pageType, actions }) => {
  // const jsonPathList = await glob("./src/data/**/*.json");
  jsonPathList.forEach((jsonPath) => {
    const pathDir = path.dirname(jsonPath);

    const { createPage } = actions;
    const templateKey = (() => {
      switch (pageType) {
        case "dir":
          return pathDir.replace(/.*src\/data\//, "");
        case "html":
          return pathDir.replace(/.*src\/html_pages\//, "");
        default:
          return undefined;
      }
    })();
    console.log("templateKey: ", templateKey);
    console.log("pathDir: ", pathDir);
    const templatePath = path.resolve(templateCompPathMap[templateKey]);

    const jsonObj = require(`./${jsonPath}`);
    jsonObj.forEach((articleObject) => {
      const pathName = (() => {
        switch (pageType) {
          case "dir":
            return `${pathDir.replace(/.*src\/data/, "")}/${
              articleObject.slug
            }`;
          case "html":
            return `${pathDir.replace(/.*src\/html_pages/, "")}/${
              articleObject.slug
            }.html`;
          default:
            return undefined;
        }
      })();
      console.log(pathName);

      createPage({
        path: pathName,
        component: templatePath,
        context: articleObject,
      });
    });
  });
};

exports.createPages = async ({ actions }) => {
  const dirJsonPathList = await glob("./src/data/**/*.json");
  createPagesByPathList({
    jsonPathList: dirJsonPathList,
    pageType: "dir",
    actions,
  });
  // dirJsonPathList.forEach((jsonPath) => {
  //   const pathDir = path.dirname(jsonPath);

  //   const { createPage } = actions;
  //   const templatePath = path.resolve(templateCompPathMap[pathDir]);
  //   const jsonObj = require(`./${jsonPath}`);
  //   jsonObj.forEach((articleObject) => {
  //     const pathName = `${pathDir.replace(/.*src\/data/, "")}/${
  //       articleObject.slug
  //     }`;

  //     createPage({
  //       path: pathName,
  //       component: templatePath,
  //       context: articleObject,
  //     });
  //   });
  // });

  const htmlJsonPathList = await glob("./src/html_pages/**/*.json");
  createPagesByPathList({
    jsonPathList: htmlJsonPathList,
    pageType: "html",
    actions,
  });
  // htmlJsonPathList.forEach((jsonPath) => {
  //   const pathDir = path.dirname(jsonPath);

  //   const { createPage } = actions;
  //   const templatePath = path.resolve(templateCompPathMap[pathDir]);
  //   const jsonObj = require(`./${jsonPath}`);
  //   jsonObj.forEach((articleObject) => {
  //     const pathName = `${pathDir.replace(/.*src\/data/, "")}/${
  //       articleObject.slug
  //     }`;

  //     createPage({
  //       path: pathName,
  //       component: templatePath,
  //       context: articleObject,
  //     });
  //   });
  // });
};
