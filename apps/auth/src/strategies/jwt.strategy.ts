 import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service"; // Adjust the import path as necessary
import { TokenPayload } from "../interfaces/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private readonly usersService: UsersService) {
    super({
      // jwtFromRequest: (req) => {
      //   const token = req.cookies['Authentication'];
      //   return token || null; // Return the token from cookies or null if not found
      // },
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => request?.cookies?.Authentication || request?.Authentication,
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'), // Use the secret from the config service
    })
  }

  async validate({userId}: TokenPayload){
    return this.usersService.getUser({_id: userId})
  }
}