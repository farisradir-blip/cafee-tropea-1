import React, { useState, useEffect } from "react";
import { Menu, X, Globe, CalendarCheck2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "../types";

interface TopNavBarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenBooking: () => void;
}

export default function TopNavBar({
  currentTab,
  setTab,
  language,
  setLanguage,
  onOpenBooking
}: TopNavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "The Escape", arabic: "ملاذ تروبيا", french: "L'Échappée" },
    { id: "gallery", label: "Gallery", arabic: "المعرض الفني", french: "Galerie" },
    { id: "reviews", label: "Guest Reviews", arabic: "أصداء ضيوفنا", french: "Livre d'or" },
    { id: "location", label: "Vibe & Compass", arabic: "الموقع والتواصل", french: "Accès & Contact" }
  ];

  const languagesList = [
    { code: "en" as const, label: "English" },
    { code: "fr" as const, label: "Français" },
    { code: "ar" as const, label: "العربية" }
  ];

  const currentLanguageObj = languagesList.find(l => l.code === language) || languagesList[0];

  const getLabel = (item: typeof navItems[0]) => {
    if (language === "ar") return item.arabic;
    if (language === "fr") return item.french;
    return item.label;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-limestone/90 backdrop-blur-md shadow-sm border-b border-sand-tan/20 py-3"
            : "bg-transparent py-5"
        }`}
        id="main-app-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => {
                setTab("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex flex-col items-start focus:outline-none group text-left cursor-pointer"
              id="header-logo-btn"
            >
              <span className="text-xl sm:text-2xl font-display font-bold text-olive-deep tracking-tight transition-colors group-hover:text-terracotta">
                CAFE TROPEA
              </span>
              <span className="text-[9px] font-semibold text-charcoal/50 uppercase tracking-widest -mt-1 font-mono">
                {language === "en" ? "Tangier Harbor" : language === "fr" ? "Port de Tanger" : "ميناء طنجة"}
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" id="desktop-nav-menu">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all focus:outline-none cursor-pointer ${
                    currentTab === item.id
                      ? "text-olive-deep font-semibold"
                      : "text-charcoal/70 hover:text-charcoal hover:bg-sand-light/40"
                  }`}
                  id={`nav-tab-${item.id}`}
                >
                  <span className="relative z-10">
                    {getLabel(item)}
                  </span>
                  {currentTab === item.id && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute inset-0 bg-sand-light rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right side controls: Language switcher + Booking CTA */}
            <div className="hidden sm:flex items-center space-x-3" id="desktop-controls">
              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sand-tan/40 hover:border-sand-tan bg-limestone/50 text-[12px] font-semibold text-charcoal/80 hover:text-charcoal transition-all cursor-pointer"
                  id="language-dropdown-btn"
                >
                  <Globe className="w-3.5 h-3.5 text-olive-deep" />
                  <span>{currentLanguageObj.label}</span>
                </button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <>
                      {/* Backdrop to close */}
                      <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-36 bg-limestone border border-sand-tan/20 rounded-xl shadow-lg py-1.5 z-50 overflow-hidden"
                      >
                        {languagesList.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setIsLangDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-[12.5px] transition-colors cursor-pointer flex items-center justify-between ${
                              language === lang.code
                                ? "bg-olive-pale/60 text-olive-deep font-bold"
                                : "text-charcoal/80 hover:bg-sand-light/50 hover:text-charcoal"
                            }`}
                          >
                            <span>{lang.label}</span>
                            {language === lang.code && (
                              <span className="w-1.5 h-1.5 bg-olive-deep rounded-full" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Booking Button */}
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 px-4.5 py-2 bg-olive-deep hover:bg-olive-light text-limestone font-medium rounded-full text-[12.5px] transition-all shadow-sm hover:shadow-md cursor-pointer"
                id="header-booking-btn"
              >
                <CalendarCheck2 className="w-4 h-4" />
                <span>{language === "en" ? "Book a Table" : language === "fr" ? "Réserver" : "احجز طاولتك"}</span>
              </button>
            </div>

            {/* Mobile Actions (Language, Booking icon, Menu) */}
            <div className="flex items-center space-x-2.5 md:hidden" id="mobile-action-bar">
              {/* Language Selector Dropdown for Mobile */}
              <div className="relative">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="p-1.5 rounded-full border border-sand-tan/40 text-charcoal/70 hover:text-charcoal"
                  title="Change language"
                  id="mobile-lang-btn"
                >
                  <Globe className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <>
                      {/* Backdrop to close */}
                      <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-32 bg-limestone border border-sand-tan/20 rounded-xl shadow-lg py-1.5 z-50 overflow-hidden"
                      >
                        {languagesList.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setIsLangDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-[12px] transition-colors cursor-pointer flex items-center justify-between ${
                              language === lang.code
                                ? "bg-olive-pale/60 text-olive-deep font-bold"
                                : "text-charcoal/80 hover:bg-sand-light/50 hover:text-charcoal"
                            }`}
                          >
                            <span>{lang.label}</span>
                            {language === lang.code && (
                              <span className="w-1 h-1 bg-olive-deep rounded-full" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Booking Trigger */}
              <button
                onClick={onOpenBooking}
                className="p-2 bg-olive-deep text-limestone rounded-full shadow-sm"
                title={language === "en" ? "Book Table" : language === "fr" ? "Réserver" : "احجز طاولة"}
                id="mobile-book-btn"
              >
                <CalendarCheck2 className="w-4 h-4" />
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 rounded-full text-charcoal/80 hover:bg-sand-light/60 transition-colors"
                id="mobile-menu-trigger"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs z-30 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-limestone border-l border-sand-tan/30 z-35 shadow-2xl p-6 pt-24 md:hidden flex flex-col justify-between"
              id="mobile-menu-drawer"
            >
              <div className="space-y-6">
                <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest font-mono block">
                  {language === "en" ? "NAVIGATION MENU" : language === "fr" ? "MENU DE NAVIGATION" : "قائمة التنقل"}
                </span>
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        currentTab === item.id
                          ? "bg-olive-pale text-olive-deep font-bold"
                          : "text-charcoal/80 hover:text-charcoal hover:bg-sand-light/40"
                      }`}
                      id={`mobile-nav-${item.id}`}
                    >
                      {getLabel(item)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom drawer elements */}
              <div className="border-t border-sand-tan/30 pt-6 space-y-4">
                <div className="text-center text-[11px] text-charcoal/50 font-mono">
                  {language === "en" ? "Tangier, Morocco" : language === "fr" ? "Tanger, Maroc" : "طنجة، المغرب"}
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 bg-olive-deep hover:bg-olive-light text-limestone font-medium rounded-lg text-xs transition-all shadow-md text-center block"
                  id="drawer-booking-btn"
                >
                  {language === "en" ? "Book Table Now" : language === "fr" ? "Réserver maintenant" : "احجز طاولتك الآن"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
