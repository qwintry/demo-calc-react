import { Tabs, Tab } from 'react-bootstrap';
import {countries} from '../data/countries.js';  
import React, { Component } from 'react';
import classnames from 'classnames';

class CalculatorResults extends Component {
    render() {

        return (
            <Tabs id="results">
                {this.props.shippingResults.map((item) => {
                    var key = Object.keys(item)[0];
                    var pr = item[key];
                    var total = pr.total

                    var payment_gateway_fee = pr.payment_gateway_fee;

                    var notice = "You pay this amount in store so it is not included in final total paid to Qwintry";

                    if (this.props.shophelp) {
                        var goodsPaymentGatewayFee = (this.props.declCost * 0.032) + 0.3;

                        payment_gateway_fee = parseFloat(pr.payment_gateway_fee) + parseFloat(goodsPaymentGatewayFee);
                        total = parseFloat(pr.total) + parseFloat(this.props.declCost) + goodsPaymentGatewayFee;

                        notice = "With Shophelp, You pay this amount to Qwintry";
                        
                    }

                    var x = this.props.declCost;
                    var customsFees = eval(countries[this.props.country].customsFormula);
                    if (customsFees < 0) {
                        customsFees = 0;
                    }

                    total += customsFees;

                    return <Tab eventKey={key} title={pr.method + ': $' + pr.total} key={key}>

                        <h2>{pr.method}</h2>
                        <div className={classnames( { 'text-muted': !this.props.shophelp } )}>Product Price: ${this.props.declCost} <span className="text-muted">({notice})</span></div>
                        Customs fees to {this.props.country}: ${customsFees.toFixed(2)} <span className="text-muted">({countries[this.props.country].customsInfo})</span><br />
                        Shipping: ${pr.shipping_cost}<br />
                        Packing: ${pr.packing}<br />
                        Insurance: ${pr.insurance}<br />
                        Shophelp Service: ${pr.shophelp}<br />
                        Payment Gateway Fee: ${payment_gateway_fee.toFixed(2)}<br />
                        Total: ${total.toFixed(2)}<br />

                    </Tab>;
                })}
            </Tabs>
        );
    }

    propTypes: {
        shippingResults: propTypes.array.required,
        shophelp: propTypes.bool.required,
        declCost: propTypes.decimal.required,
        country: propTypes.string.required
    }
}

export default CalculatorResults;