import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { Gender, Entry, Diagnosis } from '../types';

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, getPatient } from "../state";

const GenderIcon: React.FC<{ gender: Gender}> = ({ gender }) => {
  switch (gender) {
    case Gender.Male:
      return (<Icon name="mars" />);
    case Gender.Female:
      return (<Icon name="venus" />);
    case Gender.Other:
      return (<Icon name="neuter" />);
    default:
    return null;
  }
};

const PatientInfoPage: React.FC = () => {
  const [{ selectedPatient, diagnosis }, dispatch] = useStateValue();
  // const [error, setError] = React.useState<string | undefined>();

  const params = useParams<{ id: string}>();

  const getPatientData = async () => {
    try {
      const id = params.id;
      if (!selectedPatient || id !== selectedPatient.id) {
        const { data: foundPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(getPatient(foundPatient));
      }
    } catch (e) {
      // console.error(e.response.data);
      // setError(e.response.data.error);
    }
  };

  useEffect(() => {
    getPatientData();
    // setError(undefined);
  }, []);

  const findDiagnosis = (code: string): string | null => {
    const foundDiagnosis: Diagnosis | undefined = diagnosis.find(d => d.code === code);
    return foundDiagnosis ? foundDiagnosis.name : null;
  };
  

  if (!selectedPatient) return null;

  return (
    <div>
      <h2>{selectedPatient.name} <GenderIcon gender={selectedPatient.gender}/></h2>
      <p>
        ssn: {selectedPatient.ssn}
        <br></br>occupation: {selectedPatient.occupation}
      </p>
      <h4>entries</h4>
      {selectedPatient.entries.map(entry => 
        <div key={entry.id}>
          <p>{entry.date} {entry.description}</p>
          <ul>
            {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => 
              <li key={code}>{code} {findDiagnosis(code)}</li>
            ) : null }
          </ul>
        </div>
        )}
    </div>
  );
};

export default PatientInfoPage;
