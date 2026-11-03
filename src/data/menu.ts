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

/** Poster booking line for the Diwali pre-order campaign. */
export const DIWALI_PHONE = "9994030333";
export const DIWALI_PHONE_DISPLAY = "99940 30333";

export type DiwaliOffer = {
  id: string;
  kind: "combo" | "bucket";
  title: string;
  price: number;
  serves: string;
  items: string[];
};

export const diwaliOffers: DiwaliOffer[] = [
  {
    id: "chicken-combo",
    kind: "combo",
    title: "Chicken Biriyani Combo",
    price: 1999,
    serves: "For 8 – 10 persons",
    items: [
      "1 Padi Chicken Biriyani",
      "8 Egg",
      "1/2 kg Chicken 65",
      "1/4 kg Bread Halwa",
      "1/4 kg Chettinadu Chicken Gravy",
    ],
  },
  {
    id: "mutton-combo",
    kind: "combo",
    title: "Mutton Biriyani Combo",
    price: 3250,
    serves: "For 8 – 10 persons",
    items: [
      "1 Padi Mutton Biriyani",
      "8 Egg",
      "1/2 kg Chicken 65",
      "1/4 kg Bread Halwa",
      "1/4 kg Chettinadu Chicken Gravy",
    ],
  },
  {
    id: "chicken-bucket-599",
    kind: "bucket",
    title: "Chicken Biriyani \u2014 599 Bucket",
    price: 599,
    serves: "For 3 to 4 persons",
    items: ["3 Egg", "100 g Chicken 65", "100 g Bread Halwa"],
  },
  {
    id: "chicken-bucket-899",
    kind: "bucket",
    title: "Chicken Biriyani \u2014 899 Bucket",
    price: 899,
    serves: "For 5 to 6 persons",
    items: ["5 Egg", "200 g Chicken 65", "200 g Bread Halwa"],
  },
  {
    id: "mutton-bucket-899",
    kind: "bucket",
    title: "Mutton Biriyani \u2014 899 Bucket",
    price: 899,
    serves: "For 3 to 4 persons",
    items: ["3 Egg", "100 g Chicken 65", "100 g Bread Halwa"],
  },
];

export const diwaliCampaign = {
  title: "Diwali Special Pre-Order Offer",
  tamil: "தீபாவளி சிறப்பு முன்பதிவு",
  preOrdersOnly: true,
  serveDates: [
    { date: "07.11", day: "Saturday" },
    { date: "08.11", day: "Sunday" },
    { date: "09.11", day: "Monday" },
  ],
  doubleHalwaUntilLabel: "06.11",
  doubleHalwaNote:
    "Book before 06.11 and make full payment to receive DOUBLE the Bread Halwa listed on the menu",
} as const;

export const diwaliWhatsApp = (offer?: DiwaliOffer) => {
  const body = offer
    ? `Hi Kudil Biriyani! I'd like to pre-order the Diwali Special ${offer.title} — ${formatINR(offer.price)} (${offer.serves}). Includes: ${offer.items.join(", ")}.`
    : "Hi Kudil Biriyani! I'd like to pre-order a Diwali Special combo.";
  return `https://wa.me/91${DIWALI_PHONE}?text=${encodeURIComponent(body)}`;
};
