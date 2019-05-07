const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECT = 'reject';
const IS_ERROR = null;

function noop() {}

function Promise(func) {
    if (typeof this !== 'object') {
        throw new TypeError('promise must be constructored via new');
    }

    if (typeof func !== 'function') {
        throw new TypeError('the paramter must be a function');
    }

    this.status = null;
    this.res = null;
    if(func === noop) return;
    handleFunc(this, func);

}

function handleFunc(promise, fn) {
    let done = false;

    let res = runFn(
        fn,
        function(value) {
            if (done) return;
            done = true;
            resolve(value, promise);
        },
        function(err) {
            if (done) return;
            done = true;
            reject(err, promise);
        }
    );

    if (!done && res === IS_ERROR) {
        done = true;
        reject('', promise);
    }
}

function runFn(fn, a, b) {
    let res = null;
    try {
        fn(a, b);
    } catch (err) {
        return res;
    }
}

function resolve(v, promise) {
    if (this.status !== PENDING) throw new TypeError(`当前状态已为${this.status}, 不可变更`);

    this.status = FULFILLED;
    this.res = v;
    return promise;
}

function reject(v, promise) {
    if (this.status !== PENDING) throw new TypeError(`当前状态已为${this.status}, 不可变更`);

    this.status = REJECT;
    this.res = v;
    return promise;
}

Promise.prototype.then = function(a/* fulfilled*/, b/* rejected*/) {
    // if(this.constructor !== Promise) {
    //     return safeThen(this, a, b);
    // }
    switch (this.status) {
        case FULFILLED:
            a(this.res);
            break;
        case REJECT:
            b(this.res);
            break;
        default:
            return null;
    }
    return new Promise(noop);
};


