/**
 * @description
 * 1、Boolean | Number| String 类型会自动转换成对应的原始值。
 * 2、undefined、任意函数以及symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）。
 * 3、 不可枚举的属性会被忽略
 * 4、如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。
 * @param {*} obj
 */
function simulate_stringify(obj) {
    let type = typeof obj;
    if (type !== 'object' || type === null) {
        if (/string|function|undefined/.test(type)) {
            // obj = `${a}`;
            obj = '"' + obj + '"';
        }
        return String(obj);
    }
    let res = [];
    let array = Array.isArray(obj);
    for(let k in obj) {
        let v = obj[k];
        let type_o = typeof v;
        if(/undefined|string|function/.test(type_o)) {
            v = '"' + v + '"';
        }else if(type_o === 'object'){
            v = simulate_stringify(v);
        }
        
        res.push((array ? "" : '"' + k + '":') + String(v));
    }
    return  (array ? "[" : "{") + String(res) + (array ? "]" : "}")
}



let a = [3, true, undefined, function dd(){}, {c: 1}];
let c = {a:1, b: {d: 2}}
console.log(typeof a, simulate_stringify(c));
