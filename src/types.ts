export type Language = "en" | "ar" | "fr";

export interface MenuItem {
  id: string;
  name: string;
  arabicName: string;
  frenchName: string;
  description: string;
  arabicDescription: string;
  frenchDescription: string;
  price: string;
  category: "mornings" | "afternoons" | "midnights" | "beverages";
  tag?: string;
  frenchTag?: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  frenchTitle?: string;
  comment: string;
  arabicComment?: string;
  frenchComment?: string;
  avatarUrl?: string;
  source: "TripAdvisor" | "Google" | "Guestbook";
  likes?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  arabicTitle: string;
  frenchTitle: string;
  category: "space" | "culinary" | "moments";
  image: string;
  aspectRatio: "square" | "portrait" | "landscape";
  description: string;
  frenchDescription: string;
}

export interface TableBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  seatingPreference: "indoor" | "terrace" | "garden";
  status: "pending" | "confirmed";
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}
