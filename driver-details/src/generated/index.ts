/**
 * This file was automatically generated by Nexus 0.11.7
 * Do not make changes to this file directly
 */




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Driver: { // root type
    createdAt: string; // String!
    drivers_license: string; // String!
    email: string; // String!
    firstName: string; // String!
    id: string; // ID!
    lastName: string; // String!
    phone_number: string; // String!
    status: string; // String!
    trips?: number | null; // Int
  }
  Query: {};
  Taxi: { // root type
    capacity: number; // Int!
    color: string; // String!
    createdAt: string; // String!
    id: string; // ID!
    manufacturer: string; // String!
    model: string; // String!
    ownership_documnets: string[]; // [String!]!
    plate_number: string; // String!
    vehicle_documnets: string[]; // [String!]!
    vehicle_picture: string; // String!
    year: string; // String!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
}

export interface NexusGenFieldTypes {
  Driver: { // field return type
    createdAt: string; // String!
    drivers_license: string; // String!
    email: string; // String!
    firstName: string; // String!
    id: string; // ID!
    lastName: string; // String!
    phone_number: string; // String!
    status: string; // String!
    taxis: NexusGenRootTypes['Taxi'][]; // [Taxi!]!
    trips: number | null; // Int
  }
  Query: { // field return type
    drivers: NexusGenRootTypes['Driver'][]; // [Driver!]!
  }
  Taxi: { // field return type
    capacity: number; // Int!
    color: string; // String!
    createdAt: string; // String!
    id: string; // ID!
    manufacturer: string; // String!
    model: string; // String!
    ownership_documnets: string[]; // [String!]!
    plate_number: string; // String!
    vehicle_documnets: string[]; // [String!]!
    vehicle_picture: string; // String!
    year: string; // String!
  }
}

export interface NexusGenArgTypes {
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Driver" | "Query" | "Taxi";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}