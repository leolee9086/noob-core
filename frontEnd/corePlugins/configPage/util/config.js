
export  function   mergeConfig(oldConfig, newConfig) {
  Object.getOwnPropertyNames(newConfig).forEach((name) => {
    if (!oldConfig[name]) {
      oldConfig[name] =newConfig[name];
      oldConfig[name]['actived'] = false;
    }
  });
  Object.getOwnPropertyNames(oldConfig).forEach( (name) => {
    if (!newConfig[name]) {
        oldConfig[name] = undefined;
      }
    if(name=='configPage'){
        oldConfig[name]['instance']['config']=undefined
    }
  })
 
  return oldConfig
}
