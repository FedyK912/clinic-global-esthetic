import type { fr } from "./fr";

export const en: typeof fr = {
  langName: "English",
  htmlLang: "en",
  ogLocale: "en_US",

  nav: {
    home: "Home",
    laser: "Laser hair removal",
    face: "Facial treatments",
    body: "Body treatments",
    booking: "Book online",
    bookCta: "Book an appointment",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    tagline: "Meyrin · Geneva · 25 years of expertise",
  },

  common: {
    ourCare: "Our treatments",
    discover: "Discover →",
    bookSlot: "Book a slot",
    seePricing: "Treatments & pricing",
    perSession: " / session",
    per45: " / 45 min",
    approx1h: "≈ 1 h",
    dur45: "45 min",
    freeBadge: "Free first consultation — skin assessment & quote",
    consultTitle: "Free first consultation",
    consultText:
      "A full assessment of your skin and hair growth, answers to all your questions and a precise quote — in 30 minutes, with no commitment and no pressure.",
    consultCta: "Book my free assessment",
    resultNote: "Individual result observed at the clinic — not contractual.",
  },

  home: {
    metaTitle:
      "Clinic Global Esthetic — Medical laser hair removal & aesthetic treatments, Geneva",
    metaDesc:
      "Medical laser hair removal and face & body aesthetic treatments in Meyrin, Geneva. Free first consultation, reply within one business day.",
    heroEyebrow: "Medical laser hair removal · Geneva",
    heroTitle1: "The precision of a",
    heroTitle2: "",
    heroTitleEm: "medical",
    heroTitlePost: " gesture,",
    heroTitle3: "designed for your skin.",
    heroLead:
      "For over 25 years, Clinic Global Esthetic has cared for its patients in Meyrin with serious medical technology, personalised protocols and an honest approach — far from unrealistic promises.",
    stats: [
      { b: "25+", s: "YEARS OF EXPERIENCE" },
      { b: "80%", s: "OBSERVED HAIR REDUCTION" },
      { b: "6–8", s: "SESSIONS ON AVERAGE" },
      { b: "1216", s: "MEYRIN, GENEVA" },
    ],
    scanCaption: ["810NM DIODE", "SESSION IN PROGRESS"],
    heroSceneAria:
      "3D illustration — a medical laser handpiece sweeping the skin with its beam",
    aboutEyebrow: "Our story",
    aboutTitle: "One clinic, one standard: yours.",
    aboutP1:
      "Clinic Global Esthetic was born from a simple conviction: skin care and hair removal deserve the same rigour as a medical procedure. For over 25 years, our team has been dedicated to aesthetics and well-being, with one unchanging principle — real results over inflated promises.",
    aboutP2:
      "Based in Meyrin, we chose recognised medical technology over fashionable gadgets: medical laser, radiofrequency, microneedling, HydraFacial. Every protocol is tailored to your skin, your hair and your goals — never standardised.",
    figures: [
      { b: "100%", s: "Medical technology, no experimental methods" },
      { b: "1 to 1", s: "Every protocol personalised, session after session" },
    ],
    protocolEyebrow: "How it works",
    protocolTitle: "The protocol, step by step",
    protocolText:
      "An effective laser treatment is never improvised. Here is how your journey with us unfolds, from first contact to result follow-up.",
    steps: [
      {
        num: "01 / CONSULTATION",
        title: "Free assessment",
        text: "Analysis of your skin, hair growth and expectations. No commitment, no pressure.",
      },
      {
        num: "02 / DIAGNOSIS",
        title: "Personalised protocol",
        text: "Laser settings and session rhythm chosen for your skin type, hair type and hormonal balance.",
      },
      {
        num: "03 / SESSIONS",
        title: "Spaced treatment",
        text: "Sessions are spaced several weeks apart to target each hair in its active growth phase.",
      },
      {
        num: "04 / FOLLOW-UP",
        title: "Continuous adjustment",
        text: "At every appointment, the protocol is reassessed to guarantee real, lasting progress.",
      },
    ],
    teaserEyebrow: "Our treatments",
    teaserTitle: "Three worlds, one standard",
    teaserText:
      "Laser hair removal, facial treatments and body treatments — serious medical technology and measurable results.",
    teasers: [
      {
        title: "Laser hair removal",
        text: "All areas, women & men. Detailed pricing, protocol explained, hair growth cycle demystified.",
      },
      {
        title: "Facial treatments",
        text: "HydraFacial, CO₂ laser, microneedling, carbon peel, ultrasound, radiofrequency.",
      },
      {
        title: "Body treatments",
        text: "Laser tattoo removal, EMSculpt, pressotherapy.",
      },
    ],
  },

  cycle: {
    eyebrow: "Why several sessions",
    title: "Not all hairs grow at the same time",
    text: "At each session, the laser only targets hairs in their active growth phase. This natural cycle — not any lack of laser efficacy — is why several spaced sessions are needed.",
    phases: [
      {
        title: "Anagen phase — growth",
        text: "The hair is active and nourished: this is the only phase where the laser can destroy it permanently.",
        tag: "ANAGEN — GROWTH",
      },
      {
        title: "Catagen phase — transition",
        text: "The hair stops being nourished and gradually detaches from its root.",
        tag: "CATAGEN — TRANSITION",
      },
      {
        title: "Telogen phase — rest",
        text: "The hair is resting and will fall out naturally, without any laser action.",
        tag: "TELOGEN — REST",
      },
    ],
    sceneTag: "SKIN CROSS-SECTION — FOLLICLE",
    sceneAria:
      "3D skin cross-section showing the hair follicle in the selected cycle phase",
  },

  laser: {
    metaTitle:
      "Medical laser hair removal — Women's & men's prices | Clinic Global Esthetic",
    metaDesc:
      "Medical laser hair removal in Meyrin, Geneva. 810 nm diode, detailed pricing by area for women and men. Free first consultation.",
    headTitle: "Medical laser hair removal",
    headText:
      "Medical laser hair removal is today the most effective way to reduce hair growth for good. Unlike shaving, waxing or plucking, it delivers progressive, lasting results with serious medical supervision.",
    photoAlt:
      "Medical laser hair removal session at the clinic — treating the legs after area marking",
    photoCaption: ["MEDICAL TECHNOLOGY — 810NM DIODE", "REAL TREATMENT SESSION"],
    statB: "6–8 sessions",
    statText:
      "on average for an optimal result, with visible reduction from the very first session and up to 80% reduction observed by the 4th session depending on the area and skin type.",
    compareEyebrow: "Why medical laser",
    compareTitle: "The only method that treats the root",
    compareText:
      "Razor, wax, pulsed light: every other method leaves the follicle intact. Medical laser is the only one that neutralises it for good.",
    compare: [
      {
        method: "Razor",
        verdict: "Regrowth in 1 to 3 days",
        text: "Cuts the hair at the surface. Immediate regrowth, coarser feel, frequent irritation.",
        highlight: false,
      },
      {
        method: "Wax & tweezers",
        verdict: "Regrowth in 2 to 4 weeks",
        text: "Pulls the hair out but leaves the root intact. Recurring pain, ingrown hairs, a never-ending expense.",
        highlight: false,
      },
      {
        method: "Pulsed light (IPL)",
        verdict: "Slow, inconsistent results",
        text: "Diffuse light, less powerful and less targeted than laser: results are often incomplete.",
        highlight: false,
      },
      {
        method: "Medical laser",
        verdict: "Lasting reduction from the first sessions",
        text: "The beam targets the hair's melanin and neutralises the follicle at the root, with personalised medical settings.",
        highlight: true,
        badge: "Our specialty",
      },
    ],
    techSpecs: [
      "810 nm diode — the reference wavelength",
      "Contact cooling — maximum comfort",
      "Fair to dark skin — settings by phototype",
      "Women & men — all areas",
    ],
    pricesEyebrow: "Pricing by area",
    ctaConsult: "Book a free consultation",
    menEyebrow: "Women & men",
    menTitle: "Male hair removal, an expertise in its own right",
    menText:
      "Back, chest, shoulders, beard contouring: male hair growth calls for specific settings and precise area-by-area marking. Nearly half of our patients are men — there is nothing taboo about it, and the result is just as lasting.",
    menPhotoAlt:
      "Preparing a men's back laser hair removal session — marking the areas with a white pencil",
    menCta: "See men's pricing",
    sessionEyebrow: "Your session",
    sessionTitle: "One session, four steps",
    session: [
      {
        num: "01 / MARKING",
        title: "Precise mapping",
        text: "The area is mapped out with a white pencil, section by section, for complete coverage with no misses and no double pass.",
      },
      {
        num: "02 / SETTINGS",
        title: "Tailored parameters",
        text: "Power and frequency adjusted to your phototype, your hair and the treated area.",
      },
      {
        num: "03 / TREATMENT",
        title: "Cooled sweeping",
        text: "The cooled handpiece sweeps each section. Brief tingling sensation, very bearable.",
      },
      {
        num: "04 / SOOTHING",
        title: "Gel & aftercare",
        text: "Soothing gel and aftercare advice: sun protection, hydration, no plucking between sessions.",
      },
    ],
    resultsEyebrow: "Observed results",
    resultsTitle: "Progressive, lasting reduction",
    resultsText:
      "A few photos from our patient follow-ups, showing how hair growth evolves over the course of medical laser sessions.",
    galleryAlts: [
      "Laser treatment progress — follow-up 1",
      "Laser treatment progress — follow-up 2",
      "Laser treatment progress — follow-up 3",
      "Laser treatment progress — follow-up 4",
    ],
    galleryNote:
      "Results vary with the treated area, skin and hair type, and each patient's hormonal balance.",
    faqEyebrow: "Frequently asked questions",
    faqTitle: "What we are asked most often",
    faqText:
      "Straight answers, no jargon and no overpromising — just like during the free assessment.",
    faq: [
      {
        q: "Does laser hair removal hurt?",
        a: "It feels like light elastic-band snaps with some warmth. The handpiece cools the skin during each pulse, and settings are adapted to your sensitivity. On the most sensitive areas, the pass only takes a few minutes.",
      },
      {
        q: "How many sessions will I need?",
        a: "On average 6 to 8 sessions, spaced 4 to 8 weeks apart depending on the area. The laser only acts on hairs in their active growth phase: this natural cycle is what requires several passes, not any lack of laser efficacy.",
      },
      {
        q: "How should I prepare for a session?",
        a: "Shave the area 24 to 48 hours before the session, avoid sun exposure and self-tanner in the preceding weeks, and do not pull hairs out at the root (wax, tweezers) between sessions — the laser needs the root to work.",
      },
      {
        q: "Is the laser suitable for all skin types?",
        a: "The 810 nm diode treats most phototypes, including darker skin, with adapted settings. Very fair, white or red hair, however, responds poorly to laser — we will tell you honestly during the free assessment.",
      },
      {
        q: "What are the possible side effects?",
        a: "Redness or a local warm sensation may appear for a few hours after the session — this is normal and temporary. Sun protection is recommended on the treated area. The prior assessment rules out any contraindications.",
      },
    ],
  },

  prices: {
    women: "Women's prices",
    men: "Men's prices",
  },

  face: {
    metaTitle:
      "Facial treatments — HydraFacial, CO2 Laser, Microneedling | Clinic Global Esthetic",
    metaDesc:
      "Aesthetic facial treatments in Meyrin, Geneva: HydraFacial, CO2 laser, microneedling, carbon peel, focused ultrasound, radiofrequency.",
    headTitle: "Facial treatments",
    headText:
      "Recognised medical technology to renew, purify and firm the skin — no overpromising, with a protocol adapted to every skin type.",
    cta: "Book a facial treatment",
    soins: [
      {
        title: "HydraFacial",
        text: "Deeply cleanses, exfoliates and hydrates the skin with a gentle, non-invasive technology. Removes impurities, unclogs pores and delivers instant radiance.",
        alt: "HydraFacial treatment",
      },
      {
        title: "CO₂ laser",
        text: "State-of-the-art medical treatment for deep skin renewal. Triggers intense skin regeneration, ideal for wrinkles, scars and dark spots.",
        alt: "CO2 laser",
      },
      {
        title: "Microneedling",
        text: "Naturally stimulates skin regeneration through controlled micro-perforations. Boosts collagen production, improves texture, pores and fine lines.",
        alt: "Microneedling",
      },
      {
        title: "Carbon Peel",
        text: "Non-invasive laser treatment that deeply purifies the skin. A carbon mask is applied then activated by the laser to tighten pores and renew the skin.",
        alt: "Carbon Peel",
      },
      {
        title: "Focused ultrasound",
        text: "High-frequency sound waves sent deep into the tissue, generating targeted heat that stimulates collagen. Natural lifting effect, redefined contours.",
        alt: "Focused ultrasound",
      },
      {
        title: "Radiofrequency",
        text: "Electromagnetic waves that heat the tissue in depth, stimulating collagen and elastin. Firmer skin, redefined contours, with no pain and no downtime.",
        alt: "Radiofrequency",
      },
    ],
  },

  body: {
    metaTitle:
      "Body treatments — Tattoo removal, EMSculpt, Pressotherapy | Clinic Global Esthetic",
    metaDesc:
      "Body treatments in Meyrin, Geneva: laser tattoo removal, EMSculpt, pressotherapy, body contouring.",
    headTitle: "Body treatments",
    headText:
      "Laser tattoo removal, muscle sculpting and lymphatic drainage — medical technology for tangible results, without surgery.",
    cta: "Book a body treatment",
    traitements: [
      {
        title: "Laser tattoo removal",
        text: "A medical technique that progressively and safely fades or removes a tattoo. The laser fragments the pigments, which the body then eliminates naturally over the following weeks.",
        alt: "Laser tattoo removal",
      },
      {
        title: "EMSculpt",
        text: "High-intensity electromagnetic waves that trigger intense muscle contractions impossible to achieve through regular training. Strengthens, tones and reduces localised fat.",
        alt: "EMSculpt",
      },
      {
        title: "Pressotherapy",
        text: "Stimulates lymphatic and venous circulation through controlled air pressure. Eliminates toxins, reduces water retention and the feeling of heavy legs.",
        alt: "Pressotherapy",
      },
    ],
    resultEyebrow: "Real results",
    resultTitle: "Body contouring — before / after",
    resultText:
      "Result achieved at the clinic after a body contouring protocol combining radiofrequency and ultrasound. The skin is visibly tightened and smoothed.",
    resultAlt:
      "Before / after of a body contouring protocol at the clinic — visibly firmer stomach skin",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER",
    beforeAlt: "Before the body contouring protocol — loose stomach skin",
    afterAlt: "After the body contouring protocol — visibly firmer skin",
    sliderAria: "Compare before and after by dragging the handle",
  },

  booking: {
    metaTitle: "Book an appointment — Clinic Global Esthetic, Meyrin Geneva",
    metaDesc:
      "Book your slot at Clinic Global Esthetic in Meyrin, Geneva. Free first consultation — confirmation by e-mail within one business day.",
    headTitle: "Book your slot online",
    headText:
      "Select the reason for your visit, tell us your availability and contact details — we confirm your slot by e-mail within one business day, with no risk of double booking.",
    step1: "01 — Reason for your visit",
    step2: "02 — Your availability",
    step3: "03 — Your contact details",
    freeTag: "FREE",
    motifs: {
      consultation: { label: "Free consultation", desc: "1st visit, skin assessment · 30 min" },
      laser: { label: "Laser hair removal", desc: "All areas · ≈ 1 h" },
      visage: { label: "Facial treatment", desc: "HydraFacial, CO2, etc. · ≈ 1 h" },
      corps: { label: "Body treatment", desc: "Tattoo removal, EMSculpt... · ≈ 1 h" },
    },
    serviceLabel: "Preferred treatment (optional)",
    serviceAny: "I don't know yet",
    servicesVisage: [
      "HydraFacial",
      "CO₂ laser",
      "Microneedling",
      "Carbon Peel",
      "Focused ultrasound",
      "Radiofrequency",
    ],
    servicesCorps: ["Laser tattoo removal", "EMSculpt", "Pressotherapy"],
    dateLabel: "Preferred date",
    slotLabel: "Time slot",
    slots: {
      indifferent: "No preference",
      matin: "Morning (9am–12pm)",
      midi: "Midday (12pm–2pm)",
      "apres-midi": "Afternoon (2pm–5pm)",
      "fin-de-journee": "End of day (5pm–7pm)",
    },
    nameLabel: "First & last name *",
    emailLabel: "E-mail *",
    phoneLabel: "Phone (optional)",
    messageLabel: "Areas or details (optional)",
    messagePlaceholder: "E.g.: underarms + half legs, sensitive skin…",
    submit: "Send my request",
    submitting: "Sending…",
    note: "Reply within one business day · no commitment",
    errors: {
      motif: "Please choose the reason for your appointment.",
      name: "Please enter your first and last name.",
      email: "Please enter a valid e-mail address.",
      phone: "Invalid phone number.",
      date: "Please choose an upcoming date.",
      timeslot: "Invalid time slot.",
      service: "Invalid treatment.",
      message: "Invalid message (2000 characters max).",
    },
    errorValidation: "Please check the fields highlighted above.",
    errorRate:
      "Too many requests — please try again in a few minutes, or contact us directly below.",
    errorSend1: "Automatic sending failed. Your request is not lost: send it in one click by ",
    errorSendMail: "pre-filled e-mail",
    errorSendOr: " or via ",
    errorSend2: "Or call us: ",
    sentEyebrow: "Request sent",
    sentTitle: "Thank you — we have it.",
    sentText1: "Your request has been sent to the clinic. We will confirm your slot by e-mail or phone as soon as possible.",
    sentText2: "A confirmation receipt has just been sent to",
    whatsappIntro: "Hello, I would like an appointment for:",
    mailSubject: "Appointment request",
    mapTitle: "Clinic Global Esthetic location, Av. Louis-Casaï 71, 1216 Meyrin",
    contactLabels: { phone: "PHONE", mail: "EMAIL", whatsapp: "WHATSAPP" },
    rail: ["Reason", "Availability", "Your details"],
    directTitle: "Prefer to reach us directly?",
    directText:
      "Call, write or use WhatsApp — we reply quickly during opening hours.",
    tileWhatsappText: "Send a message",
  },

  gift: {
    eyebrow: "Gift card",
    title: "Give a treatment, not just an object.",
    text: "Laser hair removal, a facial or a moment of pure relaxation — treat someone close to you with a Clinic Global Esthetic gift card, tailored to your budget.",
    cta: "Request a gift card",
    mailSubject: "Gift card request",
  },

  footer: {
    about:
      "Medical laser hair removal and face & body aesthetic treatments clinic in Meyrin, Geneva.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    rights: "Clinic Global Esthetic — Meyrin, Geneva",
  },

  notFound: {
    eyebrow: "Error 404",
    title: "This page does not exist.",
    text: "The link you followed leads nowhere — but our treatments are very real.",
    home: "Back to home",
    book: "Book an appointment",
  },

  techs: [
    "810 nm diode",
    "CO₂ laser",
    "Radiofrequency",
    "Focused ultrasound",
    "HydraFacial",
    "Microneedling",
    "Carbon Peel",
    "EMSculpt",
    "Pressotherapy",
    "Tattoo removal",
  ],
};
