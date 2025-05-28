import { Injectable, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";
import { AUTH_SERVICE } from "../constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "../dto";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if(!jwt) {
      return false; // If no JWT is found, deny access
    }
    return this.authClient.send<UserDto>('authenticate', {
      Authentication: jwt,
    }).pipe(
      tap((res) => {
        context.switchToHttp().getRequest().user = res; // Attach user to request
      }),
      map(() => true), // If authentication is successful, allow access
    )
  }
}