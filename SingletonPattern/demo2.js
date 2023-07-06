function StorageBase() { }
StorageBase.prototype.getItem = function (key) {
    return localStorage.getItem(key)
}
StorageBase.prototype.setItem = function (key, value) {
    return localStorage.setItem(key, value)
}


const Singleton = !function () {
    let instance = null;
    return function () {
        if (!instance) {
            instance = new StorageBase()
            // or
            // instance = 自定义的对象
        }
        return instance
    }
}()

const obj1 = new Singleton();
const obj2 = new Singleton();