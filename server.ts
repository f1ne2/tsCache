import * as express from 'express'
import { Cache } from "./cache";
import { Either } from "fp-ts/Either";
import { DecodeError } from "io-ts/Decoder";
import { User } from "./User";
export const app = express()
const port = 8080
const host = 'localhost'
const router = express.Router();
import fetch from 'node-fetch';

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const obj = new Cache();

app.get('/:user', (req, res): void => {
    if (!obj.get(req.params['user'])) {
        let url: string = 'https://api.github.com/users/' + req.params['user'];
        request(url)
            .then(function (response) {
                obj.cache.set(
                    response["right"]["login"],
                    response["right"]["id"])
                    obj.add(response["right"]["login"], response["right"]["id"])
                    res.status(200).send('200 Ok Add')
            })

    }
    else {
        obj.add(req.params['user'], '')
        res.status(200).send('200 Ok Add')
    }

})

app.get('/:user/getData', (req, res): void => {
    if (obj.get(req.params['user'])) {
        res.status(200).send(String(`id  ${obj.get(req.params['user'])}`))
    }
    else
        res.status(404).send('No in database')
})

async function request(url: string): Promise<Either<DecodeError, User>> {
    const json: JSON = await fetch(url, { headers: {'Authorization': process.env.PERSONAL_TOKEN}})
        .then(response => response.json())
    return User.decode(json)
}
