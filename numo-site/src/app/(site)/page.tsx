import { Hero } from "@/components/home/Hero";
import { Showcase } from "@/components/home/Showcase";
import { Wallets } from "@/components/home/Wallets";
import { Faq } from "@/components/home/Faq";
import { breakData } from "@/breakdata";

export default async function Home() {
  const { walletGroups, faq } = await breakData();

  return (
    <>
      <Hero />
      <Showcase />
      <Wallets groups={walletGroups} />
      <Faq items={faq} />
    </>
  );
}
