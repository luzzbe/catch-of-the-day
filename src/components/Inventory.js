import React from "react";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import { base, firebaseApp } from "../base";

class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authenticate = () => {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  authHandler = async (authData) => {
    const store = await base.fetch(this.props.storeId, { context: this });
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Déconnexion</button>;

    // Check if the user is logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // Check if the user is the owner
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Désolé mais vous n'êtes pas le propriétaire.</p>
          {logout}
        </div>
      );
    }

    return (
      <div className="inventory">
        <h2>Inventaire</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Charger des échantillons de poissons
        </button>
      </div>
    );
  }
}

export default Inventory;
