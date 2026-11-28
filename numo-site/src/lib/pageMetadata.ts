import type { Metadata } from "next";
import { SHARE_IMAGE } from "./shareImage";

/** A page's title and description, carried into its link preview along with
 *  the share picture.
 *
 *  A page that sets only `title` and `description` is shared with the home
 *  page's title and description, because it inherits the site-wide `openGraph`
 *  and `twitter` blocks as they stand. So every page other than home builds
 *  its metadata here. Titles name the page the way the nav and footer do,
 *  then the product: `Releases - Numo`. */
export function pageMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "Numo", images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE.url] },
  };
}
