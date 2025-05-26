import { Equipment, EquipmentType, Manufacturer, EquipmentFunction, EquipmentClass } from "@/types/equipment-types";

export const equipmentClasses: EquipmentClass[] = [
  { id: "1", name: "Moisture Analyzer", description: "Devices used to measure moisture content" },
  { id: "2", name: "Temperature Sensor", description: "Devices used to measure temperature" },
  { id: "3", name: "Pressure Gauge", description: "Devices used to measure pressure" },
  { id: "4", name: "Level Meter", description: "Devices used to measure levels" },
  { id: "5", name: "Flow Meter", description: "Devices used to measure flow rates" },
];

export const equipmentTypes: EquipmentType[] = [
  { 
    id: "1", 
    name: "Moisture Analyzer",
    equipmentClassId: "1",
    systems: []
  },
  { 
    id: "2", 
    name: "Temperature Meter",
    equipmentClassId: "2", 
    systems: []
  },
  { 
    id: "3", 
    name: "Pressure Sensor",
    equipmentClassId: "3",
    systems: []
  },
  { 
    id: "4", 
    name: "Flow Meter",
    equipmentClassId: "5",
    systems: []
  },
  { 
    id: "5", 
    name: "Level Indicator",
    equipmentClassId: "4",
    systems: []
  },
];

export const manufacturers: Manufacturer[] = [
  { id: "1", name: "Endress+Hauser", website: "https://www.endress.com" },
  { id: "2", name: "Emerson", website: "https://www.emerson.com" },
  { id: "3", name: "Yokogawa", website: "https://www.yokogawa.com" },
  { id: "4", name: "ABB", website: "https://www.abb.com" },
  { id: "5", name: "Siemens", website: "https://www.siemens.com" },
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
    equipmentClass: "1",
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
    equipmentClass: "1",
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
    equipmentClass: "1",
    equipmentFunctions: [{ id: "1", description: "Moisture Analysis" }],
    numberOfUnits: 1
  }
];
