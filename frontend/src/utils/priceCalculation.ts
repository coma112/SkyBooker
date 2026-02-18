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
  
  const daysUntilDeparture = Math.ceil((departure.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const classMultiplier = CLASS_MULTIPLIERS[seatClass];
  const priceWithClass = basePrice * classMultiplier;
  
  let earlyBirdDiscount = 0;
  if (daysUntilDeparture >= 30) {
    earlyBirdDiscount = priceWithClass * 0.15;
  }
  
  let lastMinuteFee = 0;
  if (daysUntilDeparture <= 7) {
    lastMinuteFee = priceWithClass * 0.25;
  }
  
  let seasonalFee = 0;
  const month = departure.getMonth() + 1;
  if (month >= 6 && month <= 8) {
    seasonalFee = priceWithClass * 0.20;
  }
  
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