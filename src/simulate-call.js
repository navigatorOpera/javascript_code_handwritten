let test = {
    name: 'navigator'
};

function greet(param, param1) {
    console.log(param, param1, this.name);
    return this.name;
}

Function.prototype._call = function(obj) {
    let func = this;
    let _obj = Object.create(obj); //可以排除obj为freeze的情况
    _obj.func = func;
    let args = Array.from(arguments).slice(1);
    let result = _obj.func(...args);
    delete _obj;
    return result;
};

console.log(greet._call(test, 'hello', 'morning'));
