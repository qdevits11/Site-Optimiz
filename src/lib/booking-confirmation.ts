export const BOOKING_CONFIRMATION_STORAGE_KEY = "optmiz.booking.confirmation";

export type BookingConfirmationDetails = {
  name: string;
  email: string;
  company?: string;
  city: string;
  address: string;
  need: string;
  companySize: string;
  slotLabel: string;
  manageUrl?: string;
};
