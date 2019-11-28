import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import "./Main.scss";
import { toast, ToastContainer } from "react-toastify";

export default class Register extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { 
			password: "",
			password_confirm: "",
			username: "",
			firstname: "",
			lastname: "",
			bio: "",
			jobTitle: "",
			profileImgUrl:""
		}		
	}

	handleInputChange = (event: any) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name]: value
		} as any);
	};

	render() {
		return (
			<div>
				<Header />
				<main>
					<div className="container h-100">
						<div className="row justify-content-center align-items-center main-height">
							<div className="col-md-9">
								<form
									className="register-form py-3 px-5">
									<h1 className="center-text">موضوع: جلسه شماره یک</h1>
									<hr />
									<div className="row">
										<div className="col-md-6">
											<label>
												<b>نام</b>
											</label>
											<input
												type="text"
												className="text-box"
												placeholder="نام خود را وارد کنید"
												name="firstname"
												onChange={this.handleInputChange}
												required
											/>
										</div>
										<div className="col-md-6">
											<label>
												<b>نام خانوادگی</b>
											</label>
											<input
												type="text"
												className="text-box"
												placeholder="نام خانوادگی وارد کنید"
												name="lastname"
												onChange={this.handleInputChange}
												required
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<label>
												<b>نام کاربری</b>
											</label>
											<input
												type="text"
												className="text-box right-placeholder"
												placeholder="نام کاربری وارد کنید"
												name="username"
												onChange={this.handleInputChange}
												required
											/>
										</div>
										<div className="col-md-6">
											<label>
												<b>بیو</b>
											</label>
											<input
												type="text"
												className="text-box"
												placeholder="توضیح کوتاه در مورد خودت"
												name="bio"
												onChange={this.handleInputChange}
												required
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6">
											<label>
												<b>عنوان شغلی</b>
											</label>
											<input
												type="text"
												className="text-box"
												placeholder="عنوان شغل تا حد ممکن فارسی"
												name="jobTitle"
												onChange={this.handleInputChange}
												required
											/>
										</div>
										<div className="col-md-6">
											<label>
												<b>عکس پروفایل</b>
											</label>
											<input
												type="url"
												className="text-box right-placeholder"
												placeholder="لینک عکس پروفایل"
												name="profileImgUrl"
												onChange={this.handleInputChange}
												required
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6">
											<label>
												<b>رمز عبور</b>
											</label>
											<input
												type="password"
												className="text-box"
												placeholder="رمز وارد کنید"
												name="password"
												onChange={this.handleInputChange}
												required
											/>
										</div>
										<div className="col-md-6">
											<label>
												<b>تکرار رمز عبور</b>
											</label>
											<input
												type="password"
												className="text-box"
												placeholder="تکرار رمز وارد کنید"
												onChange={this.handleInputChange}
												name="password_confirm"
												required
											/>
										</div>
									</div>
									<div className="row justify-content-center">
										<div className="col-sm-4">
											<button
												type="submit"
												className="signupbtn register-button">
												ثبت 
											</button>
										</div>
									</div>
									
								</form>
							</div>
						</div>
					</div>
				</main>
				<Footer />
				<ToastContainer />
			</div>
		);
	}
}

interface State {}
interface Props {}
