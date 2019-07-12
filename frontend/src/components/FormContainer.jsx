import React, { Component } from 'react';
import FormComponent from './FormComponent';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            type: null,
            date_purchased: null,
            expire: null,
            price: null,
            where_purchased: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefaults();

        fetch('/api/trackers', {
            method: 'POST',
            body: JSON.stringify(this.state)
        })
    }
    
    render() {
        return (
            <React.Fragment>
                <FormComponent state={this.state} onSubmit={this.onSubmit} onChange={this.onChange} />
            </React.Fragment>
        )
    }
}

export default FormContainer;