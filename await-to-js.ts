function to<T, U = Error>(
    promise: Promise<T>,
    errorObj: object
): Promise<[U, undefined] | [null, T]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, undefined]>((err) => [err, undefined])
}
