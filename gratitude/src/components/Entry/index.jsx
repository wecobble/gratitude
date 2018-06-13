import React from "react";

class Entry extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="hero-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="hero-text">
                  <h1 className="hero-title">What are you thankful for today?</h1>
                  <div className="hero-input-box-wrapper">
                    <div className="input-form">
                      <form className="hero-form">
                        <input type="text" placeholder="I proposed. She said Yes!" />
                      </form>
                    </div>

                    <div className="submit-wrapper">
                      <p>Deliver your message for only a drop of GAS</p>

                      <a href="https://nos.io/" className="btn-common">
                        send
                      </a>
                    </div>
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

export default Entry;
