import patientData from '../../data/patients.json';
import { PatientNoSensitiveData, Patient, NewPatient } from '../types';
import toNewPatient from '../utils';

// Reformat data
const newPatientData = patientData.map(obj => {
  const newPatient = toNewPatient(obj) as Patient;
  newPatient.id = obj.id;
  return newPatient;
});

const patientsWithoutSSN: PatientNoSensitiveData[] = newPatientData;

const getPatientsWithoutSSN = (): PatientNoSensitiveData[] => {
  return patientsWithoutSSN.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: (Math.max(...newPatientData.map(d => Number(d.id))) + 1).toString(),
    ...patient
  };
  newPatientData.push(newPatient);

  return newPatient;
};

export default {
  getPatientsWithoutSSN,
  addPatient
};