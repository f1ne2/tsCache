import fetch from "node-fetch";
import { Either } from "fp-ts/Either";
import { DecodeError } from "io-ts/Decoder";
import { User } from "./User";

export class GithubClient {
  usernames: string[];
  constructor() {
    this.usernames = [];
  }

  async requestUser(url: string): Promise<Either<DecodeError, User>> {
    const json: JSON = await fetch(url, { headers: { Authorization: process.env.PERSONAL_TOKEN } })
      .then(response => response.json());
    return User.decode(json);
  }
}
