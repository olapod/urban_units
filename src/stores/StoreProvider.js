import React from "react";
import StoreContext from './StoreContext';
import { useLocalStore } from "mobx-react";
import convert_urban_units from '../logic/UnitsContainer';
import compare_databases from '../logic/DatabaseContainer';
import get_summary from '../logic/SummaryContainer';
import get_problem_units from '../logic/ProblemUnitsContainer';


const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    urban_units: [],
     database: [],
     summary: [],
     problem_units: [],
     loading: false,
     converted_units: [],
     compared_database: [],
     initialState: { ...store},

     loadUrbanUnits: units => {
        store.urban_units = units;
        store.convertUnits;
     },
    loadDatabase: data => {
        store.database = data
    },

    convertUnits: () => {
        store.converted_units = convert_urban_units(store.urban_units)
    },

    getDataBase: () => {
        store.compared_database = compare_databases(store.database, store.converted_units)
    },

    getProblemUnits: () => {
        store.problem_units = get_problem_units(store.compared_database)
    },

    showSpinner: () => {
        store.loading = true
    },

    hideSpinner: () => {
        store.loading = false
    },

    getSummary: () => {
        store.showSpinner;
        store.getDataBase;
        store.summary = get_summary(store.compared_database);
        store.getProblemUnits;
        store.hideSpinner;
    },

    resetHandler: () => {
        store.initialState;
    }

  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};


export default StoreProvider;



