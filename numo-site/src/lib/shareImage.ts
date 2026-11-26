/** The picture that goes out when a link to the site is shared.
 *
 *  A page that sets its own `openGraph` or `twitter` metadata replaces the
 *  site-wide block rather than adding to it, so it has to pass this along, or
 *  its links are shared with no picture at all. */
export const SHARE_IMAGE = {
  url: "https://numopay.org/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Numo. Bitcoin payments as easy as Apple Pay. A customer's phone tapped on a handheld till running Numo.",
};
