import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { Entry, Diagnosis } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection, NumberField, TextField } from "../AddPatientModal/FormField";
import {  } from "../utils";

export type EntryFormValues = Omit<Entry, "id" | "entries">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const dateFormatRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  const specialistRegex = /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u;
  const diagnosisCodesRegex = /[0123]/;

  return (
    <Formik
    initialValues={{
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      type: "HealthCheck"
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
      const formatError = "Invalid field";
        const errors: { [field: string]: string } = {};
        // Required errors
        if (!values.description) {
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

        // Format errors
        if (!dateFormatRegex.test(values.date)) {
          errors.date = formatError;
        }
        if (!specialistRegex.test(values.specialist)) {
          errors.specialist= formatError;
        }
        if (values.diagnosisCodes && values.diagnosisCodes.some(code => !diagnosisCodesRegex.test(code))) {
          errors.diagnosisCodes= formatError;
        }
        return errors;
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
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

        <Field
          label="Healthcheck Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />

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