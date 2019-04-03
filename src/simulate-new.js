
/**
 * @description 模拟new关键字
 * new过程
 * 1、新建一个对象 a
 * 2、将a的__proto__指向原函数的prototype
 * 3、将this指向a,执行原函数的构造函数逻辑
 * 4、返回创建的对象(原函数没有显示返回对象)
 * @param {*} obj 
 */
function _new(func) {
    const a = Object.create({});
    a.__proto__ = func.prototype;
    let ret = func.apply(a, Array.from(arguments).slice(1));
    if(typeof ret === 'object' || typeof ret === 'function' || typeof ret === null) {
        return ret;
    }
    return a;
}

function Demo(name) {
    this.name = name;
    // return {a:1} 显示返回对象
}

Demo.prototype.greet = function(param) {
    console.log(`${param}, i am ${this.name}`);
}

const demo = _new(Demo,'navigatorOpera');
console.log(demo.__proto__ === Demo.prototype);
console.log(demo.constructor === Demo);
console.log(demo);
console.log(demo.greet('hello'));

// export default _new;