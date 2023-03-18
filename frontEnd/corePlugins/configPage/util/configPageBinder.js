import {FormItem} from 'siyuan'
export class configPageBinder{
    constructor(plugin,options){
        this.plugin = plugin
        this.options = options
        this.getpluginConfig()
    }
    async getpluginConfig(){
        console.log(await this.plugin.getConfig())
    }
    async mount(container){        
        container.clear()
        container.title=this.plugin.name+'设置'
        Object.getOwnPropertyNames(this.plugin.config||{}).forEach(
            prop=>{
                this.addItem(container,this.plugin.config[prop])
            }
        )
        container.destroyCallback=()=>{
            this.plugin.beforeConfigSave?this.plugin.beforeConfigSave(this.plugin.config):null
            this.plugin.saveConfig()
        }
    }
    addItem(container,Item){
        if(Item.name&&Item.label){
            container.addItem(
                new FormItem(Item,container)
            )
        }
    }
}
