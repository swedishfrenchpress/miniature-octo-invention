import { Hero } from "@/components/home/Hero";
import { Showcase } from "@/components/home/Showcase";
import { Wallets } from "@/components/home/Wallets";
import { Faq } from "@/components/home/Faq";
import { breakData } from "@/breakdata";
import { FAQ_ITEMS } from "@/data/faq";
import { checkFaq } from "@/data/checkContent";

checkFaq(FAQ_ITEMS);

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
