import React, { useEffect } from "react";
import axios from "axios";
import { Button, CardContent } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import { Modal, Segment } from 'semantic-ui-react';
import { Icon, Card } from 'semantic-ui-react';
import { Gender } from '../types';

import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, getPatient, addEntry } from "../state";
import { assertNever } from "../utils";
import { AddEntryForm, EntryFormValues } from "./AddEntryForm";

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

export const PatientInfoPage: React.FC = () => {
  const [{ selectedPatient }, dispatch] = useStateValue();
  // const [error, setError] = React.useState<string | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const params = useParams<{ id: string }>();

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const id = params.id;
      const { data: patientWithNewEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(patientWithNewEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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

  // const findDiagnosis = (code: string): string | null => {
  //   const foundDiagnosis: Diagnosis | undefined = diagnosis.find(d => d.code === code);
  //   return foundDiagnosis ? foundDiagnosis.name : null;
  // };
  
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
        // <div key={entry.id}>
        //   <p>{entry.date} {entry.description}</p>
        //   <ul>
        //     {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => 
        //       <li key={code}></li>
        //     ) : null }
        //   </ul>
        // </div>
        <EntryDetails key={entry.id} entry={entry} />
        )}
        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

const HeartIcon: React.FC<{ rating: number }> = ({ rating }) => {
  switch (rating) {
    case 0:
      return <Icon name="heart" color="green" />;
    case 1:
      return <Icon name="heart" color="yellow" />;
    case 2:
      return <Icon name="heart" color="orange" />;
    case 3:
      return <Icon name="heart" color="red" />;
    default:
      return null;
  }
};

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Card fluid>
      <CardContent>
        <Card.Header>
          {entry.date} <Icon name="hospital" size="large"/>
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
      </CardContent>
    </Card>
  );
};

const OccupationalHealthcare: React.FC<{ entry: Entry; employer: string }> = ({ entry, employer }) => {
  return (
    <Card fluid>
      <CardContent>
        <Card.Header>
          {entry.date} <Icon name="stethoscope" size="large"/> {employer}
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
      </CardContent>
    </Card>
  );
};

const HealthCheck: React.FC<{ entry: Entry; rating: number }> = ({ entry, rating }) => {
  return (
    <Card fluid>
      <CardContent>
        <Card.Header>
          {entry.date} <Icon name="doctor" size="large"/>
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <HeartIcon rating={rating} />
      </CardContent>
    </Card>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} employer={entry.employerName} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} rating={entry.healthCheckRating} />;
    default:
      return assertNever(entry);
  }
};

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

export const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

