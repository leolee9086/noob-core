const fg = require('fast-glob');
const fs = require('fs');

// 获取文件夹的树形结构
const getTree = async (dirPath) => {
  const entries = await fg.readdir(`${dirPath}/**`, { onlyDirectories: true, deep: true });
  const tree = {};
  for (const entry of entries) {
    const paths = entry.split('/');
    let currentTree = tree;
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      currentTree[path] = currentTree[path] || {};
      currentTree = currentTree[path];
    }
  }
  return tree;
};

// 生成HTML代码
const renderHTML = (tree) => {
  let html = '<ul>';
  for (const key in tree) {
    html += `<li>${key}${renderHTML(tree[key])}</li>`;
  }
  html += '</ul>';
  return html;
};

