function _call(obj) {
    let func = this;
    obj.func = func;
    let args = Array.from(arguments).slice(1);
    obj.func(...args);
}

let test = {
    name: 'navigator'
}

function greet(param, param1) {
    console.log(param, param1,this.name);
    return this.name;
}

Function.prototype._call = function(obj) {
    let func = this;
    obj.func = func;
    let args = Array.from(arguments).slice(1);
    let result = obj.func(...args);
    delete obj.func;
    return result;
}

console.log(greet._call(test, 'hello', 'morning'));