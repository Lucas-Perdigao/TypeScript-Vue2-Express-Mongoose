import jwt from 'jsonwebtoken'
import { Crypt } from "../../../utils/crypt/Crypt";
import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";
import { IUserRepository } from "../../user/repositories/UserRepositoryInterface";
import { IAuthService, LoginData } from './AuthServiceInterface';

export class AuthService implements IAuthService {
  constructor(private readonly userRepository: IUserRepository){}
  
  async login(data: LoginData): Promise<string> {
    const user = await this.userRepository.getByEmail(data.email)
    if(!user){
      throw new Error(ErrorMessages.INVALID_EMAIL_PASSWORD())
    }

    const isPasswordValid = Crypt.compare(data.password, user.password)
    if(!isPasswordValid){
      throw new Error(ErrorMessages.INVALID_EMAIL_PASSWORD())
    }

    const payload = {...user}
    const secretKey = process.env.JWT_SECRET_KEY as string
    const options = { expiresIn: '1d' }

    const token = jwt.sign(payload, secretKey, options)

    return token
  }
}