import { Session, User } from "@prisma/client";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import authRepository from "../repositories/authRepository.js";
import userRepository from "../repositories/userRepository.js";
import { errorFactory } from "../errors/clientError.js";

export type CreateUserData = Omit<User, "id">;
export type CreateSessionData = Omit<Session, "id">;

async function createUser({email, password}: CreateUserData) {
    const user = await userRepository.getByEmail(email);
    if (user) throw errorFactory({ code: 409, message: "email already exist"});

    const passwordHash = bcrypt.hashSync(password, 10);
    const userData = {
        email,
        password: passwordHash
    }
    await userRepository.insert(userData);
}

async function login({ email, password }: CreateUserData) {
    const user = await userRepository.getByEmail(email);
    if (!user) throw errorFactory({ code: 404, message: "non-existent email" });

    const passwordValidation = bcrypt.compareSync(password, user.password);
    if (!passwordValidation) throw errorFactory({ code: 401, message: "incorrect password" });

    const sessionData = {
        userId: user.id,
        token: uuid()
    } 
    await authRepository.createSession(sessionData);
    return sessionData;
}

const authService = {
    createUser, login,
}

export default authService;

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