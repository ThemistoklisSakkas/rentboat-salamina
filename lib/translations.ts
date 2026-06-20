export type Lang = "en" | "gr";

const en = {
  nav: {
    home: "Home",
    fleet: "Fleet",
    contact: "Contact",
    bookNow: "Book Now",
  },
  footer: {
    tagline:
      "Explore. Discover. Live. Your gateway to the hidden paradise of Salamina island — no license required.",
    navTitle: "Navigation",
    links: {
      home: "Home",
      fleet: "Our Fleet",
      booking: "Book a Boat",
      contact: "Contact Us",
    },
    contactTitle: "Contact",
    marina: "Salamina Marina",
    rights: "All rights reserved.",
  },
  home: {
    badge: "Boat Rental Without License · Salamina, Greece",
    h1a: "Explore.",
    h1b: "Discover.",
    h1c: "Live.",
    heroDesc:
      "Set sail from Salamina Marina and discover hidden beaches, ancient ruins, and crystal-clear Aegean waters — no license required.",
    bookNow: "Book Now",
    viewFleet: "View Fleet",
    scroll: "Scroll",
    whyBadge: "Why Rent With Us",
    whyTitle: "The Easiest Way to Explore",
    whySalamina: "Salamina",
    features: [
      {
        title: "No License Needed",
        desc: "All our boats are available without a boating license. Just show up and sail.",
      },
      {
        title: "Explore Freely",
        desc: "Discover 14 secret beaches and historic landmarks across Salamina island.",
      },
      {
        title: "Up to 10 Guests",
        desc: "From solo trips to large groups — we have the perfect vessel for every crew.",
      },
      {
        title: "Flexible Rental",
        desc: "Half-day, full-day, or multi-day rentals. Book by phone, email, or WhatsApp.",
      },
    ],
    destBadge: "Must-Visit Spots",
    destTitle: "14 Stunning",
    destHighlight: "Destinations",
    destDesc:
      "From secluded beaches to ancient ruins — Salamina island is a lesser-known Greek paradise waiting to be discovered.",
    destinations: [
      "Kanakia",
      "Aias Beach",
      "Lamprano Beach",
      "Secret Beaches",
      "Euripides' Cave",
      "Konchi Lighthouse",
      "Ancient Salamina",
      "Salamis Monument",
      "Iliaxti Beach",
      "Columns Patitiri",
      "Kohi Beach",
      "Archaeological Museum",
      "Karaiskakis Tomb",
      "Sikelianos House",
    ],
    fleetBadge: "Our Vessels",
    fleetTitle: "Our Fleet,",
    fleetHighlight: "Endless Adventures",
    viewAll: "View All Boats →",
    pax: "pax",
    reviewsBadge: "Happy Sailors",
    reviewsTitle: "What Our Guests Say",
    googleReviews: "Read all our reviews on Google",
    reviews: [
      {
        name: "Maria K.",
        text: "An incredible experience! We found hidden beaches we never knew existed. No license needed made it so easy.",
      },
      {
        name: "Nikos P.",
        text: "Rented the Andromeda for a day trip with friends. The boat was amazing and the team was very helpful.",
      },
      {
        name: "Sophie L.",
        text: "Renting without a license was so simple, and the crystal-clear waters around Salamina were unforgettable. Absolutely loved it!",
      },
    ],
    ctaTitle: "Ready to Set Sail?",
    ctaDesc:
      "Call us, send an email, or fill in our booking form. No license needed — just bring your sense of adventure.",
    bookOnline: "Book Online",
  },
  fleet: {
    badge: "Our Fleet",
    title: "Find Your Perfect",
    titleHighlight: "Vessel",
    subtitle:
      "All our boats are available without a boating license. Choose the one that fits your group size and adventure style.",
    contactPrice: "Contact for price",
    from: "From",
    perDay: "/ day",
    passengers: "passengers",
    avg: "avg",
    max: "max",
    bookBtn: "Book",
    noteText: "For pricing, availability, and reservations please",
    callUs: "call us",
    or: "or",
    emailUs: "email us",
    noteSuffix:
      ". Reservations require at least 24 hours notice. Booking system available below.",
    boats: [
      {
        description:
          "A sleek and agile speedboat perfect for couples or small groups. Ideal for reaching hidden coves, snorkelling spots, and the secret beaches of Salamina.",
        features: [
          "No license required",
          "Life jackets included",
          "Snorkelling gear",
          "Cooler box",
        ],
      },
      {
        description:
          "A reliable and comfortable speedboat designed for easy day cruising. Perfect for families with children exploring the shores and bays of Salamina.",
        features: [
          "No license required",
          "Life jackets included",
          "Bluetooth speaker",
          "Anchor",
        ],
      },
      {
        description:
          "As the name suggests — pure quality. A well-maintained vessel offering a smooth and enjoyable ride for up to 5 passengers along the Salamina coastline.",
        features: [
          "No license required",
          "Life jackets included",
          "Cooler box",
          "Fishing gear (optional)",
        ],
      },
      {
        description:
          "The crown jewel of our fleet. The Technohull Alpha 40 is a high-performance luxury RIB with 2 x 400hp engines, capable of breathtaking speeds up to 70 knots. A professional skipper is included.",
        features: [
          "Professional skipper included",
          "Bluetooth / radio",
          "Swimming ladder",
          "Life jackets included",
        ],
      },
    ],
  },
  booking: {
    badge: "Reservations",
    title: "Book Your",
    titleHighlight: "Adventure",
    subtitle:
      "Fill in the form and we'll confirm within 24 hours. Or call us directly — we're always happy to help.",
    sectionPersonal: "Your Details",
    fullName: "Full Name",
    fullNamePlaceholder: "John Smith",
    phone: "Phone Number",
    phonePlaceholder: "+30 69X XXX XXXX",
    email: "Email Address",
    emailPlaceholder: "you@example.com",
    sectionBooking: "Booking Details",
    selectBoat: "Select Boat",
    selectBoatPlaceholder: "Choose a boat…",
    startDate: "Start Date",
    endDate: "End Date",
    endDateOptional: "(optional)",
    guests: "Number of Guests",
    guestsPlaceholder: "e.g. 4",
    notes: "Additional Notes",
    notesPlaceholder: "Destinations you have in mind, special requests…",
    submit: "Send Booking Request",
    disclaimer:
      "We'll confirm your booking within 24 hours. A €50 deposit within 48 hours secures your reservation.",
    termsTitle: "Booking Terms",
    terms: [
      "A €50 deposit is required within 48 hours to confirm your booking.",
      "Fuel is NOT included in the rental price.",
      "Meeting point: Salamina Marina.",
    ],
    successTitle: "Request Received!",
    successMsg: (name: string, boat: string, date: string) =>
      `Thanks, ${name}! We received your request for ${boat} on ${date}.`,
    successSub:
      "We'll confirm your booking within 24 hours via phone or email.",
    callUsBtn: "Call Us",
    emailUsBtn: "Email Us",
  },
  contact: {
    badge: "Get In Touch",
    title: "We're Here to",
    titleHighlight: "Help",
    subtitle:
      "Ready to book or have a question? Reach out by phone, email, or social media — we respond quickly.",
    phoneTitle: "Phone & WhatsApp",
    emailTitle: "Email",
    locationTitle: "Location",
    meetingPoint: "Meeting point: Salamina Marina",
    reservationsTitle: "Reservations",
    byPhone: "By phone, email, or WhatsApp",
    notice: "Minimum 24 hours notice required",
    openMaps: "Open in Google Maps",
    followUs: "Follow Us",
    ctaBadge: "Ready to book?",
    ctaTitle: "Reserve Your Boat Today",
    ctaDesc: "No license needed — just show up and sail.",
    callNow: "Call Now",
    bookOnline: "Book Online",
  },
};

const gr: typeof en = {
  nav: {
    home: "Αρχική",
    fleet: "Στόλος",
    contact: "Επικοινωνία",
    bookNow: "Κράτηση",
  },
  footer: {
    tagline:
      "Εξερεύνησε. Ανακάλυψε. Ζήσε. Η πύλη σου στον κρυφό παράδεισο της Σαλαμίνας — χωρίς δίπλωμα.",
    navTitle: "Πλοήγηση",
    links: {
      home: "Αρχική",
      fleet: "Ο Στόλος Μας",
      booking: "Κλείσε Σκάφος",
      contact: "Επικοινωνία",
    },
    contactTitle: "Επαφή",
    marina: "Μαρίνα Σαλαμίνας",
    rights: "Με επιφύλαξη παντός δικαιώματος.",
  },
  home: {
    badge: "Ενοικίαση Σκάφους Χωρίς Δίπλωμα · Σαλαμίνα, Ελλάδα",
    h1a: "Εξερεύνησε.",
    h1b: "Ανακάλυψε.",
    h1c: "Ζήσε.",
    heroDesc:
      "Αναχώρησε από τη Μαρίνα Σαλαμίνας και ανακάλυψε κρυφές παραλίες, αρχαία ερείπια και κρυστάλλινα νερά του Αιγαίου — χωρίς δίπλωμα.",
    bookNow: "Κράτηση",
    viewFleet: "Δες τον Στόλο",
    scroll: "Κύλιση",
    whyBadge: "Γιατί να Μας Επιλέξεις",
    whyTitle: "Ο Πιο Εύκολος Τρόπος να Εξερευνήσεις τη",
    whySalamina: "Σαλαμίνα",
    features: [
      {
        title: "Χωρίς Δίπλωμα",
        desc: "Όλα μας τα σκάφη είναι διαθέσιμα χωρίς δίπλωμα ναυσιπλοΐας. Απλώς εμφανίσου και πλεύσε.",
      },
      {
        title: "Εξερεύνησε Ελεύθερα",
        desc: "Ανακάλυψε 14 κρυφές παραλίες και ιστορικά αξιοθέατα σε όλη τη Σαλαμίνα.",
      },
      {
        title: "Έως 10 Επιβάτες",
        desc: "Μόνος, με ζευγάρι ή με μεγάλη παρέα — έχουμε το ιδανικό σκάφος για κάθε ομάδα.",
      },
      {
        title: "Ευέλικτη Ενοικίαση",
        desc: "Μισή ή ολόκληρη ημέρα, καθώς και πολλές ημέρες. Κράτηση μέσω τηλεφώνου, email ή WhatsApp.",
      },
    ],
    destBadge: "Αξιοθέατα",
    destTitle: "14 Εκπληκτικοί",
    destHighlight: "Προορισμοί",
    destDesc:
      "Από απομακρυσμένες παραλίες έως αρχαία ερείπια — η Σαλαμίνα είναι ένας άγνωστος ελληνικός παράδεισος που σε περιμένει.",
    destinations: [
      "Κανάκια",
      "Παραλία Αίας",
      "Παραλία Λαμπρανό",
      "Μυστικές Παραλίες",
      "Σπήλαιο Ευριπίδη",
      "Φάρος Κόγχης",
      "Αρχαία Σαλαμίνα",
      "Τύμβος Σαλαμινομάχων",
      "Παραλία Ηλιαχτή",
      "Κολώνες Πατητήρι",
      "Παραλία Κόγχη",
      "Αρχαιολογικό Μουσείο",
      "Τάφος Καραϊσκάκη",
      "Οικία Σικελιανού",
    ],
    fleetBadge: "Τα Σκάφη Μας",
    fleetTitle: "Ο Στόλος Μας,",
    fleetHighlight: "Ατελείωτες Περιπέτειες",
    viewAll: "Δες Όλα τα Σκάφη →",
    pax: "επιβ.",
    reviewsBadge: "Ευτυχισμένοι Ναύτες",
    reviewsTitle: "Τι Λένε οι Επισκέπτες Μας",
    googleReviews: "Διάβασε όλες τις κριτικές μας στο Google",
    reviews: [
      {
        name: "Μαρία Κ.",
        text: "Μια απίστευτη εμπειρία! Βρήκαμε κρυφές παραλίες που δεν ήξερε κανείς. Το γεγονός ότι δεν χρειαζόταν δίπλωμα τα έκανε όλα τόσο εύκολα.",
      },
      {
        name: "Νίκος Π.",
        text: "Νοικιάσαμε την Andromeda για μια ημερήσια εκδρομή με φίλους. Το σκάφος ήταν καταπληκτικό και η ομάδα πολύ εξυπηρετική.",
      },
      {
        name: "Σοφία Λ.",
        text: "Η ενοικίαση χωρίς δίπλωμα ήταν πανεύκολη και τα κρυστάλλινα νερά γύρω από τη Σαλαμίνα ήταν αξέχαστα. Το λατρέψαμε!",
      },
    ],
    ctaTitle: "Έτοιμος να Αποπλεύσεις;",
    ctaDesc:
      "Τηλεφώνησε μας, στείλε email ή συμπλήρωσε τη φόρμα κράτησης. Δεν χρειάζεσαι δίπλωμα — απλώς φέρε τη διάθεση για περιπέτεια.",
    bookOnline: "Κράτηση Online",
  },
  fleet: {
    badge: "Ο Στόλος Μας",
    title: "Βρες το Ιδανικό σου",
    titleHighlight: "Σκάφος",
    subtitle:
      "Όλα τα σκάφη μας είναι διαθέσιμα χωρίς δίπλωμα ναυσιπλοΐας. Επίλεξε αυτό που ταιριάζει στην ομάδα και στο στυλ περιπέτειάς σου.",
    contactPrice: "Επικοινωνήστε για τιμή",
    from: "Από",
    perDay: "/ ημέρα",
    passengers: "επιβάτες",
    avg: "μέση",
    max: "μέγ.",
    bookBtn: "Κράτηση",
    noteText: "Για τιμές, διαθεσιμότητα και κρατήσεις παρακαλούμε",
    callUs: "καλέστε μας",
    or: "ή",
    emailUs: "στείλτε email",
    noteSuffix:
      ". Οι κρατήσεις απαιτούν τουλάχιστον 24 ώρες προειδοποίηση.",
    boats: [
      {
        description:
          "Ένα κομψό και ευέλικτο ταχύπλοο ιδανικό για ζευγάρια ή μικρές παρέες. Ιδανικό για να φτάσεις σε κρυφούς όρμους, σημεία κατάδυσης και τις μυστικές παραλίες της Σαλαμίνας.",
        features: [
          "Χωρίς δίπλωμα",
          "Σωσίβια περιλαμβάνονται",
          "Εξοπλισμός κατάδυσης",
          "Φορητό ψυγείο",
        ],
      },
      {
        description:
          "Ένα αξιόπιστο και άνετο ταχύπλοο σχεδιασμένο για εύκολες ημερήσιες βόλτες. Ιδανικό για οικογένειες με παιδιά που εξερευνούν τις ακτές και τους κόλπους της Σαλαμίνας.",
        features: [
          "Χωρίς δίπλωμα",
          "Σωσίβια περιλαμβάνονται",
          "Ηχείο Bluetooth",
          "Άγκυρα",
        ],
      },
      {
        description:
          "Όπως λέει και το όνομά του — αγνή ποιότητα. Ένα καλά συντηρημένο σκάφος που προσφέρει ομαλή και ευχάριστη διαδρομή για έως 5 επιβάτες κατά μήκος της ακτογραμμής της Σαλαμίνας.",
        features: [
          "Χωρίς δίπλωμα",
          "Σωσίβια περιλαμβάνονται",
          "Φορητό ψυγείο",
          "Εξοπλισμός ψαρέματος (προαιρ.)",
        ],
      },
      {
        description:
          "Το κόσμημα του στόλου μας. Το Technohull Alpha 40 είναι ένα πολυτελές RIB υψηλών επιδόσεων με 2 x 400hp κινητήρες, ικανό για ταχύτητες έως 70 κόμβους. Περιλαμβάνεται επαγγελματίας κυβερνήτης.",
        features: [
          "Επαγγελματίας κυβερνήτης (περιλαμβάνεται)",
          "Bluetooth / ραδιόφωνο",
          "Σκάλα κολύμβησης",
          "Σωσίβια περιλαμβάνονται",
        ],
      },
    ],
  },
  booking: {
    badge: "Κρατήσεις",
    title: "Κλείσε την",
    titleHighlight: "Περιπέτειά σου",
    subtitle:
      "Συμπλήρωσε τη φόρμα και θα επιβεβαιώσουμε εντός 24 ωρών. Ή κάλεσέ μας απευθείας — χαρούμε να βοηθήσουμε.",
    sectionPersonal: "Τα Στοιχεία σου",
    fullName: "Ονοματεπώνυμο",
    fullNamePlaceholder: "Γιάννης Παπαδόπουλος",
    phone: "Αριθμός Τηλεφώνου",
    phonePlaceholder: "+30 69X XXX XXXX",
    email: "Διεύθυνση Email",
    emailPlaceholder: "example@email.com",
    sectionBooking: "Στοιχεία Κράτησης",
    selectBoat: "Επιλογή Σκάφους",
    selectBoatPlaceholder: "Επίλεξε σκάφος…",
    startDate: "Ημερομηνία Έναρξης",
    endDate: "Ημερομηνία Λήξης",
    endDateOptional: "(προαιρετικό)",
    guests: "Αριθμός Επιβατών",
    guestsPlaceholder: "π.χ. 4",
    notes: "Επιπλέον Σημειώσεις",
    notesPlaceholder: "Προορισμοί που έχεις στο μυαλό, ειδικές απαιτήσεις…",
    submit: "Αποστολή Αιτήματος Κράτησης",
    disclaimer:
      "Θα επιβεβαιώσουμε την κράτησή σου εντός 24 ωρών. Προκαταβολή 50€ εντός 48 ωρών εξασφαλίζει την κράτησή σου.",
    termsTitle: "Όροι Κράτησης",
    terms: [
      "Απαιτείται προκαταβολή 50€ εντός 48 ωρών για την επιβεβαίωση της κράτησης.",
      "Τα καύσιμα ΔΕΝ περιλαμβάνονται στην τιμή ενοικίασης.",
      "Σημείο συνάντησης: Μαρίνα Σαλαμίνας.",
    ],
    successTitle: "Αίτημα Ελήφθη!",
    successMsg: (name: string, boat: string, date: string) =>
      `Ευχαριστούμε, ${name}! Λάβαμε το αίτημά σου για ${boat} στις ${date}.`,
    successSub:
      "Θα επιβεβαιώσουμε την κράτησή σου εντός 24 ωρών μέσω τηλεφώνου ή email.",
    callUsBtn: "Κάλεσέ μας",
    emailUsBtn: "Email",
  },
  contact: {
    badge: "Επικοινωνία",
    title: "Είμαστε Εδώ",
    titleHighlight: "για Εσάς",
    subtitle:
      "Έτοιμος να κλείσεις ή έχεις κάποια απορία; Επικοινώνησε μέσω τηλεφώνου, email ή social media — απαντάμε γρήγορα.",
    phoneTitle: "Τηλέφωνο & WhatsApp",
    emailTitle: "Email",
    locationTitle: "Τοποθεσία",
    meetingPoint: "Σημείο συνάντησης: Μαρίνα Σαλαμίνας",
    reservationsTitle: "Κρατήσεις",
    byPhone: "Μέσω τηλεφώνου, email ή WhatsApp",
    notice: "Απαιτείται ειδοποίηση 24 ώρες νωρίτερα",
    openMaps: "Άνοιγμα στο Google Maps",
    followUs: "Ακολούθησε μας",
    ctaBadge: "Έτοιμος να κλείσεις;",
    ctaTitle: "Κλείσε το Σκάφος σου Σήμερα",
    ctaDesc: "Χωρίς δίπλωμα — απλώς εμφανίσου και πλεύσε.",
    callNow: "Κάλεσε Τώρα",
    bookOnline: "Κράτηση Online",
  },
};

export const translationsMap = { en, gr };
