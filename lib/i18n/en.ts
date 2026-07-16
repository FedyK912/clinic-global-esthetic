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
    bookCtaShort: "Book now",
    callCta: "Call us",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    tagline: "Meyrin · Geneva · Over 25 years of expertise",
  },

  common: {
    ourCare: "Our treatments",
    bookSlot: "Book a slot",
    seePricing: "Laser pricing",
    perSession: " / session",
    per45: " / 45 min",
    approx1h: "≈ 1 h",
    dur45: "45 min",
    freeBadge: "Free first consultation: skin assessment & quote",
    consultTitle: "Free first consultation",
    consultText:
      "A full assessment of your skin and hair growth, answers to all your questions and a precise quote, all in 30 minutes, with no commitment and no pressure.",
    consultCta: "Book my free assessment",
    resultNote: "Individual result observed at the clinic, not contractual.",
    bookThis: "Book this treatment",
  },

  home: {
    metaTitle:
      "Clinic Global Esthetic | Medical laser hair removal & aesthetic treatments, Geneva",
    metaDesc:
      "Medical laser hair removal and face & body aesthetic treatments in Meyrin, Geneva. Free first consultation, reply within one business day.",
    heroEyebrow: "Medical laser hair removal · Geneva",
    heroTitle1: "Medical-grade",
    heroTitle2: "",
    heroTitleEm: "precision",
    heroTitlePost: ",",
    heroTitle3: "designed for your skin.",
    heroLead:
      "For over 25 years, Clinic Global Esthetic has cared for its patients in Meyrin with proven medical technology, personalised protocols and an honest approach, far from unrealistic promises.",
    stats: [
      { b: "25+", s: "years of experience" },
      { b: "Up to 80%", s: "observed reduction, by area" },
      { b: "6–8", s: "sessions on average" },
    ],
    scanCaption: ["810NM DIODE · AT THE CLINIC", "REAL SESSION"],
    heroPhotoAlt:
      "Medical laser hair removal session at the clinic, treating the legs after area marking",
    aboutEyebrow: "Our story",
    aboutTitle: "One clinic, one standard: yours.",
    aboutP1:
      "Clinic Global Esthetic was born from a simple conviction: skin care and hair removal deserve the same rigour as a medical procedure. For over 25 years, our team has been dedicated to aesthetics and well-being, with one unchanging principle: real results over inflated promises.",
    aboutP2:
      "Based in Meyrin, we chose recognised medical technology over fashionable gadgets: medical laser, radiofrequency, microneedling, HydraFacial. Every protocol is tailored to your skin, your hair and your goals, never standardised.",
    figures: [
      { b: "0", s: "fads, only recognised medical technology" },
      { b: "1 to 1", s: "Every protocol personalised, session after session" },
    ],
    founderEyebrow: "Who welcomes you",
    founderTitle: "Najla, founder",
    founderP1:
      "Behind Clinic Global Esthetic is a practitioner with over 25 years of experience, who personally welcomes every patient, from the first assessment to result follow-up.",
    founderP2:
      "Her method comes down to three habits: listening before recommending, saying honestly what a treatment can do (and cannot do), and adjusting every protocol to the person rather than applying a recipe.",
    founderFacts: [
      "Over 25 years of aesthetic practice",
      "You see the same practitioner at every session",
      "Free initial assessment, no-pressure recommendation",
    ],
    founderPhotoAlt: "Najla, founder of Clinic Global Esthetic",
    cabinet: {
      eyebrow: "The clinic",
      title: "A space designed for your peace of mind",
      text: "In the heart of Meyrin, inside the Alpha Business Centre: a calm, light-filled space equipped with up-to-date medical technology. Step inside, we take care of the rest.",
      photos: [
        {
          caption: "The waiting area",
          alt: "The clinic's waiting area: cream bouclé armchairs, a large mirror and the treatment room in the background",
        },
        {
          caption: "The treatment room",
          alt: "The clinic's treatment room with the treatment bed and the 810 nm diode laser",
        },
        {
          caption: "Alpha Business Centre · entrance 71",
          alt: "The Alpha Business Centre building at 71 avenue Louis-Casaï in Meyrin, home to the clinic",
        },
      ],
    },
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
        text: "At every appointment, the protocol is reassessed and fine-tuned, so every session truly counts.",
      },
    ],
    teaserEyebrow: "Our treatments",
    teaserTitle: "Laser, face, body: the same rigour throughout",
    teaserText:
      "Three families of treatments, one standard: recognised medical technology and measurable results.",
    teasers: [
      {
        title: "Laser hair removal",
        text: "All areas, women & men. Transparent area-by-area pricing, the protocol explained, and the hair growth cycle demystified.",
        cta: "See laser pricing",
      },
      {
        title: "Facial treatments",
        text: "HydraFacial, CO₂ laser, microneedling, carbon peel, ultrasound, radiofrequency.",
        cta: "Explore facial treatments",
      },
      {
        title: "Body treatments",
        text: "Laser tattoo removal, EMSculpt, pressotherapy.",
        cta: "See body treatments",
      },
    ],
    teaserAlts: [
      "Precise back marking before a laser hair removal session",
      "HydraFacial facial treatment at the clinic",
      "EMSculpt session at the clinic",
    ],
  },

  cycle: {
    eyebrow: "Why several sessions",
    title: "Not all hairs grow at the same time",
    text: "At each session, the laser only targets hairs in their active growth phase. This natural cycle, not any lack of laser efficacy, is why several spaced sessions are needed.",
    phases: [
      {
        title: "Anagen phase: growth",
        text: "The hair is active and nourished: this is the only phase where the laser can destroy it permanently.",
        tag: "ANAGEN · GROWTH",
      },
      {
        title: "Catagen phase: transition",
        text: "The hair stops being nourished and gradually detaches from its root.",
        tag: "CATAGEN · TRANSITION",
      },
      {
        title: "Telogen phase: rest",
        text: "The hair is resting and will fall out naturally, without any laser action.",
        tag: "TELOGEN · REST",
      },
    ],
    sceneTag: "SKIN CROSS-SECTION · FOLLICLE",
    sceneAria:
      "Diagram of a skin cross-section showing the hair follicle in the selected cycle phase",
  },

  laser: {
    metaTitle:
      "Medical laser hair removal, women's & men's prices | Clinic Global Esthetic",
    metaDesc:
      "Medical laser hair removal in Meyrin, Geneva. 810 nm diode, detailed pricing by area for women and men. Free first consultation.",
    headTitle: "Medical laser hair removal",
    headText:
      "Medical laser hair removal is today the most effective way to reduce hair growth for good. Unlike shaving, waxing or plucking, it delivers progressive, lasting results with serious medical supervision.",
    photoAlt:
      "Medical laser hair removal session at the clinic, treating the legs after area marking",
    photoCaption: ["MEDICAL TECHNOLOGY · 810NM DIODE", "REAL TREATMENT SESSION"],
    statB: "6–8 sessions",
    statText:
      "on average for an optimal result. Reduction is usually noticeable within the first few sessions, with up to 80% observed by the 4th depending on the area and skin type.",
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
      "810 nm diode: the reference wavelength",
      "Contact cooling: maximum comfort",
      "Fair to dark skin: settings by phototype",
      "Women & men: all areas",
    ],
    pricesEyebrow: "Pricing by area",
    ctaConsult: "Book a free consultation",
    menEyebrow: "Women & men",
    menTitle: "Male hair removal, an expertise in its own right",
    menText:
      "Back, chest, shoulders, beard contouring: male hair growth calls for specific settings and precise area-by-area marking. Nearly half of our patients are men. There is nothing taboo about it, and the result is just as lasting.",
    menPhotoAlt:
      "Preparing a men's back laser hair removal session, marking the areas with a white pencil",
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
      "Laser treatment progress: follow-up 1",
      "Laser treatment progress: follow-up 2",
      "Laser treatment progress: follow-up 3",
      "Laser treatment progress: follow-up 4",
    ],
    galleryNote:
      "Results vary with the treated area, skin and hair type, and each patient's hormonal balance.",
    faqEyebrow: "Frequently asked questions",
    faqTitle: "What we are asked most often",
    faqText:
      "Straight answers, no jargon and no overpromising, just like during the free assessment.",
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
        a: "Shave the area 24 to 48 hours before the session, avoid sun exposure and self-tanner in the preceding weeks, and do not pull hairs out at the root (wax, tweezers) between sessions: the laser needs the root to work.",
      },
      {
        q: "Is the laser suitable for all skin types?",
        a: "The 810 nm diode treats most phototypes, including darker skin, with adapted settings. Very fair, white or red hair, however, responds poorly to laser. We will tell you honestly during the free assessment.",
      },
      {
        q: "What are the possible side effects?",
        a: "Redness or a local warm sensation may appear for a few hours after the session. This is normal and temporary. Sun protection is recommended on the treated area. The prior assessment rules out any contraindications.",
      },
    ],
  },

  prices: {
    women: "Women's prices",
    men: "Men's prices",
  },

  face: {
    metaTitle:
      "Facial treatments, HydraFacial, CO2 Laser, Microneedling | Clinic Global Esthetic",
    metaDesc:
      "Aesthetic facial treatments in Meyrin, Geneva: HydraFacial, CO2 laser, microneedling, carbon peel, focused ultrasound, radiofrequency.",
    headTitle: "Facial treatments",
    headText:
      "Recognised medical technology to renew, purify and firm the skin: no overpromising, with a protocol adapted to every skin type.",
    cta: "Book a facial treatment",
    gridTitle: "Six treatments, one goal: healthy skin",
    soins: [
      {
        title: "HydraFacial",
        text: "Deeply cleanses, exfoliates and hydrates the skin with a gentle, non-invasive technology. Removes impurities, unclogs pores and delivers instant radiance.",
        alt: "HydraFacial treatment",
      },
      {
        title: "CO₂ laser",
        text: "Renews the skin in depth: the CO₂ laser triggers intense skin regeneration, ideal for wrinkles, scars and dark spots.",
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
        text: "Electromagnetic waves that heat the tissue in depth, stimulating collagen and elastin. Firmer skin, redefined contours. A comfortable treatment with no social downtime.",
        alt: "Radiofrequency",
      },
    ],
    faqTitle: "Before you choose",
    faq: [
      {
        q: "Which treatment is right for my skin?",
        a: "That is exactly what the free first consultation is for: a skin assessment, then a clear recommendation. Sometimes a single treatment is enough. No commitment.",
      },
      {
        q: "How many sessions should I plan?",
        a: "It depends on the treatment and the goal: some deliver an immediate effect (HydraFacial), others work as a course of several sessions (microneedling, radiofrequency). The exact rhythm is set during the assessment.",
      },
      {
        q: "Are there any contraindications?",
        a: "Some treatments are not recommended during pregnancy, on damaged skin or alongside certain medication. Every protocol starts with a questionnaire and a skin examination to rule them out.",
      },
    ],
  },

  body: {
    metaTitle:
      "Body treatments, tattoo removal, EMSculpt, pressotherapy | Clinic Global Esthetic",
    metaDesc:
      "Body treatments in Meyrin, Geneva: laser tattoo removal, EMSculpt, pressotherapy, body contouring.",
    headTitle: "Body treatments",
    headText:
      "Laser tattoo removal, muscle sculpting and lymphatic drainage: medical technology for tangible results, without surgery.",
    cta: "Book a body treatment",
    gridTitle: "Three targeted treatments",
    traitements: [
      {
        title: "Laser tattoo removal",
        text: "A medical technique that progressively and safely fades or removes a tattoo. The laser fragments the pigments, which the body then eliminates naturally over the following weeks.",
        alt: "Laser tattoo removal",
      },
      {
        title: "EMSculpt",
        text: "High-intensity electromagnetic waves that trigger supramaximal muscle contractions, far beyond voluntary training. Strengthens and tones the muscle; can help reduce localised fat.",
        alt: "EMSculpt",
      },
      {
        title: "Pressotherapy",
        text: "Stimulates lymphatic and venous circulation through controlled air pressure. Supports drainage, reduces water retention and that heavy-legs feeling.",
        alt: "Pressotherapy",
      },
    ],
    faqTitle: "Before you choose",
    faq: [
      {
        q: "Does tattoo removal work in a single session?",
        a: "No, the laser fragments the pigments progressively, over several sessions spaced weeks apart. The number depends on the ink, depth and age of the tattoo; the free assessment gives you an honest estimate.",
      },
      {
        q: "Does EMSculpt replace exercise?",
        a: "No, it complements it: supramaximal contractions work the muscle beyond voluntary training, but lifestyle remains decisive for the overall result.",
      },
      {
        q: "Who is pressotherapy for?",
        a: "Heavy legs, water retention and recovery. It is a gentle 45-minute session; contraindications, vascular ones in particular, are ruled out during the assessment.",
      },
    ],
    resultEyebrow: "Real results",
    resultTitle: "Body contouring: before / after",
    resultText:
      "Result achieved at the clinic after a body contouring protocol combining radiofrequency and ultrasound. The skin is visibly tightened and smoothed.",
    resultAlt:
      "Before / after of a body contouring protocol at the clinic, showing visibly firmer stomach skin",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER",
    beforeAlt: "Before the body contouring protocol: loose stomach skin",
    afterAlt: "After the body contouring protocol: visibly firmer skin",
    sliderAria: "Compare before and after by dragging the handle",
  },

  booking: {
    metaTitle: "Book an appointment | Clinic Global Esthetic, Meyrin Geneva",
    metaDesc:
      "Book online at Clinic Global Esthetic in Meyrin, Geneva: real-time calendar with instant confirmation, or an e-mail request. Free first consultation.",
    headTitle: "Book an appointment",
    headText:
      "Two ways to book: pick your slot directly in the calendar, or send us a written request if you would rather be guided.",
    paths: {
      fresha: {
        tag: "Fastest",
        title: "Pick your slot online",
        text: "Real-time calendar: choose your treatment and time, with instant e-mail confirmation and an automatic reminder the day before your appointment.",
        cta: "Open the calendar",
      },
      form: {
        tag: "Personalised request",
        title: "Or send us your request",
        text: "Hesitating between treatments, or prefer to describe your situation? Write to us below and you will receive a personal reply within one business day.",
        cta: "Fill in the request",
      },
    },
    step1: "01 · Reason for your visit",
    step2: "02 · Your availability",
    step3: "03 · Your contact details",
    waitingHint: "First choose a reason above, and the form will then activate.",
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
      "Too many requests. Please try again in a few minutes, or contact us directly below.",
    errorSend1: "Automatic sending failed. Your request is not lost: send it in one click by ",
    errorSendMail: "pre-filled e-mail",
    errorSendOr: " or via ",
    errorSend2: "Or call us: ",
    sentEyebrow: "Request sent",
    sentTitle: "Thank you, request received.",
    sentText1: "Your request has been sent to the clinic. We will confirm your slot by e-mail or phone as soon as possible.",
    sentText2: "A confirmation receipt has just been sent to",
    whatsappIntro: "Hello, I would like an appointment for:",
    mailSubject: "Appointment request",
    mapTitle: "Clinic Global Esthetic location, Av. Louis-Casaï 71, 1216 Meyrin",
    landmarkCaption: "Alpha Business Centre · entrance 71",
    landmarkAlt:
      "The Alpha Business Centre building at 71 avenue Louis-Casaï in Meyrin: look for this façade, the clinic is inside",
    contactLabels: { phone: "PHONE", mail: "EMAIL", whatsapp: "WHATSAPP" },
    rail: ["Reason", "Availability", "Your details"],
    directTitle: "Prefer to reach us directly?",
    directText:
      "Call, write or use WhatsApp: we reply quickly during opening hours.",
    tileWhatsappText: "Send a message",
  },

  gift: {
    eyebrow: "Gift card",
    title: "Give a treatment, not just an object.",
    text: "Laser hair removal, a facial or a moment of pure relaxation: treat someone close to you with a Clinic Global Esthetic gift card, tailored to your budget.",
    cta: "Request a gift card",
    mailSubject: "Gift card request",
  },

  footer: {
    about:
      "Medical laser hair removal and face & body aesthetic treatments clinic in Meyrin, Geneva.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    hoursTitle: "Opening hours",
    hours: [
      "Monday – Friday: 9am – 7pm",
      "Saturday: 9am – 1pm",
      "Sunday: closed",
    ],
    rights: "Clinic Global Esthetic · Meyrin, Geneva",
    legalNotice: "Legal notice",
    privacy: "Privacy",
  },

  legal: {
    noticeTitle: "Legal notice",
    noticeMeta: "Legal notice | Clinic Global Esthetic, Meyrin Geneva",
    noticeSections: [
      {
        h: "Site operator",
        p: [
          "Clinic Global Esthetic, medical laser hair removal and aesthetic treatments clinic.",
          "Av. Louis-Casaï 71, 1216 Meyrin, Switzerland.",
          "Phone: (+41) 078 346 42 01 · E-mail: contact@globalaesthetic.ch",
        ],
      },
      {
        h: "Site content",
        p: [
          "The information published on this site is provided for information purposes and does not replace a personal medical consultation or advice. Treatment results vary from person to person; before/after photographs illustrate individual cases and are not contractual.",
          "Clinic Global Esthetic strives to keep information accurate and up to date, without guarantee of completeness. Displayed prices may change without notice.",
        ],
      },
      {
        h: "Intellectual property",
        p: [
          "All content on this site (texts, photographs, illustrations, logo) is the property of Clinic Global Esthetic unless stated otherwise. Any reproduction without prior written authorisation is prohibited.",
        ],
      },
      {
        h: "Hosting",
        p: [
          "This site is hosted in Switzerland by Infomaniak Network SA, Rue Eugène-Marziano 25, 1227 Geneva.",
        ],
      },
    ],
    privacyTitle: "Privacy policy",
    privacyMeta: "Privacy policy | Clinic Global Esthetic, Meyrin Geneva",
    privacyIntro:
      "Clinic Global Esthetic takes the protection of your personal data seriously. This policy describes the data processed through this site, in accordance with the Swiss Federal Act on Data Protection (nFADP).",
    privacySections: [
      {
        h: "Data controller",
        p: [
          "Clinic Global Esthetic, Av. Louis-Casaï 71, 1216 Meyrin, Switzerland · contact@globalaesthetic.ch, (+41) 078 346 42 01.",
        ],
      },
      {
        h: "Data collected and purpose",
        p: [
          "The booking form collects the data you enter: reason for visit, preferred treatment, first and last name, e-mail address, phone number (optional), preferred date and time slot, and an optional message.",
          "This data is used exclusively to process your appointment request and get back to you. It is neither sold nor shared with third parties for commercial purposes.",
        ],
      },
      {
        h: "Transmission and retention",
        p: [
          "Requests are sent by e-mail through the infrastructure of Infomaniak Network SA, whose servers are located in Switzerland. They are kept for as long as needed to process your request and follow up on the care relationship, then deleted.",
        ],
      },
      {
        h: "Third-party services",
        p: [
          "The booking page embeds a Google Map and links to our Fresha booking calendar, each subject to its publisher's privacy terms.",
          "This site uses no tracking cookies, no analytics and no advertising.",
        ],
      },
      {
        h: "Your rights",
        p: [
          "Under the nFADP, you have the right to access, rectify and delete your data. To exercise these rights, write to contact@globalaesthetic.ch.",
          "You may also contact the Swiss Federal Data Protection and Information Commissioner (FDPIC) in case of dispute.",
        ],
      },
    ],
  },

  notFound: {
    eyebrow: "Error 404",
    title: "This page does not exist.",
    text: "The link you followed leads nowhere, but our treatments are very real.",
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
