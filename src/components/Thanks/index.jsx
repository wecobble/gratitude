import React from "react";

class Thanks extends React.Component {
  render() {
    return (

      <React.Fragment>
        <section className="top-entries-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="section-title">Todays top entries:</h1>
              </div>
            </div>

            <div className="row top-entry-wrapper">
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
            </div>
          </div>
        </section>
      </React.Fragment>

    );
  }
}
export default Thanks;
