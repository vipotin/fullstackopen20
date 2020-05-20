import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsWithoutSSN());
});

router.post('/', (req, res) => {
  const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  const newPatient = {
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender
  };
  res.json(newPatient);
});

export default router;