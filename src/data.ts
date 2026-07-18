import { MenuItem, Review, GalleryItem } from "./types";

export const CAFE_DETAILS = {
  name: "Cafe Tropea",
  tagline: "A Mediterranean Escape in Tangier",
  arabicTagline: "ملاذ البحر الأبيض المتوسط في طنجة",
  frenchTagline: "Une Échappée Méditerranéenne à Tanger",
  address: "Corniche de Tanger, Avenue Mohammed VI, Tangier 90000, Morocco",
  arabicAddress: "كورنيش طنجة، شارع محمد السادس، طنجة 90000، المغرب",
  frenchAddress: "Corniche de Tanger, Avenue Mohammed VI, Tanger 90000, Maroc",
  phone: "+212 539-948210",
  email: "marhaba@cafetropea.com",
  instagram: "@cafetropeatangier",
  hours: [
    { 
      days: "Mornings", 
      daysAr: "الصباح", 
      daysFr: "Matins", 
      time: "08:00 AM - 12:00 PM", 
      activeMenu: "Mornings Menu",
      activeMenuAr: "قائمة الصباح",
      activeMenuFr: "Menu du Matin"
    },
    { 
      days: "Afternoons", 
      daysAr: "الظهيرة", 
      daysFr: "Après-midis", 
      time: "12:00 PM - 06:00 PM", 
      activeMenu: "Afternoons Menu",
      activeMenuAr: "قائمة الظهيرة",
      activeMenuFr: "Menu de l'Après-midi"
    },
    { 
      days: "Midnights", 
      daysAr: "المساء والليل", 
      daysFr: "Soirées", 
      time: "06:00 PM - 12:00 AM", 
      activeMenu: "Midnights & Desserts",
      activeMenuAr: "قائمة المساء والحلويات",
      activeMenuFr: "Soirées & Desserts"
    }
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  // MORNINGS
  {
    id: "m1",
    name: "Tropea Royal Breakfast",
    arabicName: "فطور تروبيا الملكي",
    frenchName: "Petit Déjeuner Royal Tropea",
    description: "A rich Moroccan-Mediterranean spread with organic eggs your way, fresh goat cheese, local honey, black olives, warm Moroccan pancakes (msemen), fresh croissants, freshly squeezed orange juice, and traditional mint tea or coffee.",
    arabicDescription: "فطور مغربي متوسطي غني مع بيض عضوي مطبوخ حسب رغبتك، جبن الماعز الطازج، العسل الجبلي، زيتون أسود، مسمن مغربي ساخن، كرواسون طازج، عصير برتقال طبيعي، مع الشاي المغربي بالنعناع أو القهوة.",
    frenchDescription: "Un riche assortiment maroco-méditerranéen avec œufs bio à votre goût, fromage de chèvre frais, miel local, olives noires, crêpes marocaines chaudes (msemen), croissants frais, jus d'orange pressé et thé à la menthe traditionnel ou café.",
    price: "75 DH",
    category: "mornings",
    tag: "Signature",
    frenchTag: "Signature",
    image: "https://images.unsplash.com/photo-1496048927445-0df6f5685611?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "m2",
    name: "The Tropea Shakshuka",
    arabicName: "شكشوكة تروبيا الفريدة",
    frenchName: "La Chakchouka Tropea",
    description: "Two organic eggs poached in a spiced heirloom tomato and red pepper stew, finished with crumbled creamy feta, cilantro, and cold-pressed olive oil, served with warm crusty bread.",
    arabicDescription: "بيضتان عضويتان مطهوتان في حساء الطماطم والفلفل الأحمر المتبل، مغطى بجبنة الفيتا الكريمية، الكزبرة، وزيت الزيتون البكر، ويقدم مع الخبز الساخن المقرمش.",
    frenchDescription: "Deux œufs bio pochés dans un ragoût d'aubergines, tomates ancestrales et poivrons rouges épicés, agrémentés de feta crémeuse émiettée, coriandre et huile d'olive pressée à froid, servis avec du pain croustillant chaud.",
    price: "60 DH",
    category: "mornings",
    tag: "Traditional",
    frenchTag: "Traditionnel",
    image: "https://images.unsplash.com/photo-1590412200988-a436bb705300?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "m3",
    name: "Classic Avocado Toast",
    arabicName: "توست الأفوكادو الكلاسيكي",
    frenchName: "Toast à l'Avocat Classique",
    description: "Freshly mashed seasoned avocado, premium smoked salmon, a soft organic poached egg, and a light dash of mixed seeds on toasted sourdough bread.",
    arabicDescription: "أفوكادو طازج مهروس ومتبل، مع سلمون مدخن فاخر، بيضة مسلوقة عضوية، ورشة خفيفة من البذور المشكلة على خبز الساوردو المحمص.",
    frenchDescription: "Écrasé d'avocat frais assaisonné, saumon fumé de qualité supérieure, un œuf poché bio et un léger filet de graines assorties sur du pain au levain grillé.",
    price: "70 DH",
    category: "mornings",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600"
  },

  // AFTERNOONS
  {
    id: "a1",
    name: "Tropea Club Sandwich",
    arabicName: "كلوب ساندويتش تروبيا",
    frenchName: "Club Sandwich Tropea",
    description: "Toasted triple-decker sandwich with grilled chicken breast, beef bacon, organic fried egg, fresh tomatoes, lettuce, and homemade sauce, served with crispy golden French fries.",
    arabicDescription: "ساندويتش ثلاثي الطوابق محمص مع صدر دجاج مشوي، لحم بقري قديد، بيض مقلي عضوي، طماطم طازجة، خس، وصلصة منزلية خاصة، يقدم مع بطاطس مقلية ذهبية مقرمشة.",
    frenchDescription: "Sandwich grillé à trois étages avec blanc de poulet grillé, bacon de bœuf, œuf au plat bio, tomates fraîches, laitue et sauce maison, servi avec des frites dorées croustillantes.",
    price: "85 DH",
    category: "afternoons",
    tag: "Popular",
    frenchTag: "Populaire",
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "a2",
    name: "Classic Margherita Pizza",
    arabicName: "بيتزا مارغريتا الكلاسيكية",
    frenchName: "Pizza Margherita Classique",
    description: "Authentic thin-crust Italian pizza topped with rich San Marzano tomato sauce, fresh creamy mozzarella, aromatic basil leaves, and a drizzle of extra virgin olive oil.",
    arabicDescription: "بيتزا إيطالية أصيلة رقيقة الأطراف مغطاة بصلصة طماطم سان مارزانو الغنية، وجبن الموزاريلا الطازج، وأوراق الريحان الفواحة، مع قطرات من زيت الزيتون البكر الممتاز.",
    frenchDescription: "Véritable pizza italienne à pâte fine garnie de sauce tomate San Marzano, mozzarella crémeuse fraîche, feuilles de basilic aromatique et un filet d'huile d'olive extra vierge.",
    price: "65 DH",
    category: "afternoons",
    tag: "Wood-Fired",
    frenchTag: "Feu de bois",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "a3",
    name: "Creamy Chicken Alfredo Pasta",
    arabicName: "باستا ألفريدو بالدجاج والكريمة",
    frenchName: "Pâtes Alfredo au Poulet Crémeux",
    description: "Al dente fettuccine pasta tossed in a rich, velvety parmesan cream sauce with grilled chicken breast tenderloins, fresh sliced mushrooms, and parsley.",
    arabicDescription: "معكرونة فيتوتشيني مطبوخة بدرجة مثالية مغمورة في صلصة كريمة البارميزان المخملية الغنية مع قطع صدر دجاج مشوي، فطر طازج، وبقدونس.",
    frenchDescription: "Fettuccine al dente enrobées d'une sauce crémeuse au parmesan avec aiguillettes de poulet grillées, champignons frais émincés et persil.",
    price: "90 DH",
    category: "afternoons",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=600"
  },

  // MIDNIGHTS
  {
    id: "n1",
    name: "Artisanal Gelato Coupe",
    arabicName: "كوب جيلاتو تروبيا الفاخر",
    frenchName: "Coupe de Gelato Artisanal",
    description: "Three premium scoops of our famous artisan Italian gelato (pistachio, vanilla, and chocolate) served with fresh whipped cream, chocolate drizzle, and roasted almonds.",
    arabicDescription: "ثلاث كرات فاخرة من جيلاتو تروبيا الإيطالي الشهير (الفستق، الفانيليا، والشوكولاتة) تقدم مع كريمة مخفوقة طازجة، صلصة الشوكولاتة، ولوز محمص.",
    frenchDescription: "Trois boules de notre célèbre gelato italien artisanal (pistache, vanille et chocolat) servies avec crème fouettée fraîche, filet de chocolat et amandes grillées.",
    price: "55 DH",
    category: "midnights",
    tag: "Best Seller",
    frenchTag: "Best-seller",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "n2",
    name: "Belgian Nutella Crepe",
    arabicName: "كريب بلجيكي بالنوتيلا والفاكهة",
    frenchName: "Crêpe Belge au Nutella",
    description: "Warm, thin Belgian-style crepe generously spread with Nutella hazelnut spread, folded with fresh sliced bananas and strawberries, topped with powdered sugar.",
    arabicDescription: "كريب بلجيكي دافئ ورقيق مدهون بسخاء بشوكولاتة نوتيلا بالبندق، محشو بشرائح الموز والفراولة الطازجة ومزين بلمسة من السكر الناعم.",
    frenchDescription: "Crêpe chaude et fine de style belge généreusement nappée de Nutella, fourrée de bananes et fraises fraîches coupées en tranches, saupoudrée de sucre glace.",
    price: "45 DH",
    category: "midnights",
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "n3",
    name: "Warm Chocolate Fondant",
    arabicName: "فوندان الشوكولاتة الساخن",
    frenchName: "Fondant au Chocolat Chaud",
    description: "A decadent warm chocolate cake with a rich molten chocolate center that flows beautifully when cut, served with a scoop of premium Madagascar vanilla bean gelato.",
    arabicDescription: "كعكة شوكولاتة دافئة غنية مع قلب من الشوكولاتة السائلة اللذيذة التي تتدفق عند قطعها، تقدم مع كرة من جيلاتو فانيليا مدغشقر الفاخر.",
    frenchDescription: "Un gâteau au chocolat chaud décadent avec un cœur de chocolat fondant coulant, servi avec une boule de gelato à la vanille de Madagascar.",
    price: "50 DH",
    category: "midnights",
    tag: "Sweet Indulgence",
    frenchTag: "Douce Tentation",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600"
  },

  // BEVERAGES
  {
    id: "b1",
    name: "Fresh Avocado & Almond Shake",
    arabicName: "عصير الأفوكادو باللوز والتمور",
    frenchName: "Milk-shake Avocat & Amandes",
    description: "A creamy, traditional Moroccan beachside favorite blended with fresh rich avocados, organic milk, local honey, premium dates, and crushed sweet almonds.",
    arabicDescription: "مشروب مغربي تقليدي كريمي مفضل على الشاطئ، يمزج بين الأفوكادو الطازج، حليب عضوي، عسل محلي، تمور فاخرة، ولوز حلو مطحون.",
    frenchDescription: "Un favori crémeux traditionnel des plages marocaines mélangé avec des avocats riches, du lait bio, du miel local, des dattes de qualité supérieure et des amandes douces concassées.",
    price: "45 DH",
    category: "beverages",
    tag: "Local Favorite",
    frenchTag: "Favori Local",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "b2",
    name: "Traditional Moroccan Mint Tea",
    arabicName: "براد شاي مغربي بالنعناع والزهر",
    frenchName: "Thé à la Menthe Marocain Traditionnel",
    description: "The ultimate Moroccan welcoming ritual: high-quality green tea leaves brewed with plenty of fresh spearmint and just a touch of sweet orange blossom water.",
    arabicDescription: "طقس الترحيب المغربي الأصيل: أوراق شاي أخضر ممتازة مخمرة مع وفرة من النعناع الطازج ونكهة خفيفة من ماء زهر البرتقال العطر.",
    frenchDescription: "Le rituel d'accueil marocain par excellence : feuilles de thé vert infusées avec de la menthe fraîche et un soupçon d'eau de fleur d'oranger.",
    price: "30 DH",
    category: "beverages",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "b3",
    name: "Iced Caramel Macchiato",
    arabicName: "آيس كراميل ماكياتو",
    frenchName: "Macchiato Glacé au Caramel",
    description: "A chilled refreshing blend of rich double espresso, cold creamy milk, sweet vanilla syrup, and a generous buttery caramel drizzle over ice.",
    arabicDescription: "مزيج منعش ومبرد من الإسبريسو المزدوج الغني، الحليب البارد الكريمي، شراب الفانيليا الحلو، مع تزيين سخي بصلصة الكراميل الغنية فوق الثلج.",
    frenchDescription: "Un mélange rafraîchissant de double expresso riche, lait crémeux froid, sirop de vanille et un filet généreux de caramel fondant sur glace.",
    price: "38 DH",
    category: "beverages",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=600"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Hassan Alami",
    location: "Tanger, Morocco",
    rating: 5,
    date: "July 2026",
    title: "Best Breakfast with a Beach View",
    frenchTitle: "Meilleur petit déjeuner avec vue sur la plage",
    comment: "Café Tropea is my favorite spot on the Tangier Corniche. The breakfasts are generous and delicious, especially the fresh orange juice and traditional Moroccan breakfast options. The view of the beach and the sea is absolutely stunning, and the staff are always welcoming.",
    arabicComment: "مقهى تروبيا هو مكاني المفضل في كورنيش طنجة. وجبات الفطور سخية ولذيثة، خاصة عصير البرتقال الطازج وخيارات الفطور المغربي التقليدي. الإطلالة على الشاطئ والبحر مذهلة حقاً، وطاقم العمل يرحب بك دائماً بابتسامة.",
    frenchComment: "Le Café Tropea est mon endroit préféré sur la corniche de Tanger. Les petits déjeuners sont copieux et délicieux, en particulier le jus d'orange frais et les options traditionnelles. La vue sur la mer est incroyable et le personnel est accueillant.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    source: "Google",
    likes: 42
  },
  {
    id: "r2",
    author: "Sarah Dupont",
    location: "Paris, France",
    rating: 5,
    date: "June 2026",
    title: "Amazing Ice Cream and Sunset View",
    frenchTitle: "Excellentes glaces et vue sur le coucher de soleil",
    comment: "We stopped here for dessert after a walk on the beach. The ice creams (glaces) are outstanding with so many flavors, and the crêpes are delicious. Sitting on the outdoor terrace as the sun goes down over the Tangier bay is a memory I will cherish.",
    arabicComment: "توقفنا هنا لتناول الحلويات بعد نزهة على الشاطئ. الآيس كريم (الجيلاتو) ممتاز وبنكهات متعددة، والكريب لذيذ جداً. الجلوس في الشرفة الخارجية بينما تغرب الشمس على خليج طنجة هي ذكرى سأعتز بها دائماً.",
    frenchComment: "Nous nous sommes arrêtés ici pour le dessert après une promenade sur la plage. Les glaces artisanales sont exceptionnelles avec beaucoup de saveurs, et les crêpes sont délicieuses. Regarder le coucher de soleil sur la baie est un moment magique.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    source: "TripAdvisor",
    likes: 19
  },
  {
    id: "r3",
    author: "Yassine Mansouri",
    location: "Casablanca, Morocco",
    rating: 5,
    date: "May 2026",
    title: "Perfect Place to Relax on Boulevard Mohammed VI",
    frenchTitle: "Endroit parfait pour se détendre sur l'Avenue Mohammed VI",
    comment: "Excellent cafe right on Boulevard Mohammed VI. The coffee is high quality, the paninis are tasty for a quick lunch, and the family-friendly atmosphere is very pleasant. Highly recommended for anyone visiting Tanger who wants to enjoy the seaside breeze.",
    arabicComment: "مقهى ممتاز يقع مباشرة في شارع محمد السادس. القهوة عالية الجودة، البانيني لذيذ لوجبة غداء سريعة، والأجواء العائلية مريحة للغاية. أنصح به بشدة لكل من يزور طنجة ويريد الاستمتاع بنسيم البحر.",
    frenchComment: "Excellent café situé sur l'Avenue Mohammed VI. Le café est de grande qualité, les paninis sont parfaits pour un gâteau rapide et l'ambiance familiale est agréable. Je recommande vivement pour profiter de la brise marine.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    source: "Google",
    likes: 31
  },
  {
    id: "r4",
    author: "Sophia L.",
    location: "London, UK",
    rating: 4.8,
    date: "July 2026",
    title: "Beautiful Spot, Great Coffee",
    frenchTitle: "Superbe endroit, excellent café",
    comment: "Perfect location on the promenade. We sat outside watching the beach activity while sipping excellent espresso and fresh avocado juice. Clean, modern, and reasonably priced. A great place to unwind after exploring the city.",
    arabicComment: "موقع مثالي على الممشى الساحلي. جلسنا في الخارج نشاهد حركة الشاطئ ونرتشف قهوة إسبريسو ممتازة وعصير أفوكادو طازج. المكان نظيف، عصري، وأسعاره مناسبة جداً. مكان رائع للاسترخاء بعد استكشاف المدينة.",
    frenchComment: "Emplacement parfait sur la promenade. Nous nous sommes assis dehors en regardant la plage tout en sirotant un excellent expresso et un jus d'avocat frais. Propre, moderne et à prix raisonnable. Un endroit idéal pour décompresser.",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
    source: "TripAdvisor",
    likes: 25
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Seaside Breakfast Spread",
    arabicTitle: "مائدة فطور ساحلية",
    frenchTitle: "Assortiment de petit-déjeuner au bord de l'eau",
    category: "culinary",
    image: "https://images.unsplash.com/photo-1496048927445-0df6f5685611?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    description: "Start your morning with our signature Moroccan breakfast and freshly squeezed juices overlooking the waves.",
    frenchDescription: "Commencez votre journée avec notre petit-déjeuner marocain signature et des jus de fruits frais en contemplant les vagues."
  },
  {
    id: "g2",
    title: "Modern Shoreline Vibe",
    arabicTitle: "الأجواء العصرية للكورنيش",
    frenchTitle: "Ambiance côtière moderne",
    category: "space",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    description: "A breezy, sun-drenched coastal terrace designed to connect you directly with the soothing seaside air.",
    frenchDescription: "Une terrasse côtière baignée de soleil conçue pour vous connecter directement à l'air apaisant de la mer."
  },
  {
    id: "g3",
    title: "Italian Espresso Craft",
    arabicTitle: "إعداد قهوة إسبريسو ممتازة",
    frenchTitle: "Art de l'expresso italien",
    category: "moments",
    image: "https://images.unsplash.com/photo-1517244681291-7d93b88a5042?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    description: "Our baristas take extreme pride in pulling perfect, aromatic espresso shots all day long.",
    frenchDescription: "Nos baristas sont fiers de préparer des expressos parfaits et aromatiques tout au long de la journée."
  },
  {
    id: "g4",
    title: "Golden Hour on Tangier Beach",
    arabicTitle: "سحر غروب الشمس على شاطئ طنجة",
    frenchTitle: "L'heure dorée sur la plage de Tanger",
    category: "space",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    description: "Relax on our seafront terrace as the beautiful Moroccan sun dips down, coloring the entire bay.",
    frenchDescription: "Détendez-vous sur notre terrasse face à la mer pendant que le soleil marocain se couche en colorant toute la baie."
  },
  {
    id: "g5",
    title: "Artisanal Gelato Selection",
    arabicTitle: "تشكيلة جيلاتو تروبيا الشهيرة",
    frenchTitle: "Sélection de glaces artisanales",
    category: "culinary",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    description: "Indulge in our real handcrafted Italian gelato made daily with organic fruits and premium nuts.",
    frenchDescription: "Laissez-vous tenter par notre gelato italien artisanal fait maison avec des fruits frais et des ingrédients de choix."
  },
  {
    id: "g6",
    title: "Seaside Relaxation",
    arabicTitle: "لحظات مريحة أمام البحر",
    frenchTitle: "Détente en bord de mer",
    category: "moments",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    description: "Cool down with our natural, freshly prepared tropical fruit shakes and fresh avocado juices.",
    frenchDescription: "Rafraîchissez-vous avec nos milk-shakes naturels aux fruits tropicaux préparés à la demande."
  }
];
