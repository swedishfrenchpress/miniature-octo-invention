import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SHARE_IMAGE } from "@/lib/shareImage";
import { PARTNER_HEADER, PartnerPair } from "@/components/PartnerPair";
import { SetupSequence, type SetupStep } from "@/components/SetupSequence";

const DESCRIPTION =
  "Create a restricted Stripe key, paste it into Numo, choose a location and run the setup check to take contactless cards on the same Android phone.";

export const metadata: Metadata = {
  title: "Connect Stripe - Numo Setup",
  description: DESCRIPTION,
  openGraph: {
    title: "Connect Stripe - Numo Setup",
    description: DESCRIPTION,
    type: "website",
    siteName: "Numo",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect Stripe - Numo Setup",
    description: DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
};

/** The form Numo itself opens from "Create the key in Stripe": a new restricted
 *  key named Numo with the two Terminal permissions already set to Write. */
const STRIPE_KEY_FORM_URL =
  "https://dashboard.stripe.com/apikeys/create?name=Numo&permissions%5B%5D=rak_terminal_connection_token_write&permissions%5B%5D=rak_terminal_location_write";

/* Same four type styles as the setup guide (display, h2, title, lead), and the
   same rule for copy: no bold, labels written as the screen capitalizes them. */
const section = "section-anchor section-y border-t border-line";
const linkClass =
  "underline decoration-navy/40 underline-offset-[3px] transition-colors duration-150 hover:text-navy hover:decoration-navy active:opacity-60";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

const keySteps: SetupStep[] = [
  {
    title: "Open Stripe's key form",
    body: (
      <>
        In Numo, open Settings, then Card payments. Tap Connect Stripe, then Create the key in
        Stripe. Your browser opens Stripe&rsquo;s Create restricted API key form, already named
        Numo. Setting up from a computer?{" "}
        <ExternalLink href={STRIPE_KEY_FORM_URL}>Open the same form here</ExternalLink>.
      </>
    ),
    image: "/setup/stripe/01-key-form.png",
    alt: "Stripe's Create restricted API key form with the key name set to Numo.",
    outline: { left: 8.3, top: 34.2, width: 75.8, height: 5.6 },
    desktop: {
      image: "/setup/stripe/01-key-form-desktop.png",
      outline: { left: 27.02, top: 44.93, width: 28.68, height: 6.54 },
    },
  },
  {
    title: "Check the two permissions",
    body: (
      <>
        Scroll down to Terminal. Terminal Connection Tokens and Terminal Locations should both be
        set to Write. The link sets them for you. Leave every other permission on None.
      </>
    ),
    image: "/setup/stripe/02-permissions.png",
    alt: "The Terminal section of the form, with Terminal Connection Tokens and Terminal Locations set to Write and the rest set to None.",
    outline: { left: 4.9, top: 27.6, width: 90.2, height: 20.1 },
    desktop: {
      image: "/setup/stripe/02-permissions-desktop.png",
      outline: { left: 25.74, top: 42.16, width: 70.59, height: 16.99 },
    },
  },
  {
    title: "Create the key",
    body: (
      <>
        Keep scrolling to the bottom of the form and tap Create key. Stripe may ask for your
        password or a code first.
      </>
    ),
    image: "/setup/stripe/03-create.png",
    alt: "The bottom of the form, with the Create key button.",
    outline: { left: 67.5, top: 85.6, width: 23.6, height: 6.2 },
    desktop: {
      image: "/setup/stripe/03-create-desktop.png",
      outline: { left: 85.94, top: 62.09, width: 9.1, height: 6.54 },
    },
  },
  {
    title: "Copy it",
    body: (
      <>
        Stripe returns to your API keys, with Numo listed under Restricted keys. The key starts with
        rk_live_, or rk_test_ in a sandbox. Copy it straight away: Stripe may not show a live key in
        full again.
      </>
    ),
    image: "/setup/stripe/04-key.png",
    alt: "Stripe's API keys page listing the new Numo key under Restricted keys, with the key itself blurred.",
    outline: { left: 4.9, top: 70.9, width: 90.2, height: 12.6 },
    desktop: {
      image: "/setup/stripe/04-key-desktop.png",
      outline: { left: 25.74, top: 58.5, width: 70.59, height: 9.97 },
    },
  },
];

/* The app's own screens, captured on a phone that is already connected: the key
   field shows a blurred key, and the pay screen's QR is a sample, not a request. */
const connectSteps: SetupStep[] = [
  {
    title: "Paste the key",
    body: (
      <>
        Back in Numo, tap the paste icon in the Restricted key field, then Next. Numo checks the key
        with Stripe. Only a restricted key is accepted: a secret key that starts with sk_ is
        refused.
      </>
    ),
    image: "/setup/stripe/numo-01-paste.png",
    alt: "Numo's Connect Stripe screen: Paste a restricted key, with a Restricted key field, a Create the key in Stripe button, and Next.",
    outline: { left: 84.4, top: 26.1, width: 11.7, height: 5.3 },
  },
  {
    title: "Run the setup check",
    body: (
      <>
        Stripe needs to know where this device takes cards, so pick one of your Stripe locations or
        tap Add a new location. Numo then checks three things: Device, Stripe and Reader. When it
        says Ready to take cards, card payments are on.
      </>
    ),
    image: "/setup/stripe/numo-02-check.png",
    alt: "Numo's Check setup screen with Device, Stripe and Reader all passed, reading Ready to take cards.",
  },
  {
    title: "Take a card payment",
    body: (
      <>
        Start a sale and tap Pay with card. Your customer taps a card, phone or watch on your
        device. No card reader needed.
      </>
    ),
    image: "/setup/stripe/numo-03-pay.png",
    alt: "Numo's payment screen showing a QR code, the amount, and a Pay with card button at the bottom.",
    outline: { left: 5.8, top: 89, width: 88.4, height: 5.75 },
  },
];

const FIXES: [problem: string, fix: string][] = [
  [
    "NFC is switched off",
    "This device reads cards over NFC. Switch it on in Android's settings, then check again.",
  ],
  [
    "Numo can't use location",
    "Stripe won't take card payments without location access. Allow it for Numo, then check again.",
  ],
  [
    "Your key can't start the reader",
    "The key is missing Write access to Terminal Connection tokens. Create a new key with it and paste that in.",
  ],
  [
    "This key can't see your locations",
    "In Stripe, give the key Write access to Terminal Locations, then paste it again.",
  ],
  [
    "Stripe doesn't recognise your key",
    "Check that you copied all of it, or create a new key in Stripe.",
  ],
  ["This device can't take cards", "Tap to Pay needs Android 13 or newer and an NFC chip."],
];

const NOTES: [title: string, body: string][] = [
  [
    "One key per device",
    "Use a separate key for each device, so you can cancel one in Stripe if a device is lost.",
  ],
  [
    "Try it in test mode first",
    "A key that starts with rk_test_ connects Stripe's test mode. Numo shows Ready for test payments and no real money moves. Connect a live key when you want to take real cards.",
  ],
  [
    "Where the money goes",
    "Card payments go to your Stripe account at Stripe's standard card processing fees, and Stripe pays them out to your bank. They stay separate from your bitcoin in Numo.",
  ],
  [
    "Disconnecting",
    "Disconnect Stripe, in Card payments, removes the key from this device and turns card payments off. Your Stripe account is not changed.",
  ],
];

function Pairs({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <dl className="mt-block grid gap-x-16 gap-y-14 md:grid-cols-2 md:gap-y-16">
      {items.map(([title, body]) => (
        <div key={title}>
          <dt className="text-title text-navy">{title}</dt>
          <dd className="text-lead measure mt-3 text-navy/70">{body}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function StripeSetupPage() {
  return (
    <>
      <header className="bg-paper pt-[72px] md:pt-[84px]">
        <div className={PARTNER_HEADER}>
          <PartnerPair partner="stripe" />
          <div>
            <h1 className="text-display max-w-[9em] text-navy">Take cards with Stripe.</h1>
            <p className="text-lead measure mt-5 text-navy/70 md:mt-6">
              Connect your own Stripe account and the same phone takes contactless cards, Apple Pay
              and Google Pay. You need a Stripe account, Android 13 or newer with NFC, and about
              five minutes. New to Numo? Start with the{" "}
              <Link href="/setup" className={linkClass}>
                setup guide
              </Link>
              .
            </p>
          </div>
        </div>
      </header>

      <section id="key" aria-labelledby="key-heading" className={`${section} bg-sunken`}>
        <SetupSequence
          heading="Create a key in Stripe."
          headingId="key-heading"
          intro="Numo connects with a restricted key: a Stripe key that can only do what you allow. This one can start the card reader and list your locations. It can't move money."
          steps={keySteps}
          screen="mobileWeb"
        />
      </section>

      <section id="connect" aria-labelledby="connect-heading" className={`${section} bg-paper`}>
        <SetupSequence
          heading="Connect it in Numo."
          headingId="connect-heading"
          steps={connectSteps}
          screen="phoneTall"
        />
      </section>

      <section id="fixes" aria-labelledby="fixes-heading" className={`${section} bg-sunken`}>
        <div className="shell">
          <h2 id="fixes-heading" className="text-h2 text-navy">
            If the check finds a problem.
          </h2>
          <p className="text-lead measure mt-5 text-navy/70 md:mt-6">
            Numo names what is wrong and offers the fix. These are the ones you are most likely to
            see.
          </p>
          <Pairs items={FIXES} />
        </div>
      </section>

      <section id="notes" aria-labelledby="notes-heading" className={`${section} bg-paper`}>
        <div className="shell">
          <h2 id="notes-heading" className="text-h2 text-navy">
            Good to know.
          </h2>
          <Pairs items={NOTES} />
        </div>
      </section>
    </>
  );
}
