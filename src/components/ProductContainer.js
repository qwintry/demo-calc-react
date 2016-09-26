import {productItems} from '../data/product-items.js';
import React, { Component } from 'react';
import classnames from 'classnames';

class ProductContainer extends Component {
    constructor(props) {
        super(props);
       // this.toggleTimedComments = this.toggleTimedComments.bind(this);
        this.state = {
            activeItem: productItems[0]
        };
    }

  componentDidMount() {
      //console.log(productItems);
  }

  handleClick(item) {
    //console.log(item);
    this.setState({'activeItem': item});
    this.props.onChangeCallback(item)
  }

  render() {
    return (
        
          <div className="products-container row">
            {productItems.map((item, i) => {

                var itemClass = classnames(['col-md-2', 'product-item'], {
                    'selected': (this.state.activeItem === item)
                });


                return <div className={itemClass} onClick={this.handleClick.bind(this, item)} key={i}>
                    { item.name } ({item.weight}kg)
                    <div className="product-price"><span>From</span> ${item.price}</div>
                </div>
            })}
          </div>
    );
  }
}


export default ProductContainer;