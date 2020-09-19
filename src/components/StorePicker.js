import React from "react";
import { getFunName } from "../helpers";

/**
 * StorePicker Composant permettant de choisir un store
 */
class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = (evt) => {
    evt.preventDefault();
    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* Ceci est un commentaire */}
        <h2>Merci de choisir une boutique</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Nom de la boutique"
          defaultValue={getFunName()}
        />
        <button type="submit">Visiter la boutique</button>
      </form>
    );
  }
}

export default StorePicker;
