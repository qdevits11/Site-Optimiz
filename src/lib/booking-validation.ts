/** E-mail avec au moins un @ et un point (domaine). */
export function isValidBookingEmail(email: string) {
  const value = email.trim();
  if (!value.includes("@") || !value.includes(".")) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Adresse de visite avec au moins un chiffre (numéro). */
export function addressHasStreetNumber(address: string) {
  return /\d/.test(address.trim());
}
