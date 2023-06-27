function promisefy(original) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push(function cb(err, ...values) {
                if (values) {
                    resolve(values)
                } else {
                    reject(err)
                }
            })
            original.apply(this, args);
        })

    }

}

const readfileAsync = promisefy(readfile)
