import { db } from "../../../utils/db.server";
import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
import { config } from "../config";
import redisClient from "../../../utils/redis.server";


class Auth {
    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Check email is valid
            if (!email || !EmailValidator.validate(email)) {
                return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
            }

            // Check password is valid
            if (!password) {
                return res.status(400).send({ auth: false, message: 'Password is required' });
            }

            // Get User from DB
            const user = await db.user.findUnique({
                where: { email },
                // select: { id: true, email: true, username: true, roleID: true }
            });

            // encode sent password
            const encodedpassword = Buffer.from(password, 'utf8').toString("base64");

            // Check if user not is found or password is incorrect
            if (!user || encodedpassword !== user.password) {
                console.log('Email or Password is incorrect');
                return res.status(404).send('Email or Password is incorrect');
            }

            const userData = {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'roleID': user.roleID
            }

            // Send token as cookie
            const accessToken = jwt.sign(userData, config.jwt.accessKey, { algorithm: 'HS256', expiresIn: '50s'});
            const refreshToken = jwt.sign(userData, config.jwt.refreshKey, { algorithm: 'HS256', expiresIn: '1d'});
            await redisClient.set(refreshToken, user.username, 60 * 60 * 24);
            res
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'strict'
            })
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                // secure: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            })
            .status(200)
            .send(`${user.username} logged in`);
        } catch (error) {
            console.log("Missing information", error);
            res.status(400).send('Bad request');
        }
    }

    public async logout(req: Request, res: Response) {
        res.status(200).clearCookie('token').send('Logged out');
    }

    public async auth(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization']
            if (!authHeader) { return res.status(401).send('Unauthorized'); }

            const token = authHeader.split(' ')[1];

            jwt.verify(token, config.jwt.accessKey, (err, decoded) => {
                if (err) return res.sendStatus(403);
                req.user = decoded;
                next();
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    public async refreshToken(req: Request, res: Response) {
        const cookies = req.cookies;
        if (!cookies || !cookies.refreshToken) return res.sendStatus(401);

        console.log(cookies.refreshToken)
        console.log(cookies.accessToken)

        const refreshToken = cookies.refreshToken;

        const username = await redisClient.get(refreshToken);
        if (!username) return res.sendStatus(403);

        jwt.verify(refreshToken, config.jwt.refreshKey, (err: any, decoded: any) => {
            if (err || username !== decoded.username) return res.sendStatus(403);

            const userData = {
                'id': decoded.id,
                'email': decoded.email,
                'username': decoded.username,
                'roleID': decoded.roleID
            }

            const accessToken = jwt.sign(userData, config.jwt.accessKey, { algorithm: 'HS256', expiresIn: '50s'});

            res
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'strict'
            })
            .status(200)
            .send(`${username} logged in`);
        })
    }
}


const auth = new Auth();
export default auth;