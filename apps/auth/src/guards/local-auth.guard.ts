import { AuthGuard } from "@nestjs/passport";
export class LocalAuthGuard extends AuthGuard('local') {
  // This guard uses the 'local' strategy defined in the local.strategy.ts file.
  // It will automatically handle the authentication process using the local strategy.
  // If authentication fails, it will throw an UnauthorizedException.
  // If authentication succeeds, it will allow the request to proceed to the next handler.
}