export interface ICache<K, V> {
    cache: Map<K, V>
    add: (key: K, value: V) => void
    get: (key: K) => V
}

export class Cache<K, V> implements ICache<K, V> {
    cache: Map<K, V>
    keyList: K[]
    size: number
    constructor() {
        this.cache = new Map();
        this.keyList = []
        this.size = 3
    }

    add(key: K, value: V): void {
        if (this.keyList.includes(key)) {
            this.keyList.splice(this.keyList.indexOf(key), 1)
            this.keyList.unshift(key)
        }
        else {
            this.keyList.unshift(key)
            if (this.keyList.length > this.size)
                this.cache.delete(this.keyList.pop());
            this.cache.set(key, value)
        }
    }

    get(key: K): V | undefined {
        if (this.cache.has(key))
            return this.cache.get(key)
        return undefined
    }
}
