import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import NOSActions from "./../../components/NOSActions";
import "./../../assets/app.css";

const styles = {
	"@import": "https://fonts.googleapis.com/css?family=Nunito:400,600,700|Roboto:300,400,500,700"
};

const App = () => (
	<div>
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
									<NOSActions />
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
									<i className="fas fa-clock" /> 15:43
								</p>
							</div>
							<div className="quote">
								<p>Got my first job as a developer! I am so excited today.</p>
							</div>
							<div className="name">
								<p>- John Doe</p>
							</div>
							<div className="transection-hash">
								<p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="single-entry">
							<div className="time">
								<p>
									<i className="fas fa-clock" /> 15:43
								</p>
							</div>
							<div className="quote">
								<p>Got my first job as a developer! I am so excited today.</p>
							</div>
							<div className="name">
								<p>- John Doe</p>
							</div>
							<div className="transection-hash">
								<p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="single-entry">
							<div className="time">
								<p>
									<i className="fas fa-clock" /> 15:43
								</p>
							</div>
							<div className="quote">
								<p>Got my first job as a developer! I am so excited today.</p>
							</div>
							<div className="name">
								<p>- John Doe</p>
							</div>
							<div className="transection-hash">
								<p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="single-entry">
							<div className="time">
								<p>
									<i className="fas fa-clock" /> 15:43
								</p>
							</div>
							<div className="quote">
								<p>Got my first job as a developer! I am so excited today.</p>
							</div>
							<div className="name">
								<p>- John Doe</p>
							</div>
							<div className="transection-hash">
								<p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="single-entry">
							<div className="time">
								<p>
									<i className="fas fa-clock" /> 15:43
								</p>
							</div>
							<div className="quote">
								<p>Got my first job as a developer! I am so excited today.</p>
							</div>
							<div className="name">
								<p>- John Doe</p>
							</div>
							<div className="transection-hash">
								<p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="single-entry">
							<div className="time">
								<p>
									<i className="fas fa-clock" /> 15:43
								</p>
							</div>
							<div className="quote">
								<p>Got my first job as a developer! I am so excited today.</p>
							</div>
							<div className="name">
								<p>- John Doe</p>
							</div>
							<div className="transection-hash">
								<p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="single-entry">
							<div className="time">
								<p>
									<i className="fas fa-clock" /> 15:43
								</p>
							</div>
							<div className="quote">
								<p>Got my first job as a developer! I am so excited today.</p>
							</div>
							<div className="name">
								<p>- John Doe</p>
							</div>
							<div className="transection-hash">
								<p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="single-entry">
							<div className="time">
								<p>
									<i className="fas fa-clock" /> 15:43
								</p>
							</div>
							<div className="quote">
								<p>Got my first job as a developer! I am so excited today.</p>
							</div>
							<div className="name">
								<p>- John Doe</p>
							</div>
							<div className="transection-hash">
								<p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="single-entry">
							<div className="time">
								<p>
									<i className="fas fa-clock" /> 15:43
								</p>
							</div>
							<div className="quote">
								<p>Got my first job as a developer! I am so excited today.</p>
							</div>
							<div className="name">
								<p>- John Doe</p>
							</div>
							<div className="transection-hash">
								<p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="single-entry">
							<div className="time">
								<p>
									<i className="fas fa-clock" /> 15:43
								</p>
							</div>
							<div className="quote">
								<p>Got my first job as a developer! I am so excited today.</p>
							</div>
							<div className="name">
								<p>- John Doe</p>
							</div>
							<div className="transection-hash">
								<p>Hash: 47542AH746278458274rgyiw57t87tw8r787QK</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
);

export default App;
