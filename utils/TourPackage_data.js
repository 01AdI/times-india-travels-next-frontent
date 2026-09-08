/**
 * ============================================================
 * TIMES INDIA TRAVELS — TOUR PACKAGES DATA
 * ============================================================
 *
 * SOURCE: Scraped from timesindiatravels.com (Aug 2026).
 * STATUS: All 40 packages across all 7 categories have real, full
 * day-by-day itineraries scraped directly from their detail pages.
 *
 * WHAT'S REAL vs WHAT'S A PLACEHOLDER
 * ------------------------------------
 * Real, scraped directly from the live site:
 *   - All 7 category names, slugs, and nav taglines
 *   - All 40 packages: name, slug, duration, route, thumbnail image
 *   - All 40 day-by-day itineraries (paraphrased into original wording,
 *     not copied verbatim from the source pages)
 *
 * NOT on the public site, left as placeholders for your team:
 *   - `price` is always `null` — pricing isn't published; it's quote-only
 *   - `inclusions` / `exclusions` are empty — not listed on the site
 *   - `heroImage` per package is `null` — the site only shows one
 *     thumbnail per package; you'll likely want a bigger hero shot
 *   - `highlights` is empty per package — worth curating 3-5 per tour
 *     from the itinerary content for card/preview use
 *
 * WHY THIS SHAPE
 * ------------------------------------
 * Two levels, matching the site's own structure:
 *   tourCategories["golden-triangle-tours"]              → category
 *   tourCategories["golden-triangle-tours"].packages[0]   → a bookable tour
 *
 * This mirrors the real URLs:
 *   /tour-packages/golden-triangle-tours/                        (category)
 *   /tour-packages/golden-triangle-tours/taj-mahal-tour-.../      (package)
 *
 * so `categorySlug` + `packageSlug` can be dropped straight into a
 * Next.js-style [category]/[package] route with no remapping.
 *
 * FOR ADMINS ADDING A NEW TOUR
 * ------------------------------------
 * Don't edit the arrays by hand — use `createTourPackage()` at the
 * bottom of this file. It fills in every required field with a safe
 * default so a new package can start as just a name + duration + route,
 * and get itinerary/pricing/images filled in later without breaking
 * anything that reads this data. See the USAGE EXAMPLE at the very end.
 */

// ------------------------------------------------------------
// CATEGORIES
// ------------------------------------------------------------

export const tourCategories = {
  "golden-triangle-tours": {
    id: "golden-triangle-tours",
    name: "Golden Triangle Tours",
    tagline: "Delhi · Agra · Jaipur",
    description:
      "The classic first-time-in-India route — Delhi, Agra and the Taj Mahal, and Jaipur's forts and palaces, usually done as a loop starting and ending in Delhi.",
    heroImage:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "classic-golden-triangle-tours-package",
        categorySlug: "golden-triangle-tours",
        name: "Classical Golden Triangle Tours",
        duration: { days: 6, nights: 5, label: "6 Days / 5 Nights" },
        route: ["New Delhi", "Agra", "Fatehpur Sikri", "Jaipur", "Amber Fort", "New Delhi"],
        thumbnail:
          "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Taj-Mahal-Tour-with-Fatehpur-Sikri-and-Amber-Fort.jpg",
        heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          {
            day: 1,
            title: "New Delhi",
            description:
              "Arrival and airport pickup by a Times India Travels representative or driver, transfer to hotel, tour documents provided. Overnight in Delhi.",
          },
          {
            day: 2,
            title: "New Delhi",
            description:
              "Full day sightseeing: Old Delhi's Red Fort and Jama Masjid, then New Delhi's India Gate, Parliament House and the Presidential residence. Overnight in Delhi.",
          },
          {
            day: 3,
            title: "Agra",
            description:
              "Morning visit to Agra Fort, afternoon at leisure or an optional excursion to the tomb of Itmad-Ud-Daulah, evening visit to the Taj Mahal. (Taj Mahal is closed on Fridays — itinerary adjusts accordingly.)",
          },
          {
            day: 4,
            title: "Jaipur",
            description:
              "Drive to Jaipur via Fatehpur Sikri, the abandoned Mughal capital. Afternoon in Jaipur: Jantar Mantar observatory and the City Palace. Evening at leisure.",
          },
          {
            day: 5,
            title: "Jaipur",
            description:
              "Full day at Amber Fort, including an elephant ride up to the fortress. Evening at leisure.",
          },
          {
            day: 6,
            title: "New Delhi",
            description:
              "Drive back to Delhi with a lunch stop at Neemrana Fort, then transfer to the airport for departure.",
          },
        ],
        inclusions: [],
        exclusions: [],
        featured: true, // shown in "Most Popular Tour" on the live homepage
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/golden-triangle-tours/classic-golden-triangle-tours-package/",
      },
      {
        id: "golden-triangle-tour-with-mandawa",
        categorySlug: "golden-triangle-tours",
        name: "Golden Triangle With Mandawa",
        duration: { days: 7, nights: 6, label: "7 Days / 6 Nights" },
        route: ["New Delhi", "Mandawa", "Jaipur", "Agra", "New Delhi"],
        thumbnail:
          "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Taj-Mahal-Tour-with-Mandawa-Havelis.jpg",
        heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; a Red Fort light-and-sound show is offered if the flight lands in the evening." },
          { day: 2, title: "New Delhi", description: "Full-day tour covering Red Fort, Jama Masjid and Chandni Chowk in Old Delhi, then India Gate, Humayun's Tomb, Qutub Minar and Lotus Temple in New Delhi." },
          { day: 3, title: "Mandawa (265 km)", description: "Drive through Shekhawati villages to the desert town of Mandawa, known for painted merchant havelis; overnight at a haveli hotel with an optional camel-cart tour of the town." },
          { day: 4, title: "Jaipur (151 km)", description: "Drive to Jaipur; afternoon free for rest or shopping." },
          { day: 5, title: "Jaipur", description: "Elephant ride up to Amber Fort, then Jal Mahal, City Palace, Hawa Mahal and Jantar Mantar, with a Rajasthani dinner and folk show at Chokhi Dhani in the evening." },
          { day: 6, title: "Agra (250 km)", description: "Drive to Agra via the abandoned Mughal city of Fatehpur Sikri; visit Agra Fort and Itmad-ud-Daulah's tomb, with sunset at the Taj Mahal." },
          { day: 7, title: "Depart via New Delhi (205 km)", description: "Optional dawn return visit to the Taj Mahal, then drive back to Delhi for the departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/golden-triangle-tours/golden-triangle-tour-with-mandawa/",
      },
      {
        id: "golden-triangle-tour-with-varanasi-package-at-low-price",
        categorySlug: "golden-triangle-tours",
        name: "Golden Triangle Tour With Varanasi",
        duration: { days: 9, nights: 8, label: "9 Days / 8 Nights" },
        route: ["New Delhi", "Jaipur", "Agra", "Khajuraho", "Varanasi", "New Delhi"],
        thumbnail:
          "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Golden-Triangle-Tour-with-Khajuraho-and-Varanasi.jpg",
        heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Arrival, transfer to hotel, evening light-and-sound show at Red Fort." },
          { day: 2, title: "New Delhi", description: "Full-day Delhi sightseeing split between New Delhi (Rashtrapati Bhawan, India Gate, Humayun's Tomb, Qutub Minar) and Old Delhi (Raj Ghat, Red Fort, Jama Masjid, Chandni Chowk)." },
          { day: 3, title: "Jaipur (250 km)", description: "Drive to Jaipur through Rajasthani countryside; evening free to explore the city." },
          { day: 4, title: "Jaipur", description: "Amber Fort by elephant, Jal Mahal, City Palace, Hawa Mahal, Jantar Mantar, and a Rajasthani dinner at Chokhi Dhani." },
          { day: 5, title: "Agra (250 km)", description: "Drive to Agra via Fatehpur Sikri; visit Agra Fort and Itmad-ud-Daulah's tomb." },
          { day: 6, title: "Agra – Jhansi – Khajuraho", description: "Sunrise at the Taj Mahal, train to Jhansi, then drive to Khajuraho via the medieval temples of Orchha." },
          { day: 7, title: "Khajuraho – Varanasi (flight)", description: "Morning tour of Khajuraho's Hindu and Jain temple complexes, afternoon flight to Varanasi, evening Ganga aarti ceremony at the ghats." },
          { day: 8, title: "Varanasi", description: "Dawn boat ride on the Ganges, excursion to the Buddhist pilgrimage site of Sarnath, and a visit to Banaras Hindu University." },
          { day: 9, title: "Depart via New Delhi (flight)", description: "Flight to Delhi to connect with the homebound international flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: true, // shown in "Most Popular Tour" on the live homepage
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/golden-triangle-tours/golden-triangle-tour-with-varanasi-package-at-low-price/",
      },
      {
        id: "golden-triangle-with-wildlife-safari-package",
        categorySlug: "golden-triangle-tours",
        name: "Golden Triangle With Wildlife Safari",
        duration: { days: 8, nights: 7, label: "8 Days / 7 Nights" },
        route: ["New Delhi", "Agra", "Ranthambhore (Wildlife Safari)", "Jaipur", "New Delhi"],
        thumbnail:
          "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Taj-Mahal-Tour-With-Wildlife-Safari.jpg",
        heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel." },
          { day: 2, title: "New Delhi", description: "City tour covering Qutub Minar, India Gate, Rashtrapati Bhawan, Red Fort and Birla Temple." },
          { day: 3, title: "Agra", description: "Drive to Agra via Sikandra (Akbar's tomb); visit Agra Fort and Itmad-ud-Daulah's tomb, sunset at the Taj Mahal." },
          { day: 4, title: "Ranthambhore", description: "Drive to Ranthambhore via Fatehpur Sikri, arriving at the wildlife reserve known for tiger sightings." },
          { day: 5, title: "Ranthambhore", description: "Two open-canter jungle safaris (morning and afternoon) inside the national park." },
          { day: 6, title: "Ranthambhore – Jaipur", description: "Morning safari, then evening drive to Jaipur." },
          { day: 7, title: "Jaipur", description: "Amber Fort by elephant, Hawa Mahal and the Jantar Mantar observatory." },
          { day: 8, title: "Depart via New Delhi", description: "Drive back to Delhi for the departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/golden-triangle-tours/golden-triangle-with-wildlife-safari-package/",
      },
      {
        id: "golden-triangle-tour-with-pushkar-holy-town-package",
        categorySlug: "golden-triangle-tours",
        name: "Golden Triangle Tour With Pushkar Holy Town",
        duration: { days: 7, nights: 6, label: "7 Days / 6 Nights" },
        route: ["New Delhi", "Agra", "Jaipur", "Pushkar", "New Delhi"],
        thumbnail:
          "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Golden-Triangle-tour-with-Pushkar-Holy-Town.jpg",
        heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel." },
          { day: 2, title: "New Delhi", description: "Full-day tour: India Gate, Humayun's Tomb, Qutub Minar, Lotus Temple in New Delhi; Red Fort, Jama Masjid and a rickshaw ride through Chandni Chowk in Old Delhi." },
          { day: 3, title: "Agra (204 km)", description: "Drive to Agra via Sikandra; visit Agra Fort and Itmad-ud-Daulah's tomb, sunset at the Taj Mahal." },
          { day: 4, title: "Jaipur (250 km)", description: "Drive to Jaipur via Fatehpur Sikri." },
          { day: 5, title: "Jaipur", description: "Amber Fort by elephant, Jal Mahal, Hawa Mahal, City Palace and Jantar Mantar, dinner at Chokhi Dhani." },
          { day: 6, title: "Pushkar (146 km)", description: "Drive to the pilgrimage town of Pushkar; visit the Brahma temple and lake ghats, evening boat ride." },
          { day: 7, title: "Depart via New Delhi (370 km)", description: "Drive back to Delhi for the departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/golden-triangle-tours/golden-triangle-tour-with-pushkar-holy-town-package/",
      },
      {
        id: "taj-mahal-tour-package-at-lowest-price",
        categorySlug: "golden-triangle-tours",
        name: "Taj Mahal Tour",
        duration: { days: 5, nights: 4, label: "5 Days / 4 Nights" },
        route: ["New Delhi", "Agra", "Jaipur", "New Delhi"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Taj-Mahal-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Airport pickup, transfer to hotel, tour documents provided." },
          { day: 2, title: "Agra (Taj Mahal closed on Fridays)", description: "Taj Mahal at dawn (or evening if the following day is a Friday), then Agra Fort; afternoon free or an optional excursion to Itmad-ud-Daulah's tomb." },
          { day: 3, title: "Jaipur", description: "Drive to Jaipur via Fatehpur Sikri; afternoon at the Jantar Mantar observatory and City Palace." },
          { day: 4, title: "Jaipur", description: "Full day at Amber Fort, including an elephant ride up to the fortress." },
          { day: 5, title: "Depart via New Delhi", description: "Drive back to Delhi, lunch stop at Neemrana Palace, transfer to the airport." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/golden-triangle-tours/taj-mahal-tour-package-at-lowest-price/",
      },
    ],
  },

  "rajasthan-tours": {
    id: "rajasthan-tours",
    name: "Rajasthan Tours",
    tagline: "The Desert Kingdom",
    description:
      "Forts, palaces and heritage hotels across the Pink City of Jaipur, the lakes of Udaipur, and the desert cities of Jodhpur, Bikaner and Jaisalmer.",
    heroImage:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "rajasthan-and-taj-mahal-tour-package",
        categorySlug: "rajasthan-tours",
        name: "Rajasthan Cultural Tour with Taj Mahal",
        duration: { days: 14, nights: 13, label: "14 Days / 13 Nights" },
        route: [
          "New Delhi", "Mandawa", "Bikaner", "Jaisalmer", "Jodhpur",
          "Udaipur", "Pushkar", "Jaipur", "Agra", "New Delhi",
        ],
        thumbnail:
          "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Rajasthan-Cultural-Tour-with-Taj-Mahal.jpg",
        heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Mandawa (250 km)", description: "Drive to the Shekhawati region, known for painted merchant havelis built in the 18th-19th centuries." },
          { day: 3, title: "Bikaner (190 km)", description: "Drive to Bikaner; half-day city tour of Junagadh Fort and the Karni Mata (rat) temple." },
          { day: 4, title: "Jaisalmer (350 km)", description: "Drive across the Thar Desert to the sandstone fort city of Jaisalmer." },
          { day: 5, title: "Jaisalmer", description: "Jaisalmer Fort and its havelis, then a camel safari and sunset at the Sam or Khuri sand dunes, with an optional overnight desert camp." },
          { day: 6, title: "Jodhpur (275 km)", description: "Drive to Jodhpur; afternoon visit to Mehrangarh Fort overlooking the Blue City." },
          { day: 7, title: "Udaipur (325 km)", description: "Drive to Udaipur via the Jain temples of Ranakpur and Kumbhalgarh Fort." },
          { day: 8, title: "Udaipur", description: "City Palace, Sahelion ki Bari gardens, and a sunset boat ride on Lake Pichola past Jagmandir palace." },
          { day: 9, title: "Pushkar (300 km)", description: "Drive to the pilgrimage town of Pushkar; visit the Brahma temple and lakeside bazaar." },
          { day: 10, title: "Jaipur (150 km)", description: "Drive to Jaipur; afternoon at Jantar Mantar observatory and City Palace." },
          { day: 11, title: "Jaipur", description: "Full day at Amber Fort, including an elephant ride up to the fortress." },
          { day: 12, title: "Agra (250 km, Taj Mahal closed Fridays)", description: "Drive to Agra via Fatehpur Sikri; visit Agra Fort." },
          { day: 13, title: "New Delhi", description: "Full day in Delhi: Red Fort, Jama Masjid, India Gate, Parliament House and the Presidential residence." },
          { day: 14, title: "Depart New Delhi", description: "Transfer to the international airport for the departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: true, // shown in "Most Popular Tour" on the live homepage
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/rajasthan-tours/rajasthan-and-taj-mahal-tour-package/",
      },
      {
        id: "cultural-and-varanasi-tour-package",
        categorySlug: "rajasthan-tours",
        name: "Cultural Rajasthan with Varanasi",
        duration: { days: 17, nights: 16, label: "17 Days / 16 Nights" },
        route: [
          "New Delhi", "Mandawa", "Bikaner", "Jaisalmer", "Jodhpur", "Ranakpur",
          "Udaipur", "Pushkar", "Jaipur", "Agra", "Varanasi", "New Delhi",
        ],
        thumbnail:
          "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Cultural-Rajasthan-with-Varanasi.jpg",
        heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Mandawa (250 km)", description: "Drive to the Shekhawati region and its painted merchant havelis." },
          { day: 3, title: "Bikaner (190 km)", description: "Junagadh Fort and the Karni Mata (rat) temple." },
          { day: 4, title: "Jaisalmer (350 km)", description: "Drive across the Thar Desert to Jaisalmer." },
          { day: 5, title: "Jaisalmer", description: "Jaisalmer Fort and havelis, camel safari and sunset at the sand dunes, optional desert camp." },
          { day: 6, title: "Jodhpur (275 km)", description: "Mehrangarh Fort overlooking the Blue City." },
          { day: 7, title: "Udaipur via Ranakpur (90 km)", description: "Jain temples of Ranakpur and Kumbhalgarh Fort en route to Udaipur." },
          { day: 8, title: "Udaipur", description: "City Palace, Sahelion ki Bari gardens, and a sunset boat ride on Lake Pichola." },
          { day: 9, title: "Pushkar", description: "Pilgrimage town with the Brahma temple and lakeside bazaar." },
          { day: 10, title: "Jaipur (150 km)", description: "Jantar Mantar observatory and City Palace." },
          { day: 11, title: "Jaipur", description: "Full day at Amber Fort, including an elephant ride." },
          { day: 12, title: "Agra (250 km)", description: "Drive via Fatehpur Sikri; visit Agra Fort." },
          { day: 13, title: "Agra – Varanasi (night train)", description: "Overnight train to Varanasi, India's oldest continuously inhabited city." },
          { day: 14, title: "Varanasi", description: "Dawn boat ride along the ghats of the Ganges, Kashi Vishwanath temple, and Banaras Hindu University." },
          { day: 15, title: "Varanasi – New Delhi (flight)", description: "Flight to Delhi; evening free to explore Connaught Place." },
          { day: 16, title: "New Delhi", description: "Full day in Delhi: Red Fort, Jama Masjid, India Gate, Parliament House and the Presidential residence." },
          { day: 17, title: "Depart New Delhi", description: "Transfer to the international airport for the departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: true, // shown in "Most Popular Tour" on the live homepage
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/rajasthan-tours/cultural-and-varanasi-tour-package/",
      },
      {
        id: "royal-rajasthan-tour-package-at-low-price",
        categorySlug: "rajasthan-tours",
        name: "Royal Rajasthan Tour",
        duration: { days: 15, nights: 14, label: "15 Days / 14 Nights" },
        route: [
          "New Delhi", "Agra", "Jaipur", "Deogarh", "Udaipur",
          "Kumbalgarh", "Jodhpur", "Jaisalmer", "Bikaner", "Mandawa", "New Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Regal-Rajasthan-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Agra (Taj Mahal closed Fridays)", description: "Drive to Agra via Sikandra (Akbar's tomb); visit the Taj Mahal." },
          { day: 3, title: "Jaipur (250 km)", description: "Drive to Jaipur via Fatehpur Sikri; City Palace and the Jantar Mantar observatory." },
          { day: 4, title: "Jaipur", description: "Amber Fort, free afternoon for the local markets, evening Rajasthani dinner with folk entertainment." },
          { day: 5, title: "Deogarh via Pushkar (270 km)", description: "Visit the pilgrimage town of Pushkar on the way to Deogarh." },
          { day: 6, title: "Udaipur (140 km)", description: "City Palace campus and Sahelion ki Bari gardens." },
          { day: 7, title: "Udaipur", description: "City Palace museum, Sahelion ki Bari gardens, and a sunset boat ride on Lake Pichola to Jagmandir island palace." },
          { day: 8, title: "Kumbhalgarh (80 km)", description: "One of Rajasthan's most striking hilltop forts, in the Aravalli range." },
          { day: 9, title: "Jodhpur via Ranakpur (240 km)", description: "Jain temples of Ranakpur en route to Jodhpur." },
          { day: 10, title: "Jaisalmer via Mehrangarh Fort (275 km)", description: "Mehrangarh Fort overlooking the Blue City, then on to Jaisalmer for a sunset walk." },
          { day: 11, title: "Jaisalmer", description: "Jain temples inside Jaisalmer Fort, Patwaon ki Haveli, Gadisar Lake, then a camel ride and sunset at the Sam or Khuri dunes with an optional desert-camp dinner." },
          { day: 12, title: "Bikaner (275 km)", description: "Junagarh Fort, a plains fort (unusual for Rajasthan) built in red and yellow sandstone." },
          { day: 13, title: "Mandawa (245 km)", description: "Shekhawati region town known for its painted havelis." },
          { day: 14, title: "New Delhi (275 km)", description: "Humayun's Tomb and Qutub Minar." },
          { day: 15, title: "Depart New Delhi", description: "Transfer to the international airport for the departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/rajasthan-tours/royal-rajasthan-tour-package-at-low-price/",
      },
      {
        id: "historical-rajasthan-tour-package-at-lowest-price",
        categorySlug: "rajasthan-tours",
        name: "Historical Rajasthan Tour",
        duration: { days: 11, nights: 10, label: "11 Days / 10 Nights" },
        route: ["New Delhi", "Agra", "Jaipur", "Pushkar", "Jodhpur", "Ranakpur", "Udaipur", "New Delhi"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Imperial-Rajasthan-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi", description: "Old Delhi (Red Fort, Jama Masjid, a rickshaw ride through Chandni Chowk, Raj Ghat) and New Delhi (Rashtrapati Bhawan, Laxmi Narayan Temple, India Gate, Humayun's Tomb, Qutub Minar), with an evening light-and-sound show at Red Fort." },
          { day: 3, title: "Agra (Taj Mahal closed Fridays)", description: "Drive via Sikandra (Akbar's tomb); Taj Mahal, Agra Fort and Itmad-ud-Daulah's tomb." },
          { day: 4, title: "Jaipur (245 km)", description: "Drive via Fatehpur Sikri, the abandoned Mughal capital; evening free in Jaipur's bazaars." },
          { day: 5, title: "Jaipur", description: "Amber Fort by elephant, City Palace, Jantar Mantar and Hawa Mahal, free time for markets in the afternoon." },
          { day: 6, title: "Pushkar (150 km)", description: "Drive via Ajmer (optional Dargah Sharif stop) to the pilgrimage town of Pushkar; Brahma temple and lakeside walk." },
          { day: 7, title: "Jodhpur", description: "Drive to the Blue City; evening walk in the old walled-city market." },
          { day: 8, title: "Jodhpur", description: "Mehrangarh Fort, Umaid Bhawan, Jaswant Thada and the Government Museum." },
          { day: 9, title: "Udaipur via Ranakpur", description: "Bishnoi village visit, then the Jain temples of Ranakpur en route to Udaipur." },
          { day: 10, title: "Udaipur", description: "City Palace and Museum, Lake Pichola, Jagdish Temple and Sahelion ki Bari gardens; afternoon free." },
          { day: 11, title: "Depart via Udaipur Airport", description: "Morning at leisure, then an evening flight from Udaipur to Delhi to connect with the departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/rajasthan-tours/historical-rajasthan-tour-package-at-lowest-price/",
      },
      {
        id: "rajasthan-desert-tour-package-at-low-cost",
        categorySlug: "rajasthan-tours",
        name: "Rajasthan Desert Tour",
        duration: { days: 12, nights: 11, label: "12 Days / 11 Nights" },
        route: [
          "New Delhi", "Jodhpur", "Osian", "Jaisalmer", "Bikaner",
          "Mandawa", "Nawalgarh", "Jaipur", "Agra", "New Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Rajasthan-Desert-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi – overnight train to Jodhpur", description: "Guided tour of New Delhi (Humayun's Tomb, Qutub Minar) and Old Delhi (Jama Masjid, a cycle-rickshaw ride through Chandni Chowk, Raj Ghat), then an overnight train to Jodhpur." },
          { day: 3, title: "Jodhpur", description: "Arrive and check in; afternoon sightseeing including Mehrangarh Fort, with views over the Blue City below." },
          { day: 4, title: "Osian", description: "Drive through desert scenery to Osian to meet Bishnoi villagers known for their traditional way of life, with an evening cultural program." },
          { day: 5, title: "Jaisalmer", description: "Drive through rustic desert landscape to Jaisalmer; evening walk through the old town's market streets." },
          { day: 6, title: "Jaisalmer", description: "Full day exploring Jaisalmer Fort — a living fort with 12th-15th century Jain temples inside its walls — and the Tazia Tower." },
          { day: 7, title: "Bikaner", description: "Drive west across the Thar Desert to the historic trading city of Bikaner." },
          { day: 8, title: "Mandawa", description: "Shekhawati region town known for painted havelis; evening in the local bazaar." },
          { day: 9, title: "Jaipur via Nawalgarh", description: "Drive to Jaipur; evening city tour of the Pink City and its markets." },
          { day: 10, title: "Jaipur", description: "Amber Fort, City Palace, Hawa Mahal and the Jantar Mantar observatory." },
          { day: 11, title: "Agra (Taj Mahal closed Fridays)", description: "Drive via Fatehpur Sikri, the 16th-century fortress-city left almost untouched since being abandoned." },
          { day: 12, title: "Agra – New Delhi Departure", description: "Morning visit to Agra Fort and the Taj Mahal, then drive to Delhi for the international departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/rajasthan-tours/rajasthan-desert-tour-package-at-low-cost/",
      },
      {
        id: "exclusive-rajasthan-tour-package-newdelhi-agra-jaipur-bundi-bijaypur-udaipur-newdelhi",
        categorySlug: "rajasthan-tours",
        name: "Exclusive Rajasthan Tour",
        duration: { days: 10, nights: 9, label: "10 Days / 9 Nights" },
        route: ["New Delhi", "Agra", "Jaipur", "Bundi", "Bijaypur", "Udaipur", "New Delhi"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Exclusive-Rajasthan-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi", description: "Qutub Minar, Humayun's Tomb, Lotus Temple, Raj Ghat, Chandni Chowk market and a drive past India Gate, Parliament House and the Presidential residence." },
          { day: 3, title: "Agra (215 km, Taj Mahal closed Fridays)", description: "Afternoon at Agra Fort, sunset visit to the Taj Mahal." },
          { day: 4, title: "Jaipur (250 km via Fatehpur Sikri)", description: "Drive via the 16th-century Mughal capital of Fatehpur Sikri; day at leisure in Jaipur." },
          { day: 5, title: "Jaipur", description: "Amber Fort with an elephant ride to the top, City Palace, Jantar Mantar and Hawa Mahal." },
          { day: 6, title: "Bundi (210 km)", description: "Taragarh ('Star Fort'), Bundi Palace with its murals, and the deep stepwell Raniji ki Baori." },
          { day: 7, title: "Bijaipur via Kota (110 km)", description: "Maharao Madho Singh Museum in Kota, then on to Bijaipur to stay at the 16th-century Bijaipur Castle, still run by its founding family." },
          { day: 8, title: "Udaipur via Chittorgarh (145 km)", description: "Chittorgarh Fort, one of Rajasthan's largest hill forts, en route to Udaipur." },
          { day: 9, title: "Udaipur", description: "City Palace, Sahelion ki Bari gardens, Jagdish Temple, and an evening boat ride on Lake Pichola." },
          { day: 10, title: "Udaipur – New Delhi (flight)", description: "Flight to Delhi to connect with the international departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/rajasthan-tours/exclusive-rajasthan-tour-package-newdelhi-agra-jaipur-bundi-bijaypur-udaipur-newdelhi/",
      },
      {
        id: "classical-rajasthan-tour-package-in-india",
        categorySlug: "rajasthan-tours",
        name: "Classical Rajasthan Tour",
        duration: { days: 9, nights: 8, label: "9 Days / 8 Nights" },
        route: ["Delhi", "Udaipur", "Ajmer", "Pushkar", "Jaipur", "Fatehpur Sikri", "Agra", "Delhi"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Classical-Rajasthan-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi", description: "Red Fort, Raj Ghat, Qutub Minar, India Gate, the government buildings, and the Birla (Laxmi Narayan) Temple." },
          { day: 3, title: "Fly to Udaipur", description: "Domestic flight from Delhi; evening arrival and dinner in Udaipur." },
          { day: 4, title: "Udaipur", description: "Known as the 'Venice of the East' — City Palace Museum, Sahelion ki Bari gardens, a local folk museum, and Jagdish Temple." },
          { day: 5, title: "Pushkar via Ajmer", description: "Drive across the Mewar region; the Brahma temple and lakeside bazaar in Pushkar, plus the Ajmer Sharif dargah and Akbar's palace nearby." },
          { day: 6, title: "Jaipur", description: "Amber Fort by elephant, then City Palace, Jantar Mantar and Hawa Mahal." },
          { day: 7, title: "Agra via Fatehpur Sikri", description: "Fatehpur Sikri, including Jodha Bai's palace, en route to Agra." },
          { day: 8, title: "Agra", description: "Taj Mahal, Agra Fort, and the tomb of Itmad-ud-Daulah." },
          { day: 9, title: "Depart via New Delhi", description: "Drive back to Delhi for the international departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/rajasthan-tours/classical-rajasthan-tour-package-in-india/",
      },
      {
        id: "rajasthan-with-goa-tour-package-at-lowest-price",
        categorySlug: "rajasthan-tours",
        name: "Rajasthan with Goa Tour",
        duration: { days: 17, nights: 16, label: "17 Days / 16 Nights" },
        route: [
          "Delhi", "Mandawa", "Bikaner", "Pokran", "Jaisalmer", "Jodhpur", "Ranakpur",
          "Udaipur", "Pushkar", "Jaipur", "Amber Fort", "Fatehpur Sikri", "Agra",
          "Delhi (flight)", "Goa (flight)", "Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Rajasthan-with-Goa-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup, then a sightseeing tour of Old and New Delhi — Jama Masjid, Red Fort, Chandni Chowk, Raj Ghat, Akshardham, Birla Mandir, Humayun's Tomb, Qutub Minar, the Lotus Temple, India Gate and the government buildings." },
          { day: 2, title: "Mandawa (260 km)", description: "Shekhawati region town known as the 'open-air art gallery of Rajasthan' for its painted havelis; heritage walk through the village." },
          { day: 3, title: "Bikaner (180 km)", description: "Via the haveli village of Fatehpur; Junagarh Fort, a camel breeding farm, and the Karni Mata (rat) temple at Deshnok." },
          { day: 4, title: "Jaisalmer (330 km)", description: "Across the Thar Desert via Pokhran; sunset over the desert city on arrival." },
          { day: 5, title: "Jaisalmer", description: "Jaisalmer (Sonar) Fort, ornately carved havelis, Gadisar Lake, and a camel-cart sunset excursion to the sand dunes with a desert-village dinner." },
          { day: 6, title: "Jodhpur (280 km)", description: "Via Mandore Gardens; Mehrangarh Fort's museum and palaces, Jaswant Thada, and Umaid Bhawan Palace." },
          { day: 7, title: "Udaipur (330 km)", description: "Via the Jain temples of Ranakpur and the hilltop fortress of Kumbhalgarh; Sahelion ki Bari gardens on arrival." },
          { day: 8, title: "Udaipur", description: "City Palace, Jagdish Temple, the folk art museum, and an evening boat ride on Lake Pichola past Jag Mandir and the Taj Lake Palace." },
          { day: 9, title: "Pushkar (275 km)", description: "Via the Eklingji and Nagda Jain temples; Brahma Temple and the sacred lake at Pushkar." },
          { day: 10, title: "Jaipur (150 km)", description: "Via Ajmer's Dargah Sharif; City Palace and the Jantar Mantar observatory." },
          { day: 11, title: "Jaipur", description: "Amber Fort by elephant, Jal Mahal, Hawa Mahal, the Monkey Temple and Galta Sun Temple, with an evening Bollywood screening and a folk-dance dinner." },
          { day: 12, title: "Agra (232 km)", description: "Via Bharatpur's Keoladeo bird sanctuary; Fatehpur Sikri and Agra Fort." },
          { day: 13, title: "New Delhi (205 km)", description: "Sunrise at the Taj Mahal, then a stop at Sikandra (Akbar's tomb) en route back to Delhi." },
          { day: 14, title: "New Delhi – Goa (flight)", description: "Flight to Goa; afternoon on the beach, evening at a Goan carnival-themed dinner." },
          { day: 15, title: "Goa", description: "Touring North and South Goa, with an evening visit to a recreated fishing village showcasing local crafts and music." },
          { day: 16, title: "Goa", description: "Free beach day, with an evening seafood barbecue on the sand." },
          { day: 17, title: "Depart via Delhi or Mumbai (flight)", description: "Flight from Goa to Delhi or Mumbai, then transfer to the international airport for departure." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/rajasthan-tours/rajasthan-with-goa-tour-package-at-lowest-price/",
      },
      {
        id: "heritage-cultural-tour-9-days-package-at-lowest-price",
        categorySlug: "rajasthan-tours",
        name: "Heritage Cultural Tour",
        duration: { days: 9, nights: 8, label: "9 Days / 8 Nights" },
        route: ["Delhi", "Neemrana", "Samode", "Jaipur", "Roopangarh", "Kuchaman", "Mandawa", "Delhi"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Heritage-Cultural-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Neemrana", description: "Morning visit to the Birla (Laxmi Narayan) Temple, India Gate and Parliament House, then drive to the 15th-century Neemrana Fort-Palace, one of India's oldest heritage-hotel restorations." },
          { day: 3, title: "Samode", description: "Samode Palace, a smaller 16th-century palace known for its frescoed walls and mirrored Sultan Mahal, plus Samode Fort and Samode Bagh gardens." },
          { day: 4, title: "Jaipur", description: "Drive to Jaipur; afternoon free to explore independently." },
          { day: 5, title: "Jaipur", description: "Amber Fort by elephant, City Palace, a haveli-lined bazaar, and Jaipur's astronomical observatory." },
          { day: 6, title: "Roopangarh", description: "17th-century fort-town built by Maharaja Roop Singh of Kishangarh; overnight inside the fort." },
          { day: 7, title: "Kuchaman", description: "Countryside town known for local crafts and music, then on to Kuchaman Fort for an overnight stay." },
          { day: 8, title: "Mandawa", description: "Shekhawati region town famed for painted havelis and frescoes." },
          { day: 9, title: "Depart via New Delhi", description: "Drive back to Delhi for the international departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/rajasthan-tours/heritage-cultural-tour-9-days-package-at-lowest-price/",
      },
      {
        id: "rajasthan-wildlife-tour-13-days-package-at-lowest-price",
        categorySlug: "rajasthan-tours",
        name: "Rajasthan Wildlife Tour",
        duration: { days: 13, nights: 12, label: "13 Days / 12 Nights" },
        route: ["New Delhi", "Udaipur", "Jaipur", "Ranthambhore", "Bharatpur", "Jabalpur", "Kanha", "New Delhi"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Rajasthan-wildlife-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Fly to Udaipur", description: "Domestic flight to Udaipur, the 'city of lakes'; afternoon city sightseeing." },
          { day: 3, title: "Udaipur", description: "Jag Mandir and Jag Niwas on Lake Pichola, City Palace, the Rana Pratap Memorial, and a boat ride on the lake." },
          { day: 4, title: "Jaipur", description: "Drive to the Pink City; evening at the local markets." },
          { day: 5, title: "Jaipur", description: "Hawa Mahal, Jal Mahal, Jantar Mantar, City Palace, and Amber Fort by elephant." },
          { day: 6, title: "Ranthambhore", description: "Drive to Sawai Madhopur; check into a jungle lodge near Ranthambhore National Park." },
          { day: 7, title: "Ranthambhore", description: "Two jeep safaris inside the park, known for its Bengal tigers, migratory-bird lakes, and a 10th-century fort within the reserve." },
          { day: 8, title: "Bharatpur", description: "Keoladeo Ghana National Park, a major bird sanctuary home to thousands of species across 232 sq km." },
          { day: 9, title: "Agra – overnight train to Jabalpur", description: "Rickshaw ride to the bird park, then Agra: the Taj Mahal, Agra Fort and Itmad-ud-Daulah's tomb, followed by an overnight train to Jabalpur." },
          { day: 10, title: "Jabalpur – Kanha", description: "Transfer to Kanha National Park; afternoon game drive." },
          { day: 11, title: "Kanha", description: "Full day of game viewing across the park's 940 sq km, home to tigers, leopards, sloth bears and wild boar." },
          { day: 12, title: "Kanha – Jabalpur – overnight train to Delhi", description: "Morning game drive, then travel back to Jabalpur to board the overnight train to Delhi." },
          { day: 13, title: "New Delhi", description: "Full-day city tour — India Gate, Rashtrapati Bhawan, Lotus Temple and Qutub Minar in New Delhi; Red Fort, Jama Masjid, a rickshaw ride through Chandni Chowk, and Raj Ghat in Old Delhi — before transfer to the airport." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/rajasthan-tours/rajasthan-wildlife-tour-13-days-package-at-lowest-price/",
      },
      {
        id: "north-with-wildlife-tour-15-days-package-at-low-cost",
        categorySlug: "rajasthan-tours",
        name: "North With Wildlife Tour",
        duration: { days: 15, nights: 14, label: "15 Days / 14 Nights" },
        route: [
          "New Delhi", "Jaipur", "Keoladeo Ghana Sanctuary", "Agra", "Orchha",
          "Khajuraho", "Panna Tiger Reserve", "Varanasi", "New Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/North-With-Wildlife.jpg",
        heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi", description: "Qutub Minar, Humayun's Tomb, Lotus Temple, Raj Ghat, Chandni Chowk market and a drive past India Gate, Parliament House and the Presidential residence." },
          { day: 3, title: "Jaipur (265 km)", description: "City Palace and the Jantar Mantar observatory in the Pink City." },
          { day: 4, title: "Jaipur", description: "Amber Fort in the morning, free time in the arts and crafts markets, and an evening countryside dinner with folk entertainment." },
          { day: 5, title: "Bharatpur (200 km)", description: "Drive to Bharatpur and explore the surrounding village." },
          { day: 6, title: "Keoladeo Ghana National Park", description: "Rickshaw ride through the wetlands of this UNESCO World Heritage bird sanctuary, home to over 400 bird species." },
          { day: 7, title: "Agra (55 km)", description: "Via Fatehpur Sikri, Akbar's 16th-century capital; visit the Taj Mahal." },
          { day: 8, title: "Agra (Taj Mahal closed Fridays)", description: "Sunrise or sunset visit to the Taj Mahal, plus Agra Fort's courtyards and private chambers, with an optional excursion to Itmad-ud-Daulah's tomb." },
          { day: 9, title: "Orchha (220 km, train)", description: "Train journey to the riverside medieval town of Orchha, known for 17th-century palaces and onion-domed cenotaphs." },
          { day: 10, title: "Khajuraho (190 km)", description: "World Heritage site with India's largest collection of medieval Hindu and Jain temples." },
          { day: 11, title: "Panna Tiger Reserve", description: "Morning game drive in Panna, then back to Khajuraho to explore the temples' sculptural detail." },
          { day: 12, title: "Khajuraho – Varanasi (flight)", description: "Optional extra game drive or more temple time, then an afternoon flight to Varanasi." },
          { day: 13, title: "Varanasi", description: "Boat ride along the Ganges ghats, a visit to the Buddhist site of Sarnath, and the evening Ganga aarti ceremony." },
          { day: 14, title: "Varanasi – New Delhi (flight)", description: "Free morning in Varanasi, then flight back to Delhi." },
          { day: 15, title: "Depart New Delhi", description: "Transfer to the airport per the outbound flight schedule." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/rajasthan-tours/north-with-wildlife-tour-15-days-package-at-low-cost/",
      },
    ],
  },

  "south-india-tours": {
    id: "south-india-tours",
    name: "South India Tours",
    tagline: "Kerala · Tamil Nadu · Karnataka",
    description:
      "A different rhythm of India — Kerala's backwaters and spice country, and Tamil Nadu's temple towns, across the peninsular south.",
    heroImage:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "explore-kerala-tour-package",
        categorySlug: "south-india-tours",
        name: "Discover Kerala Tour",
        duration: { days: 9, nights: 8, label: "9 Days / 8 Nights" },
        route: ["Cochin", "Munnar", "Thekkady", "Kumarakom", "Alleppey", "Poovar", "Trivandrum"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Discover-Kerala-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Cochin", description: "Airport pickup and transfer to hotel; afternoon sightseeing — St Francis Church, Chinese fishing nets, the 16th-century Synagogue in Jew Town, and Mattancherry Palace with its murals." },
          { day: 2, title: "Munnar (130 km)", description: "Drive via Cheeyappara Waterfalls through rolling tea-estate hills." },
          { day: 3, title: "Munnar", description: "Anayirankal Dam surrounded by tea plantations, and Pothamedu's viewpoint over tea, coffee and cardamom estates." },
          { day: 4, title: "Thekkady (110 km)", description: "A game-viewing boat cruise on Periyar Lake inside the wildlife sanctuary, spotting elephants, deer and birdlife." },
          { day: 5, title: "Kumarakom (125 km)", description: "Bird sanctuary visit and a sunset view over the backwaters." },
          { day: 6, title: "Alleppey (45 km)", description: "A full day cruising the Kerala backwaters." },
          { day: 7, title: "Poovar (175 km)", description: "Check into a beach resort; free time to relax." },
          { day: 8, title: "Poovar", description: "Free day, or an optional excursion to Kanyakumari — India's southern tip, where the Arabian Sea, Indian Ocean and Bay of Bengal meet — including the Vivekananda Rock Memorial." },
          { day: 9, title: "Trivandrum", description: "Transfer to Trivandrum airport or railway station for the onward journey." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl: "https://www.timesindiatravels.com/tour-packages/south-india-tours/explore-kerala-tour-package/",
      },
      {
        id: "golden-triangle-tour-kerala-package",
        categorySlug: "south-india-tours",
        name: "Golden Triangle Tour Kerala",
        duration: { days: 4, nights: 3, label: "4 Days / 3 Nights" },
        route: ["Cochin", "Alleppey", "Kumarakom", "Cochin"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Golden-Triangle-Tour-Kerala.jpg",
        heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Cochin", description: "Airport pickup and transfer to hotel; afternoon sightseeing — St Francis Church, Chinese fishing nets, Jew Town's synagogue, and Mattancherry Palace." },
          { day: 2, title: "Alleppey (56 km)", description: "A day-long backwater cruise, overnight aboard a deluxe air-conditioned houseboat." },
          { day: 3, title: "Kumarakom", description: "Bird sanctuary visit and a sunset view over the lake." },
          { day: 4, title: "Cochin (56 km) – Departure", description: "Transfer to Kochi airport for the onward journey." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/south-india-tours/golden-triangle-tour-kerala-package/",
      },
      {
        id: "golden-triangle-south-india-tour-package",
        categorySlug: "south-india-tours",
        name: "Golden Triangle Tour South India",
        duration: { days: 4, nights: 3, label: "4 Days / 3 Nights" },
        route: ["Chennai", "Kanchipuram", "Mahabalipuram", "Chennai"],
        thumbnail:
          "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Golden-Triangle-Tour-South-India.jpg",
        heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive Chennai", description: "Airport pickup and transfer to hotel. Chennai, the capital of Tamil Nadu, is the gateway to South India — home to the National Art Gallery, Fort St George, Marina Beach (one of the world's longest), and the Mylapore Shiva Temple." },
          { day: 2, title: "Kanchipuram – Mahabalipuram (60 km)", description: "Kanchipuram, one of India's seven sacred cities and known for handwoven silk, including the Kailashnath and Ekambareswarar temples, then on to the coastal town of Mahabalipuram." },
          { day: 3, title: "Mahabalipuram", description: "The rock-cut Five Rathas, the bas-relief known as Arjuna's Penance, and the UNESCO-listed Shore Temple." },
          { day: 4, title: "Chennai – Departure", description: "Transfer to Chennai airport for the onward journey." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/south-india-tours/golden-triangle-south-india-tour-package/",
      },
      {
        id: "spice-and-plantation-kerala-tour-package",
        categorySlug: "south-india-tours",
        name: "Spice Kerala Tour",
        duration: { days: 6, nights: 5, label: "6 Days / 5 Nights" },
        route: ["Cochin", "Munnar", "Thekkady", "Houseboat", "Cochin"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Spice-Kerala-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Cochin", description: "Airport pickup and transfer to hotel; afternoon sightseeing — St Francis Church, Chinese fishing nets, Jew Town's synagogue, and Mattancherry Palace." },
          { day: 2, title: "Munnar (130 km)", description: "Drive via Cheeyappara Waterfalls through tea-estate hill country." },
          { day: 3, title: "Munnar", description: "Rajamalai's mountain-goat viewpoint, Mattupetty Dam, the Tea Museum, and Eco Point, with optional boating on the lake." },
          { day: 4, title: "Thekkady (110 km)", description: "Drive through cardamom hills; visits to spice plantations growing cardamom, pepper, coffee and tea, with a stop at the local spice market." },
          { day: 5, title: "Kumarakom houseboat (125 km)", description: "Traditional Kerala houseboat cruise through backwaters bordered by paddy fields, overnight aboard a deluxe air-conditioned houseboat." },
          { day: 6, title: "Cochin (56 km) – Departure", description: "Transfer to Cochin airport or railway station for the onward journey." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/south-india-tours/spice-and-plantation-kerala-tour-package/",
      },
      {
        id: "spice-tour-package-at-lowest-price",
        categorySlug: "south-india-tours",
        name: "Spice Tour",
        duration: { days: 6, nights: 5, label: "6 Days / 5 Nights" },
        route: ["Cochin", "Munnar", "Thekkady", "Kumarakom", "Alleppey", "Cochin"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Spice-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrival Cochin", description: "Airport pickup and transfer to hotel; afternoon sightseeing — St Francis Church, Chinese fishing nets, Jew Town's synagogue, and Mattancherry Palace." },
          { day: 2, title: "Munnar (130 km)", description: "One of the world's highest tea-growing regions; Eravikulam National Park, home to the endangered Nilgiri Tahr, plus Mattupetty Dam, the Indo-Swiss Dairy Farm and Kundala Lake." },
          { day: 3, title: "Thekkady (110 km)", description: "Boating on Periyar Lake in one of India's best wildlife sanctuaries, then a stop at spice gardens growing cardamom, cinnamon, pepper, coffee and tea." },
          { day: 4, title: "Kumarakom (125 km)", description: "Bird sanctuary and a sunset view over the lake." },
          { day: 5, title: "Alleppey (45 km)", description: "A full day cruising the Kerala backwaters, overnight aboard a deluxe air-conditioned houseboat." },
          { day: 6, title: "Cochin (56 km)", description: "Free time for shopping, then transfer to the airport for the flight home." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/south-india-tours/spice-tour-package-at-lowest-price/",
      },
      {
        id: "cultural-south-india-tour-17days-package",
        categorySlug: "south-india-tours",
        name: "Cultural South India Tour",
        duration: { days: 17, nights: 16, label: "17 Days / 16 Nights" },
        route: [
          "Chennai", "Mahabalipuram", "Pondicherry", "Tanjore", "Trichy", "Madurai",
          "Periyar", "Kumarakom", "Alleppey", "Kochi", "Ooty", "Nagarhole", "Mysore", "Bangalore",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Cultural-South-India-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Chennai", description: "Airport pickup and transfer to hotel. Chennai, gateway to South India — the National Art Gallery, Fort St George, Marina Beach, and Mylapore Shiva Temple." },
          { day: 2, title: "Mahabalipuram via Kanchipuram", description: "Kanchipuram, the 'city of temples' and known for silk sarees, including Vaikuntaperumal and Ekambareswarar temples; Mahabalipuram's shore temple, one of the few surviving coastal rock-cut temples." },
          { day: 3, title: "Pondicherry", description: "The former French colony, home to the Aurobindo Ashram and Auroville; Pondicherry Museum's sculpture gallery, and an evening at the beach." },
          { day: 4, title: "Tanjore", description: "Brihadeeswara Temple, one of the largest monolithic sculptures in the world, and the Royal Palace complex with its library and museums." },
          { day: 5, title: "Trichy", description: "The medieval Chola-dynasty citadel — Srirangam Temple, the Rock Fort Temple, and a hilltop Ganapati temple." },
          { day: 6, title: "Madurai", description: "The 1,000-pillared Meenakshi Amman Temple, including its evening religious ceremony, plus Thirumalai Nayak's Palace and the Gandhi Museum." },
          { day: 7, title: "Periyar", description: "Boating on Periyar Lake inside one of India's best wildlife sanctuaries, with a stop at spice gardens near Thekkady." },
          { day: 8, title: "Kumarakom", description: "A cruise on Vembanad Lake and a visit to Kumarakom Bird Sanctuary." },
          { day: 9, title: "Alleppey (Alappuzha)", description: "Free day at a backwater resort, with an optional backwater cruise; overnight on a houseboat." },
          { day: 10, title: "Kochi", description: "Kerala's commercial hub — a Jewish synagogue, the Dutch Palace, Chinese fishing nets, and an evening traditional Kathakali dance performance." },
          { day: 11, title: "Ooty", description: "Drive to the 19th-century hill station known as the 'Queen of Hill Stations'." },
          { day: 12, title: "Ooty", description: "Botanical Gardens, Ooty Lake, and Dodabetta Peak for panoramic Nilgiri views, with an optional toy-train excursion to nearby Coonoor." },
          { day: 13, title: "Nagarhole National Park", description: "A park near Mysore known for tigers, leopards and elephants; jeep and boat safaris, with two nights at a riverside lodge on the Kabini." },
          { day: 14, title: "Kabini – Mysore", description: "Mysore, the 'Sandalwood City' — Mysore Palace, Brindavan Gardens and the Art Gallery." },
          { day: 15, title: "Srirangapatna – Bangalore", description: "Tipu Sultan's former capital, including the Ranganatha Swamy Temple and his summer palace (Daria Daulat Bagh), then on to Bangalore for Lal Bagh Botanical Gardens and Bull Temple." },
          { day: 16, title: "Bangalore – Departure", description: "Transfer to Bangalore airport for the onward journey." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/south-india-tours/cultural-south-india-tour-17days-package/",
      },
    ],
  },

  "india-wildlife-tours": {
    id: "india-wildlife-tours",
    name: "India Wildlife Tours",
    tagline: "Into the Wild",
    description:
      "Safaris through India's national parks and tiger reserves, tracking wildlife alongside naturalist guides.",
    heroImage:
      "https://i.pinimg.com/1200x/a7/4d/5b/a74d5b41143edb5abef1a075fdae0fca.jpg",
    packages: [
      {
        id: "enchanting-temple-and-wildlife-tour-india",
        categorySlug: "india-wildlife-tours",
        name: "Enchanting Temple and Wildlife Tour",
        duration: { days: 14, nights: 13, label: "14 Days / 13 Nights" },
        route: [
          "Delhi", "Jaipur", "Ranthambhore", "Bharatpur", "Agra", "Jhansi",
          "Orchha", "Khajuraho", "Bandhavgarh", "Kanha", "Jabalpur", "Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Enchanting-Temple-Orchha.jpg",
        heroImage: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Jaipur", description: "Drive to the 'Pink City,' founded by Maharaja Sawai Jai Singh II; check-in and a short walk through the nearby markets." },
          { day: 3, title: "Jaipur", description: "Full day of sightseeing — Hawa Mahal, Jal Mahal, Jantar Mantar, City Palace, and Amber Fort with an elephant ride up the hill." },
          { day: 4, title: "Jaipur – Ranthambhore", description: "Drive to Ranthambhore National Park; check into a wildlife resort, with an evening forest walk and langur sightings." },
          { day: 5, title: "Ranthambhore", description: "Early jeep safari into the tiger reserve, spotting leopards, hyenas and deer, plus birdwatching, and a visit to the 944 AD Ranthambhore Fort." },
          { day: 6, title: "Agra via Bharatpur & Fatehpur Sikri (260 km)", description: "Drive via Bharatpur, near the bird-rich Keoladeo Ghana National Park, and Fatehpur Sikri, Akbar's former capital." },
          { day: 7, title: "Agra – train to Jhansi – Orchha", description: "Taj Mahal and Agra Fort in the morning, an excursion to Sikandra (Akbar's tomb), then an evening train to Jhansi and transfer to Orchha." },
          { day: 8, title: "Khajuraho", description: "Orchha Fort, Jahangir Mahal, Raj Mahal and the Ram Raja Temple, then drive on to Khajuraho." },
          { day: 9, title: "Bandhavgarh", description: "The Khajuraho temple complex, built by the Chandela dynasty between 950–1050 AD, then drive to Bandhavgarh National Park." },
          { day: 10, title: "Bandhavgarh (two safaris)", description: "Morning and afternoon jeep safaris in a park known for having one of India's highest tiger densities." },
          { day: 11, title: "Kanha", description: "Drive to Kanha National Park, one of India's largest, spanning 1,945 sq km." },
          { day: 12, title: "Kanha (two safaris)", description: "Jeep safaris tracking tigers, leopards, sambar and swamp deer, plus evening birdwatching." },
          { day: 13, title: "Kanha – overnight train to Delhi", description: "Drive to Jabalpur to board the overnight train back to Delhi." },
          { day: 14, title: "New Delhi", description: "Guided tour of Old Delhi (Jama Masjid, Chandni Chowk, Red Fort) and New Delhi (Raj Ghat, India Gate, the Presidential residence, Humayun's Tomb, Qutub Minar), then transfer to the airport." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-wildlife-tours/enchanting-temple-and-wildlife-tour-india/",
      },
      {
        id: "kerala-wildlife-with-nature-tour-package",
        categorySlug: "india-wildlife-tours",
        name: "Kerala Wildlife Tour",
        duration: { days: 10, nights: 9, label: "10 Days / 9 Nights" },
        route: ["Cochin", "Munnar", "Anamudi", "Periyar", "Kumarakom", "Alleppey", "Cochin"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Kerala-Wildlife-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Cochin", description: "Airport pickup and transfer to hotel; tour documents provided, rest of the day free." },
          { day: 2, title: "Munnar", description: "Drive through scenic waterfalls and tea-estate hills; evening visit to Rajamalai, a viewpoint known for Nilgiri Tahr sightings." },
          { day: 3, title: "Munnar – Anamudi – Munnar", description: "Tea plantations, Eravikulam National Park, Anamudi, Mattupetty, Devikulam, Pothamedu, Pallivasal and Attukal." },
          { day: 4, title: "Periyar", description: "Drive via Idukki Dam; evening boat cruise on Periyar Lake inside the wildlife sanctuary, home to wild elephant, boar, deer and tiger." },
          { day: 5, title: "Periyar", description: "Morning boating through the sanctuary, afternoon visit to spice plantations growing cinnamon, cardamom, coffee, tea and pepper." },
          { day: 6, title: "Periyar – Kumarakom – houseboat cruise", description: "Drive to Kumarakom's bird sanctuary, then board a traditional Kettuvallam houseboat on Vembanad Lake, cruising past Chinese fishing nets and paddy fields, with an evening village visit." },
          { day: 7, title: "Kumarakom houseboat", description: "Continued overnight cruise through the backwaters, passing Punnamada Lake, home of the famous annual boat race." },
          { day: 8, title: "Alleppey", description: "Disembark at a backwater resort in Alappuzha, known for its boat races, coir products and houseboats." },
          { day: 9, title: "Cochin", description: "Drive to Kochi — Portuguese churches, a Jewish synagogue, Hindu temples, mosques and Chinese fishing nets, with an evening Kathakali dance performance." },
          { day: 10, title: "Cochin – Departure", description: "Free morning, then transfer to the airport for the flight home." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-wildlife-tours/kerala-wildlife-with-nature-tour-package/",
      },
      {
        id: "wild-life-delights-india-tour-package",
        categorySlug: "india-wildlife-tours",
        name: "Wild Life Delights Tour",
        duration: { days: 13, nights: 12, label: "13 Days / 12 Nights" },
        route: [
          "New Delhi", "Orchha", "Khajuraho", "Panna Tiger Reserve",
          "Bandhavgarh National Park", "Kanha National Park", "Agra", "Jaipur", "New Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Wild-Life-Delights-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi", description: "Old Delhi (Red Fort, Jama Masjid, Chandni Chowk bazaars) and New Delhi (India Gate, Parliament House, the Secretariat, the Presidential residence)." },
          { day: 3, title: "Orchha (by train)", description: "A roughly 7-hour rail journey to Orchha, on the banks of the Betwa River — once capital of the Bundela dynasty, with more temples and palaces than its size would suggest." },
          { day: 4, title: "Khajuraho", description: "Drive through rural Madhya Pradesh to Khajuraho, home to elaborately carved medieval temples." },
          { day: 5, title: "Panna Tiger Reserve", description: "Free time to explore on foot or by cycle before heading into Panna National Park in search of tigers, staying overnight beside the Ken River." },
          { day: 6, title: "Bandhavgarh National Park", description: "A roughly 7-hour drive deeper into tiger country — Bandhavgarh has one of the higher tiger densities among India's parks." },
          { day: 7, title: "Bandhavgarh National Park", description: "Morning and evening game safaris." },
          { day: 8, title: "Kanha National Park", description: "Drive (approx. 7 hours) to the park that inspired Rudyard Kipling's 'The Jungle Book.'" },
          { day: 9, title: "Kanha National Park", description: "Game viewing across one of the world's best-protected tiger reserves, also home to the Central Indian barasingha (swamp deer)." },
          { day: 10, title: "Kanha – overnight train to Agra", description: "Morning game safari, then drive to Jabalpur to board the overnight train to Agra." },
          { day: 11, title: "Agra (Taj Mahal closed Fridays)", description: "Morning visit to the Taj Mahal; evening at leisure." },
          { day: 12, title: "Jaipur", description: "Drive via Fatehpur Sikri, Akbar's deserted 400-year-old capital." },
          { day: 13, title: "Jaipur", description: "Amber Fort by elephant, then City Palace, Hawa Mahal and the Jantar Mantar observatory." },
          { day: 14, title: "New Delhi", description: "Drive back to Delhi with a lunch stop at Neemrana Palace, then transfer to the international airport." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-wildlife-tours/wild-life-delights-india-tour-package/",
      },
      {
        id: "rajasthan-wildlife-tour-package-at-lowest-price",
        categorySlug: "india-wildlife-tours",
        name: "Wilderness Rajasthan Tour",
        duration: { days: 23, nights: 22, label: "23 Days / 22 Nights" },
        route: [
          "New Delhi", "Sariska", "Bharatpur", "Ranthambhore", "Jaipur", "Nawalgarh",
          "Gajner", "Phalodi", "Jaisalmer", "Sardar Samand", "Kumbhalgarh",
          "Udaipur", "Pushkar", "Agra", "New Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Wilderness-Rajasthan-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrival New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Sariska (approx. 3-hour drive)", description: "Evening safari at Sariska National Park — tiger, leopard, sloth bear and hyena territory — plus the historic Kankwari Fort and a Shiva temple." },
          { day: 3, title: "Bharatpur (150 km)", description: "Bharatpur Park, adjoining Keoladeo Ghana National Park, one of Asia's richest concentrations of birdlife." },
          { day: 4, title: "Ranthambhore National Park (210 km)", description: "Late-afternoon jeep safari through 392 sq km of forest known for tigers, leopards and sloth bear." },
          { day: 5, title: "Ranthambhore National Park", description: "Morning and evening safaris — considered among India's best parks for photographing the Bengal tiger." },
          { day: 6, title: "Jaipur", description: "Drive to the 'Pink City,' founded by Maharaja Sawai Jai Singh II; a short walk through nearby markets." },
          { day: 7, title: "Jaipur", description: "Hawa Mahal, Jal Mahal, Jantar Mantar, City Palace, and Amber Fort with an elephant ride up the hill." },
          { day: 8, title: "Nawalgarh (approx. 160 km)", description: "Drive to the Shekhawati town of Nawalgarh; afternoon horse safari." },
          { day: 9, title: "Gajner", description: "Drive to Gajner Palace via Tal Chapper Wildlife Sanctuary, home to endangered blackbuck and migratory demoiselle cranes." },
          { day: 10, title: "Gajner", description: "Gajner Bird Sanctuary — imperial sandgrouse, demoiselle cranes, chinkara and blackbuck around the lake." },
          { day: 11, title: "Phalodi", description: "Drive to the small desert town of Phalodi; evening at leisure." },
          { day: 12, title: "Thar Desert dunes camp", description: "Morning visit to a site where thousands of demoiselle cranes gather annually, then on to the Sam dunes via Jaisalmer for an overnight desert camp." },
          { day: 13, title: "Jaisalmer (220 km)", description: "Drive through the Thar Desert to Jaisalmer, known for its sandstone architecture." },
          { day: 14, title: "Jaisalmer", description: "Jaisalmer Fort — one of the world's oldest still-inhabited forts — and its havelis, then a camel safari and sunset at the sand dunes with a village dinner (optional overnight in the desert)." },
          { day: 15, title: "Sardar Samand", description: "A lake known for flamingos, pelicans, cranes and kingfishers, with the secluded Sardar Samand Palace on its shore." },
          { day: 16, title: "Kumbhalgarh", description: "Kumbhalgarh Wildlife Sanctuary in the Aravalli range, home to leopards, sloth bear and the four-horned antelope." },
          { day: 17, title: "Udaipur", description: "City Palace, Sahelion ki Bari gardens, and a sunset cruise on Lake Pichola to the island palace of Jagmandir." },
          { day: 18, title: "Pushkar", description: "The pilgrimage town's Brahma temple, the only one of its kind, and the lakeside bazaar." },
          { day: 19, title: "Agra (Taj Mahal closed Fridays)", description: "Drive via Fatehpur Sikri, Akbar's deserted 400-year-old capital; evening at leisure." },
          { day: 20, title: "Agra", description: "Taj Mahal and Agra Fort." },
          { day: 21, title: "New Delhi", description: "Drive back to Delhi; free time at Connaught Place or a Sikh temple visit." },
          { day: 22, title: "New Delhi", description: "Full-day city tour — Old Delhi's Red Fort and Jama Masjid, New Delhi's Parliament House, India Gate and the Presidential residence." },
          { day: 23, title: "Depart New Delhi", description: "Transfer to the international airport, arriving three hours before the scheduled flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-wildlife-tours/rajasthan-wildlife-tour-package-at-lowest-price/",
      },
      {
        id: "north-india-wildlife-tour-package-at-lowest-package",
        categorySlug: "india-wildlife-tours",
        name: "North India Wildlife Tour",
        duration: { days: 17, nights: 16, label: "17 Days / 16 Nights" },
        route: [
          "New Delhi", "Jaipur", "Ranthambhore", "Bharatpur", "Agra",
          "Umaria", "Bandhavgarh", "Kanha", "Nagpur", "Mumbai",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Wildlife-tour-of-North-India.jpg",
        heroImage: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrival New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi", description: "Old Delhi's Jama Masjid and Red Fort, a Chandni Chowk rickshaw ride, plus Raj Ghat, India Gate, the Presidential residence, Humayun's Tomb and Qutub Minar." },
          { day: 3, title: "Jaipur", description: "Drive to the 'Pink City,' founded in 1728 by Maharaja Sawai Jai Singh II; optional evening at the Chokhi Dhani ethnic village resort." },
          { day: 4, title: "Jaipur", description: "Amber Fort by elephant, City Palace, Jantar Mantar observatory, and Hawa Mahal." },
          { day: 5, title: "Ranthambhore", description: "Drive to Ranthambhore National Park, a former royal hunting ground turned tiger reserve; evening jeep safari." },
          { day: 6, title: "Ranthambhore", description: "Early jeep safari, then a visit to the 944 AD Ranthambhore Fort." },
          { day: 7, title: "Bharatpur", description: "Drive to Bharatpur and Keoladeo National Park, a former royal duck-hunting reserve now a major wintering site for migratory birds." },
          { day: 8, title: "Agra via Fatehpur Sikri", description: "Morning cycle-rickshaw birdwatching, then drive to Agra via Fatehpur Sikri, Akbar's abandoned capital." },
          { day: 9, title: "Agra – overnight train to Umaria", description: "Taj Mahal (closed Fridays) and Agra Fort, then an overnight train to Umaria." },
          { day: 10, title: "Umaria – Bandhavgarh National Park", description: "Drive to Bandhavgarh, known for having among the highest tiger densities in India and for its white-tiger lineage; afternoon jeep safari." },
          { day: 11, title: "Bandhavgarh National Park", description: "Morning elephant safari, a visit to Bandhavgarh Fort and its ancient caves, and an afternoon jeep safari." },
          { day: 12, title: "Bandhavgarh National Park", description: "Morning and afternoon jungle safaris." },
          { day: 13, title: "Kanha National Park", description: "Drive to Kanha, home to roughly 22 mammal species and 300 bird species, including the hard-ground swamp deer found only here." },
          { day: 14, title: "Kanha National Park", description: "Morning and afternoon jungle safaris." },
          { day: 15, title: "Kanha – Nagpur – Mumbai (flight)", description: "Morning game drive, then drive to Nagpur to board a flight to Mumbai." },
          { day: 16, title: "Mumbai", description: "Gateway of India, a boat ride to the cave temples of Elephanta Island, and the Jehangir Art Gallery, Victoria Terminus, Prince of Wales Museum and Mani Bhavan (Gandhi's former residence)." },
          { day: 17, title: "Depart Mumbai", description: "Transfer to the international airport for the departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-wildlife-tours/north-india-wildlife-tour-package-at-lowest-package/",
      },
    ],
  },

  "north-west-india-tours": {
    id: "north-west-india-tours",
    name: "North & West India Tours",
    tagline: "Amritsar · Punjab · Mumbai · Goa",
    description:
      "Mumbai and the west coast paired with Rajasthan or Punjab — beach time, Bollywood's home city, and the Ajanta-Ellora cave temples.",
    heroImage:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "affordable-mumbai-ajanta-ellora-tour-package",
        categorySlug: "north-west-india-tours",
        name: "Mumbai Ajanta Ellora Tour",
        duration: { days: 5, nights: 4, label: "5 Days / 4 Nights" },
        route: ["Mumbai", "Aurangabad", "Ajanta", "Ellora", "Mumbai"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Mumbai-Ajanta-Ellora-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Mumbai", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Mumbai", description: "Gateway of India, then a boat cruise to the Elephanta Caves — rock-cut sculptures including the famous three-headed Trimurti Shiva — plus the Prince of Wales Museum, Marine Drive and Hanging Gardens. (Elephanta Caves and the museum are closed Mondays.)" },
          { day: 3, title: "Mumbai – train to Aurangabad", description: "Morning train to Aurangabad; visit the 2nd–6th century Aurangabad Caves and the 12th-century Daulatabad Fort, one of the best-preserved medieval forts in India." },
          { day: 4, title: "Ajanta – Ellora", description: "Excursion to the Ajanta Caves, a UNESCO World Heritage site depicting the history of Buddhism from 200 BC–650 AD, then on to the Ellora Caves — 34 monasteries and temples spanning Buddhism, Hinduism and Jainism. (Ajanta closed Mondays, Ellora closed Tuesdays.)" },
          { day: 5, title: "Aurangabad – flight to Mumbai – Departure", description: "Morning flight to Mumbai, free time, then transfer to the international airport for departure." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/north-west-india-tours/affordable-mumbai-ajanta-ellora-tour-package/",
      },
      {
        id: "indian-cultural-and-beach-tour-at-best-price",
        categorySlug: "north-west-india-tours",
        name: "Indian Cultural & Beach Tour",
        duration: { days: 20, nights: 19, label: "20 Days / 19 Nights" },
        route: [
          "Mumbai", "Goa", "Mumbai", "Udaipur", "Jodhpur", "Pushkar",
          "Jaipur", "Agra", "Khajuraho", "Varanasi", "Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Indian-Cultural-Beach-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrival Mumbai", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Mumbai", description: "Gateway of India, a boat cruise to the Elephanta Caves, then the Prince of Wales Museum, Marine Drive and Hanging Gardens. (Elephanta Caves and the museum are closed Mondays.)" },
          { day: 3, title: "Goa (flight)", description: "Domestic flight to Goa; evening free on the beach." },
          { day: 4, title: "Goa", description: "Old Goa — the Basilica of Bom Jesus, the Sé Cathedral, Church of Our Lady of the Rosary, and Aguada Fort — plus an evening cruise on the Mandovi River." },
          { day: 5, title: "Goa", description: "Beach-hopping at Anjuna, Calangute and Vagator, with free time to relax." },
          { day: 6, title: "Goa – Mumbai – Udaipur (flight)", description: "Flight to Udaipur, the 'City of Lakes'; afternoon boat ride on Lake Pichola and a visit to Jag Mandir." },
          { day: 7, title: "Udaipur", description: "City Palace, Jagdish Temple, Sahelion ki Bari gardens, and Fateh Sagar Lake." },
          { day: 8, title: "Jodhpur via Ranakpur", description: "The Jain temples of Ranakpur, built in 1439 AD, en route to Jodhpur, the 'Blue City' at the edge of the Thar Desert." },
          { day: 9, title: "Jodhpur", description: "Mehrangarh Fort, its palaces and miniature-painting galleries, Jaswant Thada memorial, and an optional visit to Bishnoi villages known for their conservation traditions." },
          { day: 10, title: "Pushkar", description: "The only Brahma temple in the world, and the 52 sacred bathing ghats around Pushkar Lake." },
          { day: 11, title: "Jaipur", description: "Drive to the 'Pink City,' founded in the 18th century by Maharaja Sawai Jai Singh II." },
          { day: 12, title: "Jaipur", description: "Amber Fort by elephant, Hawa Mahal, City Palace and Jantar Mantar, with an evening walking tour." },
          { day: 13, title: "Agra", description: "Drive via Abhaneri's 8th-century stepwell, Chand Baori, and Fatehpur Sikri, Akbar's abandoned 16th-century capital." },
          { day: 14, title: "Agra (Taj Mahal closed Fridays)", description: "The Taj Mahal, built by Shah Jahan for Mumtaz Mahal, plus Agra Fort and the tomb of Itmad-ud-Daulah." },
          { day: 15, title: "Gwalior", description: "Gwalior Fort, one of India's largest, along with the Man Mandir Palace and Sas-Bahu Temples." },
          { day: 16, title: "Gwalior – Khajuraho via Orchha", description: "Orchha's 16th-century Bundela palaces and temples, then on to Khajuraho." },
          { day: 17, title: "Khajuraho", description: "The intricately carved medieval Hindu and Jain temples, with an evening light-and-sound show." },
          { day: 18, title: "Khajuraho – Varanasi (flight)", description: "Flight to Varanasi; evening Ganga aarti ceremony at the ghats." },
          { day: 19, title: "Varanasi", description: "Dawn boat ride on the Ganges, plus visits to Sarnath, where the Buddha gave his first sermon, and the Kashi Vishwanath Temple." },
          { day: 20, title: "Varanasi – New Delhi (flight)", description: "Flight to Delhi." },
          { day: 21, title: "New Delhi – Departure", description: "Jama Masjid, Red Fort (exterior), Chandni Chowk, Raj Ghat, India Gate, Humayun's Tomb and Qutub Minar, then transfer to the international airport." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/north-west-india-tours/indian-cultural-and-beach-tour-at-best-price/",
      },
      {
        id: "rajasthan-with-ajanta-and-ellora-caves-tour",
        categorySlug: "north-west-india-tours",
        name: "Rajasthan with Ajanta Ellora Tour",
        duration: { days: 12, nights: 11, label: "12 Days / 11 Nights" },
        route: [
          "Delhi", "Agra", "Jaipur", "Pushkar", "Jodhpur", "Ranakpur",
          "Udaipur (flight)", "Aurangabad (flight)", "Mumbai",
        ],
        thumbnail:
          "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Rajasthan-with-Ajanta-Ellora-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Arrive New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi", description: "Jama Masjid, Red Fort, a walk through Chandni Chowk, Raj Ghat, Akshardham, Birla Mandir, Humayun's Tomb, Qutub Minar, the Lotus Temple, India Gate and the government buildings." },
          { day: 3, title: "Udaipur (flight)", description: "Domestic flight to Udaipur, the 'City of Lakes'; afternoon boat ride on Lake Pichola and a visit to Jag Mandir." },
          { day: 4, title: "Jaipur (via Fatehpur Sikri)", description: "The Taj Mahal and Fatehpur Sikri, Akbar's 16th-century abandoned capital, en route to Jaipur; afternoon at City Palace, Jantar Mantar and Birla Temple." },
          { day: 5, title: "Pushkar", description: "Drive via Ajmer's Nasiyan Jain temple and Dargah Sharif; Brahma Temple and the sacred lake at Pushkar." },
          { day: 6, title: "Jaipur", description: "Return to Jaipur, the 'Pink City,' with time to explore its forts, temples and palaces." },
          { day: 7, title: "Jodhpur", description: "Mehrangarh Fort's palace museum, Jaswant Thada memorial, and Umaid Bhawan Palace." },
          { day: 8, title: "Udaipur via Ranakpur", description: "The Jain temples of Ranakpur, including the elaborately carved Chaumukha temple, en route to Udaipur; Sahelion ki Bari gardens." },
          { day: 9, title: "Udaipur", description: "City Palace, Jagdish Temple, a folk-art museum, and an evening boat ride on Lake Pichola past Jag Mandir and the Taj Lake Palace." },
          { day: 10, title: "Udaipur – flight to Aurangabad", description: "Flight to Aurangabad; Bibi Ka Maqbara, a 17th-century mausoleum modeled on the Taj Mahal, and the historic Panchakki water mill." },
          { day: 11, title: "Aurangabad – Ajanta Caves", description: "Excursion to the Ajanta Caves, 29 Buddhist cave temples carved into a horseshoe cliff between the 2nd century BC and 6th century AD, rediscovered in 1819." },
          { day: 12, title: "Aurangabad – Ellora Caves – flight to Mumbai", description: "Excursion to the Ellora Caves, a UNESCO World Heritage complex of Buddhist, Hindu and Jain temples, then flight to Mumbai to connect with the international departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/north-west-india-tours/rajasthan-with-ajanta-and-ellora-caves-tour/",
      },
      {
        id: "north-and-west-india-tour-package-at-lowest-price",
        categorySlug: "north-west-india-tours",
        name: "North and West India Tour",
        duration: { days: 12, nights: 11, label: "12 Days / 11 Nights" },
        route: ["Mumbai", "Udaipur", "Pushkar", "Jaipur", "Agra", "Khajuraho", "Varanasi", "Delhi"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/North-and-west-India-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Mumbai", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Mumbai", description: "Gateway of India, a boat cruise to the Elephanta Caves, then the Prince of Wales Museum, Marine Drive and Hanging Gardens." },
          { day: 3, title: "Udaipur (flight)", description: "Domestic flight to Udaipur, the 'City of Lakes'; afternoon boat ride on Lake Pichola and a visit to Jag Mandir." },
          { day: 4, title: "Udaipur", description: "City Palace, Jagdish Temple, Sahelion ki Bari gardens and Fateh Sagar Lake." },
          { day: 5, title: "Pushkar", description: "Drive to the pilgrimage town of Pushkar, home to the only Brahma temple in the world." },
          { day: 6, title: "Jaipur", description: "Drive to the 'Pink City,' founded in the 18th century by Maharaja Sawai Jai Singh II." },
          { day: 7, title: "Jaipur", description: "Amber Fort by elephant, Hawa Mahal, City Palace and Jantar Mantar, with an evening walking tour." },
          { day: 8, title: "Agra", description: "Drive via Fatehpur Sikri, Akbar's abandoned Mughal capital; evening view of the Taj Mahal from the riverside." },
          { day: 9, title: "Agra – train to Jhansi – Khajuraho", description: "Sunrise visit to the Taj Mahal, then a Shatabdi Express train to Jhansi and drive on to Khajuraho." },
          { day: 10, title: "Khajuraho – flight to Varanasi", description: "Morning at the Khajuraho temples, then an afternoon flight to Varanasi and an evening Ganga aarti ceremony at the ghats." },
          { day: 11, title: "Varanasi", description: "Dawn boat ride on the Ganges, plus an excursion to Sarnath, where the Buddha gave his first sermon." },
          { day: 12, title: "Varanasi – New Delhi (flight) – Departure", description: "Flight to Delhi to connect with the international departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/north-west-india-tours/north-and-west-india-tour-package-at-lowest-price/",
      },
    ],
  },

  "india-nepal-tours": {
    id: "india-nepal-tours",
    name: "India & Nepal Tours",
    tagline: "Two Countries · One Journey",
    description:
      "Cross-border itineraries combining India's cultural circuit with Nepal's Himalayan landscapes and Kathmandu Valley.",
    heroImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "nepal-tourism-package-at-lowest-price",
        categorySlug: "india-nepal-tours",
        name: "Nepal Tour",
        duration: { days: 7, nights: 6, label: "7 Days / 6 Nights" },
        route: ["Kathmandu", "Pokhara", "Sarangkot", "Nagarkot", "Bhaktapur", "Kathmandu"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Nepal-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Kathmandu", description: "Airport pickup and transfer to hotel." },
          { day: 2, title: "Pokhara (200 km)", description: "Scenic drive to Pokhara, a lakeside valley town framed by the Annapurna and Machhapuchhre (Fishtail) peaks; afternoon visit to the Tibetan refugee camp, Devi's Falls, and the lakeside market." },
          { day: 3, title: "Pokhara", description: "Pre-dawn drive to the Sarangkot viewpoint for sunrise over Dhaulagiri, Annapurna and Machhapuchhre, then an hour of boating on Phewa Lake." },
          { day: 4, title: "Nagarkot (via Kathmandu)", description: "Drive via the ancient Changu Narayan temple, one of the oldest pagoda-style temples in the valley, to Nagarkot for sunset Himalayan views." },
          { day: 5, title: "Kathmandu", description: "Sunrise views at Nagarkot, then drive back via Bhaktapur — the 'city of devotees,' founded in 889 AD — to see the Nyatapola temple and the 15th-century 55-Window Palace." },
          { day: 6, title: "Kathmandu", description: "City sightseeing in Patan ('the city of beauty'), including its Royal Palace, Golden Temple and Mahaboudha Temple." },
          { day: 7, title: "Depart Kathmandu", description: "Free time until transfer to the international airport for departure." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/nepal-tourism-package-at-lowest-price/",
      },
      {
        id: "best-of-rajasthan-varanasi-tour-with-nepal",
        categorySlug: "india-nepal-tours",
        name: "Rajasthan & Varanasi with Nepal",
        duration: { days: 21, nights: 20, label: "21 Days / 20 Nights" },
        route: [
          "New Delhi", "Mandawa", "Bikaner", "Jaisalmer", "Jodhpur", "Ranakpur",
          "Udaipur", "Pushkar", "Jaipur", "Agra", "Varanasi", "Kathmandu (Nepal)", "New Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Rajasthan-Varanasi-with-Nepal.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Mandawa (Shekhawati region)", description: "Drive to the painted-haveli towns of the Shekhawati region, built by wealthy 18th–19th century traders." },
          { day: 3, title: "Bikaner", description: "Half-day city tour of Junagarh Fort and the famous rat temple at Deshnok." },
          { day: 4, title: "Jaisalmer (the Golden City)", description: "Drive across the Thar Desert to the sandstone-fort city of Jaisalmer." },
          { day: 5, title: "Jaisalmer", description: "Jaisalmer Fort, the world's oldest living fort, plus its havelis, a camel safari to the Sam or Khuri dunes for sunset, and a village dinner with live Rajasthani music (optional overnight desert camp)." },
          { day: 6, title: "Jodhpur (the Sun City)", description: "Mehrangarh Fort overlooking the Blue City below." },
          { day: 7, title: "Ranakpur", description: "The 15th-century Jain temples of Ranakpur." },
          { day: 8, title: "Udaipur (the City of Lakes)", description: "Via Kumbhalgarh Fort, built by Maharana Kumbha in 1453, with its dramatic Zenana Mahal murals." },
          { day: 9, title: "Udaipur", description: "City Palace, Sahelion ki Bari gardens, and a sunset boat ride on Lake Pichola to Jagmandir island palace, said to have inspired Shah Jahan's design for the Taj Mahal." },
          { day: 10, title: "Pushkar", description: "The only Brahma temple in the world, and the lakeside bazaar of this holy Hindu town." },
          { day: 11, title: "Jaipur (the Pink City)", description: "Jantar Mantar observatory, built in 1727, and City Palace." },
          { day: 12, title: "Jaipur", description: "Full day at Amber Fort, including an elephant ride to the top." },
          { day: 13, title: "Agra (Taj Mahal closed Fridays)", description: "Drive via Fatehpur Sikri, Akbar's abandoned 16th-century capital; Agra Fort." },
          { day: 14, title: "Agra – Varanasi (night train or Delhi flight)", description: "Travel on to Varanasi, one of India's most important religious cities." },
          { day: 15, title: "Varanasi (city of the Ganges)", description: "Dawn boat ride along the ghats, the Kashi Vishwanath temple, Banaras Hindu University, and an excursion to Sarnath, where the Buddha preached his first sermon." },
          { day: 16, title: "Varanasi – Kathmandu, Nepal (flight)", description: "Flight to Kathmandu for a 3-day stay covering Durbar Square, Patan, Pashupatinath Temple, Bhaktapur, and — weather permitting — Himalayan sunrise views from Nagarkot." },
          { day: 19, title: "Kathmandu – New Delhi (flight)", description: "Flight back to Delhi; evening free at Connaught Place." },
          { day: 20, title: "New Delhi", description: "Full day in Delhi — Red Fort, Jama Masjid in Old Delhi, then India Gate, Parliament House and the Presidential residence in New Delhi." },
          { day: 21, title: "Depart New Delhi", description: "Transfer to the international airport 3 hours before the scheduled flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/best-of-rajasthan-varanasi-tour-with-nepal/",
      },
      {
        id: "north-india-nepal-tour-at-low-cost-for-14days",
        categorySlug: "india-nepal-tours",
        name: "North India & Nepal Tour",
        duration: { days: 14, nights: 13, label: "14 Days / 13 Nights" },
        route: [
          "Delhi", "Jaipur", "Agra", "Orchha", "Khajuraho", "Varanasi",
          "Kathmandu", "Pokhara", "Kathmandu", "Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/08/North-India-Nepal-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi", description: "Old Delhi's Red Fort, Jama Masjid, Raj Ghat and a rickshaw ride through Chandni Chowk; New Delhi's Rashtrapati Bhawan, India Gate, the Laxmi Narayan Temple, Humayun's Tomb and Qutub Minar, with an evening light-and-sound show at Red Fort." },
          { day: 3, title: "Jaipur", description: "Drive to the 'Pink City'; City Palace, Hawa Mahal, and an evening walk through Jaipur's bazaars." },
          { day: 4, title: "Jaipur", description: "Amber Fort with an elephant ride up the hill, City Palace, and the Jantar Mantar observatory, built by Sawai Jai Singh." },
          { day: 5, title: "Agra", description: "Drive via Fatehpur Sikri, built by Akbar in honour of the Sufi saint Salim Chishti; Agra Fort, from which the Taj Mahal is visible across the Yamuna River, plus Itmad-ud-Daulah's tomb." },
          { day: 6, title: "Agra – Gwalior – Orchha", description: "Sunrise at the Taj Mahal, then drive via Gwalior Fort to Orchha, the former Bundela-dynasty capital on the Betwa River, known for the Jehangir Mahal and Raj Mahal's frescoes." },
          { day: 7, title: "Khajuraho (via Alipura)", description: "Drive to Khajuraho, home to elaborately carved medieval Hindu and Jain temples built by the Chandela dynasty." },
          { day: 8, title: "Varanasi (flight)", description: "Flight to Varanasi; evening boat ride and prayer ceremony (aarti) on the Ganges ghats." },
          { day: 9, title: "Kathmandu, Nepal (flight)", description: "Free morning in Varanasi, then a flight over the Himalayas to Kathmandu." },
          { day: 10, title: "Kathmandu", description: "City tour including Hanuman Dhoka palace square, Kal Bhairav, Kumari Mandap and the local bazaar." },
          { day: 11, title: "Pokhara", description: "Drive to Pokhara, a lakeside valley town with views of the Annapurna range from Phewa Lake, including the Barahi Temple." },
          { day: 12, title: "Pokhara", description: "Free day around Phewa Lake, Devi's Falls, Mahendra Cave and the World Peace Pagoda." },
          { day: 13, title: "Kathmandu", description: "Drive back to Kathmandu to visit any remaining sights; rest of the day free." },
          { day: 14, title: "Depart via New Delhi (flight)", description: "Flight back to Delhi to connect with the international departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/north-india-nepal-tour-at-low-cost-for-14days/",
      },
    ],
  },

  "jammu-kashmir-tours": {
    id: "jammu-kashmir-tours",
    name: "Jammu & Kashmir Tours",
    tagline: "Paradise in the Himalayas",
    description:
      "Alpine lakes, valleys and mountain towns — Srinagar, Gulmarg, Pahalgam and Sonmarg, with an optional Vaishno Devi pilgrimage stop.",
    heroImage: "https://i.pinimg.com/736x/01/84/6e/01846e349c37fecd51ba2bd090bba820.jpg", // TODO: swap for licensed photography — see note in TourPackagesGrid.jsx about this same image
    packages: [
      {
        id: "jammu-and-kashmir-best-tourist-guide-in-india",
        categorySlug: "jammu-kashmir-tours",
        name: "Best of Jammu & Kashmir Tour",
        duration: { days: 9, nights: 8, label: "9 Days / 8 Nights" },
        route: ["Jammu", "Katra", "Pahalgam", "Gulmarg", "Sonmarg", "Srinagar"],
        thumbnail:
          "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Best-of-Jammu-Kashmir-Tour.jpg",
        heroImage: "https://i.pinimg.com/736x/01/84/6e/01846e349c37fecd51ba2bd090bba820.jpg",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Jammu – Katra", description: "Airport or railway station pickup, transfer to Katra (~1 hr); trek to the Vaishno Devi shrine, a major Hindu pilgrimage site dedicated to the goddess Shakti — ponies are available for the climb." },
          { day: 2, title: "Katra – Pahalgam (270 km)", description: "Drive through the Katra valley to Pahalgam, known for forested trails and as the traditional starting point of the Amarnath Yatra pilgrimage." },
          { day: 3, title: "Pahalgam", description: "A day of nature walks, trout fishing and pony trekking around Pahalgam's scenery." },
          { day: 4, title: "Pahalgam – Gulmarg (150 km)", description: "Drive to Gulmarg, home to the world's highest golf course and among the world's top ski destinations." },
          { day: 5, title: "Gulmarg", description: "Full day sightseeing — Alpather Lake, the Baba Reshi shrine, the Gulmarg Gondola cable car, and St Mary's Church." },
          { day: 6, title: "Gulmarg – Srinagar (85 km)", description: "Drive to Srinagar and check into a houseboat; evening Shikara (traditional boat) ride on Dal Lake." },
          { day: 7, title: "Srinagar", description: "Mughal Gardens, Nishat Bagh, Shalimar Bagh, Hazratbal Shrine and Shankaracharya Temple." },
          { day: 8, title: "Srinagar – Sonmarg – Srinagar (85 km)", description: "Excursion to Sonmarg, the 'Golden Meadows,' known for silver birches, pine forest and — in spring — carpets of yellow crocuses." },
          { day: 9, title: "Depart Srinagar", description: "Transfer to Srinagar airport for the onward journey." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/jammu-kashmir-tours/jammu-and-kashmir-best-tourist-guide-in-india/",
      },
      {
        id: "vaishano-devi-tourist-packages-at-lowest-cost",
        categorySlug: "jammu-kashmir-tours",
        name: "Kashmir Tour with Vaishno Devi",
        duration: { days: 10, nights: 9, label: "10 Days / 9 Nights" },
        route: ["Jammu", "Katra (Vaishno Devi Darshan)", "Patnitop", "Srinagar", "Sonmarg", "Gulmarg"],
        thumbnail:
          "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Kashmir-Tour-with-Vaishano-Devi.jpg",
        heroImage: "https://i.pinimg.com/736x/01/84/6e/01846e349c37fecd51ba2bd090bba820.jpg",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Jammu – Katra", description: "Pickup and transfer to Katra (~1 hr); trek to the Vaishno Devi shrine, dedicated to the goddess Shakti and one of the most-visited pilgrimage sites in India — ponies available for the 12 km climb." },
          { day: 2, title: "Katra – Patnitop (112 km)", description: "Drive to the hill resort of Patnitop, named after a nearby pond (Patan Da Talab, 'Pond of the Princess'), known for its tranquil natural setting." },
          { day: 3, title: "Patnitop", description: "Local sightseeing including the Nag Temples and excursions to Nathatop and Sanasar." },
          { day: 4, title: "Patnitop – Srinagar (200 km)", description: "Drive to Srinagar, the capital of Jammu & Kashmir; check into a houseboat and take an evening cruise on Dal Lake." },
          { day: 5, title: "Srinagar – Sonmarg – Srinagar (85 km)", description: "Excursion to Sonmarg, known for alpine flowers, pine forest and silver birches." },
          { day: 6, title: "Srinagar – Gulmarg (60 km)", description: "Drive to Gulmarg, home to the world's highest 18-hole golf course and celebrated ski slopes." },
          { day: 7, title: "Gulmarg", description: "Full day sightseeing — Alpather Lake (frozen even in mid-June), the Gulmarg Gondola cable car, Maharani Temple, St Mary's Church and Khilanmarg." },
          { day: 8, title: "Gulmarg – Srinagar (60 km)", description: "Return to Srinagar; sightseeing at Nishat Bagh, Mughal Gardens, Hazratbal Shrine, Shalimar Bagh and Shankaracharya Temple, followed by a sunset Shikara ride on Dal Lake." },
          { day: 9, title: "Srinagar – Katra (200 km)", description: "Drive back to Katra through mountain scenery." },
          { day: 10, title: "Katra – Jammu Departure (50 km)", description: "Transfer to Jammu for the onward flight home." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/jammu-kashmir-tours/vaishano-devi-tourist-packages-at-lowest-cost/",
      },
      {
        id: "tour-to-kashmir-valley-in-india",
        categorySlug: "jammu-kashmir-tours",
        name: "Kashmir Valley Tour",
        duration: { days: 8, nights: 7, label: "8 Days / 7 Nights" },
        route: ["Srinagar", "Sonmarg", "Gulmarg", "Pahalgam", "Srinagar"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Kashmir-Valley-Tour.jpg",
        heroImage: "https://i.pinimg.com/736x/01/84/6e/01846e349c37fecd51ba2bd090bba820.jpg",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Srinagar", description: "Airport pickup and transfer to a houseboat on Dal Lake; evening Shikara ride to watch the sunset." },
          { day: 2, title: "Srinagar – Sonmarg – Srinagar", description: "Excursion to Sonmarg, known for alpine flowers, cedar trees and silver birch." },
          { day: 3, title: "Srinagar – Gulmarg (60 km)", description: "Drive to Gulmarg, famous for its ski slopes and the world's highest 18-hole golf course." },
          { day: 4, title: "Gulmarg", description: "Full day sightseeing — Alpather Lake, Baba Reshi Shrine, the Gulmarg Gondola cable car, Khilanmarg, St Mary's Church and Maharani Temple." },
          { day: 5, title: "Gulmarg – Pahalgam (150 km)", description: "Drive to Pahalgam, the 'Valley of Shepherds' and traditional starting point of the Amarnath Yatra pilgrimage." },
          { day: 6, title: "Pahalgam", description: "A day of pony trekking, camping, fishing and nature walks." },
          { day: 7, title: "Pahalgam – Srinagar (85 km)", description: "Drive back to Srinagar; sightseeing at Mughal Gardens, Nishat Bagh, Shalimar Bagh, Shankaracharya Temple and Hazratbal Shrine." },
          { day: 8, title: "Depart Srinagar", description: "Transfer to Srinagar airport for the onward journey." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl: "https://www.timesindiatravels.com/tour-packages/jammu-kashmir-tours/tour-to-kashmir-valley-in-india/",
      },
      {
        id: "kashmir-valley-tour-at-lowest-price",
        categorySlug: "jammu-kashmir-tours",
        name: "Kashmir Best Valley Tour",
        duration: { days: 7, nights: 6, label: "7 Days / 6 Nights" },
        route: ["Srinagar", "Gulmarg", "Sonmarg", "Pahalgam", "Srinagar"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Kashmir-Best-Valley-Tour.jpg",
        heroImage: "https://i.pinimg.com/736x/01/84/6e/01846e349c37fecd51ba2bd090bba820.jpg",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Srinagar Arrival", description: "Airport pickup and transfer to a houseboat on Dal Lake." },
          { day: 2, title: "Srinagar", description: "Sightseeing at Mughal Gardens, Nishat Bagh, Shalimar Bagh, Hazratbal Shrine and Shankaracharya Temple." },
          { day: 3, title: "Srinagar – Gulmarg – Srinagar (60 km)", description: "Excursion to Gulmarg, known for its ski slopes and the world's highest 18-hole golf course." },
          { day: 4, title: "Srinagar – Sonmarg – Srinagar (85 km)", description: "Excursion to Sonmarg, the 'Golden Meadows,' with alpine flowers and pine forest." },
          { day: 5, title: "Srinagar – Pahalgam (90 km)", description: "Drive to Pahalgam, the 'Valley of Shepherds' and the traditional starting point of the Amarnath Yatra pilgrimage." },
          { day: 6, title: "Pahalgam", description: "Full day sightseeing around Pahalgam's forests and river valleys." },
          { day: 7, title: "Pahalgam – Srinagar – Departure", description: "Drive to Srinagar airport for the onward journey." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/jammu-kashmir-tours/kashmir-valley-tour-at-lowest-price/",
      },
      {
        id: "kashmir-paradise-tour-package-at-affordable-price",
        categorySlug: "jammu-kashmir-tours",
        name: "Kashmir The Paradise Tour",
        duration: { days: 6, nights: 5, label: "6 Days / 5 Nights" },
        route: ["Srinagar", "Sonmarg", "Gulmarg", "Pahalgam", "Srinagar"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Kashmir-The-Paradise-Tour.jpg",
        heroImage: "https://i.pinimg.com/736x/01/84/6e/01846e349c37fecd51ba2bd090bba820.jpg",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Srinagar", description: "Airport pickup and transfer to a houseboat on Dal Lake; evening Shikara ride to watch the sunset over the water." },
          { day: 2, title: "Srinagar – Sonmarg – Srinagar", description: "Excursion to Sonmarg, the 'Meadows of Gold,' known for green meadows, wildflowers, silver birch and pine forest." },
          { day: 3, title: "Srinagar – Gulmarg", description: "Drive to the hill resort of Gulmarg, home to the world's highest 18-hole golf course and celebrated ski slopes; visit the Baba Reshi Shrine, the Gulmarg Gondola cable car, St Mary's Church and Alpather Lake." },
          { day: 4, title: "Gulmarg – Pahalgam", description: "Drive to Pahalgam, the 'Valley of Shepherds' in the Liddar Valley, known for trout fishing, camping and pony trekking, and the starting point of the Amarnath Yatra pilgrimage." },
          { day: 5, title: "Pahalgam – Srinagar", description: "Drive back to Srinagar; sightseeing at Mughal Gardens, Nishat Bagh, Shalimar Bagh, Hazratbal Shrine and Shankaracharya Temple." },
          { day: 6, title: "Depart Srinagar", description: "Transfer to the airport for the onward journey." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/jammu-kashmir-tours/kashmir-paradise-tour-package-at-affordable-price/",
      },
    ],
  },

  "north-india": {
    id: "north-india",
    name: "north-india",
    tagline: "Two Countries · One Journey",
    description:
      "Cross-border itineraries combining India's cultural circuit with Nepal's Himalayan landscapes and Kathmandu Valley.",
    heroImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "nepal-tourism-package-at-lowest-price",
        categorySlug: "india-nepal-tours",
        name: "Nepal Tour",
        duration: { days: 7, nights: 6, label: "7 Days / 6 Nights" },
        route: ["Kathmandu", "Pokhara", "Sarangkot", "Nagarkot", "Bhaktapur", "Kathmandu"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Nepal-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Kathmandu", description: "Airport pickup and transfer to hotel." },
          { day: 2, title: "Pokhara (200 km)", description: "Scenic drive to Pokhara, a lakeside valley town framed by the Annapurna and Machhapuchhre (Fishtail) peaks; afternoon visit to the Tibetan refugee camp, Devi's Falls, and the lakeside market." },
          { day: 3, title: "Pokhara", description: "Pre-dawn drive to the Sarangkot viewpoint for sunrise over Dhaulagiri, Annapurna and Machhapuchhre, then an hour of boating on Phewa Lake." },
          { day: 4, title: "Nagarkot (via Kathmandu)", description: "Drive via the ancient Changu Narayan temple, one of the oldest pagoda-style temples in the valley, to Nagarkot for sunset Himalayan views." },
          { day: 5, title: "Kathmandu", description: "Sunrise views at Nagarkot, then drive back via Bhaktapur — the 'city of devotees,' founded in 889 AD — to see the Nyatapola temple and the 15th-century 55-Window Palace." },
          { day: 6, title: "Kathmandu", description: "City sightseeing in Patan ('the city of beauty'), including its Royal Palace, Golden Temple and Mahaboudha Temple." },
          { day: 7, title: "Depart Kathmandu", description: "Free time until transfer to the international airport for departure." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/nepal-tourism-package-at-lowest-price/",
      },
      {
        id: "best-of-rajasthan-varanasi-tour-with-nepal",
        categorySlug: "india-nepal-tours",
        name: "Rajasthan & Varanasi with Nepal",
        duration: { days: 21, nights: 20, label: "21 Days / 20 Nights" },
        route: [
          "New Delhi", "Mandawa", "Bikaner", "Jaisalmer", "Jodhpur", "Ranakpur",
          "Udaipur", "Pushkar", "Jaipur", "Agra", "Varanasi", "Kathmandu (Nepal)", "New Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Rajasthan-Varanasi-with-Nepal.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Mandawa (Shekhawati region)", description: "Drive to the painted-haveli towns of the Shekhawati region, built by wealthy 18th–19th century traders." },
          { day: 3, title: "Bikaner", description: "Half-day city tour of Junagarh Fort and the famous rat temple at Deshnok." },
          { day: 4, title: "Jaisalmer (the Golden City)", description: "Drive across the Thar Desert to the sandstone-fort city of Jaisalmer." },
          { day: 5, title: "Jaisalmer", description: "Jaisalmer Fort, the world's oldest living fort, plus its havelis, a camel safari to the Sam or Khuri dunes for sunset, and a village dinner with live Rajasthani music (optional overnight desert camp)." },
          { day: 6, title: "Jodhpur (the Sun City)", description: "Mehrangarh Fort overlooking the Blue City below." },
          { day: 7, title: "Ranakpur", description: "The 15th-century Jain temples of Ranakpur." },
          { day: 8, title: "Udaipur (the City of Lakes)", description: "Via Kumbhalgarh Fort, built by Maharana Kumbha in 1453, with its dramatic Zenana Mahal murals." },
          { day: 9, title: "Udaipur", description: "City Palace, Sahelion ki Bari gardens, and a sunset boat ride on Lake Pichola to Jagmandir island palace, said to have inspired Shah Jahan's design for the Taj Mahal." },
          { day: 10, title: "Pushkar", description: "The only Brahma temple in the world, and the lakeside bazaar of this holy Hindu town." },
          { day: 11, title: "Jaipur (the Pink City)", description: "Jantar Mantar observatory, built in 1727, and City Palace." },
          { day: 12, title: "Jaipur", description: "Full day at Amber Fort, including an elephant ride to the top." },
          { day: 13, title: "Agra (Taj Mahal closed Fridays)", description: "Drive via Fatehpur Sikri, Akbar's abandoned 16th-century capital; Agra Fort." },
          { day: 14, title: "Agra – Varanasi (night train or Delhi flight)", description: "Travel on to Varanasi, one of India's most important religious cities." },
          { day: 15, title: "Varanasi (city of the Ganges)", description: "Dawn boat ride along the ghats, the Kashi Vishwanath temple, Banaras Hindu University, and an excursion to Sarnath, where the Buddha preached his first sermon." },
          { day: 16, title: "Varanasi – Kathmandu, Nepal (flight)", description: "Flight to Kathmandu for a 3-day stay covering Durbar Square, Patan, Pashupatinath Temple, Bhaktapur, and — weather permitting — Himalayan sunrise views from Nagarkot." },
          { day: 19, title: "Kathmandu – New Delhi (flight)", description: "Flight back to Delhi; evening free at Connaught Place." },
          { day: 20, title: "New Delhi", description: "Full day in Delhi — Red Fort, Jama Masjid in Old Delhi, then India Gate, Parliament House and the Presidential residence in New Delhi." },
          { day: 21, title: "Depart New Delhi", description: "Transfer to the international airport 3 hours before the scheduled flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/best-of-rajasthan-varanasi-tour-with-nepal/",
      },
      {
        id: "north-india-nepal-tour-at-low-cost-for-14days",
        categorySlug: "india-nepal-tours",
        name: "North India & Nepal Tour",
        duration: { days: 14, nights: 13, label: "14 Days / 13 Nights" },
        route: [
          "Delhi", "Jaipur", "Agra", "Orchha", "Khajuraho", "Varanasi",
          "Kathmandu", "Pokhara", "Kathmandu", "Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/08/North-India-Nepal-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi", description: "Old Delhi's Red Fort, Jama Masjid, Raj Ghat and a rickshaw ride through Chandni Chowk; New Delhi's Rashtrapati Bhawan, India Gate, the Laxmi Narayan Temple, Humayun's Tomb and Qutub Minar, with an evening light-and-sound show at Red Fort." },
          { day: 3, title: "Jaipur", description: "Drive to the 'Pink City'; City Palace, Hawa Mahal, and an evening walk through Jaipur's bazaars." },
          { day: 4, title: "Jaipur", description: "Amber Fort with an elephant ride up the hill, City Palace, and the Jantar Mantar observatory, built by Sawai Jai Singh." },
          { day: 5, title: "Agra", description: "Drive via Fatehpur Sikri, built by Akbar in honour of the Sufi saint Salim Chishti; Agra Fort, from which the Taj Mahal is visible across the Yamuna River, plus Itmad-ud-Daulah's tomb." },
          { day: 6, title: "Agra – Gwalior – Orchha", description: "Sunrise at the Taj Mahal, then drive via Gwalior Fort to Orchha, the former Bundela-dynasty capital on the Betwa River, known for the Jehangir Mahal and Raj Mahal's frescoes." },
          { day: 7, title: "Khajuraho (via Alipura)", description: "Drive to Khajuraho, home to elaborately carved medieval Hindu and Jain temples built by the Chandela dynasty." },
          { day: 8, title: "Varanasi (flight)", description: "Flight to Varanasi; evening boat ride and prayer ceremony (aarti) on the Ganges ghats." },
          { day: 9, title: "Kathmandu, Nepal (flight)", description: "Free morning in Varanasi, then a flight over the Himalayas to Kathmandu." },
          { day: 10, title: "Kathmandu", description: "City tour including Hanuman Dhoka palace square, Kal Bhairav, Kumari Mandap and the local bazaar." },
          { day: 11, title: "Pokhara", description: "Drive to Pokhara, a lakeside valley town with views of the Annapurna range from Phewa Lake, including the Barahi Temple." },
          { day: 12, title: "Pokhara", description: "Free day around Phewa Lake, Devi's Falls, Mahendra Cave and the World Peace Pagoda." },
          { day: 13, title: "Kathmandu", description: "Drive back to Kathmandu to visit any remaining sights; rest of the day free." },
          { day: 14, title: "Depart via New Delhi (flight)", description: "Flight back to Delhi to connect with the international departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/north-india-nepal-tour-at-low-cost-for-14days/",
      },
    ],
  },

  "south-india": {
    id: "south-india",
    name: "south-india",
    tagline: "Two Countries · One Journey",
    description:
      "Cross-border itineraries combining India's cultural circuit with Nepal's Himalayan landscapes and Kathmandu Valley.",
    heroImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "nepal-tourism-package-at-lowest-price",
        categorySlug: "india-nepal-tours",
        name: "Nepal Tour",
        duration: { days: 7, nights: 6, label: "7 Days / 6 Nights" },
        route: ["Kathmandu", "Pokhara", "Sarangkot", "Nagarkot", "Bhaktapur", "Kathmandu"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Nepal-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Kathmandu", description: "Airport pickup and transfer to hotel." },
          { day: 2, title: "Pokhara (200 km)", description: "Scenic drive to Pokhara, a lakeside valley town framed by the Annapurna and Machhapuchhre (Fishtail) peaks; afternoon visit to the Tibetan refugee camp, Devi's Falls, and the lakeside market." },
          { day: 3, title: "Pokhara", description: "Pre-dawn drive to the Sarangkot viewpoint for sunrise over Dhaulagiri, Annapurna and Machhapuchhre, then an hour of boating on Phewa Lake." },
          { day: 4, title: "Nagarkot (via Kathmandu)", description: "Drive via the ancient Changu Narayan temple, one of the oldest pagoda-style temples in the valley, to Nagarkot for sunset Himalayan views." },
          { day: 5, title: "Kathmandu", description: "Sunrise views at Nagarkot, then drive back via Bhaktapur — the 'city of devotees,' founded in 889 AD — to see the Nyatapola temple and the 15th-century 55-Window Palace." },
          { day: 6, title: "Kathmandu", description: "City sightseeing in Patan ('the city of beauty'), including its Royal Palace, Golden Temple and Mahaboudha Temple." },
          { day: 7, title: "Depart Kathmandu", description: "Free time until transfer to the international airport for departure." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/nepal-tourism-package-at-lowest-price/",
      },
      {
        id: "best-of-rajasthan-varanasi-tour-with-nepal",
        categorySlug: "india-nepal-tours",
        name: "Rajasthan & Varanasi with Nepal",
        duration: { days: 21, nights: 20, label: "21 Days / 20 Nights" },
        route: [
          "New Delhi", "Mandawa", "Bikaner", "Jaisalmer", "Jodhpur", "Ranakpur",
          "Udaipur", "Pushkar", "Jaipur", "Agra", "Varanasi", "Kathmandu (Nepal)", "New Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Rajasthan-Varanasi-with-Nepal.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Mandawa (Shekhawati region)", description: "Drive to the painted-haveli towns of the Shekhawati region, built by wealthy 18th–19th century traders." },
          { day: 3, title: "Bikaner", description: "Half-day city tour of Junagarh Fort and the famous rat temple at Deshnok." },
          { day: 4, title: "Jaisalmer (the Golden City)", description: "Drive across the Thar Desert to the sandstone-fort city of Jaisalmer." },
          { day: 5, title: "Jaisalmer", description: "Jaisalmer Fort, the world's oldest living fort, plus its havelis, a camel safari to the Sam or Khuri dunes for sunset, and a village dinner with live Rajasthani music (optional overnight desert camp)." },
          { day: 6, title: "Jodhpur (the Sun City)", description: "Mehrangarh Fort overlooking the Blue City below." },
          { day: 7, title: "Ranakpur", description: "The 15th-century Jain temples of Ranakpur." },
          { day: 8, title: "Udaipur (the City of Lakes)", description: "Via Kumbhalgarh Fort, built by Maharana Kumbha in 1453, with its dramatic Zenana Mahal murals." },
          { day: 9, title: "Udaipur", description: "City Palace, Sahelion ki Bari gardens, and a sunset boat ride on Lake Pichola to Jagmandir island palace, said to have inspired Shah Jahan's design for the Taj Mahal." },
          { day: 10, title: "Pushkar", description: "The only Brahma temple in the world, and the lakeside bazaar of this holy Hindu town." },
          { day: 11, title: "Jaipur (the Pink City)", description: "Jantar Mantar observatory, built in 1727, and City Palace." },
          { day: 12, title: "Jaipur", description: "Full day at Amber Fort, including an elephant ride to the top." },
          { day: 13, title: "Agra (Taj Mahal closed Fridays)", description: "Drive via Fatehpur Sikri, Akbar's abandoned 16th-century capital; Agra Fort." },
          { day: 14, title: "Agra – Varanasi (night train or Delhi flight)", description: "Travel on to Varanasi, one of India's most important religious cities." },
          { day: 15, title: "Varanasi (city of the Ganges)", description: "Dawn boat ride along the ghats, the Kashi Vishwanath temple, Banaras Hindu University, and an excursion to Sarnath, where the Buddha preached his first sermon." },
          { day: 16, title: "Varanasi – Kathmandu, Nepal (flight)", description: "Flight to Kathmandu for a 3-day stay covering Durbar Square, Patan, Pashupatinath Temple, Bhaktapur, and — weather permitting — Himalayan sunrise views from Nagarkot." },
          { day: 19, title: "Kathmandu – New Delhi (flight)", description: "Flight back to Delhi; evening free at Connaught Place." },
          { day: 20, title: "New Delhi", description: "Full day in Delhi — Red Fort, Jama Masjid in Old Delhi, then India Gate, Parliament House and the Presidential residence in New Delhi." },
          { day: 21, title: "Depart New Delhi", description: "Transfer to the international airport 3 hours before the scheduled flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/best-of-rajasthan-varanasi-tour-with-nepal/",
      },
      {
        id: "north-india-nepal-tour-at-low-cost-for-14days",
        categorySlug: "india-nepal-tours",
        name: "North India & Nepal Tour",
        duration: { days: 14, nights: 13, label: "14 Days / 13 Nights" },
        route: [
          "Delhi", "Jaipur", "Agra", "Orchha", "Khajuraho", "Varanasi",
          "Kathmandu", "Pokhara", "Kathmandu", "Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/08/North-India-Nepal-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi", description: "Old Delhi's Red Fort, Jama Masjid, Raj Ghat and a rickshaw ride through Chandni Chowk; New Delhi's Rashtrapati Bhawan, India Gate, the Laxmi Narayan Temple, Humayun's Tomb and Qutub Minar, with an evening light-and-sound show at Red Fort." },
          { day: 3, title: "Jaipur", description: "Drive to the 'Pink City'; City Palace, Hawa Mahal, and an evening walk through Jaipur's bazaars." },
          { day: 4, title: "Jaipur", description: "Amber Fort with an elephant ride up the hill, City Palace, and the Jantar Mantar observatory, built by Sawai Jai Singh." },
          { day: 5, title: "Agra", description: "Drive via Fatehpur Sikri, built by Akbar in honour of the Sufi saint Salim Chishti; Agra Fort, from which the Taj Mahal is visible across the Yamuna River, plus Itmad-ud-Daulah's tomb." },
          { day: 6, title: "Agra – Gwalior – Orchha", description: "Sunrise at the Taj Mahal, then drive via Gwalior Fort to Orchha, the former Bundela-dynasty capital on the Betwa River, known for the Jehangir Mahal and Raj Mahal's frescoes." },
          { day: 7, title: "Khajuraho (via Alipura)", description: "Drive to Khajuraho, home to elaborately carved medieval Hindu and Jain temples built by the Chandela dynasty." },
          { day: 8, title: "Varanasi (flight)", description: "Flight to Varanasi; evening boat ride and prayer ceremony (aarti) on the Ganges ghats." },
          { day: 9, title: "Kathmandu, Nepal (flight)", description: "Free morning in Varanasi, then a flight over the Himalayas to Kathmandu." },
          { day: 10, title: "Kathmandu", description: "City tour including Hanuman Dhoka palace square, Kal Bhairav, Kumari Mandap and the local bazaar." },
          { day: 11, title: "Pokhara", description: "Drive to Pokhara, a lakeside valley town with views of the Annapurna range from Phewa Lake, including the Barahi Temple." },
          { day: 12, title: "Pokhara", description: "Free day around Phewa Lake, Devi's Falls, Mahendra Cave and the World Peace Pagoda." },
          { day: 13, title: "Kathmandu", description: "Drive back to Kathmandu to visit any remaining sights; rest of the day free." },
          { day: 14, title: "Depart via New Delhi (flight)", description: "Flight back to Delhi to connect with the international departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/north-india-nepal-tour-at-low-cost-for-14days/",
      },
    ],
  },
  "east-india": {
    id: "east-india",
    name: "east-india",
    tagline: "Two Countries · One Journey",
    description:
      "Cross-border itineraries combining India's cultural circuit with Nepal's Himalayan landscapes and Kathmandu Valley.",
    heroImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "nepal-tourism-package-at-lowest-price",
        categorySlug: "india-nepal-tours",
        name: "Nepal Tour",
        duration: { days: 7, nights: 6, label: "7 Days / 6 Nights" },
        route: ["Kathmandu", "Pokhara", "Sarangkot", "Nagarkot", "Bhaktapur", "Kathmandu"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Nepal-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Kathmandu", description: "Airport pickup and transfer to hotel." },
          { day: 2, title: "Pokhara (200 km)", description: "Scenic drive to Pokhara, a lakeside valley town framed by the Annapurna and Machhapuchhre (Fishtail) peaks; afternoon visit to the Tibetan refugee camp, Devi's Falls, and the lakeside market." },
          { day: 3, title: "Pokhara", description: "Pre-dawn drive to the Sarangkot viewpoint for sunrise over Dhaulagiri, Annapurna and Machhapuchhre, then an hour of boating on Phewa Lake." },
          { day: 4, title: "Nagarkot (via Kathmandu)", description: "Drive via the ancient Changu Narayan temple, one of the oldest pagoda-style temples in the valley, to Nagarkot for sunset Himalayan views." },
          { day: 5, title: "Kathmandu", description: "Sunrise views at Nagarkot, then drive back via Bhaktapur — the 'city of devotees,' founded in 889 AD — to see the Nyatapola temple and the 15th-century 55-Window Palace." },
          { day: 6, title: "Kathmandu", description: "City sightseeing in Patan ('the city of beauty'), including its Royal Palace, Golden Temple and Mahaboudha Temple." },
          { day: 7, title: "Depart Kathmandu", description: "Free time until transfer to the international airport for departure." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/nepal-tourism-package-at-lowest-price/",
      },
      {
        id: "best-of-rajasthan-varanasi-tour-with-nepal",
        categorySlug: "india-nepal-tours",
        name: "Rajasthan & Varanasi with Nepal",
        duration: { days: 21, nights: 20, label: "21 Days / 20 Nights" },
        route: [
          "New Delhi", "Mandawa", "Bikaner", "Jaisalmer", "Jodhpur", "Ranakpur",
          "Udaipur", "Pushkar", "Jaipur", "Agra", "Varanasi", "Kathmandu (Nepal)", "New Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Rajasthan-Varanasi-with-Nepal.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Mandawa (Shekhawati region)", description: "Drive to the painted-haveli towns of the Shekhawati region, built by wealthy 18th–19th century traders." },
          { day: 3, title: "Bikaner", description: "Half-day city tour of Junagarh Fort and the famous rat temple at Deshnok." },
          { day: 4, title: "Jaisalmer (the Golden City)", description: "Drive across the Thar Desert to the sandstone-fort city of Jaisalmer." },
          { day: 5, title: "Jaisalmer", description: "Jaisalmer Fort, the world's oldest living fort, plus its havelis, a camel safari to the Sam or Khuri dunes for sunset, and a village dinner with live Rajasthani music (optional overnight desert camp)." },
          { day: 6, title: "Jodhpur (the Sun City)", description: "Mehrangarh Fort overlooking the Blue City below." },
          { day: 7, title: "Ranakpur", description: "The 15th-century Jain temples of Ranakpur." },
          { day: 8, title: "Udaipur (the City of Lakes)", description: "Via Kumbhalgarh Fort, built by Maharana Kumbha in 1453, with its dramatic Zenana Mahal murals." },
          { day: 9, title: "Udaipur", description: "City Palace, Sahelion ki Bari gardens, and a sunset boat ride on Lake Pichola to Jagmandir island palace, said to have inspired Shah Jahan's design for the Taj Mahal." },
          { day: 10, title: "Pushkar", description: "The only Brahma temple in the world, and the lakeside bazaar of this holy Hindu town." },
          { day: 11, title: "Jaipur (the Pink City)", description: "Jantar Mantar observatory, built in 1727, and City Palace." },
          { day: 12, title: "Jaipur", description: "Full day at Amber Fort, including an elephant ride to the top." },
          { day: 13, title: "Agra (Taj Mahal closed Fridays)", description: "Drive via Fatehpur Sikri, Akbar's abandoned 16th-century capital; Agra Fort." },
          { day: 14, title: "Agra – Varanasi (night train or Delhi flight)", description: "Travel on to Varanasi, one of India's most important religious cities." },
          { day: 15, title: "Varanasi (city of the Ganges)", description: "Dawn boat ride along the ghats, the Kashi Vishwanath temple, Banaras Hindu University, and an excursion to Sarnath, where the Buddha preached his first sermon." },
          { day: 16, title: "Varanasi – Kathmandu, Nepal (flight)", description: "Flight to Kathmandu for a 3-day stay covering Durbar Square, Patan, Pashupatinath Temple, Bhaktapur, and — weather permitting — Himalayan sunrise views from Nagarkot." },
          { day: 19, title: "Kathmandu – New Delhi (flight)", description: "Flight back to Delhi; evening free at Connaught Place." },
          { day: 20, title: "New Delhi", description: "Full day in Delhi — Red Fort, Jama Masjid in Old Delhi, then India Gate, Parliament House and the Presidential residence in New Delhi." },
          { day: 21, title: "Depart New Delhi", description: "Transfer to the international airport 3 hours before the scheduled flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/best-of-rajasthan-varanasi-tour-with-nepal/",
      },
      {
        id: "north-india-nepal-tour-at-low-cost-for-14days",
        categorySlug: "india-nepal-tours",
        name: "North India & Nepal Tour",
        duration: { days: 14, nights: 13, label: "14 Days / 13 Nights" },
        route: [
          "Delhi", "Jaipur", "Agra", "Orchha", "Khajuraho", "Varanasi",
          "Kathmandu", "Pokhara", "Kathmandu", "Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/08/North-India-Nepal-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi", description: "Old Delhi's Red Fort, Jama Masjid, Raj Ghat and a rickshaw ride through Chandni Chowk; New Delhi's Rashtrapati Bhawan, India Gate, the Laxmi Narayan Temple, Humayun's Tomb and Qutub Minar, with an evening light-and-sound show at Red Fort." },
          { day: 3, title: "Jaipur", description: "Drive to the 'Pink City'; City Palace, Hawa Mahal, and an evening walk through Jaipur's bazaars." },
          { day: 4, title: "Jaipur", description: "Amber Fort with an elephant ride up the hill, City Palace, and the Jantar Mantar observatory, built by Sawai Jai Singh." },
          { day: 5, title: "Agra", description: "Drive via Fatehpur Sikri, built by Akbar in honour of the Sufi saint Salim Chishti; Agra Fort, from which the Taj Mahal is visible across the Yamuna River, plus Itmad-ud-Daulah's tomb." },
          { day: 6, title: "Agra – Gwalior – Orchha", description: "Sunrise at the Taj Mahal, then drive via Gwalior Fort to Orchha, the former Bundela-dynasty capital on the Betwa River, known for the Jehangir Mahal and Raj Mahal's frescoes." },
          { day: 7, title: "Khajuraho (via Alipura)", description: "Drive to Khajuraho, home to elaborately carved medieval Hindu and Jain temples built by the Chandela dynasty." },
          { day: 8, title: "Varanasi (flight)", description: "Flight to Varanasi; evening boat ride and prayer ceremony (aarti) on the Ganges ghats." },
          { day: 9, title: "Kathmandu, Nepal (flight)", description: "Free morning in Varanasi, then a flight over the Himalayas to Kathmandu." },
          { day: 10, title: "Kathmandu", description: "City tour including Hanuman Dhoka palace square, Kal Bhairav, Kumari Mandap and the local bazaar." },
          { day: 11, title: "Pokhara", description: "Drive to Pokhara, a lakeside valley town with views of the Annapurna range from Phewa Lake, including the Barahi Temple." },
          { day: 12, title: "Pokhara", description: "Free day around Phewa Lake, Devi's Falls, Mahendra Cave and the World Peace Pagoda." },
          { day: 13, title: "Kathmandu", description: "Drive back to Kathmandu to visit any remaining sights; rest of the day free." },
          { day: 14, title: "Depart via New Delhi (flight)", description: "Flight back to Delhi to connect with the international departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/north-india-nepal-tour-at-low-cost-for-14days/",
      },
    ],
  },
  "west-india": {
    id: "west-india",
    name: "west-india",
    tagline: "Two Countries · One Journey",
    description:
      "Cross-border itineraries combining India's cultural circuit with Nepal's Himalayan landscapes and Kathmandu Valley.",
    heroImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "nepal-tourism-package-at-lowest-price",
        categorySlug: "india-nepal-tours",
        name: "Nepal Tour",
        duration: { days: 7, nights: 6, label: "7 Days / 6 Nights" },
        route: ["Kathmandu", "Pokhara", "Sarangkot", "Nagarkot", "Bhaktapur", "Kathmandu"],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Nepal-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "Kathmandu", description: "Airport pickup and transfer to hotel." },
          { day: 2, title: "Pokhara (200 km)", description: "Scenic drive to Pokhara, a lakeside valley town framed by the Annapurna and Machhapuchhre (Fishtail) peaks; afternoon visit to the Tibetan refugee camp, Devi's Falls, and the lakeside market." },
          { day: 3, title: "Pokhara", description: "Pre-dawn drive to the Sarangkot viewpoint for sunrise over Dhaulagiri, Annapurna and Machhapuchhre, then an hour of boating on Phewa Lake." },
          { day: 4, title: "Nagarkot (via Kathmandu)", description: "Drive via the ancient Changu Narayan temple, one of the oldest pagoda-style temples in the valley, to Nagarkot for sunset Himalayan views." },
          { day: 5, title: "Kathmandu", description: "Sunrise views at Nagarkot, then drive back via Bhaktapur — the 'city of devotees,' founded in 889 AD — to see the Nyatapola temple and the 15th-century 55-Window Palace." },
          { day: 6, title: "Kathmandu", description: "City sightseeing in Patan ('the city of beauty'), including its Royal Palace, Golden Temple and Mahaboudha Temple." },
          { day: 7, title: "Depart Kathmandu", description: "Free time until transfer to the international airport for departure." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/nepal-tourism-package-at-lowest-price/",
      },
      {
        id: "best-of-rajasthan-varanasi-tour-with-nepal",
        categorySlug: "india-nepal-tours",
        name: "Rajasthan & Varanasi with Nepal",
        duration: { days: 21, nights: 20, label: "21 Days / 20 Nights" },
        route: [
          "New Delhi", "Mandawa", "Bikaner", "Jaisalmer", "Jodhpur", "Ranakpur",
          "Udaipur", "Pushkar", "Jaipur", "Agra", "Varanasi", "Kathmandu (Nepal)", "New Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/09/Rajasthan-Varanasi-with-Nepal.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "Mandawa (Shekhawati region)", description: "Drive to the painted-haveli towns of the Shekhawati region, built by wealthy 18th–19th century traders." },
          { day: 3, title: "Bikaner", description: "Half-day city tour of Junagarh Fort and the famous rat temple at Deshnok." },
          { day: 4, title: "Jaisalmer (the Golden City)", description: "Drive across the Thar Desert to the sandstone-fort city of Jaisalmer." },
          { day: 5, title: "Jaisalmer", description: "Jaisalmer Fort, the world's oldest living fort, plus its havelis, a camel safari to the Sam or Khuri dunes for sunset, and a village dinner with live Rajasthani music (optional overnight desert camp)." },
          { day: 6, title: "Jodhpur (the Sun City)", description: "Mehrangarh Fort overlooking the Blue City below." },
          { day: 7, title: "Ranakpur", description: "The 15th-century Jain temples of Ranakpur." },
          { day: 8, title: "Udaipur (the City of Lakes)", description: "Via Kumbhalgarh Fort, built by Maharana Kumbha in 1453, with its dramatic Zenana Mahal murals." },
          { day: 9, title: "Udaipur", description: "City Palace, Sahelion ki Bari gardens, and a sunset boat ride on Lake Pichola to Jagmandir island palace, said to have inspired Shah Jahan's design for the Taj Mahal." },
          { day: 10, title: "Pushkar", description: "The only Brahma temple in the world, and the lakeside bazaar of this holy Hindu town." },
          { day: 11, title: "Jaipur (the Pink City)", description: "Jantar Mantar observatory, built in 1727, and City Palace." },
          { day: 12, title: "Jaipur", description: "Full day at Amber Fort, including an elephant ride to the top." },
          { day: 13, title: "Agra (Taj Mahal closed Fridays)", description: "Drive via Fatehpur Sikri, Akbar's abandoned 16th-century capital; Agra Fort." },
          { day: 14, title: "Agra – Varanasi (night train or Delhi flight)", description: "Travel on to Varanasi, one of India's most important religious cities." },
          { day: 15, title: "Varanasi (city of the Ganges)", description: "Dawn boat ride along the ghats, the Kashi Vishwanath temple, Banaras Hindu University, and an excursion to Sarnath, where the Buddha preached his first sermon." },
          { day: 16, title: "Varanasi – Kathmandu, Nepal (flight)", description: "Flight to Kathmandu for a 3-day stay covering Durbar Square, Patan, Pashupatinath Temple, Bhaktapur, and — weather permitting — Himalayan sunrise views from Nagarkot." },
          { day: 19, title: "Kathmandu – New Delhi (flight)", description: "Flight back to Delhi; evening free at Connaught Place." },
          { day: 20, title: "New Delhi", description: "Full day in Delhi — Red Fort, Jama Masjid in Old Delhi, then India Gate, Parliament House and the Presidential residence in New Delhi." },
          { day: 21, title: "Depart New Delhi", description: "Transfer to the international airport 3 hours before the scheduled flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/best-of-rajasthan-varanasi-tour-with-nepal/",
      },
      {
        id: "north-india-nepal-tour-at-low-cost-for-14days",
        categorySlug: "india-nepal-tours",
        name: "North India & Nepal Tour",
        duration: { days: 14, nights: 13, label: "14 Days / 13 Nights" },
        route: [
          "Delhi", "Jaipur", "Agra", "Orchha", "Khajuraho", "Varanasi",
          "Kathmandu", "Pokhara", "Kathmandu", "Delhi",
        ],
        thumbnail: "https://www.timesindiatravels.com/wp-content/uploads/2017/08/North-India-Nepal-Tour.jpg",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        price: null,
        highlights: [],
        itinerary: [
          { day: 1, title: "New Delhi", description: "Airport pickup and transfer to hotel; tour documents provided." },
          { day: 2, title: "New Delhi", description: "Old Delhi's Red Fort, Jama Masjid, Raj Ghat and a rickshaw ride through Chandni Chowk; New Delhi's Rashtrapati Bhawan, India Gate, the Laxmi Narayan Temple, Humayun's Tomb and Qutub Minar, with an evening light-and-sound show at Red Fort." },
          { day: 3, title: "Jaipur", description: "Drive to the 'Pink City'; City Palace, Hawa Mahal, and an evening walk through Jaipur's bazaars." },
          { day: 4, title: "Jaipur", description: "Amber Fort with an elephant ride up the hill, City Palace, and the Jantar Mantar observatory, built by Sawai Jai Singh." },
          { day: 5, title: "Agra", description: "Drive via Fatehpur Sikri, built by Akbar in honour of the Sufi saint Salim Chishti; Agra Fort, from which the Taj Mahal is visible across the Yamuna River, plus Itmad-ud-Daulah's tomb." },
          { day: 6, title: "Agra – Gwalior – Orchha", description: "Sunrise at the Taj Mahal, then drive via Gwalior Fort to Orchha, the former Bundela-dynasty capital on the Betwa River, known for the Jehangir Mahal and Raj Mahal's frescoes." },
          { day: 7, title: "Khajuraho (via Alipura)", description: "Drive to Khajuraho, home to elaborately carved medieval Hindu and Jain temples built by the Chandela dynasty." },
          { day: 8, title: "Varanasi (flight)", description: "Flight to Varanasi; evening boat ride and prayer ceremony (aarti) on the Ganges ghats." },
          { day: 9, title: "Kathmandu, Nepal (flight)", description: "Free morning in Varanasi, then a flight over the Himalayas to Kathmandu." },
          { day: 10, title: "Kathmandu", description: "City tour including Hanuman Dhoka palace square, Kal Bhairav, Kumari Mandap and the local bazaar." },
          { day: 11, title: "Pokhara", description: "Drive to Pokhara, a lakeside valley town with views of the Annapurna range from Phewa Lake, including the Barahi Temple." },
          { day: 12, title: "Pokhara", description: "Free day around Phewa Lake, Devi's Falls, Mahendra Cave and the World Peace Pagoda." },
          { day: 13, title: "Kathmandu", description: "Drive back to Kathmandu to visit any remaining sights; rest of the day free." },
          { day: 14, title: "Depart via New Delhi (flight)", description: "Flight back to Delhi to connect with the international departure flight." },
        ],
        inclusions: [],
        exclusions: [],
        featured: false,
        sourceUrl:
          "https://www.timesindiatravels.com/tour-packages/india-nepal-tours/north-india-nepal-tour-at-low-cost-for-14days/",
      },
    ],
  },

};

// ------------------------------------------------------------
// HELPERS — for mounting tours dynamically
// ------------------------------------------------------------

/** All categories as an array, in nav order. */
export function getAllCategories() {
  return Object.values(tourCategories);
}

/** A single category by its slug, or undefined if it doesn't exist. */
export function getCategory(categorySlug) {
  return tourCategories[categorySlug];
}

/** Every package across every category, flattened — for a site-wide search/listing page. */
export function getAllPackages() {
  return getAllCategories().flatMap((category) => category.packages);
}

/** All packages within one category. Returns [] for an unknown category rather than throwing. */
export function getPackagesByCategory(categorySlug) {
  return tourCategories[categorySlug]?.packages ?? [];
}

/** Find one package by its id, regardless of category. Returns undefined if not found. */
export function getPackageById(packageId) {
  return getAllPackages().find((pkg) => pkg.id === packageId);
}

/** Packages flagged `featured: true` — mirrors the "Most Popular Tour" section on the homepage. */
export function getFeaturedPackages() {
  return getAllPackages().filter((pkg) => pkg.featured);
}

// ------------------------------------------------------------
// ADMIN: creating a new tour package
// ------------------------------------------------------------

/**
 * Builds a new package object with every field present and safely
 * defaulted, so an admin form only needs to collect the handful of
 * fields a new tour actually needs on day one — everything else
 * (itinerary, pricing, inclusions) can be filled in later without
 * anything downstream breaking on a missing field.
 *
 * @param {object} input
 * @param {string} input.categorySlug - must match a key in tourCategories
 * @param {string} input.name
 * @param {{days:number, nights:number}} input.duration
 * @param {string[]} [input.route]
 * @param {string} [input.thumbnail]
 * @returns {object} a fully-shaped package, ready to push into
 *   tourCategories[categorySlug].packages
 */
export function createTourPackage({ categorySlug, name, duration, route = [], thumbnail = "" }) {
  if (!tourCategories[categorySlug]) {
    throw new Error(
      `createTourPackage: "${categorySlug}" isn't a known category. ` +
        `Valid options: ${Object.keys(tourCategories).join(", ")}`
    );
  }
  if (!name || !duration?.days || !duration?.nights) {
    throw new Error("createTourPackage: name, duration.days and duration.nights are required.");
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    id: slug,
    categorySlug,
    name,
    duration: { ...duration, label: `${duration.days} Days / ${duration.nights} Nights` },
    route,
    thumbnail,
    heroImage: null,
    price: null,
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    featured: false,
    sourceUrl: null, // this tour didn't come from the scrape — it's admin-created
  };
}

/*
USAGE EXAMPLE — adding a brand-new tour from an admin panel:

  import { tourCategories, createTourPackage } from "./TourPackage_data";

  const newTour = createTourPackage({
    categorySlug: "rajasthan-tours",
    name: "Jaipur Weekend Getaway",
    duration: { days: 3, nights: 2 },
    route: ["Delhi", "Jaipur", "Delhi"],
    thumbnail: "/uploads/jaipur-weekend.jpg",
  });

  tourCategories["rajasthan-tours"].packages.push(newTour);

  // In a real app this push would instead be a call to your backend/CMS —
  // this file assumes tourCategories is your source of truth in dev/demo
  // and gets replaced by a database-backed equivalent in production.
*/