import React, { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Compass } from "lucide-react";
import { CAFE_DETAILS } from "../data";
import { Inquiry, Language } from "../types";

interface LocationViewProps {
  language: Language;
}

export default function LocationView({ language }: LocationViewProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState<Inquiry | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: "inq-" + Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        createdAt: new Date().toISOString()
      };

      // Save to LocalStorage
      const existingInquiries = JSON.parse(localStorage.getItem("cafe_tropea_inquiries") || "[]");
      localStorage.setItem("cafe_tropea_inquiries", JSON.stringify([...existingInquiries, newInquiry]));

      setInquirySuccess(newInquiry);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: ""
    });
    setInquirySuccess(null);
  };

  return (
    <div className="w-full py-24 bg-limestone" id="location-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-olive-pale text-olive-deep font-mono">
            <Compass className="w-3.5 h-3.5" />
            {language === "en" ? "COMPASS & CHRONICLES" : language === "fr" ? "BOUSSOLE & CONTACTS" : "البوصلة والمسار"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-charcoal tracking-tight">
            {language === "en" ? "Where Warmth Meets the Horizon" : language === "fr" ? "Où la Chaleur Rencontre l'Horizon" : "حيث يلتقي الدفء بالبحر"}
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 font-light max-w-xl mx-auto">
            {language === "en"
              ? "We are situated beautifully on the Corniche of Tangier along the scenic beachfront promenade, boasting an extraordinary panoramic view of the Mediterranean Sea."
              : language === "fr"
              ? "Nous sommes idéalement situés sur la Corniche de Tanger, le long du magnifique boulevard du front de mer, offrant une vue panoramique extraordinaire sur la mer Méditerranée."
              : "نحن نقع بشكل جميل على كورنيش طنجة على طول الممشى الشاطئي الخلاب، متمتعين بإطلالة بانورامية رائعة على البحر الأبيض المتوسط."}
          </p>
        </div>

        {/* 2. THREE-PANEL GRID: CONTACT INFO, HOURS & CUSTOM MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Panel A: Get in touch & Hours (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            {/* Quick Contact Box */}
            <div className="bg-sand-light/30 border border-sand-tan/20 rounded-2xl p-6 space-y-4 flex-1">
              <h3 className="font-display font-semibold text-base text-charcoal mb-4">
                {language === "en" ? "Vibe & Coordinates" : language === "fr" ? "Coordonnées & Ambiance" : "تفاصيل الاتصال والإشارات"}
              </h3>
              
              {/* Address */}
              <div className="flex gap-3 text-xs">
                <MapPin className="w-4 h-4 text-terracotta shrink-0" />
                <div>
                  <span className="block font-semibold mb-0.5">{language === "en" ? "Address" : language === "fr" ? "Adresse" : "العنوان"}</span>
                  <p className="text-charcoal/70 font-light leading-relaxed">
                    {language === "en" ? CAFE_DETAILS.address : language === "fr" ? CAFE_DETAILS.frenchAddress : CAFE_DETAILS.arabicAddress}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3 text-xs border-t border-sand-tan/10 pt-3">
                <Phone className="w-4 h-4 text-olive-deep shrink-0" />
                <div>
                  <span className="block font-semibold mb-0.5">{language === "en" ? "Direct Line" : language === "fr" ? "Ligne Directe" : "رقم الهاتف"}</span>
                  <p className="text-charcoal/70 font-mono">{CAFE_DETAILS.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 text-xs border-t border-sand-tan/10 pt-3">
                <Mail className="w-4 h-4 text-olive-deep shrink-0" />
                <div>
                  <span className="block font-semibold mb-0.5">{language === "en" ? "Email Letters" : language === "fr" ? "Adresse E-mail" : "البريد الإلكتروني"}</span>
                  <p className="text-charcoal/70 font-mono">{CAFE_DETAILS.email}</p>
                </div>
              </div>
            </div>

            {/* Opening Hours Box */}
            <div className="bg-sand-light/30 border border-sand-tan/20 rounded-2xl p-6 space-y-4 flex-1">
              <h3 className="font-display font-semibold text-base text-charcoal flex items-center gap-2">
                <Clock className="w-4 h-4 text-olive-deep" />
                <span>{language === "en" ? "Temple Shift Hours" : language === "fr" ? "Heures de Service" : "ساعات العمل والأوقات"}</span>
              </h3>
              
              <div className="space-y-3">
                {CAFE_DETAILS.hours.map((item, index) => (
                  <div key={index} className="flex justify-between items-start text-xs border-b border-sand-tan/10 pb-2 last:border-0 last:pb-0">
                    <div>
                      <span className="block font-semibold">
                        {language === "en" ? item.days : language === "fr" ? item.daysFr : item.daysAr}
                      </span>
                      <span className="text-[10px] text-terracotta font-mono mt-0.5 inline-block bg-terracotta-light px-1.5 py-0.5 rounded">
                        {language === "en" ? item.activeMenu : language === "fr" ? item.activeMenuFr : item.activeMenuAr}
                      </span>
                    </div>
                    <span className="text-charcoal/70 font-mono font-light text-[11px] shrink-0">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel B: HIGH FIDELITY INTERACTIVE MAP (8 cols) */}
          <div className="lg:col-span-8 bg-limestone border border-sand-tan/30 rounded-2xl overflow-hidden shadow-sm flex flex-col" id="custom-vector-map-panel">
            {/* Map Header Controls */}
            <div className="p-4 bg-sand-light/40 border-b border-sand-tan/20 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-charcoal flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-terracotta rounded-full animate-ping" />
                {language === "en" ? "LIVE CORNICHE ROAD SCHEMATIC" : language === "fr" ? "SCHÉMA DE LA CORNICHE EN DIRECT" : "تخطيط بوصلة الكورنيش الحي"}
              </span>
            </div>

            {/* Real Interactive Google Map Area */}
            <div className="flex-1 min-h-[380px] relative overflow-hidden" id="google-maps-container">
              {/* Google Maps iFrame embedding Cafe Tropea, Avenue Mohammed VI, Tangier */}
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  "Café Tropea, Avenue Mohammed VI, Tangier, Morocco"
                )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cafe Tropea Location on Google Maps"
                className="absolute inset-0 w-full h-full z-0"
              />
            </div>

            {/* Map footer directions action linking to real Google Maps search */}
            <div className="p-3 bg-sand-light/40 border-t border-sand-tan/20 text-center z-10 relative">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  "Café Tropea, Avenue Mohammed VI, Tangier, Morocco"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-olive-deep hover:text-terracotta transition-colors"
                id="external-map-link"
              >
                <span>{language === "en" ? "Open in Google Maps" : language === "fr" ? "Ouvrir dans Google Maps" : "فتح في خرائط جوجل"}</span>
              </a>
            </div>

          </div>

        </div>

        {/* 3. INQUIRIES & GROUP BOOKINGS FORM */}
        <section className="bg-sand-light/10 border border-sand-tan/30 rounded-3xl overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12 items-stretch" id="inquiry-form-section">
          
          {/* Left panel info (4 cols) */}
          <div className="md:col-span-4 bg-olive-deep text-limestone p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="block font-mono text-[10px] font-semibold text-terracotta-soft uppercase tracking-widest">
                {language === "en" ? "INQUIRIES & PRIVATE CELEBRATIONS" : language === "fr" ? "DEMANDES & ÉVÉNEMENTS PRIVÉS" : "الاستفسارات والحفلات الخاصة"}
              </span>
              <h3 className="text-2xl font-display font-semibold tracking-tight">
                {language === "en" ? "Host Your Gathering" : language === "fr" ? "Organiser un Événement" : "استضف مناسبتك السعيدة"}
              </h3>
              <p className="text-xs sm:text-sm text-olive-soft/80 font-light leading-relaxed">
                {language === "en"
                  ? "Are you looking to book our high terrace for a corporate retreat, private dinner, or wedding photoshoot? Write us with your dates, and our hosting team will call you back."
                  : language === "fr"
                  ? "Souhaitez-vous privatiser notre oliveraie pour un séminaire, un repas d'affaires, un anniversaire ou une séance photo ? Contactez-nous avec vos dates."
                  : "هل تبحث عن حجز شرفتنا المطلة لعشاء عمل، حفلة خاصة، أو جلسة تصوير زفاف؟ راسلنا بالتفاصيل، وسيقوم فريق الضيافة لدينا بالاتصال بك."}
              </p>
            </div>

            <div className="text-[10px] text-olive-soft/50 font-mono leading-relaxed">
              {language === "en"
                ? "* Response turnaround is typically under 12 hours. We speak English, Arabic, and French."
                : language === "fr"
                ? "* Le délai de réponse est inférieur à 12 heures. Nous parlons anglais, arabe et français."
                : "* الرد يكون عادةً في أقل من ١٢ ساعة. نتحدث الإنجليزية، العربية، والفرنسية."}
            </div>
          </div>

          {/* Right panel form (8 cols) */}
          <div className="md:col-span-8 p-6 sm:p-10" id="inquiry-form-wrapper">
            {!inquirySuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider mb-1">
                      {language === "en" ? "Your Name" : language === "fr" ? "Votre Nom" : "اسمك الكامل"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Sophia Laurent"
                      className="form-input text-xs"
                      id="inq-name-input"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider mb-1">
                      {language === "en" ? "Email Address" : language === "fr" ? "Adresse E-mail" : "البريد الإلكتروني"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sophia@example.com"
                      className="form-input text-xs"
                      id="inq-email-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider mb-1">
                      {language === "en" ? "Phone Number" : language === "fr" ? "Numéro de Téléphone" : "رقم الهاتف"}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+212 600-000000"
                      className="form-input text-xs"
                      id="inq-phone-input"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider mb-1">
                      {language === "en" ? "Subject" : language === "fr" ? "Sujet de la demande" : "موضوع الاستفسار"}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-input text-xs appearance-none"
                      id="inq-subject-input"
                    >
                      <option value="General Inquiry">{language === "en" ? "General Inquiry" : language === "fr" ? "Demande Générale" : "استفسار عام"}</option>
                      <option value="Group Booking">{language === "en" ? "Group & Feast Booking" : language === "fr" ? "Réservation de Groupe" : "حجز مجموعات وولائم"}</option>
                      <option value="Wedding / Photoshoot">{language === "en" ? "Wedding / Photoshoot" : language === "fr" ? "Séance Photo / Mariage" : "جلسة تصوير أو حفل زفاف"}</option>
                      <option value="Cooperative Partnership">{language === "en" ? "Cooperative Partnership" : language === "fr" ? "Partenariat Coopérative" : "شراكة تعاونيات"}</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider mb-1">
                    {language === "en" ? "Your Message" : language === "fr" ? "Votre Message" : "نص الرسالة"}
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === "en" ? "Detail your requests, number of attendees, desired dates..." : language === "fr" ? "Détaillez vos demandes, nombre d'invités, dates souhaitées..." : "يرجى كتابة التفاصيل، عدد الحضور المتوقع، والتواريخ المرغوبة..."}
                    className="form-input text-xs h-28 resize-none"
                    id="inq-message-input"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 bg-olive-deep hover:bg-olive-light text-limestone font-medium rounded-lg text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  id="inq-submit-btn"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-limestone border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === "en" ? "Submit Inquiry" : language === "fr" ? "Envoyer la demande" : "إرسال الطلب الفوري"}</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
                id="inq-success-container"
              >
                <div className="w-12 h-12 bg-olive-pale text-olive-deep rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-display font-semibold text-charcoal mb-1">
                  {language === "en" ? "Inquiry Received!" : language === "fr" ? "Demande Reçue !" : "تم استلام رسالتك بنجاح!"}
                </h4>
                <p className="text-xs text-charcoal/70 max-w-sm mx-auto mb-6">
                  {language === "en"
                    ? `Marhaba, ${inquirySuccess.name}. We have received your request regarding "${inquirySuccess.subject}" and will respond within 12 hours.`
                    : language === "fr"
                    ? `Marhaba, ${inquirySuccess.name}. Nous avons bien reçu votre demande concernant "${inquirySuccess.subject}" et vous répondrons sous 12 heures.`
                    : `مرحباً بك يا ${inquirySuccess.name}. لقد تلقينا رسالتك بخصوص موضوع "${inquirySuccess.subject}"، وسيتواصل معك منسق الحفلات لدينا خلال ١٢ ساعة.`}
                </p>

                <button
                  onClick={handleReset}
                  className="px-5 py-2 bg-sand-light border border-sand-tan/30 hover:bg-sand-light/70 text-charcoal text-xs font-semibold rounded-lg transition-colors"
                  id="inq-reset-btn"
                >
                  {language === "en" ? "Send Another Message" : language === "fr" ? "Envoyer un autre message" : "إرسال رسالة أخرى"}
                </button>
              </motion.div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
