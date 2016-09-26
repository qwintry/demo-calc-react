import React, { Component } from 'react';
import {productItems} from '../data/product-items.js';  
import ProductContainer from './ProductContainer';
import Calculator from './Calculator';
import '../styles/App.css';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: productItems[0].weight,
            declCost: productItems[0].price       
        };
    }

    handleProductChange(product) {
        this.setState({
            'weight': product.weight,
            'declCost': product.price
        });   
    }

  render() {
    return (
      <div className="App">
        <ProductContainer onChangeCallback={this.handleProductChange.bind(this)} />
        <Calculator initialWeight={this.state.weight} initialDeclCost={this.state.declCost} initialCountry="RU" />
      </div>
    );
  }
}

export default App;
