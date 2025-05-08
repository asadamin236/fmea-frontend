
import { Equipment, EquipmentType, Manufacturer, EquipmentFunction } from "@/types/equipment-types";

export const equipmentTypes: EquipmentType[] = [
  { id: "1", name: "Moisture Analyzer" },
  { id: "2", name: "Temperature Meter" },
  { id: "3", name: "Pressure Sensor" },
  { id: "4", name: "Flow Meter" },
  { id: "5", name: "Level Indicator" },
];

export const manufacturers: Manufacturer[] = [
  { id: "1", name: "Endress+Hauser" },
  { id: "2", name: "Emerson" },
  { id: "3", name: "Yokogawa" },
  { id: "4", name: "ABB" },
  { id: "5", name: "Siemens" },
];

export const equipmentFunctions: EquipmentFunction[] = [
  { id: "1", description: "Moisture Analysis" },
  { id: "2", description: "Temperature Monitoring" },
  { id: "3", description: "Pressure Monitoring" },
  { id: "4", description: "Flow Measurement" },
  { id: "5", description: "Level Measurement" },
];

export const equipmentData: Equipment[] = [
  {
    id: "1",
    area: "PFLNG_X",
    unit: "54",
    functionalLocation: "54QT-502",
    functionalLocationFromSAP: "54QT-502",
    functionalLocationDescriptionFromSAP: "xxx",
    techIdentNoFromSAP: "54QT-502",
    equipmentNoFromSAP: "10882056",
    equipmentDescriptionFromSAP: "MOISTURE ANALY",
    sce: "Yes",
    equipmentDescription: "MOISTURE ANALY",
    equipmentType: "1",
    manufacturer: "3",
    model: "AW500",
    criticality: "high",
    equipmentClass: "Moisture Analyzer",
    equipmentFunctions: [{ id: "1", description: "Moisture Analysis" }],
    numberOfUnits: 1
  },
  {
    id: "2",
    area: "PFLNG_X",
    unit: "54",
    functionalLocation: "54QT-503",
    functionalLocationFromSAP: "54QT-503",
    functionalLocationDescriptionFromSAP: "xxx",
    techIdentNoFromSAP: "54QT-503",
    equipmentNoFromSAP: "10882057",
    equipmentDescriptionFromSAP: "MOISTURE ANALY",
    sce: "Yes",
    equipmentDescription: "MOISTURE ANALY",
    equipmentType: "1",
    manufacturer: "3",
    model: "AW500",
    criticality: "high",
    equipmentClass: "Moisture Analyzer",
    equipmentFunctions: [{ id: "1", description: "Moisture Analysis" }],
    numberOfUnits: 1
  },
  {
    id: "3",
    area: "PFLNG_X",
    unit: "18",
    functionalLocation: "18QT-007",
    functionalLocationFromSAP: "18QT-007",
    functionalLocationDescriptionFromSAP: "xxx",
    techIdentNoFromSAP: "18QT-007",
    equipmentNoFromSAP: "10718172",
    equipmentDescriptionFromSAP: "ANLZ TX MSTR DRY GS DRIER C18-101A OUT",
    sce: "No",
    equipmentDescription: "ANLZ TX MSTR DRY GS DRIER C18-101A OUT",
    equipmentType: "1",
    manufacturer: "2",
    model: "DM100",
    criticality: "medium",
    equipmentClass: "Moisture Analyzer",
    equipmentFunctions: [{ id: "1", description: "Moisture Analysis" }],
    numberOfUnits: 1
  }
];
