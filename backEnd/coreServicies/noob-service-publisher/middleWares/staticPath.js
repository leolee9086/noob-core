const express1 = require("express");

module.exports = function (app) {
  app.use(
    "/stage",
    express1.static(`${noob.pathConstructor.templatePath()}/stage/`)
  );
  //静态文件引用
  app.use(
    "/static",
    express1.static(
      `${noob.pathConstructor.noobPath()}/script/public/static/`
    )
  );

};
