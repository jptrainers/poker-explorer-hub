import { PokerRoom } from "@/components/PokerRoomCard";

export const pokerRooms: PokerRoom[] = [
  {
    id: "1",
    name: "Aria Poker Room",
    city: "Las Vegas",
    country: "USA",
    rating: 5,
    stakes: "$1/$3 - $25/$50",
    games: ["Texas Hold'em", "Omaha", "Mixed Games"],
    hours: "24/7",
    tables: 24,
    featured: true,
    latitude: 36.1062,
    longitude: -115.1762
  },
  {
    id: "2", 
    name: "Casino de Monte-Carlo",
    city: "Monaco",
    country: "Monaco",
    rating: 5,
    stakes: "€5/€10 - €50/€100",
    games: ["Texas Hold'em", "Stud", "Tournament"],
    hours: "2:00 PM - 4:00 AM",
    tables: 12,
    featured: true,
    latitude: 43.7384,
    longitude: 7.4246
  },
  {
    id: "3",
    name: "Crown Casino Melbourne",
    city: "Melbourne", 
    country: "Australia",
    rating: 4,
    stakes: "A$1/A$2 - A$10/A$20",
    games: ["Texas Hold'em", "Omaha", "PLO"],
    hours: "24/7",
    tables: 40,
    latitude: -37.8226,
    longitude: 144.9577
  },
  {
    id: "4",
    name: "Casino Barcelona",
    city: "Barcelona",
    country: "Spain", 
    rating: 4,
    stakes: "€1/€2 - €5/€10",
    games: ["Texas Hold'em", "Tournament"],
    hours: "4:00 PM - 6:00 AM",
    tables: 18,
    latitude: 41.3851,
    longitude: 2.1734
  },
  {
    id: "5",
    name: "Bellagio Poker Room",
    city: "Las Vegas",
    country: "USA",
    rating: 5,
    stakes: "$2/$5 - $100/$200",
    games: ["Texas Hold'em", "Omaha", "Mixed Games", "Tournament"],
    hours: "24/7", 
    tables: 32,
    latitude: 36.1129,
    longitude: -115.1767
  },
  {
    id: "6",
    name: "EPT Prague",
    city: "Prague",
    country: "Czech Republic",
    rating: 4,
    stakes: "€2/€5 - €25/€50",
    games: ["Texas Hold'em", "Tournament", "Cash Games"],
    hours: "Varies",
    tables: 60,
    latitude: 50.0755,
    longitude: 14.4378
  },
  {
    id: "7",
    name: "Aspers Casino London",
    city: "London", 
    country: "UK",
    rating: 4,
    stakes: "£1/£2 - £5/£10",
    games: ["Texas Hold'em", "Omaha"],
    hours: "24/7",
    tables: 25,
    latitude: 51.5074,
    longitude: -0.1278
  },
  {
    id: "8",
    name: "Marina Bay Sands",
    city: "Singapore",
    country: "Singapore",
    rating: 5,
    stakes: "S$5/S$10 - S$25/S$50",
    games: ["Texas Hold'em", "Omaha", "Tournament"],
    hours: "24/7",
    tables: 16,
    latitude: 1.2834,
    longitude: 103.8607
  },
  {
    id: "9",
    name: "Casino de Deauville",
    city: "Deauville",
    country: "France",
    rating: 4,
    stakes: "€2/€5 - €10/€20",
    games: ["Texas Hold'em", "Tournament"],
    hours: "9:00 PM - 4:00 AM",
    tables: 14,
    latitude: 49.3588,
    longitude: 0.0750
  },
  {
    id: "10",
    name: "Wynn Las Vegas",
    city: "Las Vegas", 
    country: "USA",
    rating: 5,
    stakes: "$2/$5 - $50/$100",
    games: ["Texas Hold'em", "Omaha", "Mixed Games"],
    hours: "24/7",
    tables: 26,
    latitude: 36.1311,
    longitude: -115.1653
  },
  {
    id: "11",
    name: "Macau Poker Cup",
    city: "Macau",
    country: "China",
    rating: 4,
    stakes: "HK$25/HK$50 - HK$100/HK$200",
    games: ["Texas Hold'em", "Tournament"],
    hours: "Varies",
    tables: 50,
    latitude: 22.1987,
    longitude: 113.5439
  },
  {
    id: "12",
    name: "King's Casino Rozvadov",
    city: "Rozvadov",
    country: "Czech Republic", 
    rating: 4,
    stakes: "€1/€2 - €10/€25",
    games: ["Texas Hold'em", "Omaha", "Mixed Games", "Tournament"],
    hours: "24/7",
    tables: 200,
    latitude: 49.6766,
    longitude: 12.5674
  },
  {
    id: "13",
    name: "NagaWorld Casino",
    city: "シアヌークビル",
    country: "カンボジア",
    rating: 3,
    stakes: "$1/$2 - $5/$10",
    games: ["Texas Hold'em", "Omaha", "Tournament"],
    hours: "24/7",
    tables: 8,
    latitude: 10.6104,
    longitude: 103.5282
  }
];

export const getUniqueCountries = (): string[] => {
  return [...new Set(pokerRooms.map(room => room.country))].sort();
};

export const getUniqueGames = (): string[] => {
  return [...new Set(pokerRooms.flatMap(room => room.games))].sort();
};

export const getUniqueStakes = (): string[] => {
  return [...new Set(pokerRooms.map(room => room.stakes))].sort();
};