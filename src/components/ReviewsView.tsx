import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ThumbsUp, Send, Edit, Award, MessageSquare, Check, Compass } from "lucide-react";
import { REVIEWS } from "../data";
import { Review, Language } from "../types";

interface ReviewsViewProps {
  language: Language;
}

export default function ReviewsView({ language }: ReviewsViewProps) {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});
  
  // Review form states
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState("");
  const [formComment, setFormComment] = useState("");
  const [formSource, setFormSource] = useState<"TripAdvisor" | "Google" | "Guestbook">("Guestbook");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Load reviews from data and local storage
  useEffect(() => {
    const localReviews = JSON.parse(localStorage.getItem("cafe_tropea_reviews") || "[]");
    setReviewsList([...localReviews, ...REVIEWS]);
  }, []);

  const handleLike = (id: string) => {
    const isLiked = userLikes[id];
    setUserLikes(prev => ({ ...prev, [id]: !isLiked }));
    
    setReviewsList(prevList => 
      prevList.map(item => {
        if (item.id === id) {
          const currentLikes = item.likes || 0;
          return {
            ...item,
            likes: isLiked ? currentLikes - 1 : currentLikes + 1
          };
        }
        return item;
      })
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const defaultLocation = language === "en" ? "Explorer" : language === "fr" ? "Explorateur" : "مستكشف";
    const defaultDate = language === "en" ? "Today" : language === "fr" ? "Aujourd'hui" : "اليوم";

    const newReview: Review = {
      id: "rv-" + Math.random().toString(36).substr(2, 9),
      author: formName,
      location: formLocation || defaultLocation,
      rating: formRating,
      date: defaultDate,
      title: formTitle,
      comment: formComment,
      arabicComment: formComment,
      frenchComment: formComment,
      source: formSource,
      likes: 0,
      avatarUrl: `https://images.unsplash.com/photo-${[
        "1534528741775-53994a69daeb",
        "1507003211169-0a1dd7228f2d",
        "1492562080023-ab3db95bfbce",
        "1438761681033-6461ffad8d80"
      ][Math.floor(Math.random() * 4)]}?auto=format&fit=crop&q=80&w=150`
    };

    // Save to LocalStorage
    const localReviews = JSON.parse(localStorage.getItem("cafe_tropea_reviews") || "[]");
    localStorage.setItem("cafe_tropea_reviews", JSON.stringify([newReview, ...localReviews]));

    // Update state
    setReviewsList([newReview, ...reviewsList]);
    setFormSubmitted(true);

    // Reset Form
    setTimeout(() => {
      setFormName("");
      setFormLocation("");
      setFormRating(5);
      setFormTitle("");
      setFormComment("");
      setFormSource("Guestbook");
      setFormSubmitted(false);
      setShowForm(false);
    }, 2500);
  };

  // Split featured reviews
  const featuredReview = reviewsList.find(r => r.author === "Bint Batuta" || r.author === "بنت بطوطة") || reviewsList[0];
  const gridReviews = reviewsList.filter(r => r.id !== featuredReview?.id);

  // Get localized comment
  const getLocalizedComment = (review: Review) => {
    if (language === "ar" && review.arabicComment) return review.arabicComment;
    if (language === "fr" && review.frenchComment) return review.frenchComment;
    return review.comment;
  };

  return (
    <div className="w-full py-24 bg-limestone" id="reviews-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. HEADER & HERO */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-olive-pale text-olive-deep font-mono">
            <Award className="w-3.5 h-3.5" />
            {language === "en" ? "THE ART OF HOSPITALITY" : language === "fr" ? "L'ART DE L'HOSPITALITÉ" : "فن الضيافة واللقاء"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-charcoal tracking-tight">
            {language === "en" ? "Voices from the Olive Garden" : language === "fr" ? "Les Voix de l'Oliveraie" : "أصداء ضيوفنا في حديقة الزيتون"}
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 font-light max-w-xl mx-auto">
            {language === "en"
              ? "With a stellar 4.8 rating on TripAdvisor and hundreds of letters in our physical guestbook, we cherish every shared memory."
              : language === "fr"
              ? "Avec une note exceptionnelle de 4.8 sur TripAdvisor et des centaines de lettres dans notre livre d'or physique, nous chérissons chaque souvenir partagé."
              : "مع تقييم ممتاز يبلغ ٤.٨ على تريب أدفيزور ومئات الرسائل في دفتر زوارنا، نحن نعتز بكل ذكرى نشاركها معكم."}
          </p>

          {/* Rating Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs font-mono text-charcoal/80">
            <div className="flex items-center gap-1.5 bg-sand-light/50 border border-sand-tan/30 rounded-full px-4 py-1.5">
              <span className="text-olive-deep font-bold">4.8 / 5.0</span>
              <div className="flex text-terracotta">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-terracotta" />
                ))}
              </div>
              <span className="text-charcoal/40 font-light">|</span>
              <span>TripAdvisor</span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-sand-light/50 border border-sand-tan/30 rounded-full px-4 py-1.5">
              <span className="text-olive-deep font-bold">99%</span>
              <Compass className="w-3.5 h-3.5 text-terracotta" />
              <span>{language === "en" ? "Recommend" : language === "fr" ? "Recommandent" : "ينصحون بنا"}</span>
            </div>
          </div>
        </div>

        {/* 2. FEATURED HERO REVIEW */}
        {featuredReview && (
          <div className="mb-16 bg-olive-dark text-limestone rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl relative overflow-hidden border border-olive-deep" id="featured-review-card">
            {/* Background design glow */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-terracotta-soft/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6 pb-6 border-b border-limestone/10">
              <div className="flex items-center gap-4">
                {featuredReview.avatarUrl ? (
                  <img
                    src={featuredReview.avatarUrl}
                    alt={featuredReview.author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-terracotta-soft"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-terracotta-soft flex items-center justify-center text-limestone font-bold">
                    {featuredReview.author[0]}
                  </div>
                )}
                <div>
                  <h3 className="font-display font-semibold text-lg text-limestone tracking-tight flex items-center gap-2">
                    <span>{featuredReview.author}</span>
                    <span className="text-[10px] bg-terracotta text-limestone uppercase px-2 py-0.5 rounded-full font-mono tracking-wider">
                      {featuredReview.source}
                    </span>
                  </h3>
                  <span className="text-xs text-olive-soft/70">
                    {featuredReview.location} • {featuredReview.date}
                  </span>
                </div>
              </div>

              {/* Stars & Upvote */}
              <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between md:justify-end">
                <div className="flex text-terracotta-soft">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-terracotta-soft" />
                  ))}
                </div>
                <button
                  onClick={() => handleLike(featuredReview.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    userLikes[featuredReview.id]
                      ? "bg-terracotta text-limestone font-semibold"
                      : "bg-limestone/10 text-olive-soft hover:bg-limestone/20"
                  }`}
                  id="featured-like-btn"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{featuredReview.likes || 0}</span>
                </button>
              </div>
            </div>

            {/* Quote content */}
            <blockquote className="relative z-10 text-base sm:text-lg lg:text-xl font-light italic leading-relaxed text-olive-soft max-w-4xl" id="featured-review-comment">
              {getLocalizedComment(featuredReview)}
            </blockquote>
            
            <div className="mt-6 flex items-center gap-2 text-xs text-terracotta-soft font-mono uppercase tracking-wider">
              <span className="w-2 h-2 bg-terracotta rounded-full animate-ping" />
              <span>{language === "en" ? "FEATURED GUESTBOOK MEMORY" : language === "fr" ? "SOUVENIR SÉLECTIONNÉ DU LIVRE D'OR" : "ذكرى مختارة من دفتر الزوار"}</span>
            </div>
          </div>
        )}

        {/* 3. GRID OF REVIEWS */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 border-b border-sand-tan/20 pb-4">
            <h3 className="text-xl font-display font-semibold text-charcoal flex items-center gap-2" id="recent-reviews-subtitle">
              <MessageSquare className="w-4.5 h-4.5 text-olive-deep" />
              <span>{language === "en" ? "Recent Guestbooks" : language === "fr" ? "Messages Récents" : "أحدث تدوينات الضيوف"}</span>
            </h3>
            
            {/* Form reveal button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-1.5 px-4 py-2 bg-olive-deep hover:bg-olive-light text-limestone text-xs font-semibold rounded-full shadow-sm transition-all cursor-pointer"
              id="write-review-toggle-btn"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>{language === "en" ? "Sign Guestbook" : language === "fr" ? "Signer le Livre d'Or" : "وقّع في دفتر الزوار"}</span>
            </button>
          </div>

          {/* Collapsible write a review form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-10"
                id="review-form-wrapper"
              >
                {!formSubmitted ? (
                  <form onSubmit={handleReviewSubmit} className="bg-sand-light/50 border border-sand-tan/30 rounded-2xl p-6 sm:p-8 space-y-4">
                    <h4 className="font-display font-semibold text-base text-charcoal">
                      {language === "en" ? "Share Your Experience" : language === "fr" ? "Partagez Votre Expérience" : "شاركنا تفاصيل تجربتك الفواحة"}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider mb-1">
                          {language === "en" ? "Your Name" : language === "fr" ? "Votre Nom" : "اسمك الكريم"}
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g., Jean Dupont"
                          className="form-input text-xs"
                          id="review-name-input"
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider mb-1">
                          {language === "en" ? "Location / Origin" : language === "fr" ? "Origine / Ville" : "بلد الإقامة / الموطن"}
                        </label>
                        <input
                          type="text"
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          placeholder="e.g., Paris, France"
                          className="form-input text-xs"
                          id="review-location-input"
                        />
                      </div>

                      {/* Source */}
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider mb-1">
                          {language === "en" ? "Where are you posting?" : language === "fr" ? "Canal de publication" : "جهة المشاركة"}
                        </label>
                        <select
                          value={formSource}
                          onChange={(e) => setFormSource(e.target.value as any)}
                          className="form-input text-xs appearance-none"
                          id="review-source-input"
                        >
                          <option value="Guestbook">{language === "en" ? "Physical Guestbook" : language === "fr" ? "Livre d'Or Physique" : "دفتر الزوار الفعلي"}</option>
                          <option value="TripAdvisor">TripAdvisor</option>
                          <option value="Google">Google Review</option>
                        </select>
                      </div>
                    </div>

                    {/* Star selection & Title */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                      {/* Rating selection */}
                      <div className="col-span-1">
                        <label className="block text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider mb-1">
                          {language === "en" ? "Rating" : language === "fr" ? "Note" : "التقييم"}
                        </label>
                        <div className="flex gap-1.5 text-sand-tan">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFormRating(star)}
                              className={`p-1 hover:scale-110 transition-transform ${
                                star <= formRating ? "text-terracotta" : "text-sand-tan"
                              }`}
                              id={`rating-star-${star}`}
                            >
                              <Star className={`w-5 h-5 ${star <= formRating ? "fill-terracotta" : ""}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Title */}
                      <div className="col-span-2">
                        <label className="block text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider mb-1">
                          {language === "en" ? "Review Title" : language === "fr" ? "Titre de l'avis" : "عنوان التقييم المفضل"}
                        </label>
                        <input
                          type="text"
                          required
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder={language === "en" ? "e.g., Magical afternoon under the olive shade" : language === "fr" ? "ex: Après-midi magique sous l'olivier" : "مثال: أمسية ساحرة تحت ظلال الزيتون"}
                          className="form-input text-xs"
                          id="review-title-input"
                        />
                      </div>
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider mb-1">
                        {language === "en" ? "Your Experience" : language === "fr" ? "Votre Expérience" : "تفاصيل تجربتك الرائعة"}
                      </label>
                      <textarea
                        required
                        value={formComment}
                        onChange={(e) => setFormComment(e.target.value)}
                        placeholder={language === "en" ? "Describe your food, hospitality, breeze, views..." : language === "fr" ? "Décrivez le goût, l'accueil, la brise de mer, la vue..." : "صف لنا مذاق الطعام، لطافة الضيافة، إطلالة البحر، والنسيم..."}
                        className="form-input text-xs h-28 resize-none"
                        id="review-comment-input"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 bg-olive-deep hover:bg-olive-light text-limestone font-medium rounded-lg text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      id="submit-review-btn"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === "en" ? "Post to Guestbook" : language === "fr" ? "Publier dans le Livre d'Or" : "إرسال التدوينة للدفتر"}</span>
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="bg-olive-pale border border-olive-soft rounded-2xl p-8 text-center text-olive-deep"
                    id="review-success-msg"
                  >
                    <div className="w-12 h-12 bg-olive-soft/40 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-semibold text-lg mb-1">
                      {language === "en" ? "Thank You!" : language === "fr" ? "Merci Beaucoup !" : "شكراً جزيلاً لِكلماتك الطيبة!"}
                    </h4>
                    <p className="text-xs text-olive-deep/80 max-w-sm mx-auto">
                      {language === "en"
                        ? "Your beautiful words have been lovingly scribed into our permanent digital guestbook."
                        : language === "fr"
                        ? "Vos mots magnifiques ont été inscrits avec amour dans notre livre d'or numérique permanent."
                        : "تمت إضافة تدوينتك الجميلة بحب وشغف إلى دفتر زوارنا الرقمي الدائم."}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid Layout of other Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="reviews-grid-list">
            {gridReviews.map((item) => (
              <article
                key={item.id}
                className="bg-sand-light/20 border border-sand-tan/20 rounded-2xl p-5 hover:bg-sand-light/30 transition-all flex flex-col justify-between"
                id={`review-item-${item.id}`}
              >
                <div>
                  {/* Review Header: User details */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-sand-tan/10">
                    <div className="flex items-center gap-3">
                      {item.avatarUrl ? (
                        <img
                          src={item.avatarUrl}
                          alt={item.author}
                          className="w-10 h-10 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-olive-pale flex items-center justify-center text-olive-deep font-bold text-xs">
                          {item.author[0]}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-sm text-charcoal">{item.author}</h4>
                        <span className="block text-[10px] text-charcoal/50">{item.location}</span>
                      </div>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-mono bg-sand-light border border-sand-tan/30 text-charcoal/60">
                      {item.source}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex text-terracotta gap-0.5 mb-2.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(item.rating) ? "fill-terracotta" : "text-sand-tan"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Title & Comment */}
                  <h5 className="font-display font-semibold text-sm text-charcoal mb-1">
                    {language === "en" ? item.title : language === "fr" ? (item.frenchTitle || item.title) : (item.arabicTitle || item.title)}
                  </h5>
                  <p className="text-xs text-charcoal/70 font-light leading-relaxed mb-4">
                    {getLocalizedComment(item)}
                  </p>
                </div>

                {/* Footer of Review card: Date & Likes */}
                <div className="flex items-center justify-between pt-3 border-t border-sand-tan/10 text-[10px] text-charcoal/50 font-mono">
                  <span>{item.date}</span>
                  <button
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center gap-1 hover:text-terracotta transition-colors px-2 py-1 rounded-full ${
                      userLikes[item.id] ? "bg-terracotta/10 text-terracotta font-semibold" : ""
                    }`}
                    id={`like-btn-${item.id}`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{item.likes || 0}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 4. TRIPADVISOR CALL TO ACTION */}
        <div className="bg-sand-light/40 border border-sand-tan/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left" id="reviews-cta-banner">
          <div className="space-y-2 max-w-xl">
            <h4 className="font-display font-semibold text-xl text-charcoal tracking-tight">
              {language === "en" ? "Leave a Mark on Our History" : language === "fr" ? "Laissez Votre Empreinte" : "اترك بصمتك في مذكرات المقهى"}
            </h4>
            <p className="text-xs sm:text-sm text-charcoal/70 font-light">
              {language === "en"
                ? "Your experiences inspire our kitchen and fill our garden with warmth. Post a review on TripAdvisor or tag us on Instagram during your visit!"
                : language === "fr"
                ? "Vos retours inspirent notre cuisine et réchauffent notre jardin. Laissez un avis sur TripAdvisor ou identifiez-nous sur Instagram lors de votre visite !"
                : "تجاربكم الملهمة تدعم مطبخنا وتملأ فناءنا بالدفء والمحبة. شارك مراجعتك على تريب أدفيزور أو ضع منشن لحسابنا في إنستغرام!"}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 shrink-0">
            <a
              href="https://tripadvisor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-terracotta hover:bg-terracotta/90 text-limestone text-xs font-semibold rounded-full transition-all flex items-center gap-1.5"
              id="cta-tripadvisor-link"
            >
              <span>{language === "en" ? "Write on TripAdvisor" : language === "fr" ? "Avis TripAdvisor" : "كتابة مراجعة تريب أدفيزور"}</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-sand-tan hover:bg-sand-light/40 text-charcoal text-xs font-semibold rounded-full transition-all flex items-center gap-1.5"
              id="cta-instagram-link"
            >
              <span>{language === "en" ? "Share on Instagram" : language === "fr" ? "Partager sur Instagram" : "مشاركة على إنستغرام"}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
