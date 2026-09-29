export const products = [
  {
    id: "prod_001",
    name: "Classic Scrapbook",
    slug: "classic-scrapbook",
    category: "scrapbooks",
    categoryName: "Scrapbooks",
    description: "A beautifully handcrafted 10-page scrapbook designed to hold your most treasured memories. Bound in premium materials with intricate detailing.",
    shortDescription: "Turn your favorite memories into a beautiful story.",
    price: 699,
    originalPrice: 799,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1588344605912-70b138e8ec43?auto=format&fit=crop&q=80&w=800"
    ],
    featured: true,
    bestseller: true,
    available: true,
    stock: 10,
    rating: 4.8,
    reviewCount: 24,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["birthday", "memory", "personalized"],
    customizationOptions: [
      { id: "opt_01", name: "Name personalization", price: 0 },
      { id: "opt_02", name: "Photo upload", price: 0 },
      { id: "opt_03", name: "Custom message", price: 0 }
    ]
  },
  {
    id: "prod_002",
    name: "Premium Scrapbook",
    slug: "premium-scrapbook",
    category: "scrapbooks",
    categoryName: "Scrapbooks",
    description: "Luxurious scrapbook with premium materials and more pages to keep your memories safe forever.",
    shortDescription: "Luxurious scrapbook for your best moments.",
    price: 999,
    originalPrice: 1299,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1505672678657-cc7037095e60?auto=format&fit=crop&q=80&w=800"
    ],
    featured: false,
    bestseller: false,
    available: true,
    stock: 5,
    rating: 4.9,
    reviewCount: 15,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["premium", "anniversary", "wedding"],
    customizationOptions: []
  },
  {
    id: "prod_003",
    name: "4-Side Explosion Box",
    slug: "4-side-explosion-box",
    category: "explosion-boxes",
    categoryName: "Explosion Boxes",
    description: "A 4-sided surprise filled with memories that unfolds to reveal your photos and messages.",
    shortDescription: "A 4-sided surprise filled with memories.",
    price: 499,
    originalPrice: 599,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=800"
    ],
    featured: true,
    bestseller: false,
    available: true,
    stock: 20,
    rating: 4.6,
    reviewCount: 40,
    preparationDays: 15,
    customizationAvailable: true,
    tags: ["surprise", "birthday", "gift"],
    customizationOptions: []
  },
  {
    id: "prod_004",
    name: "6-Side Explosion Box",
    slug: "6-side-explosion-box",
    category: "explosion-boxes",
    categoryName: "Explosion Boxes",
    description: "A complex 6-sided explosion box for an ultimate surprise experience with multiple hidden layers.",
    shortDescription: "A 6-sided complex explosion box.",
    price: 699,
    originalPrice: null,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=800"
    ],
    featured: true,
    bestseller: true,
    available: true,
    stock: 12,
    rating: 4.9,
    reviewCount: 56,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["surprise", "anniversary", "complex"],
    customizationOptions: []
  },
  {
    id: "prod_005",
    name: "Birthday Hamper",
    slug: "birthday-hamper",
    category: "hamper-boxes",
    categoryName: "Hamper Boxes",
    description: "The perfect personalized birthday hamper containing chocolates, a mini scrapbook, and custom messages.",
    shortDescription: "The perfect personalized birthday hamper.",
    price: 899,
    originalPrice: 999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
    ],
    featured: true,
    bestseller: true,
    available: true,
    stock: 8,
    rating: 4.7,
    reviewCount: 32,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["birthday", "hamper", "chocolates"],
    customizationOptions: []
  },
  {
    id: "prod_006",
    name: "Luxury Hamper",
    slug: "luxury-hamper",
    category: "hamper-boxes",
    categoryName: "Hamper Boxes",
    description: "An exquisite customized hamper box filled with assorted premium chocolates, personalized notes, and luxury self-care items.",
    shortDescription: "Our most premium gift collection.",
    price: 2499,
    originalPrice: 2999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&q=80&w=800"
    ],
    featured: false,
    bestseller: false,
    available: true,
    stock: 3,
    rating: 5.0,
    reviewCount: 8,
    preparationDays: 25,
    customizationAvailable: true,
  },
  {
    id: "prod_007",
    name: "Personalized Photo Frame",
    slug: "personalized-photo-frame",
    category: "photo-gifts",
    categoryName: "Photo Gifts",
    description: "A beautiful personalized photo frame designed to turn your favorite memory into a timeless keepsake.",
    shortDescription: "Turn your favorite memory into a timeless keepsake.",
    price: 499,
    originalPrice: 599,
    currency: "INR",
    images: [
      "/images/products/personalized-photo-frame-1.jpg",
      "/images/products/personalized-photo-frame-2.jpg"
    ],
    featured: true,
    bestseller: true,
    available: true,
    stock: 20,
    rating: 4.8,
    reviewCount: 42,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["photo", "personalized", "memory", "gift", "birthday", "anniversary"],
    customizationOptions: [
      { id: "opt_f1", name: "Photo upload", price: 0 },
      { id: "opt_f2", name: "Custom message", price: 0 }
    ]
  },
  {
    id: "prod_008",
    name: "Premium Photo Frame",
    slug: "premium-photo-frame",
    category: "photo-gifts",
    categoryName: "Photo Gifts",
    description: "A premium personalized frame designed to beautifully showcase a special memory.",
    shortDescription: "A premium personalized frame for a special memory.",
    price: 799,
    originalPrice: 999,
    currency: "INR",
    images: [
      "/images/products/premium-photo-frame-1.jpg"
    ],
    featured: false,
    bestseller: false,
    available: true,
    stock: 15,
    rating: 4.9,
    reviewCount: 28,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["photo", "premium", "personalized", "memory", "anniversary", "couple"],
    customizationOptions: [
      { id: "opt_f1", name: "Photo upload", price: 0 },
      { id: "opt_f2", name: "Custom message", price: 0 },
      { id: "opt_f3", name: "Premium Frame Style", price: 100 }
    ]
  },
  {
    id: "prod_009",
    name: "Name Wallet",
    slug: "name-wallet",
    category: "personalized-accessories",
    categoryName: "Personalized Accessories",
    description: "A stylish personalized wallet customized with a name or initials, making it a thoughtful everyday gift.",
    shortDescription: "A stylish personalized wallet customized with a name or initials.",
    price: 599,
    originalPrice: 799,
    currency: "INR",
    images: [
      "/images/products/name-wallet-1.jpg"
    ],
    featured: false,
    bestseller: false,
    available: true,
    stock: 30,
    rating: 4.7,
    reviewCount: 55,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["wallet", "name", "personalized", "men", "gift", "birthday"],
    customizationOptions: [
      { id: "opt_w1", name: "Name / Initials", price: 50 },
      { id: "opt_w2", name: "Premium Gift Packaging", price: 100 },
      { id: "opt_w3", name: "Custom Message Card", price: 50 }
    ]
  },
  {
    id: "prod_010",
    name: "Customized Bouquet",
    slug: "customized-bouquet",
    category: "custom-gifts",
    categoryName: "Custom Gifts",
    description: "A beautiful customized bouquet thoughtfully designed for birthdays, anniversaries, celebrations, and special moments.",
    shortDescription: "A beautiful customized bouquet for special moments.",
    price: 699,
    originalPrice: 899,
    currency: "INR",
    images: [
      "/images/products/customized-bouquet-1.jpg"
    ],
    featured: false,
    bestseller: true,
    available: true,
    stock: 25,
    rating: 4.8,
    reviewCount: 88,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["bouquet", "flowers", "birthday", "anniversary", "romantic", "custom"],
    customizationOptions: [
      { id: "opt_b1", name: "Premium Wrapping", price: 100 },
      { id: "opt_b2", name: "Custom Name Card", price: 50 },
      { id: "opt_b3", name: "Extra Decorative Elements", price: 100 }
    ]
  },
  {
    id: "prod_011",
    name: "Premium Customized Bouquet",
    slug: "premium-customized-bouquet",
    category: "custom-gifts",
    categoryName: "Custom Gifts",
    description: "A premium handcrafted bouquet customized with beautiful details to make your special occasion unforgettable.",
    shortDescription: "A premium handcrafted customized bouquet.",
    price: 999,
    originalPrice: 1299,
    currency: "INR",
    images: [
      "/images/products/premium-customized-bouquet-1.jpg"
    ],
    featured: true,
    bestseller: false,
    available: true,
    stock: 10,
    rating: 5.0,
    reviewCount: 32,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["bouquet", "premium", "romantic", "birthday", "anniversary", "couple", "custom"],
    customizationOptions: [
      { id: "opt_pb1", name: "Custom Name Card", price: 50 },
      { id: "opt_pb2", name: "Extra Decorative Elements", price: 100 }
    ]
  },
  {
    id: "prod_012",
    name: "Customized Gift Hamper",
    slug: "customized-gift-hamper",
    category: "hamper-boxes",
    categoryName: "Hamper Boxes",
    description: "A personalized gift hamper filled with carefully selected items and customized specially for your loved one.",
    shortDescription: "A personalized gift hamper for your loved one.",
    price: 899,
    originalPrice: 1099,
    currency: "INR",
    images: [
      "/images/products/customized-gift-hamper-1.jpg"
    ],
    featured: false,
    bestseller: true,
    available: true,
    stock: 15,
    rating: 4.9,
    reviewCount: 64,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["hamper", "personalized", "birthday", "gift", "custom", "celebration"],
    customizationOptions: [
      { id: "opt_h1", name: "Extra Photo", price: 50 },
      { id: "opt_h2", name: "Premium Decoration", price: 150 },
      { id: "opt_h3", name: "Custom Message Card", price: 50 },
      { id: "opt_h4", name: "Additional Gift Item", price: 100 }
    ]
  },
  {
    id: "prod_013",
    name: "Premium Customized Gift Hamper",
    slug: "premium-customized-gift-hamper",
    category: "hamper-boxes",
    categoryName: "Hamper Boxes",
    description: "A premium customized hamper combining thoughtful gifts, elegant presentation, and personal touches.",
    shortDescription: "A premium customized hamper.",
    price: 1499,
    originalPrice: 1999,
    currency: "INR",
    images: [
      "/images/products/premium-customized-gift-hamper-1.jpg"
    ],
    featured: true,
    bestseller: false,
    available: true,
    stock: 8,
    rating: 5.0,
    reviewCount: 22,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["hamper", "premium", "personalized", "luxury", "birthday", "anniversary", "couple"],
    customizationOptions: [
      { id: "opt_ph1", name: "Extra Photo", price: 50 },
      { id: "opt_ph2", name: "Custom Message Card", price: 50 },
      { id: "opt_ph3", name: "Additional Gift Item", price: 100 }
    ]
  },
  {
    id: "prod_014",
    name: "Nikkah Signature Frame",
    slug: "nikkah-signature-frame",
    category: "wedding-nikkah-gifts",
    categoryName: "Wedding & Nikkah Gifts",
    description: "A beautifully personalized Nikkah signature frame created to preserve the memories of a beautiful beginning.",
    shortDescription: "A beautifully personalized Nikkah signature frame.",
    price: 999,
    originalPrice: 1299,
    currency: "INR",
    images: [
      "/images/products/nikkah-signature-frame-1.jpg"
    ],
    featured: false,
    bestseller: true,
    available: true,
    stock: 12,
    rating: 4.8,
    reviewCount: 37,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["nikkah", "wedding", "couple", "islamic", "signature", "marriage", "personalized"],
    customizationOptions: [
      { id: "opt_n1", name: "Premium Frame", price: 200 },
      { id: "opt_n2", name: "Custom Arabic Text", price: 100 },
      { id: "opt_n3", name: "Extra Decorative Elements", price: 150 },
      { id: "opt_n4", name: "Premium Packaging", price: 100 }
    ]
  },
  {
    id: "prod_015",
    name: "Premium Nikkah Signature Frame",
    slug: "premium-nikkah-signature-frame",
    category: "wedding-nikkah-gifts",
    categoryName: "Wedding & Nikkah Gifts",
    description: "A premium Nikkah signature frame designed with elegant personalized details to celebrate a beautiful union.",
    shortDescription: "A premium Nikkah signature frame.",
    price: 1499,
    originalPrice: 1999,
    currency: "INR",
    images: [
      "/images/products/premium-nikkah-signature-frame-1.jpg"
    ],
    featured: true,
    bestseller: false,
    available: true,
    stock: 5,
    rating: 5.0,
    reviewCount: 19,
    preparationDays: 20,
    customizationAvailable: true,
    tags: ["nikkah", "wedding", "premium", "couple", "islamic", "signature", "marriage", "luxury"],
    customizationOptions: [
      { id: "opt_pn1", name: "Custom Arabic Text", price: 100 },
      { id: "opt_pn2", name: "Extra Decorative Elements", price: 150 },
      { id: "opt_pn3", name: "Premium Packaging", price: 100 }
    ]
  }
];

export const categories = [
  { id: "cat_1", slug: "scrapbooks", name: "Scrapbooks", description: "Turn your memories into a beautiful story." },
  { id: "cat_2", slug: "explosion-boxes", name: "Explosion Boxes", description: "Open a surprise filled with memories." },
  { id: "cat_3", slug: "hamper-boxes", name: "Hamper Boxes", description: "A thoughtful collection made just for them." },
  { id: "cat_4", slug: "customized-greetings", name: "Customized Greetings", description: "Say something meaningful in your own way." },
  { id: "cat_5", slug: "photo-gifts", name: "Photo Gifts", description: "Make your favorite memories last forever." },
  { id: "cat_6", slug: "personalized-accessories", name: "Personalized Accessories", description: "Small touches that mean a lot." },
  { id: "cat_7", slug: "custom-gifts", name: "Custom Gifts", description: "Have an idea? Let's create it together." },
  { id: "wedding-nikkah-gifts", slug: "wedding-nikkah-gifts", name: "Wedding & Nikkah Gifts", description: "Beautifully personalized gifts created to celebrate love, marriage, and unforgettable beginnings." }
];

