import patients from '../../data/patients';
import { PatientNoSensitiveData, Patient, NewPatient } from '../types';
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

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), entries: [], ...patient };
  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatientsWithoutSensitiveData,
  addPatient,
  findPatientWithId
};