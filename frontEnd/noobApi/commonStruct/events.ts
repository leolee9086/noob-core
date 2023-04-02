type 回调<T> = (arg: T) => void;
export class 基本事件总线<T> {
  private 事件: Map<string, 回调<T>[]> = new Map();
  on(事件名: string, 回调函数: 回调<T>): void {
    let 回调函数序列 = this.事件.get(事件名);
    if (!回调函数序列) {
      回调函数序列 = [];
      this.事件.set(事件名, 回调函数序列);
    }
    回调函数序列.push(回调函数);
  }
  监听=this.on
  once(事件名: string, 回调函数: 回调<T>): void {
    const 包装函数: 回调<T> = (arg: T) => {
      回调函数(arg);
      this.off(事件名, 包装函数);
    };
    this.on(事件名, 包装函数);
  }
  单次监听 = this.once
  off(事件名: string, 回调函数: 回调<T>): void {
    const 回调函数序列 = this.事件.get(事件名);
    if (!回调函数序列) {
      return;
    }
    const index = 回调函数序列.indexOf(回调函数);
    if (index !== -1) {
      回调函数序列.splice(index, 1);
    }
  }
  关闭监听= this.off
  emit(事件名: string, arg: T): void {
    const 回调函数序列 = this.事件.get(事件名);
    if (!回调函数序列 || !回调函数序列.length) {
      return;
    }
    for (const 回调函数 of 回调函数序列) {
      setTimeout(() => 回调函数(arg), 0);
    }
  }
  触发=this.emit
}
