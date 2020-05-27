import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  selectedPatient: Patient | undefined;
  diagnoses: Diagnosis[];
};

const initialState: State = {
  patients: {},
  selectedPatient: undefined,
  diagnoses: [] as Diagnosis[]
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const setDiagnosis = (data: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS",
    payload: data
  };
};

export const setPatientList = (data: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data
  };
};

export const getPatient = (data: Patient): Action => {
  return {
    type: "GET_PATIENT",
    payload: data
  };
};

export const addPatient = (data: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: data
  };
};

export const addEntry = (data: Patient): Action => {
  return {
    type: "ADD_ENTRY",
    payload: data
  };
};