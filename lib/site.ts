export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://globalaesthetic.ch";

export const SITE_NAME = "Clinic Global Esthetic";

/**
 * Page de réservation Fresha de la clinique (agenda temps réel, confirmation
 * immédiate, rappels automatiques). Vider cette constante pour masquer le
 * bouton et ne garder que le formulaire de demande par e-mail.
 */
export const BOOKING_EXTERNAL_URL =
  "https://www.fresha.com/book-now/clinic-global-esthetic-bbj1zglk/all-offer";

export const CONTACT = {
  phone: "+41783464201",
  phoneDisplay: "(+41) 078 346 42 01",
  whatsapp: "41783464201",
  email: "contact@globalaesthetic.ch",
  address: {
    street: "Av. Louis-Casaï 71",
    postalCode: "1216",
    city: "Meyrin",
    country: "CH",
  },
} as const;
