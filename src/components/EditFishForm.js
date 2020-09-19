import React from "react";

class EditFishForm extends React.Component {
  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    const fish = { ...this.props.fish };
    fish[name] = value;

    this.props.updateFish(this.props.index, fish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={this.props.fish.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Prix"
          value={this.props.fish.price}
          onChange={this.handleChange}
        />
        <select
          name="status"
          ref={this.statusRef}
          value={this.props.fish.status}
          onChange={this.handleChange}
        >
          <option value="available">Disponible</option>
          <option value="unavailable">Indisponible</option>
        </select>
        <textarea
          type="text"
          name="desc"
          placeholder="Description"
          value={this.props.fish.desc}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image"
          value={this.props.fish.image}
          onChange={this.handleChange}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Supprimer
        </button>
      </div>
    );
  }
}

export default EditFishForm;
