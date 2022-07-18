import { Credential } from "@prisma/client";
import credentialRepository from "../repositories/credentialRepository.js";
import Cryptr from "cryptr";

export type CreateCredentialData = Omit<Credential, "id">

// funcao que insere a credencial usando o insert do credencialRepository
async function insertCredential(data: CreateCredentialData, userId: number) {

    let { password } = data;
    password = createEncryptedPassword(password);

    const credentialData = {...data, password, userId };
    return await credentialRepository.insert(credentialData);
}

// funcao que faz a criptografia da senha passada por parametro
function createEncryptedPassword(password: string) {
    const cryptr = new Cryptr('myTotallySecretKey');
    const encryptedPassword = cryptr.encrypt(password);

    return encryptedPassword;
}

// funcao que retorna todas as credenciais referentes ao usuario passado por parametro retornando-as com as senhas descriptografadas
async function getCredentials(userId: number) {
    const credentials = await credentialRepository.get(userId);
    console.log("credenciais criptografadas: ", credentials);

    return credentials.map(credential => {
        return {...credential, password: decryptPassword(credential.password)};
    })
}

// funcao que retorna a credencial passada por parametro com a senha descriptografada
function formatCredential(credential: Credential) {
    return {...credential, password: decryptPassword(credential.password)};
}

// funcao que descriptografa a senha passada por parametro
function decryptPassword(encryptedPassword: string) {
    const cryptr = new Cryptr('myTotallySecretKey');

    const decryptedPassword = cryptr.decrypt(encryptedPassword);
    return decryptedPassword;
}

const credentialService = {
    insertCredential, getCredentials, formatCredential
}

export default credentialService;