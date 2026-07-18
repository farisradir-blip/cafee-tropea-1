import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, Users, CheckCircle, Award } from "lucide-react";
import { TableBooking, Language } from "../types";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function ReservationModal({ isOpen, onClose, language }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    seatingPreference: "terrace" as "indoor" | "terrace" | "garden",
    notes: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<TableBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API Call
    setTimeout(() => {
      const newBooking: TableBooking = {
        id: "bk-" + Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        notes: formData.notes,
        seatingPreference: formData.seatingPreference,
        status: "confirmed",
        createdAt: new Date().toISOString()
      };

      // Save to LocalStorage
      const existingBookings = JSON.parse(localStorage.getItem("cafe_tropea_bookings") || "[]");
      localStorage.setItem("cafe_tropea_bookings", JSON.stringify([...existingBookings, newBooking]));

      setBookingSuccess(newBooking);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: 2,
      seatingPreference: "terrace",
      notes: ""
    });
    setBookingSuccess(null);
  };

  if (!isOpen) return null;

  const getSeatingLabel = (pref: string) => {
    if (language === "ar") {
      if (pref === "indoor") return "الفناء الداخلي";
      if (pref === "terrace") return "الشرفة المطلة";
      if (pref === "garden") return "حديقة الزيتون";
      return pref;
    }
    if (language === "fr") {
      if (pref === "indoor") return "Patio Intérieur";
      if (pref === "terrace") return "Haute Terrasse";
      if (pref === "garden") return "Oliveraie";
      return pref;
    }
    if (pref === "indoor") return "Indoor Patio";
    if (pref === "terrace") return "High Terrace";
    if (pref === "garden") return "Olive Garden";
    return pref;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id="reservation-overlay">
        {/* Dark backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-xs"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-lg bg-limestone rounded-2xl shadow-2xl overflow-hidden z-10 border border-sand-tan/30"
          id="reservation-modal-container"
        >
          {/* Decorative Top Accent */}
          <div className="h-2 bg-gradient-to-r from-olive-deep via-terracotta to-sea-glass" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-sand-tan/20 text-charcoal/70 hover:text-charcoal transition-colors z-20 cursor-pointer"
            aria-label="Close modal"
            id="close-reservation-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {!bookingSuccess ? (
            <div className="p-6 sm:p-8" id="reservation-form-container">
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-olive-pale text-olive-deep mb-2 font-mono">
                  <Award className="w-3.5 h-3.5" />
                  {language === "en" ? "MEDITERRANEAN HARBOR VIEWS" : language === "fr" ? "VUES SUR LE PORT MÉDITERRANÉEN" : "إإطلالة بحرية ساحرة"}
                </span>
                <h3 className="text-2xl font-display font-semibold text-charcoal tracking-tight" id="reservation-title">
                  {language === "en" ? "Book Your Escape" : language === "fr" ? "Réservez Votre Échappée" : "احجز ملاذك الخاص"}
                </h3>
                <p className="text-sm text-charcoal/70 mt-1">
                  {language === "en" 
                    ? "Join us in our olive-garden patio or elevated harbor deck. Reservations are highly recommended."
                    : language === "fr"
                    ? "Rejoignez-nous dans notre patio-oliveraie ou notre terrasse surélevée. Les réservations sont recommandées."
                    : "انضم إلينا في فناء حديقة الزيتون أو شرفتنا المرتفعة المطلة على الميناء. نوصي بشدة بالحجز مسبقاً."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal/80 uppercase tracking-wider mb-1.5">
                    {language === "en" ? "Your Name" : language === "fr" ? "Votre Nom" : "الاسم الكامل"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === "en" ? "e.g., Sophia Laurent" : language === "fr" ? "ex : Sophia Laurent" : "مثال: صوفيا لوران"}
                    className="form-input text-sm"
                    id="book-name-input"
                  />
                </div>

                {/* Grid for Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/80 uppercase tracking-wider mb-1.5">
                      {language === "en" ? "Email Address" : language === "fr" ? "Adresse E-mail" : "البريد الإلكتروني"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sophia@example.com"
                      className="form-input text-sm"
                      id="book-email-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/80 uppercase tracking-wider mb-1.5">
                      {language === "en" ? "Phone Number" : language === "fr" ? "Numéro de Téléphone" : "رقم الهاتف"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+212 600-000000"
                      className="form-input text-sm"
                      id="book-phone-input"
                    />
                  </div>
                </div>

                {/* Grid for Date, Time & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/80 uppercase tracking-wider mb-1.5">
                      {language === "en" ? "Date" : language === "fr" ? "Date" : "التاريخ"}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-charcoal/40 pointer-events-none" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="form-input text-sm pl-9"
                        id="book-date-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/80 uppercase tracking-wider mb-1.5">
                      {language === "en" ? "Time" : language === "fr" ? "Heure" : "الوقت"}
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 w-4 h-4 text-charcoal/40 pointer-events-none" />
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="form-input text-sm pl-9"
                        id="book-time-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/80 uppercase tracking-wider mb-1.5">
                      {language === "en" ? "Guests" : language === "fr" ? "Invités" : "عدد الضيوف"}
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 w-4 h-4 text-charcoal/40 pointer-events-none" />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                        className="form-input text-sm pl-9 appearance-none"
                        id="book-guests-input"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? (language === "en" ? "Guest" : language === "fr" ? "Invité" : "ضيف") : (language === "en" ? "Guests" : language === "fr" ? "Invités" : "ضيوف")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Seating Preference */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal/80 uppercase tracking-wider mb-1.5">
                    {language === "en" ? "Seating Selections" : language === "fr" ? "Choix de l'Emplacement" : "تفضيل الجلوس"}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "indoor", label: "Indoor Patio", arabic: "داخلي", french: "Patio Intérieur" },
                      { value: "terrace", label: "High Terrace", arabic: "الشرفة المطلة", french: "Haute Terrasse" },
                      { value: "garden", label: "Olive Garden", arabic: "حديقة الزيتون", french: "Oliveraie" }
                    ].map((seat) => (
                      <button
                        key={seat.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, seatingPreference: seat.value as any })}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all ${
                          formData.seatingPreference === seat.value
                            ? "border-terracotta bg-terracotta-light text-terracotta font-semibold"
                            : "border-sand-tan/40 bg-limestone text-charcoal/70 hover:border-sand-tan hover:bg-sand-light/30"
                        }`}
                        id={`seat-${seat.value}`}
                      >
                        <span>{language === "en" ? seat.label : language === "fr" ? seat.french : seat.arabic}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal/80 uppercase tracking-wider mb-1.5">
                    {language === "en" ? "Special Requests & Dietary Notes" : language === "fr" ? "Demandes Particulières & Régimes" : "طلبات خاصة أو ملاحظات غذائية"}
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={language === "en" ? "Birthday, dietary allergies, etc..." : language === "fr" ? "Anniversaire, allergies, régimes..." : "عيد ميلاد، حساسية غذائية، إلخ..."}
                    className="form-input text-sm h-20 resize-none"
                    id="book-notes-input"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 bg-olive-deep hover:bg-olive-light text-limestone font-medium rounded-lg text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  id="submit-booking-btn"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-limestone border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>{language === "en" ? "Confirm Reservation" : language === "fr" ? "Confirmer la Réservation" : "تأكيد الحجز الفوري"}</span>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 text-center"
              id="booking-receipt-container"
            >
              <div className="w-16 h-16 bg-olive-pale rounded-full flex items-center justify-center mx-auto mb-4 text-olive-deep">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-display font-semibold text-charcoal mb-2" id="receipt-title">
                {language === "en" ? "Reservation Confirmed!" : language === "fr" ? "Réservation Confirmée !" : "تم تأكيد حجزك بنجاح!"}
              </h3>
              <p className="text-sm text-charcoal/70 mb-6 max-w-sm mx-auto">
                {language === "en"
                  ? `Marhaba, ${bookingSuccess.name}. We have reserved a beautiful spot for you in the ${getSeatingLabel(bookingSuccess.seatingPreference)}.`
                  : language === "fr"
                  ? `Marhaba, ${bookingSuccess.name}. Nous avons réservé une magnifique table pour vous dans l'espace ${getSeatingLabel(bookingSuccess.seatingPreference)}.`
                  : `مرحباً بك يا ${bookingSuccess.name}. لقد قمنا بحجز بقعة ساحرة لك في ${getSeatingLabel(bookingSuccess.seatingPreference)}.`}
              </p>

              {/* Receipt details */}
              <div className="bg-sand-light/50 border border-sand-tan/30 rounded-xl p-4 text-left space-y-2.5 max-w-sm mx-auto mb-6 text-xs text-charcoal/80 font-mono">
                <div className="flex justify-between border-b border-sand-tan/20 pb-1.5">
                  <span className="text-charcoal/60">{language === "en" ? "RESERVATION ID" : language === "fr" ? "ID RÉSERVATION" : "رقم الحجز"}</span>
                  <span className="font-bold text-charcoal">{bookingSuccess.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === "en" ? "GUESTS" : language === "fr" ? "INVITÉS" : "الضيوف"}</span>
                  <span className="font-semibold">{bookingSuccess.guests} {language === "en" ? "People" : language === "fr" ? "Personnes" : "أشخاص"}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === "en" ? "DATE & TIME" : language === "fr" ? "DATE & HEURE" : "التاريخ والوقت"}</span>
                  <span className="font-semibold">{bookingSuccess.date} @ {bookingSuccess.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === "en" ? "SEATING AREA" : language === "fr" ? "PLACEMENT" : "منطقة الجلوس"}</span>
                  <span className="font-semibold capitalize">{getSeatingLabel(bookingSuccess.seatingPreference)}</span>
                </div>
                {bookingSuccess.notes && (
                  <div className="border-t border-sand-tan/20 pt-1.5">
                    <span className="text-charcoal/60">NOTES</span>
                    <p className="text-[11px] text-charcoal/80 italic mt-0.5">{bookingSuccess.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-center max-w-sm mx-auto">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-semibold border border-sand-tan/50 hover:bg-sand-light/40 text-charcoal/80 rounded-lg transition-colors cursor-pointer"
                  id="book-another-btn"
                >
                  {language === "en" ? "Book Another" : language === "fr" ? "Autre réservation" : "حجز آخر"}
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-semibold bg-olive-deep hover:bg-olive-light text-limestone rounded-lg transition-all cursor-pointer"
                  id="receipt-done-btn"
                >
                  {language === "en" ? "Done" : language === "fr" ? "Fermer" : "تم"}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
