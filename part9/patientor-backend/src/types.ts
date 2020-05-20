export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NewPatient = Omit<Patient, 'id'>;

export interface PatientNoSensitiveData {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}