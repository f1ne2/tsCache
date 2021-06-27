"use strict";
exports.__esModule = true;
exports.User = void 0;
var Decoder = require("io-ts/Decoder");
exports.User = Decoder.lazy('User', function () {
    return Decoder.struct({
        login: Decoder.string,
        id: Decoder.number
    });
});
