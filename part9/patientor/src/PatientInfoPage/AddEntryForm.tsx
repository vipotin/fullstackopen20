import React, { useState } from "react";
import { Grid, Button, Label } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { Entry, EntryType, Diagnosis, BaseEntry } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection, NumberField, TextField, SelectEntryType, EntryTypeOption } from "../AddPatientModal/FormField";
import {  } from "../utils";


const dateFormatRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const specialistRegex = /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u;
const diagnosisCodesRegex = /[0123]/;

// export type EntryFormValues = Omit<Entry, "id" | "entries">;
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type EntryFormValues = DistributiveOmit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}


const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HospitalEntry, label: "Hospital" },
  { value: EntryType.OccupationalHealthcareEntry, label: "Occupational Healthcare" },
  { value: EntryType.HealthCheckEntry, label: "HealthCheck" },
];

const HealthCheckEntryFields: React.FC = () => {
  return (
    <Field
          label="Healthcheck Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
  );
};

const OccupationalHealthcareEntryFields: React.FC = () => {
  return (
    <div>
    <Field
          label="Employer name"
          name="employerName"
          placeholder="Employer name"
          component={TextField}
        />

      <p><b>Sickleave</b></p>
      <Grid>
        <Grid.Column width={8}>
        <Field
              label="Start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
        </Grid.Column>
        <Grid.Column width={8}>
        <Field
              label="End date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
        </Grid.Column>
      </Grid>
    </div>
  );
};

const HospitalEntryFields: React.FC = () => {
  return (
    <div>
      <p><b>Discharge</b></p>
      <Grid>
        <Grid.Column width={8}>
        <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
        </Grid.Column>
        <Grid.Column width={8}>
        <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
        </Grid.Column>
      </Grid>
    </div>
  );
};

const validateBaseEntryFormValues = (values: EntryFormValues): { [field: string]: string } => {

  const requiredError = "Field is required";
  const formatError = "Invalid field";
  const errors: { [field: string]: string } = {};
  // Required errors
  if (!values.description) {
    console.log('description')
    errors.description = requiredError;
  }
  if (!values.date) {
    errors.date = requiredError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (!values.type) {
    errors.type = requiredError;
  }
  if (!dateFormatRegex.test(values.date)) {
    errors.date = formatError;
  }

  return errors;
};

const validateFormValues = (values: EntryFormValues): { [field: string]: string } => {

  const errors = validateBaseEntryFormValues(values);
  const requiredError = "Field is required";
  const formatError = "Invalid field";

  if (values.type === "OccupationalHealthcare") {
    if (!values.employerName) {
      errors.employerName = requiredError;
    }
  }
  
  //   // Does not work!
  //   if (values.sickLeave) {
  //     if(!dateFormatRegex.test(values.sickLeave.startDate) || !dateFormatRegex.test(values.sickLeave.endDate)) {
  //       errors.sickLeave = formatError;
  //     }
  //   }
  // }

  if (values.type === "Hospital") {
    if (!values.discharge.date) {
      errors.discharge = requiredError;
    }
  }

  if (values.type === "HealthCheck") {
    if (!values.healthCheckRating) {
      errors.healthCheckRating = requiredError;
    }
  }
  return errors;
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      type: "Hospital",
      discharge: { date: "", criteria: "" }
    }}
    onSubmit={onSubmit}
    validate={values => validateFormValues(values)}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

      return (
        <Form className="form ui">

          <SelectEntryType
              label="Entry type"
              name="type"
              options={entryTypeOptions}
            />

          <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />

            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <Field
              label="Specialist"
              placeholder="Specialist name"
              name="specialist"
              component={TextField}
            />

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />      

        {/* Entry type specific fields */}
        {values.type === "HealthCheck" && <HealthCheckEntryFields />}
        {values.type === "OccupationalHealthcare" && <OccupationalHealthcareEntryFields />}
        {values.type === "Hospital" && <HospitalEntryFields />}

        <Grid>
          <Grid.Column floated="left" width={5}>
            <Button type="button" onClick={onCancel} color="red">
              Cancel
            </Button>
          </Grid.Column>
          <Grid.Column floated="right" width={5}>
            <Button
              type="submit"
              floated="right"
              color="green"
              disabled={!dirty || !isValid}
            >
              Add
            </Button>
          </Grid.Column>
        </Grid>

        </Form>
      );
    }}
  </Formik>
  );
};