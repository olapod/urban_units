import React from "react";
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';

@observer
class Error extends React.Component {

    render() {
        return (
            <div className="error">
                <ErrorIcon style={{ fill: 'red', fontSize: 80 }}/>
                <h4 className="error-title">Błąd. Coś poszło nie tak....</h4>
                <p>Prawdopodobnie wgrano zły format danych.</p>
                <div className='reset'>
                    <Button className='reset_button' onClick={this.props.appStore.resetState} variant="contained" color="primary" component="span" size="large">Spróbuj ponownie</Button>
                </div>
            </div>
        )};

    };
export default Error;