import { OrganData, BodySystemData, OrganId, SystemId } from '../types';
import brainImg from '../assets/images/organ_brain_3d_1789316072741.jpg';
import heartImg from '../assets/images/organ_heart_3d_1789316060970.jpg';
import lungsImg from '../assets/images/organ_lungs_3d_1789316084859.jpg';
import liverImg from '../assets/images/organ_liver_3d_1789316095264.jpg';
import stomachImg from '../assets/images/organ_stomach_3d_1789316108527.jpg';
import digestImg from '../assets/images/organ_digest_3d_1789316134924.jpg';
import kidneysImg from '../assets/images/organ_kidneys_3d_1789316123399.jpg';

export const ORGANS: Record<OrganId, OrganData> = {
  brain: {
    id: 'brain',
    name: 'Brain',
    emoji: '🧠',
    systemId: 'nervous',
    systemName: 'Nervous System',
    tagline: 'Control centre of the body.',
    anatomicalParts: ['Frontal Lobe', 'Parietal Lobe', 'Occipital Lobe', 'Temporal Lobe', 'Cerebellum'],
    location: 'Encased within the cranial cavity of the skull at the top of the central nervous system.',
    mainFunction: 'The central command center of the human body. It interprets sensory input, coordinates movement, regulates involuntary homeostasis (like respiration and heart rate), and facilitates memory, emotions, and rational thought.',
    facts: [
      {
        title: 'Massive Synaptic Complexity',
        detail: 'Houses approximately 86 billion neurons, each establishing up to 10,000 synaptic connections, creating a network with more connections than stars in the Milky Way.'
      },
      {
        title: 'Massive Energy Consumer',
        detail: 'While making up only about 2% of total human body weight, the brain consumes more than 20% of your total oxygen and metabolic glucose supply.'
      },
      {
        title: 'Electrical Output',
        detail: 'At any waking moment, your brain produces enough electrical wattage (roughly 12 to 25 watts) to power a standard low-voltage LED bulb.'
      }
    ],
    stats: [
      { label: 'Weight', value: '1.4', unit: 'kg' },
      { label: 'Neurons', value: '86', unit: 'billion' },
      { label: 'Metabolic Share', value: '20%' }
    ],
    imageUrl: brainImg,
    viewZoom: 'head',
    hotspot: { cx: 200, cy: 78, r: 24 }
  },
  heart: {
    id: 'heart',
    name: 'Heart',
    emoji: '❤️',
    systemId: 'circulatory',
    systemName: 'Circulatory System',
    tagline: 'Pumps blood around the body.',
    anatomicalParts: ['Superior Vena Cava', 'Aorta', 'Inferior Vena Cava', 'Right Ventricle', 'Left Ventricle'],
    location: 'Located in the middle mediastinum of the chest cavity, tilted slightly to the left behind the sternum and between the two lungs.',
    mainFunction: 'A muscular four-chambered pump that contracts rhythmically to propel oxygenated blood through arteries to body tissues and cycles deoxygenated blood through the lungs for re-oxygenation.',
    facts: [
      {
        title: 'Daily Pumping Feat',
        detail: 'Beats around 100,000 times each day, moving approximately 7,500 liters (nearly 2,000 gallons) of life-giving blood throughout your vascular system.'
      },
      {
        title: 'Autonomous Electrical Rhythm',
        detail: 'The heart possesses its own intrinsic pacemaker—the sinoatrial node—meaning it can continue contracting independently as long as it has oxygen.'
      },
      {
        title: 'Vascular Journey',
        detail: 'Every drop of blood pumped circulates through a vascular network extending over 100,000 kilometers (60,000 miles)—long enough to circle the Earth twice!'
      }
    ],
    stats: [
      { label: 'Resting Rate', value: '60-100', unit: 'BPM' },
      { label: 'Daily Output', value: '7,500', unit: 'L' },
      { label: 'Chambers', value: '4' }
    ],
    imageUrl: heartImg,
    viewZoom: 'thorax',
    hotspot: { cx: 204, cy: 196, r: 22 }
  },
  lungs: {
    id: 'lungs',
    name: 'Lungs',
    emoji: '🌬️',
    systemId: 'respiratory',
    systemName: 'Respiratory System',
    tagline: 'Helps to breathe.',
    anatomicalParts: ['Trachea', 'Carina', 'Bronchus', 'Right Lobe', 'Left Lobe'],
    location: 'Positioned bilaterally within the thoracic cavity, protected by the ribcage and resting directly atop the diaphragm muscle.',
    mainFunction: 'Primary gas-exchange organs. They extract life-sustaining oxygen from inhaled atmospheric air into the pulmonary bloodstream and expel metabolic carbon dioxide waste during exhalation.',
    facts: [
      {
        title: 'Tennis Court Surface Area',
        detail: 'Contains 300 to 500 million microscopic air sacs called alveoli. If spread flat, their combined surface area would span approximately 70 square meters (the size of a singles tennis court).'
      },
      {
        title: 'Asymmetrical Design',
        detail: 'Your right lung has three distinct lobes and is slightly larger, while the left lung has two lobes and features a cardiac notch to comfortably cradle the heart.'
      },
      {
        title: 'Daily Breath Volume',
        detail: 'An average adult takes 12 to 20 breaths per minute—amounting to more than 20,000 breaths and over 11,000 liters of filtered air processed each day.'
      }
    ],
    stats: [
      { label: 'Daily Breaths', value: '20,000+' },
      { label: 'Alveoli Count', value: '480', unit: 'million' },
      { label: 'Gas Exchange Area', value: '70', unit: 'm²' }
    ],
    imageUrl: lungsImg,
    viewZoom: 'thorax',
    hotspot: { cx: 168, cy: 190, r: 28 }
  },
  liver: {
    id: 'liver',
    name: 'Liver',
    emoji: '🟤',
    systemId: 'digestive',
    systemName: 'Digestive & Metabolic System',
    tagline: 'Cleans the blood.',
    anatomicalParts: ['Right Lobe', 'Left Lobe', 'Gallbladder', 'Hepatic Portal Vein', 'Bile Duct'],
    location: 'Located in the right upper quadrant of the abdominal cavity, directly beneath the diaphragm and resting atop the stomach and intestines.',
    mainFunction: 'The primary biochemical processing plant and detox facility. Cleans toxins, alcohol, and metabolic waste from the bloodstream, synthesizes bile to break down dietary fats, stores glycogen for blood sugar balance, and manufactures essential blood-clotting proteins.',
    facts: [
      {
        title: 'Regenerative Superpower',
        detail: 'The liver is the only visceral internal organ capable of natural tissue regeneration; it can regrow back to full functional size even if up to 75% of it is removed.'
      },
      {
        title: 'Over 500 Vital Tasks',
        detail: 'Scientists have identified more than 500 discrete physiological functions performed by hepatocytes, ranging from hormone processing to iron storage and immune filtration.'
      },
      {
        title: 'Enormous Blood Reservoir',
        detail: 'At any given moment, the liver holds approximately 13% (over 1 pint) of the total blood supply of the human body, filtering 1.4 liters every single minute.'
      }
    ],
    stats: [
      { label: 'Weight', value: '1.5', unit: 'kg' },
      { label: 'Blood Filtered', value: '1.4', unit: 'L / min' },
      { label: 'Daily Bile', value: '800-1000', unit: 'mL' }
    ],
    imageUrl: liverImg,
    viewZoom: 'abdomen',
    hotspot: { cx: 182, cy: 242, r: 24 }
  },
  stomach: {
    id: 'stomach',
    name: 'Stomach',
    emoji: '🧫',
    systemId: 'digestive',
    systemName: 'Digestive System',
    tagline: 'Helps in the breakage of food.',
    anatomicalParts: ['Esophagus', 'Duodenum', 'Fundus', 'Gastric Rugae', 'Pyloric Sphincter'],
    location: 'Located in the left upper quadrant of the abdominal cavity, inferior to the diaphragm and nestled partly beneath the left lobe of the liver.',
    mainFunction: 'A muscular J-shaped digestive reservoir that churns food through rhythmic contractions (peristalsis) while bathing it in powerful hydrochloric acid and pepsin enzymes to reduce food to a semi-liquid paste (chyme).',
    facts: [
      {
        title: 'Extreme Acidic Environment',
        detail: 'Produces gastric acid with a pH of 1.5 to 3.5—strong enough to dissolve soft metals and neutralize virtually all ingested bacteria.'
      },
      {
        title: 'Rapid Mucosal Renewal',
        detail: 'To prevent auto-digestion from its own potent hydrochloric acid, the epithelial mucus lining of the stomach completely regenerates every 3 to 4 days.'
      },
      {
        title: 'Incredible Elasticity',
        detail: 'An empty stomach holds only about 75 milliliters of volume, but internal accordion-like folds called rugae permit it to comfortably expand to hold 2 to 4 liters after a full meal.'
      }
    ],
    stats: [
      { label: 'Gastric pH', value: '1.5 - 3.5' },
      { label: 'Capacity', value: '2 - 4', unit: 'L' },
      { label: 'Lining Renewal', value: '72 - 96', unit: 'hrs' }
    ],
    imageUrl: stomachImg,
    viewZoom: 'abdomen',
    hotspot: { cx: 220, cy: 246, r: 20 }
  },
  intestine: {
    id: 'intestine',
    name: 'Intestines',
    emoji: '🥨',
    systemId: 'digestive',
    systemName: 'Digestive System',
    tagline: 'Helps in the digestion of food.',
    anatomicalParts: ['Small Intestine', 'Large Intestine (Colon)', 'Cecum', 'Appendix', 'Rectum'],
    location: 'Occupies the central and lower abdominal and pelvic cavities, framed by the colon with coiled small intestine inside.',
    mainFunction: 'The primary site for nutrient and water absorption. The small intestine uses microscopic villi to absorb proteins, fats, and carbohydrates into the blood, while the large intestine reclaims water, compacts waste, and harbors trillions of beneficial probiotic bacteria.',
    facts: [
      {
        title: 'Astounding Total Length',
        detail: 'Stretching out the human intestinal tract reveals approximately 6 meters (20 feet) of small intestine and 1.5 meters (5 feet) of large intestine.'
      },
      {
        title: 'Vast Microscopic Surface Area',
        detail: 'Tiny finger-like projections called villi and microvilli increase the inner absorption area to approximately 32 square meters—the size of a studio apartment.'
      },
      {
        title: 'Microbial Metropolis',
        detail: 'The gut microbiome contains over 38 trillion bacterial cells, actively manufacturing vitamin K and B12, supporting neurotransmitter production, and priming the immune system.'
      }
    ],
    stats: [
      { label: 'Total Length', value: '7.5', unit: 'meters' },
      { label: 'Surface Area', value: '32', unit: 'm²' },
      { label: 'Microbiome', value: '38+', unit: 'trillion cells' }
    ],
    imageUrl: digestImg,
    viewZoom: 'abdomen',
    hotspot: { cx: 200, cy: 300, r: 26 }
  },
  kidneys: {
    id: 'kidneys',
    name: 'Kidneys',
    emoji: '🥔',
    systemId: 'circulatory',
    systemName: 'Excretory & Circulatory System',
    tagline: 'Helps filter the waste material out from the body.',
    anatomicalParts: ['Aorta', 'Right Kidney', 'Left Kidney', 'Ureter', 'Urinary Bladder'],
    location: 'Situated retroperitoneally along the posterior abdominal wall on either side of the vertebral column, just beneath the rib cage.',
    mainFunction: 'Sophisticated biological filtration facilities. They cleanse the bloodstream of urea and cellular waste, maintain precise water-electrolyte equilibrium, regulate systemic blood pressure, and activate vitamin D.',
    facts: [
      {
        title: 'Enormous Daily Filtration',
        detail: 'These bean-shaped organs process roughly 180 liters (48 gallons) of fluid every 24 hours, reabsorbing 99% of it back into circulation and excreting only 1–2 liters as urine.'
      },
      {
        title: 'Millions of Micro-Filters',
        detail: 'Each kidney contains around one million microscopic functional units called nephrons, which constantly regulate mineral balance and blood pH levels.'
      },
      {
        title: 'Staggered Elevation',
        detail: 'The right kidney sits approximately 1 to 2 centimeters lower than the left kidney because the substantial mass of the liver rests directly above it.'
      }
    ],
    stats: [
      { label: 'Blood Filtered', value: '180', unit: 'L / day' },
      { label: 'Nephrons', value: '2', unit: 'million' },
      { label: 'Reabsorption', value: '99%' }
    ],
    imageUrl: kidneysImg,
    viewZoom: 'abdomen',
    hotspot: { cx: 200, cy: 278, r: 24 }
  },
  blood: {
    id: 'blood',
    name: 'Blood & Vasculature',
    emoji: '🩸',
    systemId: 'circulatory',
    systemName: 'Circulatory System',
    tagline: 'Pumps blood and oxygen to all living cells.',
    anatomicalParts: ['Erythrocytes', 'Leukocytes', 'Platelets', 'Arteries', 'Capillaries'],
    location: 'Flows through the closed cardiovascular circuit of arteries, arterioles, capillaries, venules, and veins permeating every viable tissue.',
    mainFunction: 'The vital transport fluid of the body. Delivers oxygen, glucose, hormones, and immune cells to trillions of tissues while carrying carbon dioxide to lungs and metabolic toxins to kidneys and liver for clearance.',
    facts: [
      {
        title: 'Rapid Systemic Circuit',
        detail: 'An adult has roughly 5 liters of blood, which completes a full circuit throughout your entire body in just about 60 seconds at resting heart rate.'
      },
      {
        title: 'Cellular Micro-Density',
        detail: 'A single microscopic droplet of blood contains roughly 5 million red blood cells (erythrocytes), 10,000 white blood cells (leukocytes), and 250,000 platelets for clotting.'
      },
      {
        title: 'The Great Journey',
        detail: 'During its approximately 120-day lifespan, an individual red blood cell makes roughly 250,000 round trips through the body before being recycled by the spleen.'
      }
    ],
    stats: [
      { label: 'Total Volume', value: '5', unit: 'Liters' },
      { label: 'Circuit Time', value: '60', unit: 'seconds' },
      { label: 'RBC Lifespan', value: '120', unit: 'days' }
    ],
    viewZoom: 'full',
    hotspot: { cx: 200, cy: 210, r: 24 }
  },
  skeleton: {
    id: 'skeleton',
    name: 'Skeleton',
    emoji: '🦴',
    systemId: 'skeletal',
    systemName: 'Skeletal System',
    tagline: 'Provides structural framework and armor.',
    anatomicalParts: ['Cranium', 'Spinal Column', 'Rib Cage', 'Pelvis', 'Femur'],
    location: 'Internal articulated framework divided into the axial skeleton (skull, spine, ribs) and appendicular skeleton (shoulders, pelvis, limbs).',
    mainFunction: 'Provides structural rigidity and locomotion leverage for muscles, shields fragile internal organs, houses bone marrow for red/white blood cell production (hematopoiesis), and stores 99% of the body’s calcium.',
    facts: [
      {
        title: 'Bone Count Evolution',
        detail: 'Human babies are born with approximately 270 bones and cartilage units, which gradually fuse during development to form the 206 distinct bones of an adult skeleton.'
      },
      {
        title: 'Lighter Than Concrete, Stronger Than Steel',
        detail: 'Ounce for ounce, human cortical bone has a compressive strength greater than reinforced concrete and is approximately four times stronger than structural steel in load resistance.'
      },
      {
        title: 'Living Dynamic Tissue',
        detail: 'Bones are dynamic, highly vascular organs. Through cellular remodeling by osteoblasts and osteoclasts, your skeleton completely replaces its mineral structure roughly every 10 years.'
      }
    ],
    stats: [
      { label: 'Adult Bones', value: '206' },
      { label: 'Calcium Stored', value: '99%' },
      { label: 'Remodeling Cycle', value: '10', unit: 'years' }
    ],
    viewZoom: 'full',
    hotspot: { cx: 200, cy: 370, r: 26 }
  }
};

export const BODY_SYSTEMS: Record<SystemId, BodySystemData> = {
  nervous: {
    id: 'nervous',
    name: 'Nervous System',
    iconName: 'Zap',
    color: '#38BDF8',
    accentColor: 'rgb(56, 189, 248)',
    organsInvolved: ['brain'],
    organNames: ['Brain', 'Spinal Cord', 'Peripheral Nerves'],
    shortExplanation: 'The high-speed electrochemical communication network of the body. It detects environmental and internal changes through sensory receptors, processes and computes decisions within the central nervous system, and transmits instantaneous instructions along nerve fibers to muscles and glands.',
    keyFunctions: [
      'Rapid sensory perception & environmental mapping',
      'Integration of thought, emotion, memory, and cognitive decision-making',
      'Instantaneous regulation of reflexes and motor coordination',
      'Autonomic homeostasis (heart rate, breathing tempo, visceral reflexes)'
    ],
    systemMetric: 'Transmits impulses at speeds up to 400 km/h (250 mph)'
  },
  respiratory: {
    id: 'respiratory',
    name: 'Respiratory System',
    iconName: 'Wind',
    color: '#06B6D4',
    accentColor: 'rgb(6, 182, 212)',
    organsInvolved: ['lungs'],
    organNames: ['Lungs', 'Trachea', 'Bronchial Tree', 'Diaphragm'],
    shortExplanation: 'Responsible for external respiration and cellular gas exchange. Working continuously with the circulatory system, it draws atmospheric air into the lungs, facilitates rapid oxygen diffusion across alveolar-capillary membranes into the blood, and expels toxic carbon dioxide waste into the atmosphere.',
    keyFunctions: [
      'Pulmonary ventilation via contraction of the diaphragm & intercostal muscles',
      'Gas exchange across ultra-thin alveolar-capillary walls',
      'Regulation of blood pH through carbon dioxide exhalation balance',
      'Vocal sound production and olfactory sensory detection'
    ],
    systemMetric: 'Filters ~11,000 liters of atmospheric air daily'
  },
  circulatory: {
    id: 'circulatory',
    name: 'Circulatory System',
    iconName: 'HeartPulse',
    color: '#F43F5E',
    accentColor: 'rgb(244, 63, 94)',
    organsInvolved: ['heart', 'blood', 'kidneys'],
    organNames: ['Heart', 'Blood', 'Blood Vessels (Arteries, Veins, Capillaries)'],
    shortExplanation: 'The cardiovascular transport superhighway. The muscular heart pumps nutrient- and oxygen-rich blood through an expansive network of pressurized arteries and microscopic capillaries, supplying every cell in the body while carrying cellular waste products to disposal organs like the kidneys and lungs.',
    keyFunctions: [
      'Continuous distribution of oxygen and essential nutrients to every living cell',
      'Rapid transport of metabolic wastes (carbon dioxide, urea) to excretory sites',
      'Dispersal of hormones and chemical signaling messengers throughout tissues',
      'Immune defense delivery and body core temperature stabilization'
    ],
    systemMetric: '100,000 km of interconnected blood vessels'
  },
  digestive: {
    id: 'digestive',
    name: 'Digestive System',
    iconName: 'Sparkles',
    color: '#F59E0B',
    accentColor: 'rgb(245, 158, 11)',
    organsInvolved: ['liver', 'stomach', 'intestine'],
    organNames: ['Liver', 'Stomach', 'Intestines', 'Esophagus', 'Gallbladder'],
    shortExplanation: 'Breaks down complex consumed foodstuffs into microscopic molecular building blocks—amino acids, simple sugars, fatty acids, and essential vitamins—that can be absorbed into the bloodstream, while compacting and expelling indigestible residues safely.',
    keyFunctions: [
      'Mechanical churning and chemical enzymatic breakdown of food',
      'Synthesis of gastric acids and bile for lipid emulsification',
      'High-efficiency absorption of water, nutrients, and electrolytes',
      'Symbiotic gut microbiome regulation and immunological barrier'
    ],
    systemMetric: '9-meter (30-foot) continuous alimentary tract'
  },
  skeletal: {
    id: 'skeletal',
    name: 'Skeletal System',
    iconName: 'Shield',
    color: '#E2E8F0',
    accentColor: 'rgb(226, 232, 240)',
    organsInvolved: ['skeleton'],
    organNames: ['206 Bones', 'Articular Cartilage', 'Ligaments', 'Bone Marrow'],
    shortExplanation: 'The architectural scaffold that gives the human body shape, stability, and protective armor. It provides rigid lever arms for skeletal muscles to generate locomotion, shields fragile internal organs, houses bone marrow for hematopoiesis (blood cell creation), and serves as the body’s principal mineral storehouse.',
    keyFunctions: [
      'Rigid architectural framework supporting soft tissues and upright posture',
      'Armor shielding vital organs (skull for brain, ribcage for heart & lungs)',
      'Hematopoiesis: continuous production of red and white blood cells in marrow',
      'Dynamic mineral homeostasis maintaining blood calcium and phosphate'
    ],
    systemMetric: '206 articulated bones engineered for strength and flexibility'
  }
};
