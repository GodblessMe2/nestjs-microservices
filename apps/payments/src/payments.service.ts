import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'),
  {
    apiVersion: '2025-05-28.basil'
  });
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) private readonly notifictionsService: ClientProxy
  ) {}

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    // Create a payment intent with the specified amount and currency
    const paymentMethods = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
      token: 'tok_visa', // Test token for Visa
    },
    });

    // Create a payment intent using the payment method
    // Note: In a real application, you would not use a test token like 'tok
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethods.id,
      amount: amount * 100, // Stripe expects the amount in cents
      currency: 'usd', // Change to your desired currency
      confirm: true, // Automatically confirm the payment
      payment_method_types: ['card'],
    });

    this.notifictionsService.emit('notify_email', { email, text: `Your payment of $${amount} has been successfully processed.` });

    return paymentIntent;

  }
}
