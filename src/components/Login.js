import React from "react";

const Login = (props) => (
  <nav className="login">
    <h2>Connexion</h2>
    <p>
      Vous êtes le propriétaire ? Connectez-vous pour gérer votre inventaire.
    </p>
    <button className="facebook" onClick={props.authenticate}>
      Connexion avec Google
    </button>
  </nav>
);

export default Login;
