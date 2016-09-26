import React, { Component } from 'react';
import { Button, FormControl, InputGroup, FormGroup, ControlLabel, Checkbox } from 'react-bootstrap';
import spinner from '../images/spinner.svg';
import $ from 'jquery-ajax';
import {countries} from '../data/countries.js';  
import CalculatorResults from './CalculatorResults';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: props.initialWeight,
            country: props.initialCountry,
            shophelp: false,
            declCost: props.initialDeclCost,
            insurance: false,
            shippingResults: [],
            ajaxRunning: false
        };
    }

    handleWeightChange(event) {
        this.setState({weight: parseFloat(event.target.value) }, this.makeCalcRequest);
    }

    handleCountryChange(event) {
        this.setState({country: event.target.value }, this.makeCalcRequest);
    }

    componentWillReceiveProps(nextProps) {
        this.setState( {
            'weight': nextProps.initialWeight,
            'declCost': nextProps.initialDeclCost
        }, this.makeCalcRequest );
       // this.makeCalcRequest();
    }

    makeCalcRequest(params) {
        this.setState({ajaxRunning: true});
        if (this.ajaxRequest) {
            this.ajaxRequest.abort();
            this.ajaxRequest = false;
        }
        var req = $.post('https://qwintry.com/ru/api-rest/v2/calculator', {
            'key': '9e4fddbb3adc4c67f74bb2b7757cebf9',
            'weight': this.state.weight,
            'weight_type': 'kg',
            'insurance_type': this.state.insurance ? 'gg' : 'no',
            'declaration_total': this.state.declCost,
            'country': this.state.country,
            'city': this.state.city,
            'shophelp': this.state.shophelp ? 1 : 0,
            'shophelp_safe_addr': true
        }, {'dataType':'jsonp'})
        .done((data) => {
            this.setState({shippingResults: data.data, ajaxRunning: false});
        })
        .always(() => {
            //this.setState({ajaxRunning: false});
        });

        this.ajaxRequest = req;
    }

    handleSubmit() {
        this.makeCalcRequest();
    }

    handleShophelpChange(event) {
        this.setState({shophelp: event.target.checked}, this.makeCalcRequest);
    }

    handleInsuranceChange(event) {
        this.setState({insurance: event.target.checked}, this.makeCalcRequest);
    }

    handleDeclCostChange(event) {
        this.setState({declCost: event.target.value}, this.makeCalcRequest);
    }

    componentDidMount() {
      this.makeCalcRequest();
    }

    

    render() {

        return (
            <div className="calc-container row">
                <div className="calc-form col-md-6 col-md-offset-2">
                    <FormGroup>
                        <ControlLabel>Shipment Weight</ControlLabel>
                        <InputGroup>
                            <FormControl type="text" name="weight" onChange={this.handleWeightChange.bind(this)} value={this.state.weight} />
                            <InputGroup.Addon>kg</InputGroup.Addon> 
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Country</ControlLabel>
                        <FormControl componentClass="select" name="country" onChange={this.handleCountryChange.bind(this)} value={this.state.country}>
                            <option value="">--Please select country--</option>
                            { $.map(countries, (item, key) => {
                                return (<option key={key} value={key}>{item.name}</option>)
                            }) }
                            
                        </FormControl>
                    </FormGroup>
                    
                    <FormGroup>
                        <ControlLabel>Items Cost</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>$</InputGroup.Addon> 
                            <FormControl type="text" name="declCost" value={this.state.declCost} onChange={this.handleDeclCostChange.bind(this)} />
                        </InputGroup>
                    </FormGroup>

                    <Checkbox name="shophelp" value={this.state.shophelp} onChange={this.handleShophelpChange.bind(this)   }> Shopping help? </Checkbox>
                    <Checkbox name="insurance" value={this.state.insurance} onChange={this.handleInsuranceChange.bind(this)   } > Insurance </Checkbox>
                    
                    <Button bsStyle="success" onClick={this.handleSubmit.bind(this)}>{this.state.ajaxRunning ? 'Calculating...' : 'Calculate'}</Button>
                    <img alt="Spinner" width="30" style={{'display': this.state.ajaxRunning ? 'block' : 'none'}} src={spinner} />
                    <br />

                    
                </div>
                <div className="clearfix" />
                <div className="clearfix col-md-6 col-md-offset-2" style={{'display': this.state.ajaxRunning ? 'none' : 'block'}}>
                <CalculatorResults shippingResults={this.state.shippingResults} shophelp={this.state.shophelp} declCost={this.state.declCost} country={this.state.country} />
                </div>
            </div>


            
        );
    }

    propTypes: {
        initialWeight: propTypes.decimal,
        initialDeclCost: propTypes.decimal
    }
}

export default Calculator;