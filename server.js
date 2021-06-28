"use strict";
exports.__esModule = true;
exports.app = void 0;
var express = require("express");
var dotenv = require("dotenv");
var cache_1 = require("./cache");
var GithubClient_1 = require("./GithubClient");
exports.app = express();
dotenv.config();
exports.app.listen(process.env.PORT, function () {
    console.log("Example app listening at http://localhost:" + process.env.PORT);
});
var obj = new cache_1.Cache();
exports.app.get("/:user", function (req, res) {
    if (!obj.get(req.params.user)) {
        var url = "https://api.github.com/users/" + req.params.user;
        new GithubClient_1.GithubClient().requestUser(url)
            .then(function (response) {
            if (response._tag === "Right") {
                obj.add(response["right"]["login"], response["right"]["id"]);
                res.send(JSON.stringify({
                    fromCache: false,
                    login: response["right"]["login"],
                    id: response["right"]["id"]
                }));
            }
            else {
                res.send("203 Non-Authoritative Information");
            }
        });
    }
    else {
        obj.add(req.params["user"], "");
        res.send(JSON.stringify({
            fromCache: true,
            login: req.params["user"],
            id: obj.get(req.params["user"])
        }));
    }
});
exports.app.get("/:user/getData", function (req, res) {
    if (obj.get(req.params["user"])) {
        res.send(JSON.stringify({
            fromCache: true,
            login: req.params["user"],
            id: obj.get(req.params["user"])
        }));
    }
    else {
        res.send(JSON.stringify({
            fromCache: false,
            login: "not found",
            id: "not found"
        }));
    }
});
