import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Rolling from '../layout/loading/Rolling';

class Clients extends Component {
  state = {
    totalOwed: null
  };
  // static methods are not bound to class instance and have no bound 'this'
  // static methods are often used as helper functions
  // called whenever the component is updated with props as an argument and
  // should return an object to be used as state or null to update nothing
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      // add balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalOwed: total };
    }
    return null;
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    if (clients) {
      return (
        <div className="card shadow mt">
          <div className="card-header d-flex justify-content-between">
            <h3 className="align-self-end">
              <i className="fas fa-users" /> Clients
            </h3>
            <h4 className="text-right align-self-end">
              Total Owed:{' '}
              <span className="text-danger">
                ${parseFloat(totalOwed).toFixed(2)}
              </span>
            </h4>
            <h3>
              <Link to="/client/add" className="btn shadow btn-success">
                Add Client
              </Link>
            </h3>
          </div>

          <table className="clients table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Rolling />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
