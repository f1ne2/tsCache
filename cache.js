"use strict";
exports.__esModule = true;
exports.Cache = void 0;
var Cache = /** @class */ (function () {
    function Cache() {
        this.cache = new Map();
        this.keyList = [];
        this.size = 3;
    }
    Cache.prototype.add = function (key, value) {
        if (this.keyList.includes(key)) {
            this.keyList.splice(this.keyList.indexOf(key), 1);
            this.keyList.unshift(key);
        }
        else {
            this.keyList.unshift(key);
            if (this.keyList.length > this.size)
                this.cache["delete"](this.keyList.pop());
            this.cache.set(key, value);
        }
    };
    Cache.prototype.get = function (key) {
        if (this.cache.has(key))
            return this.cache.get(key);
        return undefined;
    };
    return Cache;
}());
exports.Cache = Cache;
