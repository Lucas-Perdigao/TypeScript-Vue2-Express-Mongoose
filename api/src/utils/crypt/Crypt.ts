import bcrypt from "bcrypt"

export class Crypt {
  static encrypt(text: string, jumps: number) {
    return bcrypt.hashSync(text, jumps)
  }

  static compare(text: string, hash: string) {
    return bcrypt.compareSync(text, hash)
  }
}
