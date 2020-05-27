/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, 
  Gender, 
  Entry, 
  NewBaseEntry, 
  NewEntry, 
  Diagnosis, 
  HealthCheckRating,
  StartEndDate,
  Discharge 
} from './types';

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isEntry = (param: any): param is string => {
  return ["Hospital", "HealthCheck", "OccupationalHealthcare"].includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isArrayofString = (param: any[]): param is string[] => {
  return !param.some(item => !isString(item));
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};

const parseString = (name: any, param: string): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing ${param}: ${name}`);
  }

  return name;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing SSN: ${ssn}`);
  }

  return ssn;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date) ) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

const parseGender = (gender: any): string => {
  if (!gender || !isGender(gender) ) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseType = (type: any): string => {
  if (!type || !isEntry(type) ) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }

  return type;
};

const parseDiagnosisCodes = (array: any): Array<Diagnosis['code']> => {
  if (!array || !isArrayofString(array) ) {
    throw new Error(`Incorrect or missing diagnosis codes: ${array}`);
  }

  return array;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isHealthCheckRating(rating) ) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }

  return rating;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error(`Incorrect or missing discharge: ${discharge}`);
  }

  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria, "discharge")
  };
};

const parseStartEndDate = (dates: any): StartEndDate => {
  if (!dates) {
    throw new Error(`Incorrect or missing dates: ${dates}`);
  }

  return {
    startDate: parseDate(dates.startDate),
    endDate: parseDate(dates.endDate)
  };
};

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [] as Entry[]
  };
  return newPatient;
};

const toNewBaseEntry = (object: Entry): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist")
  };
  if (object.diagnosisCodes) {
    return {
      ...newBaseEntry,
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };
  }
  return newBaseEntry;
};

export const toNewEntry = (object: any): NewEntry => {
  const newBase = toNewBaseEntry(object) as NewEntry;

  const type: string = parseType(object.type);

  switch (type) {
    case "HealthCheck":
      const newHealthCheckEntry: NewEntry = {
        ...newBase,
        type: object.type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
      return newHealthCheckEntry;
    case "Hospital":
      const newHospitalEntry: NewEntry = {
        ...newBase,
        type: object.type,
        discharge: parseDischarge(object.discharge)
      };
      return newHospitalEntry;
    case "OccupationalHealthcare":
        const newOccupationalHealthcareEntry: NewEntry = {
        ...newBase,
        type: object.type,
        employerName: parseString(object.employerName, "employer name"),
        sickLeave: parseStartEndDate(object.sickLeave)
      };
      return newOccupationalHealthcareEntry;

    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(type)}`
      );
  }
};