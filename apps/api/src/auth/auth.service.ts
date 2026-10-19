import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users = [
    {
      email: 'admin@kvarta.by',
      passwordHash: bcrypt.hashSync('admin123', 10),
      role: 'admin',
    },
    {
      email: 'client@kvarta.by',
      passwordHash: bcrypt.hashSync('client123', 10),
      role: 'customer',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async login(email: string, pass: string) {
    const user = this.users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(pass, user.passwordHash))) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    const payload = { email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }

  async register(email: string, pass: string) {
    const exists = this.users.find((u) => u.email === email);
    if (exists) {
      throw new ConflictException('Пользователь уже существует');
    }
    const passwordHash = await bcrypt.hash(pass, 10);
    this.users.push({ email, passwordHash, role: 'customer' });
    return { message: 'Успешная регистрация' };
  }
}
