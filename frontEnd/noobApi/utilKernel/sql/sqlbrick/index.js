//https://github.com/CSNW/sql-bricks-sqlite/blob/master/sqlite.js
import * as sql  from './esmSqlBrick.js'
var Update = sql.update;
var Insert = sql.insert;
var Select = sql.select;
var handleValue = sql._handleValue;

// Insert & Update OR clauses (SQLite dialect)
Update.defineClause('or', function(opts) { return this._or ? `OR ${this._or}` : '' }, {after: 'update'});
Insert.defineClause('or', function(opts) { return this._or ? `OR ${this._or}` : '' }, {after: 'insert'});

var or_methods = {
  'orReplace': 'REPLACE', 'orRollback': 'ROLLBACK',
  'orAbort': 'ABORT', 'orFail': 'FAIL'
};
Object.keys(or_methods).forEach(function(method) {
  Insert.prototype[method] = Update.prototype[method] = function() {
    this._or = or_methods[method]; return this;
  };
});

Select.prototype.limit = function(val) {
  this._limit = val;
  return this;
};
Select.prototype.offset = function(val) {
  this._offset = val;
  return this;
};

Select.defineClause(
  'limit',
  function(opts) { return this._limit != null ? `LIMIT ${handleValue(this._limit, opts)}` : '' },
  {after: 'orderBy'}
);

Select.defineClause(
  'offset',
  function(opts) { return this._offset != null ? `OFFSET ${handleValue(this._offset, opts)}` : '' },
  {after: 'limit'}
);
Select.prototype.post =async function post(opt){
    let string = this.toString(opt)
    let res = await fetch('/api/query/sql',{
        method:'post',
        body:JSON.stringify({
            stmt:string
        })
    })
    let json = await res.json()
    if(json.code===0){
        return json.data
    }else{
        throw new Error(`siyuan sql error:${json.msg}`)
    }
}
export default sql