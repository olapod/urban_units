import React from "react";
import { observer } from 'mobx-react';
import ErrorIcon from '@material-ui/icons/Error';

@observer
class Error extends React.Component {

    render() {
        return (
            <div className="DataLoadingContainer error">
                <ErrorIcon style={{ fill: 'red', fontSize: 80 }}/>
                <h3 className="error-title">Błąd. Coś poszło nie tak....</h3>
                <p>Prawdopodobnie wgrano zły format danych.</p>
                <div className='reset'>
                    <button onClick={this.props.AppStore.resetState} className='button_reset button error_button'>Spróbuj ponownie</button>
                </div>
            </div>
        )};

    };
export default Error;