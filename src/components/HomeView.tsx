import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, Sunset, Moon, Sparkles, Utensils, MapPin, Clock, ArrowRight, Quote, Heart } from "lucide-react";
import { MENU_ITEMS, CAFE_DETAILS } from "../data";
import { MenuItem, Language } from "../types";

interface HomeViewProps {
  language: Language;
  onOpenBooking: () => void;
  setTab: (tab: string) => void;
}

export default function HomeView({ language, onOpenBooking, setTab }: HomeViewProps) {
  const [menuFilter, setMenuFilter] = useState<"mornings" | "afternoons" | "midnights" | "beverages" >("mornings");
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const menuTabs = [
    { 
      id: "mornings", 
      label: "Mornings", 
      arabic: "الصباح", 
      french: "Matins",
      icon: Coffee, 
      desc: "08:00 AM - 12:00 PM", 
      notes: {
        en: "Sourdough, eggs, fresh avocado & sage",
        ar: "خبز محمص، بيض، أفوكادو طازج ومرمية",
        fr: "Sourdough, œufs, avocat frais & sauge"
      }
    },
    { 
      id: "afternoons", 
      label: "Afternoons", 
      arabic: "الظهيرة", 
      french: "Après-midis",
      icon: Utensils, 
      desc: "12:00 PM - 06:00 PM", 
      notes: {
        en: "Rich seafood, spiced lamb, clay tagines",
        ar: "مأكولات بحرية غنية، لحم متبل، طاجين فخاري",
        fr: "Fruits de mer, agneau épicé, tajines traditionnels"
      }
    },
    { 
      id: "midnights", 
      label: "Midnights", 
      arabic: "المساء والليل", 
      french: "Soirées",
      icon: Moon, 
      desc: "06:00 PM - 12:00 AM", 
      notes: {
        en: "Cheese boards, dark tarts, sweet semolina",
        ar: "أطباق أجبان، تارت داكنة، سميد حلو",
        fr: "Assortiments de fromages, tartes fines & douceurs"
      }
    },
    { 
      id: "beverages", 
      label: "Beverages", 
      arabic: "المشروبات", 
      french: "Boissons",
      icon: Sunset, 
      desc: "All Day", 
      notes: {
        en: "Saffron sage lattes, mint blossom tea",
        ar: "لاتيه الزعفران والمرمية، شاي النعناع والزهر",
        fr: "Lattés au safran et sauge, thé à la menthe"
      }
    }
  ];

  const filteredMenuItems = MENU_ITEMS.filter(item => item.category === menuFilter);

  return (
    <div className="w-full" id="home-view-container">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" id="hero-section">
        {/* Background Image with warm overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1600"
            alt="Cafe Tropea Terrace overlooking Tangier Harbor"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-limestone pt-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Elegant small label */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-terracotta/90 text-limestone backdrop-blur-xs uppercase tracking-widest font-mono">
              <Sparkles className="w-3 h-3 animate-pulse" />
              {language === "en" ? "Tangier's Hidden Sanctuary" : language === "fr" ? "Le Sanctuaire Caché de Tanger" : "ملاذ طنجة الخفي"}
            </span>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight leading-[1.1]" id="hero-title">
              {language === "en" ? (
                <>
                  A Mediterranean Escape <br />
                  <span className="text-terracotta-soft italic font-serif font-normal">in Tangier</span>
                </>
              ) : language === "fr" ? (
                <>
                  Une Échappée Méditerranéenne <br />
                  <span className="text-terracotta-soft italic font-serif font-normal">à Tanger</span>
                </>
              ) : (
                <>
                  ملاذ البحر الأبيض المتوسط <br />
                  <span className="text-terracotta-soft italic font-serif font-normal">في قلب طنجة</span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-limestone/80 font-light leading-relaxed">
              {language === "en"
                ? "Tucked inside an ancient olive grove, Cafe Tropea offers panoramic harbor vistas, hand-rolled couscous, and the magical whisper of the Strait sunset."
                : language === "fr"
                ? "Niché au cœur d'une oliveraie antique, le Café Tropea offre des vues panoramiques sur le port, du couscous roulé à la main et le murmure magique du coucher de soleil sur le Détroit."
                : "يقع مقهى تروبيا داخل بستان زيتون أثري، ويقدم إطلالات بانورامية على الميناء، وكسكس مصنوع يدوياً، وهمس غروب مضيق جبل طارق الساحر."}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-3.5 bg-terracotta hover:bg-terracotta/90 text-limestone font-medium rounded-full text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                id="hero-booking-btn"
              >
                {language === "en" ? "Reserve Your Table" : language === "fr" ? "Réserver votre table" : "احجز طاولتك الآن"}
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("menu-highlights");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-limestone/15 hover:bg-limestone/25 text-limestone font-medium rounded-full text-sm transition-all border border-limestone/30 backdrop-blur-xs flex items-center justify-center gap-2"
                id="hero-menu-btn"
              >
                <span>{language === "en" ? "Explore the Menu" : language === "fr" ? "Explorer le menu" : "استكشف قائمة الطعام"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator badge */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xs text-limestone/60 font-mono tracking-widest uppercase flex flex-col items-center gap-1.5"
          >
            <span>{language === "en" ? "Scroll to discover" : language === "fr" ? "Défiler pour découvrir" : "انزل لِتكتشف"}</span>
            <div className="w-1.5 h-1.5 bg-limestone/60 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* 2. STORY / ABOUT SECTION */}
      <section className="py-24 bg-limestone border-b border-sand-tan/30" id="story-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-olive-deep uppercase tracking-widest font-mono block">
                {language === "en" ? "EXCELLENT SITE, EXCEPTIONAL QUALITY" : language === "fr" ? "SITE EXCELLENT, QUALITÉ EXCEPTIONNELLE" : "موقع ممتاز، جودة استثنائية"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-charcoal tracking-tight leading-tight">
                {language === "en"
                  ? "Where the Atlantic breeze meets Moroccan hospitality"
                  : language === "fr"
                  ? "Où la brise de l'Atlantique rencontre l'hospitalité marocaine"
                  : "حيث يلتقي نسيم الأطلسي بكرم الضيافة المغربية"}
              </h2>
              <div className="space-y-4 text-charcoal/80 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  {language === "en"
                    ? "Cafe Tropea is born out of a deep reverence for Tangier's historical culinary canvas. Framed by a stone patio containing decades-old olive trees, we provide a peaceful sanctuary from the energetic Medina. Every stone, every recipe, and every cup reflects the shared heritage of the Mediterranean basin."
                    : language === "fr"
                    ? "Le Café Tropea est né d'un profond respect pour le patrimoine culinaire historique de Tanger. Encadré par un patio en pierre abritant des oliviers centenaires, nous offrons un sanctuaire paisible loin de l'effervescence de la Médina. Chaque pierre, chaque recette et chaque tasse reflète l'héritage partagé du bassin méditerranéen."
                    : "ولد مقهى تروبيا من منطلق احترام عميق لثقافة الطهي التاريخية في طنجة. يحيط به فناء حجري يضم أشجار زيتون يبلغ عمرها عقوداً، ونوفر ملاذاً هادئاً بعيداً عن صخب المدينة القديمة. كل حجر، وكل وصفة، وكل فنجان يعكس التراث المشترك لِحوض البحر الأبيض المتوسط."}
                </p>
                <p>
                  {language === "en"
                    ? "Our ingredients are sourced in partnership with organic family cooperatives in the Rif Mountains and local fishermen landing fresh catches at the port of Tangier. We believe in high-contrast culinary poetry—marrying traditional slow-roasted methods with fresh modern updates."
                    : language === "fr"
                    ? "Nos ingrédients proviennent de coopératives familiales biologiques des montagnes du Rif et de pêcheurs locaux débarquant leurs prises fraîches au port de Tanger. Nous croyons en une poésie culinaire contrastée, mariant des méthodes de cuisson lente traditionnelles à une fraîcheur contemporaine."
                    : "نحن نحصل على مكوناتنا بالشراكة مع تعاونيات عائلية عضوية في جبال الريف والصيادين المحليين في ميناء طنجة. نحن نؤمن بشعرية الطهي عالية الجودة - دمج أساليب الطهي البطيء التقليدية مع لمسات عصرية منعشة."}
                </p>
              </div>

              {/* Bento Quick Info Cards */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-sand-light/50 border border-sand-tan/20 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-olive-deep">100%</div>
                  <div className="text-[10px] sm:text-xs text-charcoal/60 uppercase tracking-wider font-mono mt-1">
                    {language === "en" ? "Artisanal & Local" : language === "fr" ? "Artisanal & Local" : "مكونات بلدية"}
                  </div>
                </div>
                <div className="p-4 bg-sand-light/50 border border-sand-tan/20 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-terracotta">20+</div>
                  <div className="text-[10px] sm:text-xs text-charcoal/60 uppercase tracking-wider font-mono mt-1">
                    {language === "en" ? "Years Heritage" : language === "fr" ? "Ans d'Héritage" : "سنة من الشغف"}
                  </div>
                </div>
                <div className="p-4 bg-sand-light/50 border border-sand-tan/20 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-sea-glass">4.8</div>
                  <div className="text-[10px] sm:text-xs text-charcoal/60 uppercase tracking-wider font-mono mt-1">
                    {language === "en" ? "TripAdvisor Star" : language === "fr" ? "Étoiles TripAdvisor" : "تقييم ممتاز"}
                  </div>
                </div>
              </div>
            </div>

            {/* Collage Images (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl border-4 border-limestone z-10">
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
                    alt="Espresso making under olive tree shadows"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Secondary floating image offset */}
                <div className="absolute -bottom-6 -left-6 w-1/2 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-limestone z-20 hidden sm:block">
                  <img
                    src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600"
                    alt="Fresh Mediterranean appetizer platter"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Accent design pattern */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-olive-soft/40 rounded-full blur-xl -z-10" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE MENU HIGHLIGHTS */}
      <section className="py-24 bg-sand-light/30 border-b border-sand-tan/30" id="menu-highlights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Menu Title Block */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-terracotta uppercase tracking-widest font-mono block mb-2">
              {language === "en" ? "CURATED FLAVORS BY TIME OF DAY" : language === "fr" ? "SAVEURS DE LA JOURNÉE" : "نكهات منسقة حسب وقت اليوم"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-charcoal tracking-tight" id="menu-title">
              {language === "en" ? "Artisanal Mediterranean Offerings" : language === "fr" ? "Nos Spécialités Méditerranéennes" : "عروض البحر الأبيض المتوسط الحرفية"}
            </h2>
            <p className="text-sm text-charcoal/70 mt-3 font-light max-w-xl mx-auto">
              {language === "en"
                ? "Our menus change gracefully through the day, mirroring our mood. Select a schedule below to browse the current selection."
                : language === "fr"
                ? "Nos menus évoluent harmonieusement tout au long de la journée pour refléter notre humeur. Sélectionnez un horaire ci-dessous pour parcourir la carte."
                : "تتغير قوائمنا بنعومة طوال اليوم، لِتعكس أجواءنا الهادئة. اختر فترة زمنية أدناه لتصفح التشكيلة المتاحة."}
            </p>
          </div>

          {/* Interactive Menu Tabs */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12" id="menu-tabs-wrapper">
            {menuTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = menuFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMenuFilter(tab.id as any)}
                  className={`flex flex-col items-center md:items-start p-4 rounded-2xl border text-left transition-all w-full sm:w-[calc(50%-12px)] lg:w-[240px] focus:outline-none cursor-pointer ${
                    isActive
                      ? "bg-olive-deep border-olive-deep text-limestone shadow-md"
                      : "bg-limestone border-sand-tan/30 text-charcoal/80 hover:border-sand-tan hover:bg-sand-light/50"
                  }`}
                  id={`menu-tab-${tab.id}`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className={`p-1.5 rounded-lg ${isActive ? "bg-olive-light text-limestone" : "bg-olive-pale text-olive-deep"}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm">
                      {language === "en" ? tab.label : language === "fr" ? tab.french : tab.arabic}
                    </span>
                  </div>
                  <span className={`text-[11px] font-mono ${isActive ? "text-limestone/80" : "text-charcoal/50"}`}>
                    {tab.desc}
                  </span>
                  <span className={`text-[10px] italic mt-1 font-light ${isActive ? "text-olive-soft/90" : "text-charcoal/60"}`}>
                    {tab.notes[language]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Menu Items Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={menuFilter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              id="menu-items-grid"
            >
              {filteredMenuItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-limestone rounded-2xl border border-sand-tan/20 shadow-xs overflow-hidden hover:shadow-md transition-all flex flex-col group"
                  id={`menu-item-${item.id}`}
                >
                  {/* Item Image with floating badge */}
                  <div className="relative h-48 overflow-hidden bg-sand-light">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                    
                    {/* Tag badge */}
                    {item.tag && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-terracotta text-limestone rounded-full">
                        {language === "en" ? item.tag : language === "fr" ? (item.frenchTag || item.tag) : item.tag}
                      </span>
                    )}

                    {/* Like button */}
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-limestone/70 hover:bg-limestone text-charcoal/80 hover:text-terracotta backdrop-blur-xs transition-colors focus:outline-none"
                      aria-label="Favorite item"
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedItems[item.id] ? "fill-terracotta text-terracotta" : ""}`} />
                    </button>
                  </div>

                  {/* Item Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & price */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-display font-semibold text-lg text-charcoal tracking-tight group-hover:text-olive-deep transition-colors">
                          {language === "en" ? item.name : language === "fr" ? item.frenchName : item.arabicName}
                        </h3>
                        <span className="font-mono font-bold text-terracotta text-base shrink-0">
                          {item.price}
                        </span>
                      </div>

                      {/* English, French & Arabic side by side descriptors */}
                      <p className="text-xs text-charcoal/70 line-clamp-3 font-light leading-relaxed mt-1.5">
                        {language === "en" ? item.description : language === "fr" ? item.frenchDescription : item.arabicDescription}
                      </p>
                    </div>

                    {/* Order / Reserve connection */}
                    <div className="border-t border-sand-tan/10 mt-4 pt-3 flex items-center justify-between text-[11px] font-semibold text-olive-deep font-mono">
                      <span>{language === "en" ? "SERVED FRESH DAILY" : language === "fr" ? "PRÉPARÉ FRAIS CHAQUE JOUR" : "يُحضر طازجاً يومياً"}</span>
                      <button
                        onClick={onOpenBooking}
                        className="text-terracotta hover:text-terracotta/80 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>{language === "en" ? "Order & Reserve" : language === "fr" ? "Commander & Réserver" : "طلب وحجز"}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Menu Navigation CTA */}
          <div className="text-center mt-12">
            <button
              onClick={() => setTab("gallery")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-sand-tan hover:bg-sand-light/40 text-xs font-semibold text-charcoal tracking-wider uppercase transition-colors cursor-pointer"
            >
              <span>{language === "en" ? "View Culinary Gallery" : language === "fr" ? "Voir la Galerie Culinaire" : "مشاهدة معرض صور المأكولات"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-terracotta" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. TRAVALERS' MEMORIES & TANGIER ATMOSPHERE */}
      <section className="relative py-24 bg-olive-dark text-limestone overflow-hidden" id="sunset-atmosphere">
        {/* Decorative backdrop elements */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200"
            alt="Mediterranean aesthetic"
            className="w-full h-full object-cover blur-sm"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <Quote className="w-12 h-12 text-terracotta-soft mx-auto opacity-70" />
          
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-display font-light italic leading-relaxed tracking-wide text-olive-soft">
            {language === "en"
              ? "“There is a specific hour in Tangier when the sky ignites into soft terracotta, the ships in the Strait light up, and the garden olive trees rustle with the cool ocean breeze. At Cafe Tropea, time stands still, allowing you to breathe deeply and taste eternity.”"
              : language === "fr"
              ? "« Il y a une heure précise à Tanger où le ciel s'embrase d'une douce couleur terre cuite, les navires s'illuminent dans le Détroit, et les oliviers du jardin bruissent sous la brise fraîche de l'océan. Au Café Tropea, le temps s'arrête, vous invitant à respirer profondément et savourer l'éternité. »"
              : "“هناك ساعة محددة في طنجة تشتعل فيها السماء باللون التيراكوتا اللطيف، وتضاء السفن في المضيق، وتتحرك أشجار زيتون الحديقة مع نسيم المحيط البارد. في مقهى تروبيا، يقف الزمن ساكناً، ليتيح لك التنفس بعمق وتذوق الأبدية.”"}
          </blockquote>

          <div className="space-y-1">
            <div className="h-0.5 w-12 bg-terracotta mx-auto mb-3" />
            <span className="block font-semibold text-sm uppercase tracking-widest font-mono text-limestone">
              {language === "en" ? "THE SUFI TRAVELER'S LOG" : language === "fr" ? "LE JOURNAL DU VOYAGEUR SOUFI" : "سجل المسافر الصوفي"}
            </span>
            <span className="block text-xs text-olive-soft/60">
              {language === "en" ? "Tangier, Summer 2026" : language === "fr" ? "Tanger, Été 2026" : "طنجة، صيف ٢٠٢٦"}
            </span>
          </div>
        </div>
      </section>

      {/* 5. QUICK INFO & FOOTER PREVIEW */}
      <section className="py-16 bg-limestone text-charcoal/90 border-t border-sand-tan/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Address */}
            <div className="space-y-3">
              <span className="block font-mono text-[10px] font-bold text-olive-deep uppercase tracking-widest">
                {language === "en" ? "OUR COMPASS" : language === "fr" ? "NOTRE BOUSSOLE" : "بوصلتنا"}
              </span>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <p className="text-xs font-light leading-relaxed">
                  {language === "en" ? CAFE_DETAILS.address : language === "fr" ? CAFE_DETAILS.frenchAddress : CAFE_DETAILS.arabicAddress}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-3 col-span-1 md:col-span-2">
              <span className="block font-mono text-[10px] font-bold text-olive-deep uppercase tracking-widest">
                {language === "en" ? "TEMPLE HOURS & ATMOSPHERE" : language === "fr" ? "HORAIRES & AMBIANCE" : "أوقات العمل والأجواء"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CAFE_DETAILS.hours.map((hr, idx) => (
                  <div key={idx} className="bg-sand-light/40 border border-sand-tan/10 rounded-lg p-2.5 text-left">
                    <span className="block text-[10px] font-semibold text-charcoal">
                      {language === "en" ? hr.days : language === "fr" ? hr.daysFr : hr.daysAr}
                    </span>
                    <span className="block text-[11px] text-charcoal/60 font-mono mt-0.5">{hr.time}</span>
                    <span className="block text-[9px] text-terracotta italic font-light mt-1">
                      {language === "en" ? hr.activeMenu : language === "fr" ? hr.activeMenuFr : hr.activeMenuAr}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact quick links */}
            <div className="space-y-3 text-left">
              <span className="block font-mono text-[10px] font-bold text-olive-deep uppercase tracking-widest">
                {language === "en" ? "INSTANT CONTACT" : language === "fr" ? "CONTACT INSTANTANÉ" : "اتصال فوري"}
              </span>
              <div className="space-y-1.5 text-xs font-mono text-charcoal/80">
                <p className="font-semibold">{CAFE_DETAILS.phone}</p>
                <p>{CAFE_DETAILS.email}</p>
                <p className="text-terracotta text-[11px] font-semibold">{CAFE_DETAILS.instagram}</p>
              </div>
            </div>

          </div>

          {/* Subfooter */}
          <div className="border-t border-sand-tan/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-charcoal/50 font-mono">
            <p>© 2026 Cafe Tropea Tangier. {language === "en" ? "All memories reserved." : language === "fr" ? "Tous souvenirs réservés." : "جميع الذكريات محفوظة."}</p>
            <div className="flex space-x-4">
              <button onClick={() => setTab("location")} className="hover:text-olive-deep transition-colors cursor-pointer">
                {language === "en" ? "Map & Route" : language === "fr" ? "Carte & Itinéraire" : "الخريطة والمسار"}
              </button>
              <button onClick={() => setTab("reviews")} className="hover:text-olive-deep transition-colors cursor-pointer">
                {language === "en" ? "Guestbook" : language === "fr" ? "Livre d'or" : "دفتر الزوار"}
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
