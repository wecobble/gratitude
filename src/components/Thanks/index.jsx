import React from "react";

class Thanks extends React.Component {
  render() {
    return (

      <React.Fragment>
              <div className="col-md-6">
                <div className="single-entry">
                  <div className="time">
                    <p>
                      <i className="fas fa-clock" /> {this.props.date}
                    </p>
                  </div>
                  <div className="quote">
                    <p> {this.props.message}</p>
                  </div>
                  <div className="transection-hash">
                    <p>{this.props.hash}</p>
                  </div>
                </div>
              </div>
      </React.Fragment>

    );
  }
}
export default Thanks;
