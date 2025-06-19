import { AuthGuard } from "@nestjs/passport";
export class JwtAuthGuard extends AuthGuard('jwt') {
  // This guard uses the JWT strategy to authenticate requests
  // You can add additional logic here if needed
}
