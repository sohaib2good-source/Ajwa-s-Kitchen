export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  quantityStr: string;
  image: string;
  available: boolean;
}

export const products: Product[] = [
  {
    id: "chicken-shami-kebab",
    name: "Chicken Shami Kebab",
    description: "Tender, flavourful Pakistani-style chicken shami kebabs prepared fresh to order.",
    price: "[Price]",
    quantityStr: "per 12 pieces",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Shami_Kebab.jpg", // Using a relevant placeholder
    available: true
  },
  {
    id: "kebab",
    name: "Classic Kebab",
    description: "Deliciously seasoned homemade kebabs with a satisfying savoury flavour.",
    price: "[Price]",
    quantityStr: "per 12 pieces",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Pakistani_Food_Beef_Kabobs.jpg", // Placeholder
    available: true
  },
  {
    id: "cutlets",
    name: "Cutlets",
    description: "Crispy, golden and flavourful homemade potato cutlets.",
    price: "[Price]",
    quantityStr: "per 12 pieces",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Aloo_Tikki_served_with_chutneys.jpg",
    available: true
  },
  {
    id: "samosa",
    name: "Crispy Samosas",
    description: "Crispy savoury samosas, perfect for tea time, gatherings and snacks.",
    price: "[Price]",
    quantityStr: "per 12 pieces",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg", // Placeholder
    available: true
  },
  {
    id: "nuggets",
    name: "Chicken Nuggets",
    description: "Crispy bite-sized nuggets loved by kids and adults alike.",
    price: "[Price]",
    quantityStr: "per 12 pieces",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800", // Placeholder
    available: true
  },
  {
    id: "savoury-patties",
    name: "Savoury Patties",
    description: "Flaky, delicious savoury patties prepared fresh for every order.",
    price: "[Price]",
    quantityStr: "per 6 pieces",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=800", // Placeholder
    available: true
  }
];
