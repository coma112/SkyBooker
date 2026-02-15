export const validateEmail = (email: string): string | null => {
  if (!email) return 'Kötelező mező!';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Helytelen email formátum!';
  }
  return null;
};

export const validateRequired = (value: string): string | null => {
  if (!value || value.trim() === '') {
    return 'Kötelező mező!';
  }
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) return 'Kötelező mező!';
  if (!/^(\+36|06)?[0-9]{8,11}$/.test(phone.replace(/[\s-]/g, ''))) {
    return 'Helytelen telefonszám formátum!';
  }
  return null;
};

export const validatePassport = (passport: string): string | null => {
  if (!passport) return 'Kötelező mező!';
  if (passport.length < 6 || passport.length > 9) {
    return 'Helytelen útlevélszám formátum!';
  }
  return null;
};

export const validateBirthDate = (date: string): string | null => {
  if (!date) return 'Kötelező mező!';
  
  const birthDate = new Date(date);
  const today = new Date();
  
  if (birthDate > today) {
    return 'Jövőbeli születési dátum nem lehetséges!';
  }
  
  const age = today.getFullYear() - birthDate.getFullYear();
  if (age < 18) {
    return 'Az utasnak legalább 18 évesnek kell lennie!';
  }
  
  return null;
};

export const validateName = (name: string, fieldName: string): string | null => {
  if (!name) return 'Kötelező mező!';
  if (name.length < 2) {
    return `${fieldName} legalább 2 karakter hosszú legyen!`;
  }
  if (!/^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s-]+$/.test(name)) {
    return 'Csak betűk, szóköz és kötőjel engedélyezett!';
  }
  return null;
};