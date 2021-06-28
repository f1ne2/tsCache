import * as Decoder from "io-ts/Decoder";

export interface User {
  login: string,
  id: number
}

// eslint-disable-next-line no-redeclare
export const User: Decoder.Decoder<unknown, User> = Decoder.lazy("User", () => Decoder.struct({
  login: Decoder.string,
  id: Decoder.number,
}));
