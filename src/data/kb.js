// Rule-based knowledge base for the sustainability assistant.
// Each entry: keywords (matched against the question), a short answer, bullets,
// and an optional `reuse` category that routes the user to the exchange first.

export const DISPOSAL = [
  {
    id: 'battery', keywords: ['battery', 'batteries', 'aa', 'aaa', 'lithium', 'coin cell', 'power bank'],
    title: 'Batteries — never the general bin',
    answer: 'Loose batteries start fires in collection trucks and sorting halls. Tape the terminals of anything lithium, then drop them in a battery tube.',
    bullets: [
      'Battery tubes: library entrance, both dorm mail rooms, campus shop till.',
      'Swollen or hot power banks go to Facilities directly — do not post them here.',
      'Rechargeables beat disposables after ~5 cycles, so buy the charger once.',
    ],
  },
  {
    id: 'ewaste', keywords: ['e-waste', 'ewaste', 'electronic', 'electronics', 'laptop', 'monitor', 'printer', 'phone', 'cable', 'charger', 'keyboard', 'mouse', 'headphones', 'router'],
    title: 'Electronics — try repair, then reuse, then WEEE',
    answer: 'Electronics carry the highest embodied carbon per kilo of anything students throw out. Order of preference: fix it, pass it on, then recycle as WEEE.',
    bullets: [
      'Repair Café (Thursdays, Annex workshop) handles laptops, lamps and cables.',
      'Still working but not wanted? List it — someone here needs a second monitor.',
      'Dead beyond repair: WEEE cage behind the IT service desk. Wipe your drive first.',
    ],
    reuse: 'electronics',
  },
  {
    id: 'bulb', keywords: ['bulb', 'lightbulb', 'light bulb', 'cfl', 'fluorescent', 'tube light', 'led bulb'],
    title: 'Light bulbs depend on the type',
    answer: 'LEDs and CFLs are WEEE, not glass. CFLs and tubes contain mercury, so they never go in a bottle bank.',
    bullets: [
      'LED / CFL / tubes: WEEE cage at the IT service desk.',
      'Old incandescent or halogen: general waste (no recoverable value, no mercury).',
      'Broken CFL: ventilate the room 15 min, sweep with card, do not vacuum.',
    ],
  },
  {
    id: 'pizza', keywords: ['pizza box', 'greasy', 'grease', 'takeaway box', 'food container', 'oily'],
    title: 'Greasy cardboard breaks paper recycling',
    answer: 'Oil ruins the pulp, so the greasy half of a pizza box is not recyclable — but the clean half is.',
    bullets: [
      'Tear the clean lid off → paper/cardboard bin.',
      'Greasy base → food/compost bin if your hall has one, otherwise general waste.',
      'Rinse plastic takeaway trays; unrinsed ones get rejected at the sorting line.',
    ],
  },
  {
    id: 'cup', keywords: ['coffee cup', 'paper cup', 'disposable cup', 'compostable cup', 'lid', 'to-go'],
    title: 'Paper cups are plastic-lined',
    answer: 'A standard hot cup has a polyethylene liner, so it is neither paper nor compost in most streams. Campus cafés take them back separately.',
    bullets: [
      'Cup-only bins sit next to all three café tills — lid and sleeve go elsewhere.',
      '"Compostable" PLA cups need an industrial composter; the brown bin here is not one.',
      'Reusable cup gets you 30¢ off at every campus café — pays for itself in ~2 weeks.',
    ],
  },
  {
    id: 'plasticbottle', keywords: ['plastic bottle', 'water bottle', 'pet', 'soda bottle', 'can', 'aluminium', 'aluminum', 'drink'],
    title: 'Bottles and cans — empty, squash, lid back on',
    answer: 'PET bottles and aluminium cans are the two materials that genuinely recycle over and over. Both belong in the mixed-container bin.',
    bullets: [
      'Empty and squash to save truck space; put the cap back on so it is not lost as fines.',
      'Aluminium recycling saves ~95% of the energy of new metal — it is the highest-value thing in your bin.',
      'Refill stations: every floor of the library, all dorm kitchens, sports centre.',
    ],
  },
  {
    id: 'film', keywords: ['plastic bag', 'film', 'wrapper', 'cling', 'packaging', 'bubble wrap', 'crisp packet', 'snack'],
    title: 'Soft plastics need a separate drop-off',
    answer: 'Bags, film and wrappers tangle the sorting screens, so they are banned from the mixed bin.',
    bullets: [
      'Soft-plastics sack: campus shop entrance (bags, film, bubble wrap, bread bags).',
      'Metallised wrappers (crisps, chocolate) are general waste — no stream takes them yet.',
      'Bubble wrap in good shape: keep it for the move-out swap, people always need it.',
    ],
  },
  {
    id: 'glass', keywords: ['glass', 'jar', 'bottle bank', 'wine bottle', 'beer bottle', 'mirror', 'ceramic', 'mug', 'plate'],
    title: 'Container glass only in the bottle bank',
    answer: 'Bottles and jars melt at one temperature; drinking glasses, Pyrex, mirrors and ceramics do not — one broken mug contaminates a whole batch.',
    bullets: [
      'Jars and bottles: rinse, lids off, bottle bank by the loading bay.',
      'Ceramics, mirrors, oven glass, lab glass: general waste — or the lab glass bin in Chem.',
      'Intact jars are the best free food storage on campus. Wash and keep a few.',
    ],
  },
  {
    id: 'paper', keywords: ['paper', 'notes', 'printout', 'cardboard', 'box', 'envelope', 'newspaper', 'shredded'],
    title: 'Paper and cardboard',
    answer: 'Clean and dry paper is straightforward — the failures are wet paper, receipts and anything laminated.',
    bullets: [
      'Flatten boxes; a full un-flattened box is mostly air and gets binned.',
      'Thermal receipts, laminated sheets and sticky notes with plastic film: general waste.',
      'Old lecture notes still on the syllabus? List them — first-years actually want them.',
    ],
    reuse: 'books',
  },
  {
    id: 'food', keywords: ['food waste', 'leftover', 'compost', 'organic', 'peel', 'coffee grounds', 'brown bin', 'expired'],
    title: 'Food waste — the biggest single win',
    answer: 'Food is the heaviest and most climate-costly thing in campus bins. Reducing beats composting; composting beats landfill.',
    bullets: [
      'Brown bins in every dorm kitchen: peels, plates scrapings, coffee grounds, tea bags (paper ones).',
      'No liquids, no packaging, no "compostable" plastics — they get screened out.',
      'Unopened and in date? The pantry shelf in each hall kitchen redistributes it, no questions.',
    ],
  },
  {
    id: 'clothes', keywords: ['clothes', 'clothing', 'textile', 'shirt', 'jacket', 'shoes', 'jeans', 'fast fashion', 'socks'],
    title: 'Textiles — wearable vs. rag',
    answer: 'Wearable clothing has far more value as clothing than as fibre, and only about 1% of textiles are recycled into new clothes.',
    bullets: [
      'Wearable: list it here, or bring it to the move-out swap.',
      'Worn out, holes, stained: textile bank by the sports centre — it goes to insulation and rags.',
      'Wash at 30°C and air-dry: cuts laundry energy by roughly 60% and clothes last longer.',
    ],
    reuse: 'clothes',
  },
  {
    id: 'furniture', keywords: ['furniture', 'chair', 'desk', 'shelf', 'bookshelf', 'mattress', 'sofa', 'table', 'bed'],
    title: 'Furniture — do not let it hit the skip',
    answer: 'Bulky furniture is the single most visible waste stream at move-out, and almost all of it is reusable.',
    bullets: [
      'List it here at least a week before you move; pickup is the borrower\'s job.',
      'Mattresses: Facilities collects separately (booking form on the intranet) — never the skip.',
      'Wobbly but sound? Repair Café does joints and screws too, not just electronics.',
    ],
    reuse: 'furniture',
  },
  {
    id: 'lab', keywords: ['lab', 'chemical', 'solvent', 'reagent', 'sharps', 'needle', 'pipette', 'glove', 'petri', 'biohazard'],
    title: 'Lab waste follows the lab rules, not these',
    answer: 'Nothing from a wet lab goes into a normal bin. Route it through your lab manager — this is a safety line, not a preference.',
    bullets: [
      'Solvents and reagents: labelled waste bottles in the fume hood, logged in the EHS book.',
      'Sharps: yellow sharps bin only. Gloves and plastics: the lab\'s stream, per its risk level.',
      'Unopened surplus reagents and clean glassware: the departmental share shelf before purchasing more.',
    ],
    reuse: 'lab',
  },
  {
    id: 'cartridge', keywords: ['cartridge', 'toner', 'ink', 'printer ink'],
    title: 'Ink and toner take-back',
    answer: 'Manufacturers are obliged to take cartridges back, and campus printing has a collection box.',
    bullets: [
      'Collection box: print room, ground floor of the library.',
      'Refilled or third-party cartridges go in the same box.',
      'Default to double-sided B&W in the print settings — biggest paper saving available.',
    ],
  },
  {
    id: 'bike', keywords: ['bike', 'bicycle', 'tyre', 'tire', 'inner tube', 'scooter', 'helmet'],
    title: 'Bikes — fix first, they are almost always fixable',
    answer: 'A dead bike is usually a £5 part away from working. Frames are steel or aluminium and worth recycling only as a last resort.',
    bullets: [
      'Repair Café stocks brake pads, tubes, cables and chain links.',
      'Abandoned bikes are auctioned each term by Security — cheapest bike on campus.',
      'Beyond saving: scrap metal skip at the loading bay, tyres and tubes separately.',
    ],
    reuse: 'sports',
  },
  {
    id: 'mask', keywords: ['mask', 'wipes', 'tissue', 'sanitary', 'nappy', 'cotton pad'],
    title: 'Hygiene items are general waste',
    answer: 'Masks, wipes and tissues are non-recyclable and jam machinery — bin them, never flush them.',
    bullets: [
      'General waste, always. Wipes cause most campus drain blockages.',
      'Reusable cloth alternatives exist for nearly all of these.',
    ],
  },
  {
    id: 'carton', keywords: ['carton', 'tetra', 'milk carton', 'juice box'],
    title: 'Cartons are a composite',
    answer: 'Paper, plastic and foil bonded together — they only recycle where a dedicated stream exists. Ours does.',
    bullets: [
      'Rinse, flatten, push the straw inside → carton slot on the mixed-recycling station.',
      'Caps are a different plastic; keep them attached, the plant separates them.',
    ],
  },
  {
    id: 'oil', keywords: ['cooking oil', 'frying oil', 'fat', 'grease jar'],
    title: 'Cooking oil never goes down the sink',
    answer: 'Oil solidifies in the pipes and causes the fatbergs that flood dorm kitchens.',
    bullets: [
      'Cool it, jar it, drop it in the used-oil drum by the canteen goods entrance.',
      'Small amounts: soak into kitchen roll → food/general waste.',
    ],
  },
  {
    id: 'medicine', keywords: ['medicine', 'pills', 'drug', 'prescription', 'medication'],
    title: 'Medicines go back to a pharmacy',
    answer: 'Flushed or binned medicine ends up in the water supply. Pharmacies take unused stock back for free.',
    bullets: [
      'Campus health centre pharmacy accepts returns, including opened packs.',
      'Remove the outer cardboard for paper recycling; blisters go with the return.',
    ],
  },
]

export const ENERGY = [
  {
    id: 'ac', keywords: ['ac', 'air con', 'aircon', 'air conditioning', 'cooling', 'fan', 'hot room'],
    title: 'Cooling: the thermostat does most of the work',
    answer: 'Each degree lower on the set point costs roughly 6–8% more energy. Getting from 20°C to 24°C is the whole saving.',
    bullets: [
      'Set 24–25°C in summer and use a fan — moving air feels ~3°C cooler for a tenth of the power.',
      'Close blinds on the sunny side before noon; blocking the heat beats removing it later.',
      'Windows open with the AC running is the single most expensive habit in the halls.',
    ],
  },
  {
    id: 'heat', keywords: ['heating', 'radiator', 'heater', 'cold room', 'winter', 'thermostat', 'draught', 'draft'],
    title: 'Heating: seal first, then turn down',
    answer: 'Heating dominates campus winter load. Draught-proofing is free from Facilities and pays back immediately.',
    bullets: [
      '19–20°C when you are in, 16°C when you are out or asleep. A jumper is not a compromise, it is a rounding error in comfort.',
      'Never dry laundry on a radiator — it can cut its output by a third and breeds damp.',
      'Report a radiator you cannot turn down; a stuck valve wastes more than any habit you can fix.',
    ],
  },
  {
    id: 'standby', keywords: ['standby', 'phantom', 'vampire', 'plugged in', 'power strip', 'always on', 'idle'],
    title: 'Standby load is 5–10% of a dorm room\'s bill',
    answer: 'Chargers, consoles, monitors and speakers draw power doing nothing. One switched strip fixes all of it.',
    bullets: [
      'Group desk gear on a switched power strip; flip it when you leave.',
      'Free standby-killer strips are handed out at Dorm Energy Sprint sign-up.',
      'Game consoles in "instant on" are usually the worst single offender in a room.',
    ],
  },
  {
    id: 'laptop', keywords: ['laptop', 'computer', 'pc', 'desktop', 'gaming', 'screen', 'monitor brightness', 'battery life'],
    title: 'Computers: sleep beats screensaver, laptop beats desktop',
    answer: 'A laptop uses roughly a fifth of a gaming desktop\'s power for the same coursework.',
    bullets: [
      'Sleep after 10 min idle, screen off after 5. A screensaver saves nothing.',
      'Screen brightness at 70% instead of 100% is a real, painless cut.',
      'Do the render-heavy jobs on the lab machines — they are on anyway and better cooled.',
    ],
  },
  {
    id: 'laundry', keywords: ['laundry', 'washing machine', 'dryer', 'tumble', 'wash'],
    title: 'Laundry: cold wash, no dryer',
    answer: 'About 90% of a wash cycle\'s energy goes into heating water, and the dryer typically doubles the load.',
    bullets: [
      'Wash at 30°C on a full drum — half loads waste both water and heat.',
      'Air-dry on the drying racks in each laundry room; the dryer is the most expensive appliance in the building.',
      'Clean the lint filter — a blocked one adds 30% to dryer run time.',
    ],
  },
  {
    id: 'kitchen', keywords: ['kettle', 'fridge', 'microwave', 'oven', 'cooking', 'boil', 'freezer'],
    title: 'Kitchen: match the appliance to the job',
    answer: 'Small appliances beat big ones for small jobs, and the fridge is the only thing running 24/7.',
    bullets: [
      'Boil only the water you need; a full kettle for one cup wastes ~60% of the energy.',
      'Microwave or lid-on hob instead of the oven for one portion.',
      'Fridge at 4°C, freezer at -18°C, coils dust-free, door shut. Colder is not safer, just pricier.',
    ],
  },
  {
    id: 'lights', keywords: ['light', 'lights', 'lamp', 'bulb energy', 'lighting', 'led'],
    title: 'Lighting: LED plus task lighting',
    answer: 'LEDs use about 80% less than incandescent and last 15–25× longer, so the swap pays for itself well before it burns out.',
    bullets: [
      'Task lamp on the desk beats lighting the whole room to read one page.',
      'Daylight is free — desk facing the window, blinds up.',
      'Last one out of a study room turns the overheads off. Nobody else will.',
    ],
  },
  {
    id: 'water', keywords: ['shower', 'water', 'hot water', 'tap'],
    title: 'Hot water is an energy question',
    answer: 'Heating shower water is one of the largest per-student loads in residences.',
    bullets: [
      'A 4-minute shower instead of 10 saves both water and the gas to heat it.',
      'Report dripping hot taps immediately — a slow hot drip is a continuous heating load.',
    ],
  },
  {
    id: 'transport', keywords: ['transport', 'car', 'commute', 'bus', 'flight', 'travel', 'cycle to campus'],
    title: 'Getting to campus',
    answer: 'Travel is often the biggest slice of a student\'s footprint, and it is also the easiest to change per trip.',
    bullets: [
      'Bike or walk under 3 km; the shuttle and buses beat a solo car every time.',
      'Campus bike auction each term is the cheapest way to get a working bike.',
      'One short-haul flight can outweigh a year of careful bin sorting — plan trips, not guilt.',
    ],
  },
]
