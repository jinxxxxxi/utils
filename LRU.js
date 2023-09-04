// 方法一
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = {};
        this.keys = []
    }

    deleteKey(arr, key) {
        const idx = arr.findIndex(item => item === key);
        if (idx >= 0) {
            arr.splice(idx, 1)
        }
    }
    hasProperty(key) {
        return typeof this.cache?.[key] !== 'undefined'
    }
    get(key) {
        if (this.hasProperty(key)) {
            this.deleteKey(this.keys, key)
            this.keys.push(key)
            console.log('jinx ', this.cache[key])

            return this.cache[key]
        }
        return -1
    }

    put(key, val) {
        // 当前key存在
        if (this.hasProperty(key)) {
            this.cache[key] = val
            this.deleteKey(this.keys, key)
            this.keys.push(key)
        } else {
            this.keys.push(key)
            this.cache[key] = val
            // 容量如果超过了最大值，则删除最久未使用的（也就是数组中的第一个key）
            if (this.keys.length > this.capacity) {
                this.cache[this.keys[0]] = undefined;
                this.deleteKey(this.keys, this.keys[0])
            }


        }

        // console.log('map', this.keys)

    }
}
const lRUCache = new LRUCache(2)
lRUCache.put(1, 1)// 缓存是 {1=1}
lRUCache.put(2, 2)
lRUCache.get(1)// 返回 1
lRUCache.put(3, 3) // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2)// 返回 -1 (未找到)
lRUCache.put(4, 4) // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1)  //返回 -1 (未找到)
lRUCache.get(3)// 返回 3
lRUCache.get(4)  // 返回 4




// 方法二： 利用Map的顺序性
class LRUCacheMap {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (this.cache.has(key)) {
            const value = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key, value)
            return value
        }
        return -1
    }

    put(key, val) {
        if (this.cache.has(key)) {
            this.cache.delete(key)
        } else {
            if (this.cache.size > this.capacity) {
                const oldkey = this.cache.keys().next().value
                this.cache.delete(oldkey)
            }
        }
        this.cache.set(key, val)
    }
}