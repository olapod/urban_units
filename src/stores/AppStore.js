import { action, computed, observable } from "mobx"
import convert_urban_units from '../logic/UnitsContainer';
import compare_databases from '../logic/DatabaseContainer';
import get_summary from '../logic/SummaryContainer';
import get_problem_units from '../logic/ProblemUnitsContainer';

class AppStore {
    @observable urban_units = [];
    @observable database = [];
    @observable summary = [];
    @observable problem_units = [];
    @observable loading = false;
    @observable converted_units = []
    @observable compared_database = [];
    @observable initialState = { ...this }

    @action loadUrbanUnits = units => {
        this.urban_units = units;
        this.convertUnits();
    };

    @action loadDatabase = data => {
        this.database = data;
    };

    @action convertUnits() {
        this.converted_units = convert_urban_units(this.urban_units)
    }

    @action getDataBase() {
        this.compared_database = compare_databases(this.database, this.converted_units)
    };

    @action getProblemUnits() {
        this.problem_units = get_problem_units(this.compared_database)
    };

    @action getSummary() {
        this.loading = true;
        this.getDataBase();
        this.summary = get_summary(this.compared_database);
        this.getProblemUnits();
        this.loading = false;
    };

    @action resetHandler() {
        this.initialState;
    };
}
export default AppStore



