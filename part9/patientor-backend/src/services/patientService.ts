import patientData from '../../data/patients.json';
import { PatientNoSensitiveData, Patient, NewPatient } from '../types';
import toNewPatient from '../utils';

// Reformat data
const newPatientData = patientData.map(obj => {
  const newPatient = toNewPatient(obj) as Patient;
  newPatient.entries = [];
  newPatient.id = obj.id;
  return newPatient;
});

const patientsWithoutSSN: PatientNoSensitiveData[] = newPatientData;

const getPatientsWithoutSensitiveData = (): PatientNoSensitiveData[] => {
  return patientsWithoutSSN.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findPatientWithId = (id: string): Patient | undefined => {
  return newPatientData.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: (Math.max(...newPatientData.map(d => Number(d.id))) + 1).toString(),
    entries: [],
    ...patient
  };
  newPatientData.push(newPatient);

  return newPatient;
};

export default {
  getPatientsWithoutSensitiveData,
  addPatient,
  findPatientWithId
};