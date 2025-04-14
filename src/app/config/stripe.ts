import Stripe from 'stripe'
import config from '.'

// Make sure we have a valid API key
if (!config.stripe_secret_key) {
  console.error('STRIPE_SECRET_KEY is not set in environment variables')
  process.exit(1)
}

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2025-03-31.basil',
})

export default stripe
