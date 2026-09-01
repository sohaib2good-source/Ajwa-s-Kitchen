export interface PriceTier {
  quantity: string;
  price: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  quantityStr: string;
  priceTiers?: PriceTier[];
  image: string;
  available: boolean;
  category?: string;
}

export const products: Product[] = [
  {
    id: "chicken-shami-kebab",
    name: "Chicken Shami Kebab",
    description: "Tender, flavourful Pakistani-style chicken shami kebabs prepared fresh to order.",
    price: "Rs. 650",
    quantityStr: "12 pieces",
    priceTiers: [
      { quantity: "12 pieces", price: "Rs. 650" },
      { quantity: "24 pieces", price: "Rs. 1,250" }
    ],
    image: "/chicken-shami.webp",
    available: true,
    category: "kebabs"
  },
  {
    id: "chicken-gola-kebab",
    name: "Chicken Gola Kebab",
    description: "Juicy, melt-in-the-mouth seasoned homemade chicken gola kebabs prepared fresh to order.",
    price: "Rs. 750",
    quantityStr: "6 pcs",
    priceTiers: [
      { quantity: "6 pcs", price: "Rs. 750" },
      { quantity: "12 pcs", price: "Rs. 1,450" },
      { quantity: "24 pcs", price: "Rs. 2,800" }
    ],
    image: "/golla-kebab.webp",
    available: true,
    category: "kebabs"
  },
  {
    id: "chicken-potato-cutlets",
    name: "Chicken Potato Cutlets",
    description: "Crispy, golden and flavourful homemade chicken potato cutlets.",
    price: "Rs. 650",
    quantityStr: "12 pieces",
    priceTiers: [
      { quantity: "12 pieces", price: "Rs. 650" },
      { quantity: "24 pieces", price: "Rs. 1,200" }
    ],
    image: "/chicken-cutlets.webp",
    available: true,
    category: "cutlets-patties"
  },
  {
    id: "mini-aloo-samosa",
    name: "Mini Aloo Samosa",
    description: "Crispy, golden mini savoury aloo samosas, perfect for tea time, gatherings and snacks.",
    price: "Rs. 500",
    quantityStr: "12 pieces",
    priceTiers: [
      { quantity: "12 pieces", price: "Rs. 500" },
      { quantity: "24 pieces", price: "Rs. 950" }
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
    available: true,
    category: "samosas"
  },
  {
    id: "cheese-samosa",
    name: "Cheese Samosa",
    description: "Crispy golden triangular pastries filled with a rich, gooey melted cheese blend.",
    price: "Rs. 950",
    quantityStr: "12 pieces",
    priceTiers: [
      { quantity: "12 pieces", price: "Rs. 950" },
      { quantity: "24 pieces", price: "Rs. 1,750" }
    ],
    image: "/cheese-samosa.webp",
    available: true,
    category: "samosas"
  },
  {
    id: "chicken-samosa",
    name: "Chicken Samosa",
    description: "Crispy pastry loaded with finely shredded, deliciously seasoned savoury chicken filling.",
    price: "Rs. 850",
    quantityStr: "12 pieces",
    priceTiers: [
      { quantity: "12 pieces", price: "Rs. 850" },
      { quantity: "24 pieces", price: "Rs. 1,250" }
    ],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800",
    available: true,
    category: "samosas"
  },
  {
    id: "arabian-samosa",
    name: "Arabian Samosa",
    description: "Fragrant Arabian-inspired spiced savory filling encased in a crisp, delicate golden wrapper.",
    price: "Rs. 550",
    quantityStr: "12 pieces",
    priceTiers: [
      { quantity: "12 pieces", price: "Rs. 550" },
      { quantity: "24 pieces", price: "Rs. 1,000" }
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
    available: true,
    category: "samosas"
  },
  {
    id: "chicken-pattie",
    name: "Chicken Pattie",
    description: "Flaky, buttery bakery-style puff pastry stuffed with savoury spiced chicken filling.",
    price: "Rs. 900",
    quantityStr: "12 pieces",
    priceTiers: [
      { quantity: "12 pieces", price: "Rs. 900" },
      { quantity: "24 pieces", price: "Rs. 1,800" }
    ],
    image: "/chicken-pattie.webp",
    available: true,
    category: "cutlets-patties"
  },
  {
    id: "chicken-spring-rolls",
    name: "Chicken Spring Rolls",
    description: "Crisp golden handmade rolls packed with seasoned shredded chicken and fresh vegetables.",
    price: "Rs. 800",
    quantityStr: "12 pieces",
    priceTiers: [
      { quantity: "12 pieces", price: "Rs. 800" },
      { quantity: "24 pieces", price: "Rs. 1,550" }
    ],
    image: "/spring-rolls.webp",
    available: true,
    category: "rolls-nuggets"
  },
  {
    id: "chicken-box-pattie",
    name: "Chicken Box Pattie",
    description: "Crispy breaded square parcel patties loaded with creamy, spicy chicken filling.",
    price: "Rs. 1,050",
    quantityStr: "12 pieces",
    priceTiers: [
      { quantity: "12 pieces", price: "Rs. 1,050" },
      { quantity: "24 pieces", price: "Rs. 2,000" }
    ],
    image: "/chicken-box-pattie.webp",
    available: true,
    category: "cutlets-patties"
  },
  {
    id: "nuggets",
    name: "Chicken Nuggets",
    description: "Crispy bite-sized nuggets loved by kids and adults alike.",
    price: "Rs. 650",
    quantityStr: "12 pieces",
    priceTiers: [
      { quantity: "12 pieces", price: "Rs. 650" },
      { quantity: "24 pieces", price: "Rs. 1,250" }
    ],
    image: "/chicken-nuggets.webp",
    available: true,
    category: "rolls-nuggets"
  }
];
