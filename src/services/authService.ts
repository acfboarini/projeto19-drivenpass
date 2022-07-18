import { Session, User } from "@prisma/client";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import authRepository from "../repositories/authRepository.js";

export type CreateUserData = Omit<User, "id">;
export type CreateSessionData = Omit<Session, "id">;

async function createUser({email, password}: CreateUserData) {

    const passwordHash = bcrypt.hashSync(password, 10);

    const userData = {
        email,
        password: passwordHash
    }
    return await authRepository.insertUser(userData);
}

async function login(user: User) {
    
    const token = uuid();
    // utilizar essa estrategia de fazer token;
    /*const token = jwt.sign({ foo: "bar" }, "privateKey", {algorithm: "HS256"});
    console.log(token);
    //const decoded = jwt.verify("token", "privateKey");
    const verify = jwt.verify(token, "privateKey", function(err, decoded) {
        console.log("to no erro");
        console.log(err);
        console.log(decoded);
    });
    console.log("verify: ", verify);

    return res.send("OK");*/

    const sessionData = {
        userId: user.id,
        token
    } 
    await authRepository.createSession(sessionData);
    return sessionData;
}

const authService = {
    createUser, login,
}

export default authService;