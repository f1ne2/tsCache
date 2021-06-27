import * as express from 'express'
import { Cache } from "./cache";
import { Either } from "fp-ts/Either";
import { DecodeError } from "io-ts/Decoder";
import { User } from "./User";
export const app = express()
const port = 8080
const host = 'localhost'
export const router = express.Router();
import fetch from 'node-fetch';

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/:user', (req, res): void => {
    const obj = new Cache();
    if (!obj.get(req.params['user'])) {
        request('https://api.github.com/users/' + req.params['user'])
            .then(response => {
                obj.add(response["right"]["login"], response["right"]["id"])
                res.send(response)})
    }
    else {
        obj.add(req.params['user'], '')
    }
})

app.get('/:user/getData', (req, res): void => {
    const obj = new Cache();
    if (obj.get(req.params['user'])) {
        res.send(obj.get(req.params['user']))
    }
    else
        res.send('Not found in Cache')
})



async function request(url: string): Promise<Either<DecodeError, User>> {
    const json: JSON = await fetch(url, { headers: {'Authorization': process.env.PERSONAL_TOKEN}})
        .then(response => response.json())
    return User.decode(json)
}
