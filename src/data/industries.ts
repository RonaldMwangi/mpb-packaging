import tea from "../assets/Images/industries/Tea, Coffee & Beverages.png";
import snacks from "../assets/Images/industries/Snacks & Confectionery.png";
import bakery from "../assets/Images/industries/Backery & Backed Goods.png";
import grains from "../assets/Images/industries/Grains, Cerials & Dry Foods.png";
import industrial from "../assets/Images/industries/Industrial & Manufacturing.png";
import care from "../assets/Images/industries/Home & Personal Care.png";

export interface Industry { id: number; title: string; image: string; }

export const industries: Industry[] = [
  { id: 1, title: "Tea, Coffee & Beverages", image: tea },
  { id: 2, title: "Snacks & Confectionery", image: snacks },
  { id: 3, title: "Bakery & Baked Goods", image: bakery },
  { id: 4, title: "Grains, Cereals & Dry Foods", image: grains },
  { id: 5, title: "Industrial & Manufacturing", image: industrial },
  { id: 6, title: "Home & Personal Care", image: care },
];
