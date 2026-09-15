export type SystemId = 'nervous' | 'respiratory' | 'circulatory' | 'digestive' | 'skeletal';

export type OrganId = 'brain' | 'heart' | 'lungs' | 'liver' | 'stomach' | 'intestine' | 'kidneys' | 'blood' | 'skeleton';

export interface OrganFact {
  title: string;
  detail: string;
}

export interface OrganData {
  id: OrganId;
  name: string;
  emoji: string;
  systemId: SystemId;
  systemName: string;
  tagline: string;
  anatomicalParts: string[];
  location: string;
  mainFunction: string;
  facts: OrganFact[];
  stats: {
    label: string;
    value: string;
    unit?: string;
  }[];
  imageUrl?: string;
  viewZoom: 'full' | 'head' | 'thorax' | 'abdomen';
  hotspot: {
    cx: number;
    cy: number;
    r: number;
  };
}

export interface BodySystemData {
  id: SystemId;
  name: string;
  iconName: string;
  color: string;
  accentColor: string;
  organsInvolved: OrganId[];
  organNames: string[];
  shortExplanation: string;
  keyFunctions: string[];
  systemMetric: string;
}
