import React from "react";
import { observer } from 'mobx-react';
@observer
class Error extends React.Component {

    render() {
        return (
            <div className="DataLoadingContainer error">
                <h3 className="error-title">Błąd. Coś poszło nie tak....</h3>
                <div className='reset'>
                    <button onClick={this.props.AppStore.resetState} className='button_reset button'>Spróbuj ponownie</button>
                </div>
            </div>
        )};

    };
export default Error;