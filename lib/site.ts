export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://clinicglobalestheticgeneva.ch";

export const SITE_NAME = "Clinic Global Esthetic";

export const CONTACT = {
  phone: "+41783464201",
  phoneDisplay: "(+41) 078 346 42 01",
  email: "contact@clinicglobalestheticgeneva.ch",
  address: {
    street: "Av. Louis-Casaï 71",
    postalCode: "1216",
    city: "Meyrin",
    country: "CH",
  },
} as const;
