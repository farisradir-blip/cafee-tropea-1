import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import TopNavBar from "./components/TopNavBar";
import HomeView from "./components/HomeView";
import ReviewsView from "./components/ReviewsView";
import GalleryView from "./components/GalleryView";
import LocationView from "./components/LocationView";
import ReservationModal from "./components/ReservationModal";
import { Language } from "./types";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [language, setLanguage] = useState<Language>("en");
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);

  // Synchronize layout direction (RTL vs LTR) when language changes
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderActiveView = () => {
    switch (currentTab) {
      case "home":
        return (
          <HomeView
            language={language}
            onOpenBooking={() => setIsBookingOpen(true)}
            setTab={handleTabChange}
          />
        );
      case "reviews":
        return <ReviewsView language={language} />;
      case "gallery":
        return (
          <GalleryView
            language={language}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        );
      case "location":
        return <LocationView language={language} />;
      default:
        return (
          <HomeView
            language={language}
            onOpenBooking={() => setIsBookingOpen(true)}
            setTab={handleTabChange}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-limestone overflow-x-hidden text-charcoal selection:bg-terracotta/20 selection:text-terracotta">
      {/* Navigation Header */}
      <TopNavBar
        currentTab={currentTab}
        setTab={handleTabChange}
        language={language}
        setLanguage={setLanguage}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main Content Area with Micro-animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Floating Inquiry / Booking Button */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsBookingOpen(true)}
          className="p-4 bg-terracotta hover:bg-terracotta/90 text-limestone rounded-full shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer transition-colors"
          title={language === "en" ? "Reserve a Table" : "احجز طاولة"}
          id="floating-reserve-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 22h14" />
            <path d="M5 2h14" />
            <path d="M17 22V2" />
            <path d="M7 22V2" />
            <path d="M10 15h4" />
            <path d="M10 10h4" />
          </svg>
        </motion.button>
      </div>

      {/* Table Reservation Engine Modal Overlay */}
      <ReservationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        language={language}
      />
    </div>
  );
}

