import Header from "./Header";
import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { useAccount } from "wagmi";
import Footer from "./components/Footer";
import Greeter from "./components/Greeter";
import { useToast } from "@chakra-ui/react";

export default function Home() {
  const { isConnected } = useAccount();
  const toast = useToast();
  return (
    <>
      <Header />
      <Navbar />
      <Hero />
      {isConnected && <Greeter />}
      <Footer />
    </>
  );
}
