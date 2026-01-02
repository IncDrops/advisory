'use server';

import Stripe from 'stripe';
import { provideAdviceBasedOnPersona } from '@/ai/flows/provide-advice-based-on-persona';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createCheckoutSession(
  persona: 'rich' | 'poor',
  question: string,
  origin: string
) {
  try {
    const successUrl = new URL('/?session_id={CHECKOUT_SESSION_ID}', origin);
    
    const cancelUrl = new URL(origin);
    cancelUrl.searchParams.set('payment_cancelled', 'true');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Advice from the ${
                persona === 'rich' ? 'Rich' : 'Poor'
              } Pimp`,
              description: question,
            },
            unit_amount: 100, // $1.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),
      metadata: {
        persona,
        question
      }
    });

    if (!session.url) {
      throw new Error('Could not create checkout session.');
    }

    return { id: session.id, url: session.url };
  } catch (error) {
    console.error('Error creating Checkout Session:', error);
    return { error: { message: (error as Error).message } };
  }
}

export async function getAdviceAfterPayment(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      throw new Error('Payment not successful.');
    }

    const persona = session.metadata?.persona as 'rich' | 'poor';
    const question = session.metadata?.question;

    if (!persona || !question) {
      throw new Error('Missing persona or question from session metadata.');
    }

    const advice = await provideAdviceBasedOnPersona({ question, pimp: persona });

    return { advice };

  } catch (error) {
    console.error('Error getting advice after payment:', error);
    return { error: { message: (error as Error).message } };
  }
}
