window.noobRegistryRoot = {};

export interface 注册表项目 {
  id: string;
  value: any;
}
export class 注册表 {
  public id;
  public value;
  constructor(id) {
    this.id = id;
    //为了在多次引入时，避免各个注册表实例获取到的项目序列不一样，所以这里把它们放置到全局变量中
    //这样来保证每个同类型的注册表最终操作的是同一个项目序列
    if (window.noobRegistryRoot[this.id]) {
      this.项目序列 = window.noobRegistryRoot[this.id]["项目序列"];
    } else {
      this.项目序列= []
      window.noobRegistryRoot[this.id] = { items: this.项目序列 };
    }
  }
  public 项目序列: 注册表项目[] = [];
  public items = this.项目序列
  public 注册(id: string, value: any): void {
    const 存在元素索引 = this.项目序列.findIndex((item) => item.id === id);
    if (存在元素索引 >= 0) {
      // 如果元素已存在，则替换元素value
      this.项目序列[存在元素索引].value = value;
    } else {
      // 否则添加新元素
      this.项目序列.push({ id, value });
    }
  }
  public regist= this.注册
  public 注销(id: string): void {
    const 要移除的索引 = this.项目序列.findIndex((item) => item.id === id);
    if (要移除的索引 >= 0) {
      // 如果元素已存在，则将其移除
      this.项目序列.splice(要移除的索引, 1);
    } else {
      console.warn(`元素${id}在 ${this} 中未注册`);
    }
  }
  public unregist= this.注销
  public 获取(id: string): any {
    const 元素 = this.项目序列.find((item) => item.id === id);
    return 元素 ? 元素.value : undefined;
  }
  public get = this.获取
  public 列出() {
    return this.项目序列;
  }
  public list = this.列出
  public 过滤(过滤方法: (item, index) => boolean) {
    return this.项目序列.filter((item, index) => {
      return 过滤方法(item, index);
    });
  }
  public filter=this.过滤
}
export interface 注册表项目 {
  id: string;
  value: any;
}
export class 树形注册表 extends 注册表 {
  public id;
  constructor(id) {
    super(id);
  }
  public 项目序列: 注册表[] = [];
}
