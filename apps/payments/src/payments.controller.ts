import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  async createChange(@Payload() data: PaymentsCreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }

  // @Post('process-payment')
  // processPayment(@Body() paymentDto: PaymentDto): string {
  //   return this.paymentsService.processPayment(paymentDto);
  // }
}
