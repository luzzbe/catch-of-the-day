import React from "react";
import { base } from "../base";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";

import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const storeId = this.props.match.params.storeId;
    const localStorageRef = localStorage.getItem(storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    const storeId = this.props.match.params.storeId;
    localStorage.setItem(storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes,
    });
  };

  updateFish = (key, fish) => {
    // Copy the state
    const fishes = { ...this.state.fishes };
    // Update the fish
    fishes[key] = fish;
    // Update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  deleteFromOrder = (key) => {
    const order = { ...this.state.order };
    // Si la quantité est supérieur à 1, -1
    if (order[key] && order[key] > 1) {
      order[key] = order[key] - 1;
      // Sinon on supprime le poisson de la commande
    } else {
      delete order[key];
    }

    this.setState({ order });
  };

  deleteFish = (key) => {
    // Copy the state
    const fishes = { ...this.state.fishes };
    // Remove the fish by setting it to null
    fishes[key] = null;
    // Update state
    this.setState({ fishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFromOrder={this.deleteFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
