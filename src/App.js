import React, { Component } from 'react';
import Header from './components/header.js'

if (process.env.BROWSER || process.browser) { require('./App.css'); }

let ingredients = {
  coffee  : 0.75  ,
  decafCoffee : 0.75,
  sugar : 0.25,
  cream : 0.25,
  steamedMilk  : 0.35,
  foamedMilk   : 0.35,
  espresso: 1.1,
  cocoa : 0.9,
  whippedCream : 1,
}

let drinkRecipes = {
  Coffee: {
    coffee: 3,
    sugar: 1,
    cream: 1,
  },
  Decaf_Coffee: {
    decafCoffee: 3,
    sugar: 1,
    cream: 1,
  },
  Caffe_Latte: {
    steamedMilk: 1,
    espresso: 2,
  },
  Caffe_Americano: {
    espresso: 3,
  },
  Caffe_Mocha: {
    steamedMilk: 1,
    espresso: 1,
    cocoa: 1,
    whippedCream: 1,
  },
  Cappuccino: {
    steamedMilk: 1,
    foamedMilk: 1,
    espresso: 2,
  },
};

function formatMenuItem(menuItem) {
  return menuItem.split('_').join(' ');
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockIngredientsUnits: {
        coffee: 10,
        decafCoffee: 10,
        sugar: 10,
        cream: 10,
        steamedMilk: 10,
        foamedMilk: 10,
        espresso: 10,
        cocoa: 10,
        whippedCream: 10,
      },
      menuItems: {
        Coffee: 'Coffee',
        Decaf_Coffee: 'Decaf_Coffee',
        Caffe_Latte: 'Caffe_Latte',
        Caffe_Americano: 'Caffe_Americano',
        Caffe_Mocha: 'Caffe_Mocha',
        Cappuccino: 'Cappuccino',
      },
      drinkRecipes: {
        Coffee: {
          coffee: 3,
          sugar: 1,
          cream: 1,
        },
        Decaf_Coffee: {
          decafCoffee: 3,
          sugar: 1,
          cream: 1,
        },
        Caffe_Latte: {
          steamedMilk: 1,
          espresso: 2,
        },
        Caffe_Americano: {
          espresso: 3,
        },
        Caffe_Mocha: {
          steamedMilk: 1,
          espresso: 1,
          cocoa: 1,
          whippedCream: 1,
        },
        Cappuccino: {
          steamedMilk: 1,
          foamedMilk: 1,
          espresso: 2,
        },
      },
      menuItemInStock: {
        Coffee: true,
        Decaf_Coffee: true,
        Caffe_Latte: true,
        Caffe_Americano: true,
        Caffe_Mocha: true,
        Cappuccino: true,
      },

    };
    this.handleClick = this.handleClick.bind(this);
    this.restock = this.restock.bind(this);
    this.checkInStock = this.checkInStock.bind(this);
    this.orderDrink = this.orderDrink.bind(this);
    this.getPrice = this.getPrice.bind(this);
  }

  handleClick() {
    this.restock();
  }

  restock() {
    this.setState((state, props) => {
      let restockedIngredients = {};
      let menuItemRestocked = {};
      for (let ingredient in this.state.stockIngredientsUnits) {
        restockedIngredients[ingredient] = 10;
      }
      for (let menuItem in this.state.menuItemInStock) {
        menuItemRestocked[menuItem] = true;
      }
      return {stockIngredientsUnits: restockedIngredients, menuItemInStock : menuItemRestocked};
    });
  }

  checkInStock(menuItem) {

  }

  orderDrink (menuItem) {
    let drinkRecipes = this.state.drinkRecipes;
    let stockIngredientsUnits = this.state.stockIngredientsUnits;
    let newStockedIngredientUnits = stockIngredientsUnits;
    for (let drinkIngredient in drinkRecipes[menuItem]){
      newStockedIngredientUnits[drinkIngredient] = stockIngredientsUnits[drinkIngredient] - drinkRecipes[menuItem][drinkIngredient];
    }
    this.setState({stockIngredientsUnits: newStockedIngredientUnits});
  }

  getPrice (menuItem) {
    let drinkRecipes = this.state.drinkRecipes;
    let value = 0;
    for (let drinkIngredient in drinkRecipes[menuItem]){
      value = value + (drinkRecipes[menuItem][drinkIngredient] * ingredients[drinkIngredient]);
    }
    let price = '$' + value.toFixed(2);
    return price;
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Header handleClick={this.handleClick}/>
        <h1>{this.state.count}</h1>
        {Object.keys(this.state.menuItems).sort().map((menuItem, i) => {
          return(
            <div key={i+1} className="menu-item">
              <h5>{i+1}</h5>
              <h5>{formatMenuItem(menuItem)}</h5>
              <h5>{this.getPrice(menuItem)}</h5>
              {this.state.menuItemInStock[menuItem] ? <h5>In Stock</h5> : <h5>Out of Stock</h5>}
              {this.state.menuItemInStock[menuItem] ? <h5 onClick={() => this.orderDrink(menuItem)}>Order</h5> : null}
            </div>
          )
        })}
        {Object.keys(this.state.stockIngredientsUnits).sort().map((ingredient, i)=>{
          console.log(ingredient)
          return (
            <div key={i+1}>
              <h6>{ingredient +' '+ this.state.stockIngredientsUnits[ingredient]}</h6>
            </div>
          )
        })}

      </div>
    );
  }
}

