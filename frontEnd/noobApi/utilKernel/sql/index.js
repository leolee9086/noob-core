import sybrick from './sqlbrick/sql.js'
export async function getBlock(id){
    return await sybrick.select().from('block').where({id:id})
}