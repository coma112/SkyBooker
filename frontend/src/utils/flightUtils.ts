export const getDuration = (departure: string, arrival: string): string => {
  const dep = new Date(departure);
  const arr = new Date(arrival);
  const minutes = (arr.getTime() - dep.getTime()) / (1000 * 60);
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  return `${hours}ó ${mins}p`;
};

export const getDurationMinutes = (departure: string, arrival: string): number => {
  const dep = new Date(departure);
  const arr = new Date(arrival);
  return (arr.getTime() - dep.getTime()) / (1000 * 60);
};

export const getDurationLong = (departure: string, arrival: string): string => {
  const dep = new Date(departure);
  const arr = new Date(arrival);
  const minutes = (arr.getTime() - dep.getTime()) / (1000 * 60);
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  return `${hours} óra ${mins} perc`;
};

export const getSeatStatus = (available: number): 'high' | 'medium' | 'low' => {
  if (available > 30) return 'high';
  if (available > 10) return 'medium';
  return 'low';
};

export const getSeatStatusLabel = (available: number): string => {
  if (available > 30) return 'Sok szabad hely';
  if (available > 10) return 'Korlátozott helyek';
  if (available > 0) return 'Csak néhány hely!';
  return 'Nincs szabad hely';
};

export const getClassLabel = (seatClass: 'ECONOMY' | 'BUSINESS' | 'FIRST'): string => {
  const labels: Record<string, string> = {
    ECONOMY: 'Economy osztály',
    BUSINESS: 'Business osztály',
    FIRST: 'First Class',
  };
  return labels[seatClass] ?? seatClass;
};

export const getTimeOfDay = (dateString: string): 'morning' | 'afternoon' | 'evening' => {
  const hour = new Date(dateString).getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'evening';
};

export const formatPriceSimple = (price: number): string => {
  return price.toLocaleString('hu-HU') + ' Ft';
};