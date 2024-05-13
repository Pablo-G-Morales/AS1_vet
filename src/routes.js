import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import ListaEspera from './ListaEspera';
import CitaItem from './CitaItem'; // Importa CitaItem sin llaves

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/lista-espera" component={ListaEspera} />
        <Route path="/historial" component={CitaItem} /> {/* Cambia la ruta de "/cita-form" a "/historial" */}
      </Switch>
    </Router>
  );
};

export default Routes;
