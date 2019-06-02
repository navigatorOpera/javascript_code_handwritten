//将一个函数挂载在作用域内
Function.prototype._bind = function(context) {
    if(!arguments.length) {
        throw Error('至少需要一个参数：' + arguments[0]);
    }
    let self = this,
        args = Array.from(arguments).slice(1);
    let _bound = function(){
        //通过new
        if(self instanceof _bound) {
            context = this;
        }
        return self.apply(context, args.concat(Array.from(arguments).slice(0)));
    }
    return _bound;
}