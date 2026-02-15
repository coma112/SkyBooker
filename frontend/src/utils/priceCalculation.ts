import type { PriceBreakdown } from '../types/booking';

const CLASS_MULTIPLIERS = {
  ECONOMY: 1,
  BUSINESS: 2.5,
  FIRST: 4
};

export const calculatePrice = (
  basePrice: number,
  seatClass: 'ECONOMY' | 'BUSINESS' | 'FIRST',
  departureDate: string
): PriceBreakdown => {
  const departure = new Date(departureDate);
  const today = new Date();
  
  // Calculate days until departure
  const daysUntilDeparture = Math.ceil((departure.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Base price with class multiplier
  const classMultiplier = CLASS_MULTIPLIERS[seatClass];
  const priceWithClass = basePrice * classMultiplier;
  
  // Early bird discount (-15% if 30+ days in advance)
  let earlyBirdDiscount = 0;
  if (daysUntilDeparture >= 30) {
    earlyBirdDiscount = priceWithClass * 0.15;
  }
  
  // Last minute fee (+25% if within 7 days)
  let lastMinuteFee = 0;
  if (daysUntilDeparture <= 7) {
    lastMinuteFee = priceWithClass * 0.25;
  }
  
  // Seasonal fee (June-August +20%)
  let seasonalFee = 0;
  const month = departure.getMonth() + 1; // 1-12
  if (month >= 6 && month <= 8) {
    seasonalFee = priceWithClass * 0.20;
  }
  
  // Calculate total
  const total = priceWithClass - earlyBirdDiscount + lastMinuteFee + seasonalFee;
  
  return {
    basePrice: priceWithClass,
    classMultiplier,
    earlyBirdDiscount,
    lastMinuteFee,
    seasonalFee,
    total: Math.round(total)
  };
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};