import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsWithoutSensitiveData());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.findPatientWithId(id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;