export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://globalaesthetic.ch";

export const SITE_NAME = "Clinic Global Esthetic";

export const CONTACT = {
  phone: "+41783464201",
  phoneDisplay: "(+41) 078 346 42 01",
  whatsapp: "41783464201",
  // Adresse publique affichée sur le site — à basculer vers
  // contact@globalaesthetic.ch dès que la boîte existe chez Infomaniak.
  email: "contact@clinicglobalestheticgeneva.ch",
  address: {
    street: "Av. Louis-Casaï 71",
    postalCode: "1216",
    city: "Meyrin",
    country: "CH",
  },
} as const;
