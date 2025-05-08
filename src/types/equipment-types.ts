
export type EquipmentCriticality = 'low' | 'medium' | 'high';
export type EquipmentClass = 'Moisture Analyzer' | 'Temperature Sensor' | 'Pressure Gauge' | 'Level Meter' | 'Flow Meter';
export type EquipmentSCE = 'Yes' | 'No';

export interface EquipmentFunction {
  id: string;
  description: string;
}

export interface EquipmentType {
  id: string;
  name: string;
  description?: string;
}

export interface Manufacturer {
  id: string;
  name: string;
}

export interface Equipment {
  id: string;
  area: string;
  unit: string;
  functionalLocation: string;
  functionalLocationFromSAP: string;
  functionalLocationDescriptionFromSAP: string;
  techIdentNoFromSAP: string;
  equipmentNoFromSAP: string;
  equipmentDescriptionFromSAP: string;
  sce: EquipmentSCE;
  equipmentDescription: string;
  equipmentType: string;
  manufacturer: string;
  model: string;
  criticality: EquipmentCriticality;
  equipmentClass: EquipmentClass;
  equipmentFunctions: EquipmentFunction[];
  numberOfUnits: number;
}
