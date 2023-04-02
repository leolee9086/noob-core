type siyuanRes = {
  code: number;
  data: object;
  msg: string;
};

export class kernelApiList  {
  //"/api/system/bootProgress"
  bootProgress(data?: any, apitoken?: string, callback?: () => any): any;
  获取启动进度(data?: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/bootProgress"
  //bootProgress,

  //"/api/system/version"
  version(data?: any, apitoken?: string, callback?: () => any): any;
  获取软件版本(data?: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/version"
  //version,
  //获取软件版本,

  //"/api/system/currentTime"
  currentTime(data: any, apitoken?: string, callback?: () => any): any;
  获取当前时间(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/uiproc"
  addUIProcess(data: any, apitoken?: string, callback?: () => any): any;
  UI生成进度(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/loginAuth"
  LoginAuth(
    data: {
      authCode: string;
      captcha: string;
    },
    apitoken?: string,
    callback?: () => any
  ): any;
  登录鉴权(
    data: {
      authCode: string;
      captcha: string;
    },
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/system/logoutAuth"
  LogoutAuth(data: any, apitoken?: string, callback?: () => any): any;
  退出登录(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/getCaptcha,
  GetCaptcha(data: any, apitoken?: string, callback?: () => any): any;
  获取验证码(data: any, apitoken?: string, callback?: () => any): any;

  // 需要鉴权

  //"/api/system/getEmojiConf,
  getEmojiConf(data: any, apitoken?: string, callback?: () => any): any;
  获取emoji配置(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/setAccessAuthCode",
  setAccessAuthCode(
    data: {
      accessAuthCode: string;
    },
    apitoken?: string,
    callback?: () => any
  ): any;
  设置鉴权码(
    data: {
      accessAuthCode: string;
    },
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/system/setNetworkServe,
  setNetworkServe(
    data: {
      networkServe: boolean;
    },
    apitoken?: string,
    callback?: () => any
  ): any;
  设置网络服务器(
    data: {
      networkServe: boolean;
    },
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/system/setUploadErrLog,
  setUploadErrLog(data: any, apitoken?: string, callback?: () => any): any;
  设置上传错误日志(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/setAutoLaunch,
  setAutoLaunch(data: any, apitoken?: string, callback?: () => any): any;
  设置自动启动(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/setGoogleAnalytics",
  setGoogleAnalytics(data: any, apitoken?: string, callback?: () => any): any;
  设置谷歌数据分析(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/setDownloadInstallPkg"
  setDownloadInstallPkg(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  设置是否下载安装包(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/setNetworkProxy",
  setNetworkProxy(data: any, apitoken?: string, callback?: () => any): any;
  设置网络代理(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/setWorkspaceDir",
  setWorkspaceDir(data: any, apitoken?: string, callback?: () => any): any;
  设置工作空间目录(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/getWorkspaces",
  getWorkspaces(data: any, apitoken?: string, callback?: () => any): any;
  获取工作空间目录;

  //"/api/system/getMobileWorkspaces",
  getMobileWorkspaces(data: any, apitoken?: string, callback?: () => any): any;
  获取移动端工作空间目录(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/system/createWorkspaceDir",
  createWorkspaceDir(data: any, apitoken?: string, callback?: () => any): any;
  创建工作空间(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/removeWorkspaceDir",
  removeWorkspaceDir(data: any, apitoken?: string, callback?: () => any): any;
  移除动作空间(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/setAppearanceMode",
  setAppearanceMode(data: any, apitoken?: string, callback?: () => any): any;
  设置外观模式(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/getSysFonts,
  getSysFonts(data: any, apitoken?: string, callback?: () => any): any;
  获取系统字体(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/exit",
  exit(data: any, apitoken?: string, callback?: () => any): any;
  退出(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/setUILayout,
  setUILayout(data: any, apitoken?: string, callback?: () => any): any;
  设置UI布局(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/getConf",
  getConf(data: any, apitoken?: string, callback?: () => any): any;
  获取配置(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/checkUpdate,
  checkUpdate(data: any, apitoken?: string, callback?: () => any): any;
  检查更新(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/system/exportLog,
  exportLog(data: any, apitoken?: string, callback?: () => any): any;
  导出日志(data: any, apitoken?: string, callback?: () => any): any;

  //存储相关
  //"/api/storage/setLocalStorage",
  setLocalStorage(data: any, apitoken?: string, callback?: () => any): any;
  设置存储(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/storage/getLocalStorage",
  getLocalStorage(data: any, apitoken?: string, callback?: () => any): any;
  获取存储(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/storage/setLocalStorageVal",
  setLocalStorageVal(data: any, apitoken?: string, callback?: () => any): any;
  设置存储项(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/storage/removeLocalStorageVal"
  removeLocalStorageVal(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  获取存储项(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/storage/setCriterion"
  setCriterion(data: any, apitoken?: string, callback?: () => any): any;
  设置标准(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/storage/getCriteria"
  getCriteria(data: any, apitoken?: string, callback?: () => any): any;
  获取标准(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/storage/removeCriterion"
  removeCriterion(data: any, apitoken?: string, callback?: () => any): any;
  移除标准(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/storage/getRecentDocs"
  getRecentDocs(data: any, apitoken?: string, callback?: () => any): any;
  获取最近文档(data: any, apitoken?: string, callback?: () => any): any;

  //账户登录
  //"/api/account/login",
  login(data: any, apitoken?: string, callback?: () => any): any;
  登录账号(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/account/checkActivationcode,
  checkActivationcode(data: any, apitoken?: string, callback?: () => any): any;
  检查激活码(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/account/useActivationcode",
  useActivationcode(data: any, apitoken?: string, callback?: () => any): any;
  使用激活码(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/account/deactivate",
  deactivateUser(data: any, apitoken?: string, callback?: () => any): any;
  注销账号(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/account/startFreeTrial,
  startFreeTrial(data: any, apitoken?: string, callback?: () => any): any;
  开始免费试用(data: any, apitoken?: string, callback?: () => any): any;

  //笔记本相关
  //"/api/notebook/lsNotebooks",
  lsNotebooks(data: any, apitoken?: string, callback?: () => any): any;
  获取笔记本列表(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/notebook/openNotebook",
  openNotebook(data: any, apitoken?: string, callback?: () => any): any;
  打开笔记本(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/notebook/closeNotebook",
  closeNotebook(data: any, apitoken?: string, callback?: () => any): any;
  关闭笔记本(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/notebook/getNotebookConf",
  getNotebookConf(data: any, apitoken?: string, callback?: () => any): any;
  获取笔记本配置(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/notebook/setNotebookConf",
  setNotebookConf(data: any, apitoken?: string, callback?: () => any): any;
  设置笔记本配置(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/notebook/createNotebook,
  createNotebook(data: any, apitoken?: string, callback?: () => any): any;
  创建笔记本(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/notebook/removeNotebook",
  removeNotebook(data: any, apitoken?: string, callback?: () => any): any;
  删除笔记本(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/notebook/renameNotebook",
  renameNotebook(data: any, apitoken?: string, callback?: () => any): any;
  重命名笔记本(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/notebook/changeSortNotebook",
  changeSortNotebook(data: any, apitoken?: string, callback?: () => any): any;
  改变笔记本排序(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/notebook/setNotebookIcon,
  setNotebookIcon(data: any, apitoken?: string, callback?: () => any): any;
  设置笔记本图标(data: any, apitoken?: string, callback?: () => any): any;

  //文档树相关
  //"/api/filetree/searchDocs,
  searchDocs(data: any, apitoken?: string, callback?: () => any): any;
  搜索文档(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/listDocsByPath",
  listDocsByPath(data: any, apitoken?: string, callback?: () => any): any;
  获取路径下文档列表(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/getDoc",
  getDoc(data: any, apitoken?: string, callback?: () => any): any;
  获取文档(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/getDocCreateSavePath",
  getDocCreateSavePath(data: any, apitoken?: string, callback?: () => any): any;
  获取文档创建位置(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/getRefCreateSavePath,
  getRefCreateSavePath(data: any, apitoken?: string, callback?: () => any): any;
  获取块引创建位置(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/changeSort",
  changeSort(data: any, apitoken?: string, callback?: () => any): any;
  改变文档排序(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/createDocWithMd",   'createDocWithMd,
  创建文档(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/createDailyNote",
  createDailyNote(data: any, apitoken?: string, callback?: () => any): any;
  创建日记(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/createDoc",
  createDoc(data: any, apitoken?: string, callback?: () => any): any;
  //创建文档,

  //"/api/filetree/renameDoc",
  renameDoc(data: any, apitoken?: string, callback?: () => any): any;
  重命名文档(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/removeDoc,
  removeDoc(data: any, apitoken?: string, callback?: () => any): any;
  删除文档(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/removeDocs",
  removeDocs(data: any, apitoken?: string, callback?: () => any): any;
  批量删除文档(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/moveDocs,
  moveDocs(data: any, apitoken?: string, callback?: () => any): any;
  批量移动文档(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/duplicateDoc",
  duplicateDoc(data: any, apitoken?: string, callback?: () => any): any;
  复制文档(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/getHPathByPath,
  getHPathByPath(data: any, apitoken?: string, callback?: () => any): any;
  通过路径获取文档可读路径(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/filetree/getHPathsByPaths,
  getHPathsByPaths(data: any, apitoken?: string, callback?: () => any): any;
  通过路径列表获取文档可读路径列表(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/filetree/getHPathByID,
  getHPathByID(data: any, apitoken?: string, callback?: () => any): any;
  通过id获取文档可读路径(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/filetree/getFullHPathByID",
  getFullHPathByID(data: any, apitoken?: string, callback?: () => any): any;
  通过id获取完整文档可读路径(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/filetree/doc2Heading",
  doc2Heading(data: any, apitoken?: string, callback?: () => any): any;
  文档转换为标题(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/heading2Doc",
  heading2Doc(data: any, apitoken?: string, callback?: () => any): any;
  标题转换为文档(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/li2Doc,
  li2Doc(data: any, apitoken?: string, callback?: () => any): any;
  列表转换为文档(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/filetree/refreshFiletree,
  refreshFiletree(data: any, apitoken?: string, callback?: () => any): any;
  刷新文档树(data: any, apitoken?: string, callback?: () => any): any;

  //格式化相关
  //"/api/format/autoSpace",
  autoSpace(data: any, apitoken?: string, callback?: () => any): any;
  自动空格(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/format/netImg2LocalAssets,
  netImg2LocalAssets(data: any, apitoken?: string, callback?: () => any): any;
  网络图片转本地资源(data: any, apitoken?: string, callback?: () => any): any;

  //历史相关
  //"/api/history/getNotebookHistory",
  getNotebookHistory(data: any, apitoken?: string, callback?: () => any): any;
  获取笔记本历史(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/history/rollbackNotebookHistory",
  rollbackNotebookHistory(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  回滚笔记本历史(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/history/rollbackAssetsHistory",
  rollbackAssetsHistory(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  回滚资源历史(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/history/getDocHistoryContent,
  getDocHistoryContent(data: any, apitoken?: string, callback?: () => any): any;
  获取文档历史内容(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/history/rollbackDocHistory",
  rollbackDocHistory(data: any, apitoken?: string, callback?: () => any): any;
  回滚文档历史(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/history/clearWorkspaceHistory,
  clearWorkspaceHistory(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  清空工作区历史(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/history/reindexHistory",
  reindexHistory(data: any, apitoken?: string, callback?: () => any): any;
  重建历史索引(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/history/searchHistory,
  searchHistory(data: any, apitoken?: string, callback?: () => any): any;
  搜索历史(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/history/getDocHistory",
  getHistoryItems(data: any, apitoken?: string, callback?: () => any): any;
  获取历史条目(data: any, apitoken?: string, callback?: () => any): any;

  //大纲、书签与标签相关
  //"/api/outline/getDocOutline,
  getDocOutline(data: any, apitoken?: string, callback?: () => any): any;
  获取文档大纲(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bookmark/getBookmark,
  getBookmark(data: any, apitoken?: string, callback?: () => any): any;
  获取书签(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bookmark/renameBookmark",
  renameBookmark(data: any, apitoken?: string, callback?: () => any): any;
  重命名书签(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bookmark/removeBookmark",
  removeBookmark(data: any, apitoken?: string, callback?: () => any): any;
  移除书签(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/tag/getTag,
  getTag(data: any, apitoken?: string, callback?: () => any): any;
  获取标签(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/tag/renameTag,
  renameTag(data: any, apitoken?: string, callback?: () => any): any;
  重命名标签(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/tag/removeTag",
  removeTag(data: any, apitoken?: string, callback?: () => any): any;
  删除标签(data: any, apitoken?: string, callback?: () => any): any;

  //lute相关
  //"/api/lute/spinBlockDOM",
  spinBlockDOM(data: any, apitoken?: string, callback?: () => any): any;
  // 未测试
  //"/api/lute/html2BlockDOM,
  html2BlockDOM(data: any, apitoken?: string, callback?: () => any): any;
  html转blockDOM(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/lute/copyStdMarkdown",
  copyStdMarkdown(data: any, apitoken?: string, callback?: () => any): any;
  复制标准markdown(data: any, apitoken?: string, callback?: () => any): any;

  //sql相关
  //"/api/query/sql",
  sql(data: any, apitoken?: string, callback?: () => any): any;
  sql查询(data: any, apitoken?: string, callback?: () => any): any;

  //搜索相关
  //"/api/search/searchTag,
  searchTag(data: any, apitoken?: string, callback?: () => any): any;
  搜索标签(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/search/searchTemplate,
  searchTemplate(data: any, apitoken?: string, callback?: () => any): any;
  搜索模板(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/search/searchWidget",
  searchWidget(data: any, apitoken?: string, callback?: () => any): any;
  搜索挂件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/search/searchRefBlock",
  searchRefBlock(data: any, apitoken?: string, callback?: () => any): any;
  搜索引用块(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/search/searchEmbedBlock,
  searchEmbedBlock(data: any, apitoken?: string, callback?: () => any): any;
  搜索嵌入块(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/search/fullTextSearchBlock",
  fullTextSearchBlock(data: any, apitoken?: string, callback?: () => any): any;
  全文搜索块(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/search/searchAsset,
  searchAsset(data: any, apitoken?: string, callback?: () => any): any;
  搜索资源(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/search/findReplace",
  findReplace(data: any, apitoken?: string, callback?: () => any): any;
  查找替换(data: any, apitoken?: string, callback?: () => any): any;

  //块相关
  //"/api/block/getBlockInfo",
  getBlockInfo(data: any, apitoken?: string, callback?: () => any): any;
  获取块信息(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getBlockDOM",
  getBlockDOM(data: any, apitoken?: string, callback?: () => any): any;
  获取块DOM(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getBlockKramdown,
  getBlockKramdown(data: any, apitoken?: string, callback?: () => any): any;
  获取块kramdown(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getBlockBreadcrumb,
  getBlockBreadcrumb(data: any, apitoken?: string, callback?: () => any): any;
  获取块面包屑(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getBlockIndex,
  getBlockIndex(data: any, apitoken?: string, callback?: () => any): any;
  获取块索引(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getRefIDs",
  getRefIDs(data: any, apitoken?: string, callback?: () => any): any;
  获取引用块id(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getRefIDsByFileAnnotationID",
  getRefIDsByFileAnnotationID(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  根据文件标记id获取引用块id(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/block/getBlockDefIDsByRefText",
  getBlockDefIDsByRefText(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  根据引用文本获取块定义id(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/block/getRefText",
  getRefText(data: any, apitoken?: string, callback?: () => any): any;
  获取引用文本(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getTreeStat,
  getTreeStat(data: any, apitoken?: string, callback?: () => any): any;
  获取树状态(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getBlockWordCount",
  getBlockWordCount(data: any, apitoken?: string, callback?: () => any): any;
  获取块字数(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getContentWordCount",
  getContentWordCount(data: any, apitoken?: string, callback?: () => any): any;
  获取内容字数统计(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getRecentUpdatedBlocks",
  getRecentUpdatedBlocks(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  获取最近更新的块(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getDocInfo",
  getDocInfo(data: any, apitoken?: string, callback?: () => any): any;
  获取文档信息(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/checkBlockExist",
  checkBlockExist(data: any, apitoken?: string, callback?: () => any): any;
  检查块是否存在(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/checkBlockFold",
  checkBlockFold(data: any, apitoken?: string, callback?: () => any): any;
  检查块是否展开(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/insertBlock",
  insertBlock(data: any, apitoken?: string, callback?: () => any): any;
  插入块(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/prependBlock",
  prependBlock(data: any, apitoken?: string, callback?: () => any): any;
  插入前置子块(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/appendBlock",
  appendBlock(data: any, apitoken?: string, callback?: () => any): any;
  插入后置子块(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/updateBlock",
  updateBlock(data: any, apitoken?: string, callback?: () => any): any;
  更新块(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/deleteBlock,
  deleteBlock(data: any, apitoken?: string, callback?: () => any): any;
  删除块(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/setBlockReminder,
  setBlockReminder(data: any, apitoken?: string, callback?: () => any): any;
  设置块提醒(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getHeadingLevelTransaction,
  getHeadingLevelTransaction(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  获取标题级别事务(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getHeadingDeleteTransaction,
  getHeadingDeleteTransaction(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  获取标题删除事务(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getHeadingChildrenIDs",
  getHeadingChildrenIDs(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  获取标题子块id(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/getHeadingChildrenDOM,
  getHeadingChildrenDOM(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  获取标题子块DOM(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/swapBlockRef,
  swapBlockRef(data: any, apitoken?: string, callback?: () => any): any;
  交换引用(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/block/transferBlockRef,
  transferBlockRef(data: any, apitoken?: string, callback?: () => any): any;
  转移引用(data: any, apitoken?: string, callback?: () => any): any;

  //文件相关
  //"/api/file/getFile,
  getFile(data: any, apitoken?: string, callback?: () => any): any;
  获取文件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/file/putFile,
  putFile(data: any, apitoken?: string, callback?: () => any): any;
  上传文件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/file/copyFile,
  copyFile(data: any, apitoken?: string, callback?: () => any): any;
  复制文件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/file/removeFile,
  removeFile(data: any, apitoken?: string, callback?: () => any): any;
  移除文件(data: any, apitoken?: string, callback?: () => any): any;

  //引用相关
  //"/api/ref/refreshBacklink,
  refreshBacklink(data: any, apitoken?: string, callback?: () => any): any;
  刷新反向链接(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/ref/getBacklink,
  getBacklink(data: any, apitoken?: string, callback?: () => any): any;
  获取反向链接(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/ref/createBacklink,
  createBacklink(data: any, apitoken?: string, callback?: () => any): any;
  创建反向链接(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/ref/getBacklinkDoc,
  getBacklinkDoc(data: any, apitoken?: string, callback?: () => any): any;
  获取反链文档(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/ref/getBackmentionDoc,
  getBackmentionDoc(data: any, apitoken?: string, callback?: () => any): any;
  获取提及文档(data: any, apitoken?: string, callback?: () => any): any;

  //属性相关
  //"/api/attr/getBookmarkLabels",
  getBookmarkLabels(data: any, apitoken?: string, callback?: () => any): any;
  获取书签标签(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/attr/resetBlockAttrs,
  resetBlockAttrs(data: any, apitoken?: string, callback?: () => any): any;
  重置块属性(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/attr/setBlockAttrs",
  setBlockAttrs(data: any, apitoken?: string, callback?: () => any): any;
  设置块属性(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/attr/getBlockAttrs,
  getBlockAttrs(data: any, apitoken?: string, callback?: () => any): any;
  获取块属性(data: any, apitoken?: string, callback?: () => any): any;

  //云端相关
  //"/api/cloud/getCloudSpace",
  getCloudSpace(data: any, apitoken?: string, callback?: () => any): any;
  获取云端空间(data: any, apitoken?: string, callback?: () => any): any;

  //同步相关
  //"/api/sync/setSyncEnable",
  setSyncEnable(data: any, apitoken?: string, callback?: () => any): any;
  设置同步开关(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/sync/setSyncGenerateConflictDoc",
  setSyncGenerateConflictDoc(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  设置同步是否生成冲突文件(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/sync/setSyncMode,
  setSyncMode(data: any, apitoken?: string, callback?: () => any): any;
  设置同步模式(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/sync/setSyncProvider,
  setSyncProvider(data: any, apitoken?: string, callback?: () => any): any;
  设置同步供应商(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/sync/setSyncProviderS3",
  setSyncProviderS3(data: any, apitoken?: string, callback?: () => any): any;
  设置S3同步配置(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/sync/setSyncProviderWebDAV",
  setSyncProviderWebDAV(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  设置webdav同步配置(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/sync/setCloudSyncDir",
  setCloudSyncDir(data: any, apitoken?: string, callback?: () => any): any;
  设置云端同步目录(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/sync/createCloudSyncDir,
  createCloudSyncDir(data: any, apitoken?: string, callback?: () => any): any;
  创建云端同步目录(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/sync/removeCloudSyncDir",
  removeCloudSyncDir(data: any, apitoken?: string, callback?: () => any): any;
  删除云端同步目录(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/sync/listCloudSyncDir,
  listCloudSyncDir(data: any, apitoken?: string, callback?: () => any): any;
  获取云端同步目录(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/sync/performSync,
  performSync(data: any, apitoken?: string, callback?: () => any): any;
  执行同步(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/sync/performBootSync,
  performBootSync(data: any, apitoken?: string, callback?: () => any): any;
  执行启动同步(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/sync/getBootSync",
  getBootSync(data: any, apitoken?: string, callback?: () => any): any;
  获取启动同步(data: any, apitoken?: string, callback?: () => any): any;

  //收集箱相关
  //"/api/inbox/getShorthands,
  getShorthands(data: any, apitoken?: string, callback?: () => any): any;
  获取收集箱简写列表(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/inbox/getShorthand,
  getShorthand(data: any, apitoken?: string, callback?: () => any): any;
  获取收集箱简写(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/inbox/removeShorthands",
  removeShorthands(data: any, apitoken?: string, callback?: () => any): any;
  删除收集箱简写(data: any, apitoken?: string, callback?: () => any): any;

  //浏览器插件相关
  //"/api/extension/copy,
  extensionCopy(data: any, apitoken?: string, callback?: () => any): any;
  复制扩展(data: any, apitoken?: string, callback?: () => any): any;

  //剪贴板相关
  //"/api/clipboard/readFilePaths",
  readFilePaths(data: any, apitoken?: string, callback?: () => any): any;
  读取剪贴板文件路径(data: any, apitoken?: string, callback?: () => any): any;

  //附件相关
  //"/api/asset/uploadCloud",
  uploadCloud(data: any, apitoken?: string, callback?: () => any): any;
  上传云端附件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/asset/insertLocalAssets",
  insertLocalAssets(data: any, apitoken?: string, callback?: () => any): any;
  插入本地附件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/asset/resolveAssetPath,
  resolveAssetPath(data: any, apitoken?: string, callback?: () => any): any;
  解析附件路径(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/asset/upload",
  upload(
    data: {
      assetsDirPath: string;
      data: File[];
    },
    apitoken?: string,
    callback?: () => any
  ): any;
  上传附件(
    data: {
      assetsDirPath: string;
      data: File[];
    },
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/asset/setFileAnnotation,
  setFileAnnotation(
    data: {
      path: string;
      data: object;
    },
    apitoken?: string,
    callback?: () => any
  ): any;
  设置附件注释(
    data: {
      path: string;
      data: object;
    },
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/asset/getFileAnnotation",
  getFileAnnotation(data: any, apitoken?: string, callback?: () => any): any;
  获取附件注释(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/asset/getUnusedAssets",
  getUnusedAssets(data: any, apitoken?: string, callback?: () => any): any;
  获取未使用的附件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/asset/removeUnusedAsset,
  removeUnusedAsset(data: any, apitoken?: string, callback?: () => any): any;
  删除未使用的附件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/asset/removeUnusedAssets",
  removeUnusedAssets(data: any, apitoken?: string, callback?: () => any): any;
  批量删除未使用的附件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/asset/getDocImageAssets",
  getDocImageAssets(data: any, apitoken?: string, callback?: () => any): any;
  获取文档图片附件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/asset/renameAsset",
  renameAsset(data: any, apitoken?: string, callback?: () => any): any;
  重命名附件(data: any, apitoken?: string, callback?: () => any): any;

  //导出相关
  //"/api/export/batchExportMd",
  batchExportMd(data: any, apitoken?: string, callback?: () => any): any;
  批量导出Markdown(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/exportMd",
  exportMd(data: any, apitoken?: string, callback?: () => any): any;
  导出Markdown(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/exportSY",
  exportSY(data: any, apitoken?: string, callback?: () => any): any;
  导出SY(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/exportNotebookSY,
  exportNotebookSY(data: any, apitoken?: string, callback?: () => any): any;
  导出笔记本sy(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/exportMdContent",
  exportMdContent(data: any, apitoken?: string, callback?: () => any): any;
  导出Markdown内容(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/exportHTML",
  exportHTML(data: any, apitoken?: string, callback?: () => any): any;
  导出HTML(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/exportPreviewHTML,
  exportPreviewHTML(
    data: {
      id: string;
      keepFold: boolean;
      merge: boolean;
    },
    apitoken?: string,
    callback?: () => any
  ): siyuanRes;
  导出预览HTML(data: any, apitoken?: string, callback?: () => any): siyuanRes;

  //"/api/export/exportMdHTML,
  exportMdHTML(data: any, apitoken?: string, callback?: () => any): any;
  导出MarkdownHTML(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/exportDocx",
  exportDocx(data: any, apitoken?: string, callback?: () => any): any;
  导出Docx(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/processPDF,
  processPDF(data: any, apitoken?: string, callback?: () => any): any;
  生成PDF(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/preview",
  exportPreview(data: any, apitoken?: string, callback?: () => any): any;
  预览(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/exportAsFile,
  exportAsFile(data: any, apitoken?: string, callback?: () => any): any;
  文件形式导出(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/exportData",
  exportData(data: any, apitoken?: string, callback?: () => any): any;
  导出数据(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/exportDataInFolder",
  exportDataInFolder(data: any, apitoken?: string, callback?: () => any): any;
  导出数据到文件夹(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/exportTempContent,
  exportTempContent(data: any, apitoken?: string, callback?: () => any): any;
  导出缓存内容(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/export/export2Liandi,
  export2Liandi(data: any, apitoken?: string, callback?: () => any): any;
  导出到链滴(data: any, apitoken?: string, callback?: () => any): any;

  //导入相关
  //"/api/import/importStdMd,
  importStdMd(data: any, apitoken?: string, callback?: () => any): any;
  导入标准Markdown(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/import/importData,
  importData(data: any, apitoken?: string, callback?: () => any): any;
  导入数据(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/import/importSY",
  importSY(data: any, apitoken?: string, callback?: () => any): any;
  导入SY(data: any, apitoken?: string, callback?: () => any): any;

  //模板相关
  //"/api/template/render,
  renderTemplate(data: any, apitoken?: string, callback?: () => any): any;
  渲染模板(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/template/docSaveAsTemplate",
  docSaveAsTemplate(data: any, apitoken?: string, callback?: () => any): any;
  文档另存为模板(data: any, apitoken?: string, callback?: () => any): any;

  //事务相关
  //"/api/transactions",
  performTransactions(data: any, apitoken?: string, callback?: () => any): any;
  执行事务(data: any, apitoken?: string, callback?: () => any): any;

  //设置相关
  //"/api/setting/setAccount",
  setAccount(data: any, apitoken?: string, callback?: () => any): any;
  设置账户(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/setEditor",
  setEditor(data: any, apitoken?: string, callback?: () => any): any;
  设置编辑器(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/setExport",
  setExport(data: any, apitoken?: string, callback?: () => any): any;
  设置导出(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/setFiletree",
  setFiletree(data: any, apitoken?: string, callback?: () => any): any;
  设置文件树(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/setSearch",
  setSearch(data: any, apitoken?: string, callback?: () => any): any;
  设置搜索(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/setKeymap",
  setKeymap(data: any, apitoken?: string, callback?: () => any): any;
  设置快捷键(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/setAppearance",
  setAppearance(data: any, apitoken?: string, callback?: () => any): any;
  设置外观(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/getCloudUser",
  getCloudUser(data: any, apitoken?: string, callback?: () => any): any;
  获取云端用户(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/logoutCloudUser",
  logoutCloudUser(data: any, apitoken?: string, callback?: () => any): any;
  注销云端用户(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/login2faCloudUser,
  login2faCloudUser(data: any, apitoken?: string, callback?: () => any): any;
  二次验证登录云端用户(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/getCustomCSS",
  getCustomCSS(data: any, apitoken?: string, callback?: () => any): any;
  获取自定义CSS(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/setCustomCSS,
  setCustomCSS(data: any, apitoken?: string, callback?: () => any): any;
  设置自定义CSS(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/setEmoji",
  setEmoji(data: any, apitoken?: string, callback?: () => any): any;
  设置emoji(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/setting/setSearchCaseSensitive",
  setSearchCaseSensitive(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  设置搜索是否区分大小写(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //图谱相关
  //"/api/graph/resetGraph",
  resetGraph(data: any, apitoken?: string, callback?: () => any): any;
  重置图谱(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/graph/resetLocalGraph,
  resetLocalGraph(data: any, apitoken?: string, callback?: () => any): any;
  重置本地图谱(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/graph/getGraph",
  getGraph(data: any, apitoken?: string, callback?: () => any): any;
  获取图谱(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/graph/getLocalGraph",
  getLocalGraph(data: any, apitoken?: string, callback?: () => any): any;
  获取本地图谱(data: any, apitoken?: string, callback?: () => any): any;

  //集市相关
  //"/api/bazaar/getBazaarWidget",
  getBazaarWidget(data: any, apitoken?: string, callback?: () => any): any;
  获取集市挂件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/getInstalledWidget,
  getInstalledWidget(data: any, apitoken?: string, callback?: () => any): any;
  获取已安装的挂件列表(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/installBazaarWidget,
  installBazaarWidget(data: any, apitoken?: string, callback?: () => any): any;
  安装集市挂件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/uninstallBazaarWidget,
  uninstallBazaarWidget(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  卸载集市挂件(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/getBazaarIcon",
  getBazaarIcon(data: any, apitoken?: string, callback?: () => any): any;
  获取集市图标(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/getInstalledIcon,
  getInstalledIcon(data: any, apitoken?: string, callback?: () => any): any;
  获取已安装的图标(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/installBazaarIcon",
  installBazaarIcon(data: any, apitoken?: string, callback?: () => any): any;
  安装集市图标(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/uninstallBazaarIcon",
  uninstallBazaarIcon(data: any, apitoken?: string, callback?: () => any): any;
  卸载集市图标(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/getBazaarTemplate",
  getBazaarTemplate(data: any, apitoken?: string, callback?: () => any): any;
  获取集市模板(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/getInstalledTemplate,
  getInstalledTemplate(data: any, apitoken?: string, callback?: () => any): any;
  获取已安装的模板列表(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/installBazaarTemplate,
  installBazaarTemplate(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  安装集市模板(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/uninstallBazaarTemplate,
  uninstallBazaarTemplate(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  卸载集市模板(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/getBazaarTheme",
  getBazaarTheme(data: any, apitoken?: string, callback?: () => any): any;
  获取集市主题(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/getInstalledTheme",
  getInstalledTheme(data: any, apitoken?: string, callback?: () => any): any;
  获取已安装的主题(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/installBazaarTheme,
  installBazaarTheme(data: any, apitoken?: string, callback?: () => any): any;
  安装集市主题(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/uninstallBazaarTheme,
  uninstallBazaarTheme(data: any, apitoken?: string, callback?: () => any): any;
  卸载集市主题(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/bazaar/getBazaarPackageREAME",
  getBazaarPackageREAME(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  获取集市包说明(data: any, apitoken?: string, callback?: () => any): any;

  //仓库相关
  //"/api/repo/initRepoKey",
  initRepoKey(data: any, apitoken?: string, callback?: () => any): any;
  初始化仓库key(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/initRepoKeyFromPassphrase",
  initRepoKeyFromPassphrase(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  从密码初始化仓库key(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/resetRepo",
  resetRepo(data: any, apitoken?: string, callback?: () => any): any;
  重置仓库(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/importRepoKey",
  importRepoKey(data: any, apitoken?: string, callback?: () => any): any;
  导入仓库key(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/createSnapshot",
  createSnapshot(data: any, apitoken?: string, callback?: () => any): any;
  创建快照(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/tagSnapshot",
  tagSnapshot(data: any, apitoken?: string, callback?: () => any): any;
  标记快照(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/checkoutRepo",
  checkoutRepo(data: any, apitoken?: string, callback?: () => any): any;
  签出仓库(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/getRepoSnapshots",
  getRepoSnapshots(data: any, apitoken?: string, callback?: () => any): any;
  获取仓库快照列表(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/getRepoTagSnapshots",
  getRepoTagSnapshots(data: any, apitoken?: string, callback?: () => any): any;
  获取标记快照列表(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/removeRepoTagSnapshot",
  removeRepoTagSnapshot(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  移除标记快照列表(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/getCloudRepoTagSnapshots",
  getCloudRepoTagSnapshots(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  获取云端标记快照列表(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/removeCloudRepoTagSnapshot",
  removeCloudRepoTagSnapshot(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  移除云端标记快照(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/uploadCloudSnapshot",
  uploadCloudSnapshot(data: any, apitoken?: string, callback?: () => any): any;
  更新云端快照列表(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/downloadCloudSnapshot",
  downloadCloudSnapshot(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  下载云端快照(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/diffRepoSnapshots",
  diffRepoSnapshots(data: any, apitoken?: string, callback?: () => any): any;
  比较仓库快照(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/repo/openRepoSnapshotDoc",
  openRepoSnapshotDoc(data: any, apitoken?: string, callback?: () => any): any;
  打开快照文档(data: any, apitoken?: string, callback?: () => any): any;

  //间隔重复相关
  //"/api/riff/createRiffDeck",
  createRiffDeck(data: any, apitoken?: string, callback?: () => any): any;
  创建间隔重复卡包(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/riff/renameRiffDeck",
  renameRiffDeck(data: any, apitoken?: string, callback?: () => any): any;
  重命名间隔重复卡包(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/riff/removeRiffDeck",
  removeRiffDeck(data: any, apitoken?: string, callback?: () => any): any;
  移除间隔重复卡包(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/riff/getRiffDecks",
  getRiffDecks(data: any, apitoken?: string, callback?: () => any): any;
  获取间隔重复卡包列表(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/riff/addRiffCards",
  addRiffCards(data: any, apitoken?: string, callback?: () => any): any;
  添加间隔重复卡片(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/riff/removeRiffCards",
  removeRiffCards(data: any, apitoken?: string, callback?: () => any): any;
  移除间隔重复卡片(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/riff/getRiffDueCards",
  getRiffDueCards(data: any, apitoken?: string, callback?: () => any): any;
  获取到期间隔重复卡片列表(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/riff/getTreeRiffDueCards",
  getTreeRiffDueCards(data: any, apitoken?: string, callback?: () => any): any;
  获取到期文档树间隔重复卡片列表(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/riff/getNotebookRiffDueCards",
  getNotebookRiffDueCards(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;
  获取到期笔记本间隔重复卡片列表(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/riff/reviewRiffCard",
  reviewRiffCard(data: any, apitoken?: string, callback?: () => any): any;
  复习间隔重复卡片(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/riff/skipReviewRiffCard",
  skipReviewRiffCard(data: any, apitoken?: string, callback?: () => any): any;
  跳过间隔重复卡片(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/riff/getRiffCards",
  getRiffCards(data: any, apitoken?: string, callback?: () => any): any;
  获取间隔重复卡片列表(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/riff/getTreeRiffCards",
  getTreeRiffCards(data: any, apitoken?: string, callback?: () => any): any;
  获取文档树间隔重复卡片列表(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/riff/getNotebookRiffCards",
  getNotebookRiffCards(data: any, apitoken?: string, callback?: () => any): any;
  获取笔记本间隔重复卡片列表(
    data: any,
    apitoken?: string,
    callback?: () => any
  ): any;

  //消息相关
  //"/api/notification/pushMsg,
  pushMsg(data: any, apitoken?: string, callback?: () => any): any;
  发送消息(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/notification/pushErrMsg",
  pushErrMsg(data: any, apitoken?: string, callback?: () => any): any;
  发送错误消息(data: any, apitoken?: string, callback?: () => any): any;

  //代码片段相关
  //"/api/snippet/getSnippet,
  getSnippet(data: any, apitoken?: string, callback?: () => any): any;
  获取代码片段(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/snippet/setSnippet,
  setSnippet(data: any, apitoken?: string, callback?: () => any): any;
  设置代码片段(data: any, apitoken?: string, callback?: () => any): any;

  //"/api/snippet/removeSnippet",
  removeSnippet(data: any, apitoken?: string, callback?: () => any): any;
  移除代码片段(data: any, apitoken?: string, callback?: () => any): any;

  ////"/snippets/*filepath,
  //serveSnippets(data: any, apitoken?: string, callback?: () => any): any;
  //这个不用生成函数;
  //属性视图相关
  //"/api/av/renderAttributeView",
  renderAttributeView(data: any, apitoken?: string, callback?: () => any): any;
  渲染属性视图(data: any, apitoken?: string, callback?: () => any): any;

  //人工智能相关
  //"/api/ai/chatGPT,
  chatGPT(
    data: {
      msg: string;
    },
    apitoken?: string,
    callback?: () => any
  ): any;

  //"/api/ai/chatGPTWithAction,
  chatGPTWithAction(
    data: {
      ids: string;
      action: string;
    },
    apitoken?: string,
    callback?: () => any
  ): any;
}
export let kernelApi: kernelApiList
export default kernelApi;
