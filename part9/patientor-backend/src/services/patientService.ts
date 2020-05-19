import patientData from '../../data/patients.json';
import { PatientNoSensitiveData } from '../types';

const patientsWithoutSSN: PatientNoSensitiveData[] = patientData;

const getPatientsWithoutSSN = (): PatientNoSensitiveData[] => {
  return patientsWithoutSSN.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatientsWithoutSSN
};