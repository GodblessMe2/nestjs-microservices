import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'),
  {
    apiVersion: '2025-05-28.basil'
  });
  constructor(private readonly configService: ConfigService) {}

  async createCharge({amount}: CreateChargeDto) {
    try {
      // Create a payment intent with the specified amount and currency
      // const paymentMethods = await this.stripe.paymentMethods.create({
      //   type: 'card',
      //   card: {
      //   token: 'tok_visa', // Test token for Visa
      // },
      // });
      // const paymentIntent = await this.stripe.paymentIntents.create({
      //   payment_method: paymentMethods.id,
      //   amount: amount * 100, // Stripe expects the amount in cents
      //   currency: 'usd', // Change to your desired currency
      //   confirm: true, // Automatically confirm the payment
      //   payment_method_types: ['card'],
      // });

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100, // Stripe expects the amount in cents
        currency: 'usd', // Change to your desired currency
        confirm: true, // Automatically confirm the payment
        payment_method: 'pm_card_visa', // Use a test card token for Visa
      });
      return paymentIntent;

    } catch (err) {
      console.log('Error creating charge:', err);
    }
  }
}
