import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, Heart, Sparkles, Camera, Award } from "lucide-react";
import { GALLERY_ITEMS } from "../data";
import { GalleryItem, Language } from "../types";

interface GalleryViewProps {
  language: Language;
  onOpenBooking: () => void;
}

export default function GalleryView({ language, onOpenBooking }: GalleryViewProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "space" | "culinary" | "moments">("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lovedItems, setLovedItems] = useState<Record<string, boolean>>({});

  const toggleLove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening modal
    setLovedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filters = [
    { id: "all", label: "All Sights", arabic: "الكل", french: "Tous" },
    { id: "space", label: "The Space", arabic: "الأجواء والفضاء", french: "L'Espace" },
    { id: "culinary", label: "Culinary", arabic: "فنون الطهي", french: "Culinaire" },
    { id: "moments", label: "Moments", arabic: "لحظات وذكرى", french: "Instants" }
  ];

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  const getCategoryLabel = (cat: string) => {
    if (language === "ar") {
      if (cat === "space") return "الفضاء والأجواء";
      if (cat === "culinary") return "المأكولات";
      if (cat === "moments") return "اللحظات";
      return cat;
    }
    if (language === "fr") {
      if (cat === "space") return "L'Espace";
      if (cat === "culinary") return "Culinaire";
      if (cat === "moments") return "Moments";
      return cat;
    }
    // English
    if (cat === "space") return "The Space";
    if (cat === "culinary") return "Culinary";
    if (cat === "moments") return "Moments";
    return cat;
  };

  return (
    <div className="w-full py-24 bg-limestone" id="gallery-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-olive-pale text-olive-deep font-mono">
            <Camera className="w-3.5 h-3.5" />
            {language === "en" ? "VISUAL CHRONICLES" : language === "fr" ? "CHRONIQUES VISUELLES" : "رواية مرئية لطنجة"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-charcoal tracking-tight">
            {language === "en" ? "A Mediterranean Escape in Pixels" : language === "fr" ? "Une Échappée Méditerranéenne en Images" : "ملاذ المتوسط في تفاصيل الصور"}
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 font-light max-w-xl mx-auto">
            {language === "en"
              ? "Browse through the visual moments of our antique stone garden, hand-fired tagines, and the golden sun reflecting on the Strait of Gibraltar."
              : language === "fr"
              ? "Parcourez les moments visuels de notre jardin de pierre antique, de nos tajines traditionnels et du soleil doré se reflétant sur le Détroit de Gibraltar."
              : "تصفح اللحظات البصرية في حديقتنا الحجرية الأثرية، وطواجننا الفخارية، وغروب الشمس الذهبي المنعكس على مضيق جبل طارق."}
          </p>
        </div>

        {/* 2. FILTER TABS */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12" id="gallery-filters-wrapper">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all focus:outline-none cursor-pointer ${
                activeFilter === filter.id
                  ? "bg-olive-deep text-limestone shadow-sm"
                  : "bg-sand-light/50 border border-sand-tan/20 text-charcoal/70 hover:border-sand-tan hover:bg-sand-light/80"
              }`}
              id={`gallery-filter-${filter.id}`}
            >
              {language === "en" ? filter.label : language === "fr" ? filter.french : filter.arabic}
            </button>
          ))}
        </div>

        {/* 3. MASONRY LAYOUT GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          id="gallery-masonry-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedItem(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-sand-light border border-sand-tan/10 shadow-xs hover:shadow-lg transition-all"
                id={`gallery-card-${item.id}`}
              >
                {/* Image */}
                <div className={`relative w-full ${
                  item.aspectRatio === "portrait" 
                    ? "aspect-[3/4]" 
                    : item.aspectRatio === "landscape" 
                    ? "aspect-[4/3]" 
                    : "aspect-square"
                }`}>
                  <img
                    src={item.image}
                    alt={language === "en" ? item.title : language === "fr" ? (item.frenchTitle || item.title) : item.arabicTitle}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-limestone z-10" />

                  {/* Top quick badges (Visible on hover) */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[9px] uppercase tracking-widest font-mono bg-terracotta text-limestone px-2 py-0.75 rounded-full font-semibold">
                      {getCategoryLabel(item.category)}
                    </span>
                    <button
                      onClick={(e) => toggleLove(item.id, e)}
                      className="p-2 rounded-full bg-limestone/20 text-limestone hover:text-terracotta hover:bg-limestone backdrop-blur-xs transition-colors"
                      title="Love photo"
                    >
                      <Heart className={`w-3.5 h-3.5 ${lovedItems[item.id] ? "fill-terracotta text-terracotta" : ""}`} />
                    </button>
                  </div>

                  {/* Bottom title block (Visible on hover) */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-1">
                    <h3 className="font-display font-semibold text-base text-limestone tracking-tight flex items-center justify-between">
                      <span>{language === "en" ? item.title : language === "fr" ? (item.frenchTitle || item.title) : item.arabicTitle}</span>
                      <Maximize2 className="w-3.5 h-3.5 text-olive-soft" />
                    </h3>
                    <p className="text-[10.5px] text-olive-soft/80 line-clamp-2 font-light">
                      {language === "en" ? item.description : language === "fr" ? (item.frenchDescription || item.description) : item.description}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 4. IMMERSIVE DETAIL MODAL (LIGHTBOX) */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id="gallery-lightbox">
              {/* Dark backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="fixed inset-0 bg-charcoal/85 backdrop-blur-xs"
              />

              {/* Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl w-full bg-limestone rounded-3xl overflow-hidden shadow-2xl border border-sand-tan/30 z-10 grid grid-cols-1 md:grid-cols-12"
                id="lightbox-card"
              >
                {/* Close absolute */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-charcoal/60 hover:bg-charcoal text-limestone transition-colors z-20 cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left side: Huge photo (7 cols) */}
                <div className="md:col-span-7 bg-charcoal flex items-center justify-center min-h-[300px] md:min-h-[450px]">
                  <img
                    src={selectedItem.image}
                    alt={language === "en" ? selectedItem.title : language === "fr" ? (selectedItem.frenchTitle || selectedItem.title) : selectedItem.arabicTitle}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Right side: Bilingual descriptions (5 cols) */}
                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-olive-pale text-olive-deep font-mono mb-3">
                      <Award className="w-3 h-3" />
                      {getCategoryLabel(selectedItem.category)}
                    </span>
                    
                    <h3 className="text-2xl font-display font-semibold text-charcoal tracking-tight mb-1">
                      {language === "en" ? selectedItem.title : language === "fr" ? (selectedItem.frenchTitle || selectedItem.title) : selectedItem.arabicTitle}
                    </h3>
                    
                    {language !== "en" && (
                      <h4 className="text-xs font-mono text-charcoal/40 mb-4 tracking-wider">
                        {selectedItem.title}
                      </h4>
                    )}

                    <div className="space-y-4 border-t border-sand-tan/20 pt-4 text-xs sm:text-sm text-charcoal/80 font-light leading-relaxed">
                      <p>
                        {language === "en" ? selectedItem.description : language === "fr" ? (selectedItem.frenchDescription || selectedItem.description) : selectedItem.description}
                      </p>
                      <p className="italic text-[12.5px] text-charcoal/60">
                        {language === "en" 
                          ? "Captured inside Café Tropea's garden in Tangier. We invite you to experience the atmosphere in person."
                          : language === "fr"
                          ? "Capturé au cœur du jardin du Café Tropea à Tanger. Venez vivre l'expérience sur place."
                          : "تمت هذه اللقطة داخل حديقة مقهى تروبيا في طنجة. ندعوكم للاستمتاع بهذه الأجواء الحية في زيارتكم القادمة."}
                      </p>
                    </div>
                  </div>

                  {/* Actions inside modal */}
                  <div className="border-t border-sand-tan/20 pt-4 flex items-center justify-between">
                    <button
                      onClick={(e) => toggleLove(selectedItem.id, e)}
                      className="flex items-center gap-1.5 text-xs text-charcoal/70 hover:text-terracotta transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${lovedItems[selectedItem.id] ? "fill-terracotta text-terracotta" : ""}`} />
                      <span>
                        {lovedItems[selectedItem.id] 
                          ? (language === "en" ? "Loved" : language === "fr" ? "Aimé" : "مفضلة") 
                          : (language === "en" ? "Love Photo" : language === "fr" ? "Aimer" : "أعجبني")}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedItem(null);
                        onOpenBooking();
                      }}
                      className="px-5 py-2 bg-olive-deep hover:bg-olive-light text-limestone font-medium rounded-full text-xs transition-colors"
                    >
                      {language === "en" ? "Book Table" : language === "fr" ? "Réserver" : "احجز طاولة"}
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 5. BOTTOM CALL TO ACTION */}
        <div className="mt-20 text-center bg-olive-dark text-limestone rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl" id="gallery-bottom-cta">
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-sea-glass/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono tracking-widest uppercase text-terracotta-soft font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              {language === "en" ? "SIGHTS, SMELLS & SOUL" : language === "fr" ? "SOUVENIRS & ENCHANTEMENTS" : "رؤية ولمس وإحساس"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight">
              {language === "en" ? "Ready to create your own memories?" : language === "fr" ? "Prêt à créer vos propres souvenirs ?" : "هل أنت جاهز لتسجيل ذكرياتك الخاصة؟"}
            </h3>
            <p className="text-xs sm:text-sm text-olive-soft/80 font-light leading-relaxed">
              {language === "en"
                ? "Our doors are open daily, greeting the harbor breeze from morning until midnight. Secure your spot in the garden."
                : language === "fr"
                ? "Nos portes sont ouvertes tous les jours, accueillant la brise du port du matin à minuit. Réservez votre table dans l'oliveraie."
                : "أبوابنا مفتوحة يومياً لاستقبال نسيم الميناء المنعش من الصباح الباكر وحتى منتصف الليل. احجز مكانك المفضل في الحديقة."}
            </p>
            <button
              onClick={onOpenBooking}
              className="mt-4 px-7 py-3 bg-terracotta hover:bg-terracotta/90 text-limestone text-xs font-semibold rounded-full uppercase tracking-wider transition-all hover:scale-105"
              id="gallery-cta-booking-btn"
            >
              {language === "en" ? "Reserve Table Now" : language === "fr" ? "Réserver maintenant" : "احجز طاولتك الفخمة"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
