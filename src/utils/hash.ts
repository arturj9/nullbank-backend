import { hashSync } from "bcrypt";

 // Criptografar a senha
 export function encryptPassword(password: string): string {
    return hashSync(password, 10); // 10 é o número de rounds (salt)
}