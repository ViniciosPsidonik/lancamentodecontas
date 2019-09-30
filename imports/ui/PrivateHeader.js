import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

export default class PrivateHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutButton: ''
    };
  }

  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      if (Meteor.userId()) {
        this.setState({
          logoutButton: <button onClick={() => Accounts.logout()} className="button btn waves-effect waves-light" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">Logout</button>
        })
      }
    });
  }

  componentWillUnmount() {
    this.tracker.stop();
  }

  render() {
    return (
      <nav className="blue-grey">
        <div className="nav-wrapper">
          <div className="header_content ">
            <Link className="brand-logo active" to="/">{this.props.title}</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.state.logoutButton ? this.state.logoutButton : undefined}
            </ul>
          </div>
        </div>
      </nav>
    )
  };
};

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired
};