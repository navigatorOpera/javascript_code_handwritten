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
    if(array) {
        obj.forEach(o => {
            if(typeof o === 'object') {
                simulate_stringify(o);
            }
            if(typeof o === 'symbol' || typeof o === 'undefined' || typeof o === 'function') {
                res.push(`${o}`);
            }else {
                res.push(String(o))
            }
        });
    }
    return res;
}

let a = [3];
console.log(typeof a, simulate_stringify(a));
