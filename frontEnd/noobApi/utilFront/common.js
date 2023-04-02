function 构建树形结构(块列表) {
  const 块映射表 = {};
  const 根块列表 = [];
  块列表.forEach((块) => {
    块.子块列表 = [];
    块映射表[块.id] = 块;
  });
  块列表.forEach((块) => {
    const 父块 = 块映射表[块.parent_id];
    if (父块) {
      父块.子块列表.push(块);
    } else {
      根块列表.push(块);
    }
  });
  return 根块列表;
}
