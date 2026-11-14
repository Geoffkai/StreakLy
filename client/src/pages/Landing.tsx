import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import EstimateBand from "../components/landing/EstimateBand";
import HowItWorks from "../components/landing/HowItWorks";
import Friends from "../components/landing/Friends";

export default function Landing() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <EstimateBand />
        <HowItWorks />
        <Friends />
      </main>
      <Footer />
    </>
  );
}
