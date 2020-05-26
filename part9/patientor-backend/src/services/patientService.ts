import patients from '../../data/patients';
import { PatientNoSensitiveData, Patient, NewPatient, Entry, NewEntry } from '../types';
import { v4 as uuid } from 'uuid';

// import toNewPatient from '../utils';

// Reformat data
// const newPatientData = patients.map(obj => {
//   const newPatient = toNewPatient(obj) as Patient;
//   newPatient.entries = [];
//   newPatient.id = obj.id;
//   return newPatient;
// });

const getPatientsWithoutSensitiveData = (): PatientNoSensitiveData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findPatientWithId = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addEntry = (id: string, entry: NewEntry): Patient | undefined => {
  const patient = findPatientWithId(id);
  const newEntry = { id: uuid(), ...entry };
  if (patient) {
    const updatedPatient = { ...patient, entries: patient.entries.concat(newEntry) };
    patient.entries.concat(newEntry);
    console.log(updatedPatient)
    patients.map(p => p.id === id ? updatedPatient : p);
    return updatedPatient;
  }
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), entries: [], ...patient };
  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatientsWithoutSensitiveData,
  addPatient,
  findPatientWithId,
  addEntry
};