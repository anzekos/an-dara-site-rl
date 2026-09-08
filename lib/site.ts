/**
 * Vsa vsebina strani na enem mestu.
 * Stranka ureja tukaj, ne v komponentah.
 */

export const site = {
  name: "Andara",
  tagline: "Queen of the Alps",
  descriptor: "Self-guided treks in the Julian Alps",
  email: "info@andara.si",
  url: "https://www.andara.si",
  replyTime: "within 24 hours",
  socials: {
    instagram: "https://www.instagram.com/andara.si/",
    tiktok: "https://www.tiktok.com/@andara.si",
  },
}

export const tour = {
  name: "The Triglav Circuit",
  kicker: "Self-guided trek. No guide, no group.",
  days: 7,
  distanceKm: 100,
  season: "May to September",
  party: "2 to 8 people, your own group",
  level: "Demanding",
}

/* ------------------------------------------------------------------ hero */

export const heroStats = [
  { label: "Days", value: "7" },
  { label: "Distance", value: "100 km" },
  { label: "Season", value: "May - Sep" },
  { label: "You walk with", value: "Your own group" },
]

/* -------------------------------------------- kaj self-guided sploh je */

export const selfGuidedPoints = [
  {
    title: "No guide walking with you",
    body: "Nobody sets the tempo and nobody talks over the view. You get the route, the maps and a number to call if anything goes sideways.",
  },
  {
    title: "No fixed group",
    body: "You travel with the people you chose to travel with. Two of you, or eight. There is no coach, no name badges, no stranger on the trail behind you.",
  },
  {
    title: "No fixed schedule",
    body: "Leave the hut at six or at ten. Swim in the lake, stop for strudel, take the longer ridge. The only things waiting for you are a booked bed and your luggage.",
  },
]

export const comparison = {
  headers: ["", "Self-guided with Andara", "A guided group tour"],
  rows: [
    ["Who walks with you", "Only the people you booked with", "A group of strangers plus a guide"],
    ["Daily pace", "Yours", "The group's"],
    ["Start dates", "Any date you pick in the season", "Fixed departure dates"],
    ["Route finding", "Marked trails, our maps and route notes", "You follow the guide"],
    ["Huts and guesthouses", "Booked and paid for you", "Booked for you"],
    ["Luggage", "Moved hut to hut for you", "Usually moved for you"],
    ["If something happens", "You call us, we sort it out", "The guide handles it"],
    ["Price", "Lower, you are not paying for a guide's week", "Higher"],
  ],
}

export const steps = [
  {
    n: "01",
    title: "Tell us when",
    body: "Send us your rough dates and how many of you there are. Any date between May and September works, weekends included.",
  },
  {
    n: "02",
    title: "We build the week",
    body: "We book every hut and guesthouse, arrange the luggage transfers and the road transfers, and send you the full plan with the price before you pay anything.",
  },
  {
    n: "03",
    title: "You get the pack",
    body: "Detailed maps, day by day route notes, hut contacts and our phone number. Everything you need to walk it without us.",
  },
  {
    n: "04",
    title: "You walk it",
    body: "You start when you want and finish when you want. Your bags are at the next hut before you are. We stay one call away for the whole week.",
  },
]

/* ------------------------------------------------------------- vsebina */

export const included = [
  "Detailed maps and route description for all seven days",
  "Handpicked alpine huts and guesthouses, private rooms where available",
  "Daily luggage transfers from hut to hut",
  "Breakfast and dinner featuring local cuisine",
  "Road transfers on the last two days",
  "Our phone number for the whole week",
]

export const notIncluded = [
  "A guide walking with you. This is a self-guided trek, by design.",
  "Accommodation on your arrival and departure nights",
  "Lunches on the trail, though huts along the way serve them",
  "Travel to Slovenia and back",
  "Personal hiking equipment",
  "Travel and mountain rescue insurance",
]

export const highlights = [
  {
    title: "Circle Slovenia's highest mountain",
    body: "A 100 km trekking route around Mount Triglav, 2,864 m.",
  },
  {
    title: "Crystal clear alpine lakes",
    body: "The Triglav Lakes valley, the emerald Soca and Lake Jasna.",
  },
  {
    title: "The best alternative to Tour du Mont Blanc",
    body: "The same alpine scale, a fraction of the crowds.",
  },
]

export const routeProse = [
  "Embark on a self-guided hiking adventure in Slovenia through the stunning Triglav National Park. This trail offers more than breathtaking alpine scenery. It is about the moments along the way.",
  "Towering peaks, crystal clear lakes, hidden mountain villages, warm encounters with locals, and timeless alpine traditions make this journey a true hidden gem. If you have completed the Tour du Mont Blanc, the Triglav circuit is the best alternative to it.",
  "Nestled in the heart of the Slovenian Alps, this 100 km trekking route circles Slovenia's highest mountain, Mount Triglav, 2,864 m. Recognised as one of Europe's classic multi-day treks, it belongs on every serious hiker's list.",
  "Everything is arranged from day one: detailed maps of the entire route, handpicked accommodation in charming alpine huts and guesthouses, hearty local cuisine, and seamless daily luggage transfers. You walk with a light daypack, free to savour every step and every view.",
]

/* ---------------------------------------------------------- itinerarij */

export const itinerary = [
  {
    day: 1,
    title: "Bohinj to Prehodavci",
    description:
      "Starting from Planina Blato, the trail winds across alpine pastures and through the valley of the Triglav Lakes. Step by step, the horizon opens until Prehodavci greets you with your first true touch of the high mountains.",
    hours: "6-8 h",
    distance: "~14 km",
    up: "+1,150 m",
    down: "-220 m",
    difficulty: "Demanding",
    image: "/lake-bohinj.jpg",
    alt: "Lake Bohinj, where the Triglav circuit begins",
    mapLink:
      "https://www.google.com/maps/dir/Ob%C4%8Dina+Bohinj/Zasavska+ko%C4%8Da+na+Prehodavcih,+5232+So%C4%8Da/@46.3150527,13.7919491,12z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x477a8d690162778d:0x400f81c823fec60!2m2!1d13.9563992!2d46.2715959!1m5!1m1!1s0x477a8a0b2e8da561:0x2c49e12588417d5b!2m2!1d13.7922622!2d46.3585131!3e2?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    day: 2,
    title: "Prehodavci to Bovec",
    description:
      "A long descent through the enchanting Trenta Valley brings you closer to the emerald Soca. Towering cliffs and alpine meadows guide the way, until the friendly town of Bovec welcomes you at the end of the day.",
    hours: "5-7 h",
    distance: "~10 km",
    up: "+150 m",
    down: "-1,400 m",
    difficulty: "Moderate",
    image: "/zasavska-koca.jpg",
    alt: "Zasavska koca na Prehodavcih mountain hut",
    mapLink:
      "https://www.google.com/maps/dir/Zasavska+ko%C4%8Da+na+Prehodavcih,+5232+So%C4%8Da/Bovec/@46.3346884,13.591115,12z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x477a8a0b2e8da561:0x2c49e12588417d5b!2m2!1d13.7922622!2d46.3585131!1m5!1m1!1s0x477a683c5d0fdefb:0x5d345816713d53fd!2m2!1d13.5516829!2d46.3376387!3e2?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    day: 3,
    title: "Bovec to Vrsic",
    description:
      "Following the Soca upstream, the path climbs steadily toward the legendary Vrsic Pass. Serpentine trails and a short detour across Spicka reveal panoramas that reward every step.",
    hours: "6-8 h",
    distance: "~12 km",
    up: "+1,200 m",
    down: "-250 m",
    difficulty: "Demanding",
    image: "/soca-valley-bovec.jpg",
    alt: "The emerald Soca river near Bovec",
    mapLink:
      "https://www.google.com/maps/dir/Bovec/Vr%C5%A1i%C4%8D,+5232+So%C4%8Da/@46.383106,13.5649735,12z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x477a683c5d0fdefb:0x5d345816713d53fd!2m2!1d13.5516829!2d46.3376387!1m5!1m1!1s0x477a639e901fe117:0x62434b431f29ec06!2m2!1d13.7430709!2d46.432897!3e2?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    day: 4,
    title: "Vrsic to Kranjska Gora",
    description:
      "A gentle descent opens into the crystal clear Jasna Valley, leading you into Kranjska Gora. This alpine village is perfect for slowing down, exploring, and soaking in the mountain spirit.",
    hours: "4-5 h",
    distance: "~12 km",
    up: "+100 m",
    down: "-850 m",
    difficulty: "Easy to moderate",
    image: "/vrsic-pass.jpg",
    alt: "The Vrsic Pass road winding through the Julian Alps",
    mapLink:
      "https://www.google.com/maps/dir/Vr%C5%A1i%C4%8D,+5232+So%C4%8Da/Kranjska+Gora,+4280/@46.4593832,13.7252755,13z/data=!3m1!4b1!4m6!3m5!1s0x477a7ce5980f8af5:0xdc10e282bbdf9dde!8m2!3d46.485884!4d13.7898423!16zL20vMHE5X2w?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    day: 5,
    title: "Rest day in Kranjska Gora",
    description:
      "A day to recover or explore at your own pace. Take a relaxed walk, cycle to nearby lakes, or climb a surrounding peak for wide open views. Optional additions include Vitranc peak or cycling to the Italian lakes.",
    hours: "Your call",
    distance: "Optional",
    up: "-",
    down: "-",
    difficulty: "Flexible",
    image: "/kranjska-gora.jpg",
    alt: "Lake Jasna in Kranjska Gora",
    mapLink:
      "https://www.google.com/maps/place/4280+Kranjska+Gora/@46.4603615,13.6883718,12z/data=!3m1!4b1!4m6!3m5!1s0x477a7ce5980f8af5:0xdc10e282bbdf9dde!8m2!3d46.485884!4d13.7898423!16zL20vMHE5X2w?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    day: 6,
    title: "Kranjska Gora to Mojstrana",
    description:
      "Begin with a hike to the hidden Martuljek waterfalls, sparkling gems in the forest. Later, a short bus transfer takes you to Mojstrana, the welcoming gateway to the Vrata Valley.",
    hours: "3-4 h",
    distance: "~8 km",
    up: "+200 m",
    down: "-200 m",
    difficulty: "Easy",
    image: "/mojstrana-sunset.jpg",
    alt: "Sunset over Mojstrana and the Vrata Valley",
    mapLink:
      "https://www.google.com/maps/dir/Kranjska+Gora,+4280/Mojstrana,+4281/@46.4774508,13.817046,12.74z/data=!4m14!4m13!1m5!1m1!1s0x477a7ce5980f8af5:0xdc10e282bbdf9dde!2m2!1d13.7898423!2d46.485884!1m5!1m1!1s0x477a86744015ed1d:0xa00f81eceaab6f0!2m2!1d13.9395387!2d46.461301!3e2?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    day: 7,
    title: "Mojstrana to Bled",
    description:
      "The journey culminates in the Vrata Valley beneath the mighty north face of Triglav. A final transfer brings you to Bled, where lake and castle complete this alpine fairy tale.",
    hours: "3-4 h",
    distance: "~8 km",
    up: "+200 m",
    down: "-200 m",
    difficulty: "Easy",
    image: "/lake-bled.jpg",
    alt: "Lake Bled with the island church",
    mapLink:
      "https://www.google.com/maps/dir/Mojstrana,+4281/Bled,+4260/@46.4139546,13.9561348,12z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x477a86744015ed1d:0xa00f81eceaab6f0!2m2!1d13.9395387!2d46.461301!1m5!1m1!1s0x477a8e1dd7139961:0x400f81c823fec50!2m2!1d14.1145798!2d46.3683266!3e2?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
  },
]

/* ---------------------------------------------------------------- video */

export const videos = {
  // .mp4, ne .mov: Cloudinary transkodira sam, Chrome QuickTime kontejnerja pogosto ne predvaja.
  // Poster je pravi kader iz videa (so_ = start offset v sekundah), zato je lazji od fotografije.
  intro: {
    src: "https://res.cloudinary.com/dztjnhhps/video/upload/f_auto,q_auto/v1764757850/ANDARA_SPLET_mvkm5u.mp4",
    poster:
      "https://res.cloudinary.com/dztjnhhps/video/upload/so_3,w_1200,f_auto,q_auto/v1764757850/ANDARA_SPLET_mvkm5u.jpg",
  },
  map: {
    src: "https://res.cloudinary.com/dztjnhhps/video/upload/f_auto,q_auto,w_1600/v1766135736/1_TRIGLAVSKI_NARODNI_PARK_4k_iy34xw.mp4",
    poster:
      "https://res.cloudinary.com/dztjnhhps/video/upload/so_5,w_1200,f_auto,q_auto/v1766135736/1_TRIGLAVSKI_NARODNI_PARK_4k_iy34xw.jpg",
  },
}

/* ------------------------------------------------------------------ FAQ */

export const faq = [
  {
    q: "Wait, is there a guide with us or not?",
    a: "There is not, and that is the whole point. This is a self-guided trek. You walk the route on your own, with only the people you booked with. Everything around the walking is arranged for you: the huts, the meals, the luggage transfers, the maps and the route notes. If you want somebody walking beside you every day, this is not the right trip, and we would rather tell you that now.",
  },
  {
    q: "Can we really not get lost?",
    a: "The daily hikes are on well marked trails and you will meet other hikers along the way. You receive a detailed map and a written description of every day. The trails inside the national park are narrow and often rocky, so sturdy footwear is essential and basic orientation skills help.",
  },
  {
    q: "What if something goes wrong on the trail?",
    a: "You have our phone number for the whole week and we are in Slovenia while you walk. If the weather turns, if somebody twists an ankle, if you simply need to stop a day early, you call us and we rearrange the huts and the transfers.",
  },
  {
    q: "What type of accommodation is provided?",
    a: "Our carefully selected alpine huts and guesthouses offer a warm atmosphere, welcoming hosts, and beautiful locations. Private rooms are planned for your stay, with two exceptions where only shared accommodation is available. These huts are popular not only with hikers but also with travelers seeking an authentic alpine experience.",
  },
  {
    q: "How is accommodation on arrival and departure?",
    a: "Accommodation on your arrival and departure days is not included and should be arranged individually. For your arrival, we recommend staying in Bohinj, for example Vila Majerca or Hotel Bohinj. For your final night, we suggest booking accommodation in Bled, for example Adora Luxury Hotel, Hotel Triglav, Vila Bled or Penzion Berc.",
  },
  {
    q: "How does luggage transport work?",
    a: "We transfer your luggage from cabin to cabin, so you only need to carry a daypack. The only exception is day 1, when you need to bring extra clothes, as the cabin sits in the heart of the mountains with no road access.",
  },
  {
    q: "What meals are included?",
    a: "During your stay, breakfast and dinner are included, each prepared with fresh local ingredients that showcase the rich traditions of Slovenian cuisine. From hearty mountain dishes to authentic regional flavors, every meal is part of the journey. Along the trail, you will also find plenty of huts offering tasty lunch options.",
  },
  {
    q: "How difficult is the Triglav Tour?",
    a: "The Triglav Tour features demanding terrain with long ascents and descents, typically 6 to 8 hours of hiking per day. Routes may include stream crossings and require good orientation skills. Participants should have prior hiking experience and be in good physical condition.",
  },
  {
    q: "What equipment do I need?",
    a: "To fully enjoy your hiking adventure in the mountains, it is essential to be prepared for changing weather and local conditions. We recommend warm, waterproof layers, hiking boots, sunscreen and sunglasses. Hiking poles are also highly recommended. A full list is available on request.",
  },
  {
    q: "When should we come, and how far ahead do we book?",
    a: "The best time to hike Triglav and enjoy multi-day trekking routes in Triglav National Park is from May to September. Temperatures typically range between 15 and 25 degrees, creating excellent conditions for both day hikes and multi-day adventures. Since Triglav is Slovenia's most iconic peak and attracts hikers from around the world, we recommend booking at least 6 months in advance. This ensures the best availability in mountain huts and lets us plan your route carefully.",
  },
  {
    q: "What does it cost?",
    a: "We price each trek on your dates and the size of your group, because hut rates and transfers change with both. Send us your dates and how many of you there are, and you get a full price with everything itemised, within 24 hours. Nothing is asked of you until you say yes.",
  },
]

/* ------------------------------------------------------------------ about */

export const about = {
  intro:
    "We began our story as two friends who found freedom and joy in exploring mountains and hidden getaways. Our adventures took us across Europe's most iconic trails, from the legendary Tour du Mont Blanc, to the fjords of Norway, and the classic Dolomites. On these journeys, we discovered the beauty of self-guided hiking, a way to explore new countries, meet locals, and move at our own pace.",
  intro2:
    "With backgrounds in science and more than 20 years of experience in the pharmaceutical industry, we are driven by curiosity, transformation, and the desire to follow new paths. Hiking has become not just a passion, but a way of life, one that combines adventure, freedom, and a deep connection to nature.",
  mission:
    "Together, we created a local self-guided hiking agency in Slovenia to share the magic of the Slovenian Alps. Our mission is simple: to help travelers experience authentic adventures, with the freedom to walk at their own rhythm, while discovering breathtaking landscapes and local culture.",
  mission2:
    "Whether you dream of hiking in the Julian Alps, exploring Triglav National Park, or finding hidden alpine valleys, we craft routes that bring you closer to nature, adventure, and yourself.",
  people: [
    {
      name: "Anja Bervar",
      initials: "AB",
      role: "Routes and mountain logistics",
      bio: "Grew up with climbing in the cradle, and became the first woman to snowboard down Denali, the highest mountain in North America. Anja has also climbed Mont Blanc, the Matterhorn and the Eiger, among others. Today she balances family life with two kids and a continued love for the outdoors.",
      place: "From the mountains of Slovenia",
    },
    {
      name: "Darja Munda",
      initials: "DM",
      role: "Hosts, huts and everything on the ground",
      bio: "Started life on the flatlands of eastern Slovenia, far from the peaks. Yet over the years, the mountains became a place for self growth and discovery. A true animal lover, especially devoted to her dog, she finds peace and joy in every trail.",
      place: "From the plains of Eastern Slovenia",
    },
  ],
  values: [
    { title: "Local expertise", body: "Deep knowledge of Slovenian Alps trails and hidden gems." },
    { title: "Personal connection", body: "We craft experiences that resonate with your hiking dreams." },
    { title: "Sustainable tourism", body: "Respecting nature and supporting local communities." },
    { title: "Adventure with comfort", body: "Challenging hikes with comfortable accommodation." },
  ],
  faq: [
    {
      q: "Why choose self-guided hiking?",
      a: "Self-guided hiking offers the perfect balance of structure and freedom. We handle the logistics, the accommodation, the luggage transfers and the route planning, so you can explore at your own pace, linger at beautiful viewpoints, and have authentic encounters with locals without being tied to a group schedule.",
    },
    {
      q: "How do you create your hiking routes?",
      a: "Each route is personally tested and curated by us. We combine our local knowledge with our experience hiking across Europe's most iconic trails. We select paths that offer the most breathtaking scenery, cultural immersion, and appropriate challenge levels for different hiking abilities.",
    },
    {
      q: "What makes the Slovenian Alps special?",
      a: "The Slovenian Alps offer pristine natural beauty without the crowds of other European alpine destinations. You will discover crystal clear lakes, emerald rivers, charming mountain villages, and warm hospitality. It is a hidden gem that combines adventure with authentic cultural experiences.",
    },
    {
      q: "How experienced do I need to be?",
      a: "We offer routes for various fitness levels. While some tours require good physical condition and previous hiking experience, we also have options for beginners or those who prefer gentler trails. We help you choose the right route based on your experience and preferences.",
    },
  ],
}

/* -------------------------------------------------------- image credits */

export const imageCredits = [
  { label: "Triglav y Valle de Vrata", href: "https://commons.wikimedia.org/wiki/File:Triglav_y_Valle_de_Vrata_%2814202569306%29_%282%29.jpg" },
  { label: "Slovenia's Lake Bohinj, facing south", href: "https://commons.wikimedia.org/wiki/File:Slovenia%27s_Lake_Bohinj,_facing_south.jpg" },
  { label: "Zasavska koca na Prehodavcih", href: "https://commons.wikimedia.org/wiki/File:Zasavska_ko%C4%8Da_na_Prehodavcih.jpg" },
  { label: "Soca in Bovec", href: "https://commons.wikimedia.org/wiki/File:So%C4%8Da_in_Bovec.jpg" },
  { label: "Vrsic Pass", href: "https://commons.wikimedia.org/wiki/File:Vr%C5%A1i%C4%8D_%289782808046%29.jpg" },
  { label: "Kranjska Gora, Slovenia", href: "https://commons.wikimedia.org/wiki/File:Kranjska_Gora,_Slovenia_%2849547008976%29.jpg" },
  { label: "Mojstrana sunset", href: "https://commons.wikimedia.org/wiki/File:Mojstrana_sunset.jpg" },
  { label: "Lake Bled", href: "https://commons.wikimedia.org/wiki/File:Lake_bled_2021.jpg" },
  { label: "Mountains in Slovenian Alps", href: "https://commons.wikimedia.org/wiki/File:Mountains_in_Slovenian_Alps_%2842882298630%29.jpg" },
]
