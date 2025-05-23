"use client";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { toast } from '@/hooks/use-toast';
import { checkoutCredits } from '@/lib/actions/transaction.actions';
import { CheckIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';


const tiers = [
  {
    id: 45445,
    name: 'Monthly',
    slag: 'tier-monthly',
    href: '#',
    duration: "month",
    price: '$6',
    description: "The perfect plan if you're just getting started with our product.",
    features: ['10 forms',
      'Advanced analytics',
      '24-hour support response time',
      'Early Access on few new features',
    ],
    featured: false,
    limit: 10,
  },
  {
    id: 45446,
    name: 'Yearly',
    slag: 'tier-yearly',
    href: '#',
    price: '$45',
    duration: "year",
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Advanced analytics',
      'Newsletter feature',
      'Dedicated support representative',
      'Early Access to all new features',
    ],
    featured: true,
    limit: 100,
  },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function UpgradeTier() {
  // const router = useRouter();
  // // const { user } = useUser();
  // // const userId = user?.id as string;
  // // useEffect(() => {
  // //   loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  // // }, []);

  // // useEffect(() => {
  // //   // Check to see if this is a redirect back from Checkout
  // //   const query = new URLSearchParams(window.location.search);
  // //   if (query.get("success")) {
  // //     toast({
  // //       title: "Order placed!",
  // //       description: "You will receive an email confirmation",
  // //       duration: 5000,
  // //       className: "success-toast",
  // //     });
  // //   }

  // //   if (query.get("canceled")) {
  // //     toast({
  // //       title: "Order canceled!",
  // //       description: "Continue to shop around and checkout when you're ready",
  // //       duration: 5000,
  // //       className: "error-toast",
  // //     });
  // //   }
  // // }, [toast]);
  return (
    <div className="relative isolate bg-white px-6 py-10 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-primary">Pricing</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
        Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer
        loyalty, and driving sales.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'relative bg-primary shadow-2xl' : 'bg-secondary sm:mx-8 lg:mx-0',
              tier.featured
                ? ''
                : tierIdx === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                  : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
            )}
          >
            <h3
              className={classNames(tier.featured ? 'text-muted' : 'text-muted-foreground', 'text-base/7 font-semibold')}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-muted' : 'text-muted-foreground',
                  'text-5xl font-semibold tracking-tight',
                )}
              >
                {tier.price}
              </span>
              <span className={classNames(tier.featured ? 'text-muted' : 'text-muted-foreground', 'text-base')}>
                /{tier.duration}
              </span>
            </p>
            <p className={classNames(tier.featured ? 'text-muted' : 'text-muted-foreground', 'mt-6 text-base/7')}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-muted' : 'text-muted-foreground',
                'mt-8 space-y-3 text-sm/6 sm:mt-10',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              // onClick={() => checkoutCredits({
              //   plan: tier.name,
              //   limit: tier.limit,
              //   amount: Number(tier.price.replace('$', '')),
              //   buyerId: userId
              // })}
              // aria-describedby={tier.id}
              href={`/checkout/?id=${tier.id}&plan=${tier.slag}`}
              className={classNames(
                tier.featured
                  ? 'bg-secondary text-primary shadow-xs hover:bg-secondary/80 focus-visible:outline-secondary/60'
                  : 'bg-primary text-secondary ring-1 ring-primary/50 ring-inset hover:ring-primary/60 focus-visible:outline-primary/75',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 hover:cursor-pointer transition-all duration-500',
              )}
            >
              Become Supporter Today
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
