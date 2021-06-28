import * as express from "express";
import * as dotenv from "dotenv";
import { Cache } from "./cache";
import { GithubClient } from "./GithubClient";

export const app = express();
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

const obj = new Cache();

app.get("/:user", (req, res) => {
  if (!obj.get(req.params.user)) {
    const url: string = `https://api.github.com/users/${req.params.user}`;
    new GithubClient().requestUser(url)
      .then(response => {
        if (response._tag === "Right") {
          obj.add(response["right"]["login"], response["right"]["id"]);
          res.send(JSON.stringify({
            fromCache: false,
            login: response["right"]["login"],
            id: response["right"]["id"],
          }));
        } else {
          res.send("203 Non-Authoritative Information");
        }
      });
  } else {
    obj.add(req.params["user"], "");
    res.send(JSON.stringify({
      fromCache: true,
      login: req.params["user"],
      id: obj.get(req.params["user"]),
    }));
  }
});

app.get("/:user/getData", (req, res) => {
  if (obj.get(req.params["user"])) {
    res.send(JSON.stringify({
      fromCache: true,
      login: req.params["user"],
      id: obj.get(req.params["user"]),
    }));
  } else {
    res.send(JSON.stringify({
      fromCache: false,
      login: "not found",
      id: "not found",
    }));
  }
});
