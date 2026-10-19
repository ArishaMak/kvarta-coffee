"use client";

import React, { useState } from "react";
import { Header } from "../src/components/layout/Header";
import { HeroSection } from "../src/sections/HeroSection/HeroSection";
import { AboutSection } from "../src/sections/AboutSection/AboutSection";
import { CatalogSection } from "../src/sections/CatalogSection/CatalogSection";
import { DeliverySection } from "../src/sections/DeliverySection/DeliverySection";
import { LeadModal } from "../src/sections/LeadModal/LeadModal";
import { Footer } from "../src/sections/Footer/Footer";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestType, setRequestType] = useState<
    "subscription" | "single" | "question"
  >("single");
  const [initialComment, setInitialComment] = useState("");

  const handleOpenModal = (
    productName: string,
    type: "subscription" | "single" | "question",
  ) => {
    setRequestType(type);
    setInitialComment(`Интересует: ${productName}`);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen selection:bg-[var(--accent)] selection:text-white">
      <Header onOpenModal={handleOpenModal} />

      <main>
        <HeroSection onOpenModal={handleOpenModal} />
        <AboutSection />
        <CatalogSection onOpenModal={handleOpenModal} />
        <DeliverySection onOpenModal={handleOpenModal} />
      </main>

      <Footer />

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        requestType={requestType}
        initialComment={initialComment}
      />
    </div>
  );
}
