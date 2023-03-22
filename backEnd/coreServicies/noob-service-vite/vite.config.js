import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import vue from "@vitejs/plugin-vue";
const fs = require('fs')
const path = require('path')
console.log(module)
const filename =module.filename
const port = fs.readFileSync(path.resolve(path.dirname(filename),'./esmKernel/config.json'))
const esmPort = JSON.parse(port).port
export function esmModulePlugin(fix) {
  return {
    name: "vite-plugin-esm",
    resolveId(id) {
      let reg = /^[\w@](?!.*:\/\/)/;

      if (
        reg.test(id) &&
        !id.startsWith("D") &&
        !id.startsWith("noobDeps:") &&
        !id.startsWith("plugin-vue:")
      ) {
        return `noobDeps:${id}`;
      }
    },
    async load(id,importer) {
      console.log(id,importer);
      if (id.indexOf("noobDeps:") >= 0) {
        id = "/noobDeps/" + id.split("noobDeps:").pop();
      }
      if (id.startsWith("/noobDeps")) {
        id=id.replace("/noobDeps",'')
        return await (await fetch(`http://127.0.0.1:${esmPort}${id}`)).text();
      }
    },
  };
}
export default defineConfig({
  plugins: [
    esmModulePlugin(),
    svelte({
      configFile: false,
      extensions: [".svelte"],
      hot: false,
    }),
    vue({ 
      compiler: require("@vue/compiler-sfc") ,
      hot:false,
     hmr:false
    }),
  ],
  server:{
    hmr:false
  }
});
