export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

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