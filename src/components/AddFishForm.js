import React from "react";

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (event) => {
    event.preventDefault();
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value), // Store money in cents
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };

    this.props.addFish(fish);
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input
          name="name"
          type="text"
          placeholder="Nom"
          ref={this.nameRef}
          required="required"
        ></input>
        <input
          name="price"
          type="number"
          placeholder="Prix"
          ref={this.priceRef}
          required="required"
        ></input>
        <select name="status" ref={this.statusRef}>
          <option value="available">Disponible</option>
          <option value="unavailable">Indisponible</option>
        </select>
        <textarea
          name="desc"
          type="text"
          placeholder="Description"
          ref={this.descRef}
          required="required"
        ></textarea>
        <input
          name="image"
          type="text"
          placeholder="Image"
          ref={this.imageRef}
          required="required"
        ></input>
        <button type="submit">Ajouter</button>
      </form>
    );
  }
}

export default AddFishForm;
