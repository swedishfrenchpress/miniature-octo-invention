import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Wallets } from "@/components/home/Wallets";
import { Capabilities } from "@/components/home/Capabilities";
import { Faq } from "@/components/home/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Wallets />
      <Capabilities />
      <Faq />
    </>
  );
}
