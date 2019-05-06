


const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECT = 'reject';
const IS_ERROR = null;

function Promise(func) {


    if(typeof this !== 'object') {
        throw new TypeError('promise must be constructored via new');
    }

    if(typeof func !== 'function') {
        throw new TypeError('the paramter must be a function');
    }

    
    this.status = null;

    handleFunc(this, func);
}

function handleFunc(promise, fn) {

    let done = false;

    let res = runFn(fn, function(value) {
        if(done) return;
        done = true;
        resolve(value, promise);
    }, function(err) {
        if(done) return;
        done = true;
        reject(err, promise);
    });

    if(!done &&  res === IS_ERROR) {
        done = true;
        reject('', promise);
    }
}

function runFn(fn, a, b) {

    let res = null;
    try {
        fn(a, b);
    }catch(err) {
        return res;
    }
}

