import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/user/UsersService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username, password);
    console.log(user);
    const passwordValid = await bcrypt.compare(password, user.password);
    console.log(passwordValid);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return {
        userId: user.id,
        userName: user.username,
      };
    }
    return null;
  }
}
