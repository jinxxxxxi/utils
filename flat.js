function flat(infinaty) {
    if (typeof infinaty !== 'number') {
        console.log(new Error('need type of number'))
        return
    }
    const arr = this
    if (!arr) return [];
    const result = []
    const maxLevel = Math.max(infinaty, 1)
    const func = (arrs, n) => {
        for (let item of arrs) {
            if (n <= 0) {
                result.push(item)
                continue;
            }
            if (!Array.isArray(item)) {
                result.push(item)
            } else {

                func(item, n - 1)
            }
        }
    }
    func(arr, maxLevel)
    return result
}

Array.prototype.flat = flat

const res = [[1, 2, 3, [2], [[2], 2], 2], 0]
console.log(res.flat(1))