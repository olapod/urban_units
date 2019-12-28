import { action, computed, observable } from "mobx"
// import convert_urban_units from '../logic/UnitsContainer';
// import compare_databases from '../logic/DatabaseContainer';
// import get_summary from '../logic/SummaryContainer';
// import get_problem_units from '../logic/ProblemUnitsContainer';
import WebWorkerEnabler from './WebWorkerEnabler.js';
import WebWorker from './WebWorker.js';

class Store {
    constructor () {
        this.resetState()
    }

    @observable urban_units
    @observable database
    @observable summary
    @observable problem_units
    @observable loading
    @observable converted_units;

    @action resetState = () => {
        this.urban_units = [];
        this.database = [];
        this.summary = [];
        this.problem_units = [];
        this.converted_units = [];
        this.loading = false;
    };

    @action loadUrbanUnits = units => {
        this.urban_units = units;
    };

    @action loadDatabase = data => {
        this.database = data;
    };

    @action getAll = () => {
        this.loading = true;
        this.worker = new WebWorkerEnabler(WebWorker);
        this.worker.postMessage({urban_units: JSON.parse(JSON.stringify(this.urban_units)),
                                database: JSON.parse(JSON.stringify(this.database))})
        this.worker.addEventListener('message', (event) => {
            const { data } = event;
            this.summary = data.summary;
            this.problem_units = data.problem_units;
            this.converted_units = data.converted_units;
            this.loading = false;
          })

    };
};

const appStore = new Store();

export default appStore;


