export type Pack = {
  tier: "Budget" | "Premium" | "Luxury";
  rice: string;
  price: number;
  pieces: string;
};

export type Category = {
  id: "chicken" | "mutton";
  label: string;
  tamil: string;
  image: string;
  caption: string;
  packs: Pack[];
};

export const PHONE = "7708097333";
export const PHONE_DISPLAY = "77080 97333";
export const EMAIL = "kudilbiriyani.trichy@gmail.com";
export const WHATSAPP = `https://wa.me/91${PHONE}?text=${encodeURIComponent(
  "Hi Kudil Biriyani! I'd like to place an order.",
)}`;

export const QUANTITY = "1 Padi (approx. 9 servings)";
export const ACCOMPANIMENTS = "Thalcha & Onion Raitha";

export const categories: Category[] = [
  {
    id: "chicken",
    label: "Chicken Biriyani",
    tamil: "சிக்கன் பிரியாணி",
    image: "/images/chicken.png",
    caption: "Authentic Seeraga Samba Chicken Biriyani",
    packs: [
      { tier: "Budget", rice: "Thulasi Gold", price: 1500, pieces: "10 pieces (130g each)" },
      { tier: "Premium", rice: "Kalyana Biriyani", price: 1700, pieces: "10 pieces (130g each)" },
      { tier: "Luxury", rice: "Pure Seeraga Samba", price: 2000, pieces: "10 pieces (130g each)" },
    ],
  },
  {
    id: "mutton",
    label: "Mutton Biriyani",
    tamil: "மட்டன் பிரியாணி",
    image: "/images/mutton.png",
    caption: "Authentic Seeraga Samba Mutton Biriyani",
    packs: [
      { tier: "Budget", rice: "Thulasi Gold", price: 2750, pieces: "Mutton pieces (1.5 kg)" },
      { tier: "Premium", rice: "Kalyana Biriyani", price: 3000, pieces: "Mutton pieces (1.5 kg)" },
      { tier: "Luxury", rice: "Pure Seeraga Samba", price: 3600, pieces: "Mutton pieces (1.5 kg)" },
    ],
  },
];

export const additionalItems = [
  { name: "Chicken 65", qty: "1 kg", price: 550 },
  { name: "Chettinadu Chicken Gravy", qty: "1 kg", price: 600 },
  { name: "Pepper Chicken Gravy", qty: "1 kg", price: 650 },
];

export const desserts = [
  { name: "Kesari", qty: "1 kg", price: 300 },
  { name: "Bread Halwa", qty: "1 kg", price: 400 },
  { name: "Firni", qty: "1 Litre", price: 600 },
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
