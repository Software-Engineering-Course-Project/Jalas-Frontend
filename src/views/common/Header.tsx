import React, { Component } from "react";
import "src/views/common/Header.scss";
import "src/scss/style.scss";
import logoUrl from "src/resources/img/logo_v1.png";
export default class Header extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<header>
				<div className="header">
					<div className="container header-hover">
						<div className="row justify-content-between align-items-center">
							<div id="logo" className="col-auto">
							<a href="/main"><img src={logoUrl} alt="jobonja-logo" /></a>
							</div>
							<nav className="col-auto">
								<div className="row align-items-center">
									<a
										href="/main"
										className="col-auto profile-link">
										حساب کاربری
									</a>
									<a className="profile-link" href="/main">
										<div className="col-auto">خروج</div>
									</a>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

interface Props {}
interface State {}
