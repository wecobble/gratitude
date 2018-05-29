import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import NOSActions from "./../../components/NOSActions";
import  "./../../assets/app.css";

const styles = {
  "@import": "https://fonts.googleapis.com/css?family=Nunito:400,600,700|Roboto:300,400,500,700",

};

const App = () => (
  <div>

    <header class="header-section">
      <div class="container">
        <div class="row align-items-center">

          <div class="col-md-3 col-6">
            <div class="logo">
              <a href="#">Gratitude</a>
            </div>
          </div>


          <div class="col-md-9 col-6 text-right">
            <div class="quick-link">
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="hero-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">

            <div class="hero-text">
              <h1 class="hero-title">What are you thankful for today?</h1>
              <div class="hero-input-box-wrapper">

                <div class="input-form">
                  <form class="hero-form">
                    <input type="text" placeholder="I proposed. She said Yes!"/>
                  </form>
                </div>

                <div class="submit-wrapper">
                  <p>Deliver your message for only a drop of GAS</p>
                  <NOSActions/>
                  <a href="#" class="btn-common">send</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="top-entries-section">
      <div class="container">

        <div class="row">
          <div class="col-md-12">
            <h1 class="section-title">Todays top entries:</h1>
          </div>
        </div>


        <div class="row top-entry-wrapper">

          <div class="col-md-6">
            <div class="single-entry">
              <div class="time">
                <p><i class="fas fa-clock"></i> 15:43</p>
              </div>
              <div class="quote">
                <p>Got my first job as a developer! I am so excited today.</p>
              </div>
              <div class="name">
                <p>- John Doe</p>
              </div>
              <div class="transection-hash">
                <p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="single-entry">
              <div class="time">
                <p><i class="fas fa-clock"></i> 15:43</p>
              </div>
              <div class="quote">
                <p>Got my first job as a developer! I am so excited today.</p>
              </div>
              <div class="name">
                <p>- John Doe</p>
              </div>
              <div class="transection-hash">
                <p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="single-entry">
              <div class="time">
                <p><i class="fas fa-clock"></i> 15:43</p>
              </div>
              <div class="quote">
                <p>Got my first job as a developer! I am so excited today.</p>
              </div>
              <div class="name">
                <p>- John Doe</p>
              </div>
              <div class="transection-hash">
                <p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="single-entry">
              <div class="time">
                <p><i class="fas fa-clock"></i> 15:43</p>
              </div>
              <div class="quote">
                <p>Got my first job as a developer! I am so excited today.</p>
              </div>
              <div class="name">
                <p>- John Doe</p>
              </div>
              <div class="transection-hash">
                <p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="single-entry">
              <div class="time">
                <p><i class="fas fa-clock"></i> 15:43</p>
              </div>
              <div class="quote">
                <p>Got my first job as a developer! I am so excited today.</p>
              </div>
              <div class="name">
                <p>- John Doe</p>
              </div>
              <div class="transection-hash">
                <p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="single-entry">
              <div class="time">
                <p><i class="fas fa-clock"></i> 15:43</p>
              </div>
              <div class="quote">
                <p>Got my first job as a developer! I am so excited today.</p>
              </div>
              <div class="name">
                <p>- John Doe</p>
              </div>
              <div class="transection-hash">
                <p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="single-entry">
              <div class="time">
                <p><i class="fas fa-clock"></i> 15:43</p>
              </div>
              <div class="quote">
                <p>Got my first job as a developer! I am so excited today.</p>
              </div>
              <div class="name">
                <p>- John Doe</p>
              </div>
              <div class="transection-hash">
                <p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="single-entry">
              <div class="time">
                <p><i class="fas fa-clock"></i> 15:43</p>
              </div>
              <div class="quote">
                <p>Got my first job as a developer! I am so excited today.</p>
              </div>
              <div class="name">
                <p>- John Doe</p>
              </div>
              <div class="transection-hash">
                <p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="single-entry">
              <div class="time">
                <p><i class="fas fa-clock"></i> 15:43</p>
              </div>
              <div class="quote">
                <p>Got my first job as a developer! I am so excited today.</p>
              </div>
              <div class="name">
                <p>- John Doe</p>
              </div>
              <div class="transection-hash">
                <p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="single-entry">
              <div class="time">
                <p><i class="fas fa-clock"></i> 15:43</p>
              </div>
              <div class="quote">
                <p>Got my first job as a developer! I am so excited today.</p>
              </div>
              <div class="name">
                <p>- John Doe</p>
              </div>
              <div class="transection-hash">
                <p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>


  </div>
);



export default(App);
