import * as Decoder from "io-ts/Decoder";

export interface User {
    login: string,
    id: number
}

export const User: Decoder.Decoder<unknown, User> = Decoder.lazy('User', () =>
    Decoder.struct({
        login: Decoder.string,
        id: Decoder.number
    })
)