// Seeded demo content. Real deployment would fetch these from the campus API.

export const CATEGORIES = [
  { id: 'books', label: 'Books & notes', emoji: '📚', co2: 2.5 },
  { id: 'furniture', label: 'Furniture', emoji: '🪑', co2: 28 },
  { id: 'electronics', label: 'Electronics', emoji: '🔌', co2: 42 },
  { id: 'kitchen', label: 'Kitchen', emoji: '🍳', co2: 6 },
  { id: 'clothes', label: 'Clothes', emoji: '👕', co2: 9 },
  { id: 'lab', label: 'Lab & stationery', emoji: '🧪', co2: 4 },
  { id: 'sports', label: 'Sports & bikes', emoji: '🚲', co2: 34 },
]

export const CONDITIONS = ['Like new', 'Good', 'Used — works fine', 'Needs small repair']

export const DORMS = ['North Hall', 'South Hall', 'Lakeside', 'Engineering Annex', 'Off-campus']

export const ME = { name: 'You', dorm: 'North Hall' }

export const SEED_ITEMS = [
  {
    id: 'i1', title: 'Desk lamp (LED, dimmable)', category: 'electronics', condition: 'Good',
    desc: 'Graduating, no longer need it. 7W LED — cheaper to run than the halogen ones the shop sells.',
    owner: 'Priya R.', dorm: 'North Hall', status: 'available', posted: '2026-09-06', pickup: 'Lobby, evenings',
  },
  {
    id: 'i2', title: 'Organic Chemistry 8th ed. + solutions', category: 'books', condition: 'Used — works fine',
    desc: 'Highlighted first 4 chapters. Free to whoever takes CHEM 201 next term.',
    owner: 'Marco T.', dorm: 'South Hall', status: 'available', posted: '2026-09-07', pickup: 'Library desk 3F',
  },
  {
    id: 'i3', title: 'Mini fridge 45L', category: 'kitchen', condition: 'Used — works fine',
    desc: 'Works, seal slightly loose. Energy label C — fine for a shared kitchen, not great for a dorm room.',
    owner: 'Aisha K.', dorm: 'Lakeside', status: 'available', posted: '2026-09-05', pickup: 'Bike shed',
  },
  {
    id: 'i4', title: 'Study chair, adjustable', category: 'furniture', condition: 'Like new',
    desc: 'Bought in March, moving out. Zero scratches.',
    owner: 'Dan L.', dorm: 'Engineering Annex', status: 'available', posted: '2026-09-08', pickup: 'Annex B ground floor',
  },
  {
    id: 'i5', title: 'Lab coat, size M', category: 'lab', condition: 'Good',
    desc: 'Washed, no burns or stains. Done with wet labs for good.',
    owner: 'Yuki S.', dorm: 'North Hall', status: 'available', posted: '2026-09-04', pickup: 'Chem building foyer',
  },
  {
    id: 'i6', title: 'City bike, needs new brake pads', category: 'sports', condition: 'Needs small repair',
    desc: 'Frame and wheels are solid. Repair Café can fix the brakes in 20 min — bring it Thursday.',
    owner: 'Tomas B.', dorm: 'South Hall', status: 'available', posted: '2026-09-03', pickup: 'South Hall rack',
  },
  {
    id: 'i7', title: 'Winter jacket, size L', category: 'clothes', condition: 'Good',
    desc: 'Exchange student, flying home. Warm down to -10C.',
    owner: 'Elena V.', dorm: 'Lakeside', status: 'available', posted: '2026-09-08', pickup: 'Lakeside common room',
  },
  {
    id: 'i8', title: 'Monitor 24" 1080p + HDMI cable', category: 'electronics', condition: 'Good',
    desc: 'One dead pixel top-left. Otherwise perfect second screen.',
    owner: 'Sam O.', dorm: 'Engineering Annex', status: 'claimed', posted: '2026-09-01', pickup: 'Annex A 204',
  },
  {
    id: 'i9', title: 'Bookshelf, 4 shelves', category: 'furniture', condition: 'Used — works fine',
    desc: 'Flat-packable, comes with the screws. Was heading to the skip otherwise.',
    owner: 'Nadia H.', dorm: 'North Hall', status: 'available', posted: '2026-09-02', pickup: 'North Hall storage',
  },
  {
    id: 'i10', title: 'Electric kettle 1.7L', category: 'kitchen', condition: 'Like new',
    desc: 'Duplicate gift. Boils only what you fill — cuts about 30% off kettle energy vs. filling it full.',
    owner: 'Jonas P.', dorm: 'South Hall', status: 'available', posted: '2026-09-07', pickup: 'South Hall kitchen',
  },
  {
    id: 'i11', title: 'Scientific calculator (fx-991)', category: 'lab', condition: 'Good',
    desc: 'Exam-approved. Sticker on the back peels off.',
    owner: 'Hana M.', dorm: 'Lakeside', status: 'available', posted: '2026-09-06', pickup: 'Math building',
  },
  {
    id: 'i12', title: 'Yoga mat + resistance bands', category: 'sports', condition: 'Good',
    desc: 'Cleaned. Gym membership expired, no more use for it.',
    owner: 'Leo F.', dorm: 'North Hall', status: 'available', posted: '2026-09-05', pickup: 'Sports centre lockers',
  },
]

export const SEED_EVENTS = [
  {
    id: 'e1', title: 'Repair Café — bikes & small electronics', kind: 'Repair',
    date: '2026-09-11', time: '16:00–19:00', place: 'Engineering Annex workshop',
    host: 'Green Campus Society', points: 60, spots: 24, taken: 17,
    desc: 'Bring a broken thing, leave with a fixed thing. Volunteers cover bikes, lamps, laptops and cables. Tools and solder provided.',
  },
  {
    id: 'e2', title: 'Move-out Swap Market', kind: 'Swap',
    date: '2026-09-14', time: '11:00–16:00', place: 'North Hall courtyard',
    host: 'Student Union', points: 40, spots: 120, taken: 83,
    desc: 'Drop anything you are not taking home, take anything you need. Last year 1.4 tonnes stayed out of the skips.',
  },
  {
    id: 'e3', title: 'Dorm Energy Sprint — week 1', kind: 'Energy',
    date: '2026-09-15', time: 'All week', place: 'All residences',
    host: 'Facilities + Green Campus', points: 100, spots: 500, taken: 212,
    desc: 'Halls compete on metered kWh per resident. Standby-killer power strips handed out at sign-up; readings posted daily.',
  },
  {
    id: 'e4', title: 'Lakeside shore clean-up', kind: 'Cleanup',
    date: '2026-09-19', time: '09:30–12:00', place: 'Lakeside boathouse',
    host: 'Biology Dept.', points: 50, spots: 40, taken: 31,
    desc: 'Litter pick and a plastics audit — we log what we find so procurement can cut it at the source. Gloves and bags provided.',
  },
  {
    id: 'e5', title: 'Compost & food-waste workshop', kind: 'Waste',
    date: '2026-09-22', time: '17:30–19:00', place: 'Campus garden shed',
    host: 'Campus Farm Collective', points: 45, spots: 30, taken: 12,
    desc: 'What actually belongs in the brown bin, why compostable cups usually do not, and how to run a bokashi bucket in a dorm.',
  },
  {
    id: 'e6', title: 'Lights-out study night', kind: 'Energy',
    date: '2026-09-25', time: '20:00–23:00', place: 'Main library, floors 2–4',
    host: 'Library Services', points: 30, spots: 200, taken: 64,
    desc: 'Task lamps only, HVAC dialled back, overheads off. Measured against a normal Thursday to show what the baseline load really is.',
  },
]

export const SEED_LEADERBOARD = [
  { name: 'South Hall', points: 4820 },
  { name: 'North Hall', points: 4310 },
  { name: 'Lakeside', points: 3940 },
  { name: 'Engineering Annex', points: 2705 },
]

export const BADGES = [
  { id: 'first-post', label: 'First listing', emoji: '📦', need: 'Post 1 item' },
  { id: 'rescuer', label: 'Rescuer', emoji: '♻️', need: 'Claim 1 item' },
  { id: 'joiner', label: 'Shows up', emoji: '🤝', need: 'Join 1 activity' },
  { id: 'streak', label: 'Loop closer', emoji: '🔁', need: 'Post + claim + join' },
]
