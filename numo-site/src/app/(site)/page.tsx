import { Hero } from "@/components/home/Hero";
import { Showcase } from "@/components/home/Showcase";
import { Wallets } from "@/components/home/Wallets";
import { Faq } from "@/components/home/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <Wallets />
      <Faq />
    </>
  );
}
