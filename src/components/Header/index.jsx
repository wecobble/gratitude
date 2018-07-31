import React from "react";
import PropTypes from "prop-types";

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <header className="header-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3 col-6">
                <div className="logo">
                  <a href="https://nos.io/">Gratitude</a>
                </div>
              </div>

              <div className="col-md-9 col-6 text-right">
                <div className="quick-link">
                  <a href="https://nos.io/">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
