//记得导入这个文件，路径要对，怎么个对法自己琢磨一下呗
import * as mover from "./move.js";
import kernelApi from "../../util/kernelApi.js";
import sqlbrick from "../sql/sqlbrick/index.js";
import keys from "./keys.js";
import { normalize as normalizeKey } from "../attribute/names.js";
export default class BlockHandler {
  constructor(id) {
    this.id = id;
    this.navi = [];
  }
  async getAttribute(key) {
    if (keys.includes(key)) {
      return await sqlbrick.select(key).from("blocks").where({ id: id }).post();
    } else {
      let attribute = await sqlbrick
        .select("value")
        .from("attributes")
        .where({ block_id: id, name: normalizeKey(key) })
        .post();
      if (attribute[0]) {
        return attribute[0].value;
      } else {
        return undefined;
      }
    }
  }

  async setAttribute(key) {}
  async 移动到指定文档尾部(文档id, 复制) {
    if (!复制) {
      mover.根据目标id移动块到文档(this.id, 文档id);
    }
    return this;
  }
  appendToDoc = this.移动到指定文档尾部;
  async 移动到指定文档头部(文档id, 复制) {
    if (!复制) {
      mover.根据目标id移动块到文档头部(this.id, 文档id);
    }
    return this;
  }
}
