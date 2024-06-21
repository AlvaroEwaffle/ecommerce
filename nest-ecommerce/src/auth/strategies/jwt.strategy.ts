// auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        let token = null;
        if (request && request.cookies) {
          token = request.cookies['access_token'];
        }
        return token || ExtractJwt.fromAuthHeaderAsBearerToken()(request);
      }]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { id:payload.id, email: payload.email, name: payload.name, role: payload.role };
  }
}
