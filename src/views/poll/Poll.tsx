import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import "./Poll.scss";
import { toast, ToastContainer } from "react-toastify";
import { getPoll, Poll } from "src/api/PollAPI";
import PollInfo from "src/views/poll/PollOption";
import { Link } from "react-router-dom";



export default class poll extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			poll: {
				pollId: 0,
				title: "",
				options: []
			}
		}
	}

	componentDidMount() {
		const {
			match: { params }
		} = this.props;

		getPoll(params.pollId).then(res => {

			console.log(res.data);
			var temp = this.state.poll;
			temp.title = res.data[0].fields.title;



			// this.setState({
			// 	poll.title: res.data[0].fields.title
			// });
		}).catch(error => toast.warn(error.response));
	}


	render() {

		const AllPollOptions = this.state.poll.options.map(option => {
			return (
				<PollInfo pollInfo={option} onOptionClick={() => {
					window.location.assign("/reservation/" + option.id);
				}} />
			);
		});

		return (
			<div>
				<Header />
				<main>
					<div className="container h-100">
						<div className="row justify-content-center align-items-center main-height">
							<div className="col-md-9">
								<form className="py-3 px-5">
									<h1 className="center-text m-4">موضوع:{this.state.poll.title}</h1>
									<div>
										<table className="table table-hover">
											<thead className="thead-dark">
												<tr>
													<th scope="col">تاریخ</th>
													<th scope="col">زمان</th>
													<th scope="col">تعداد موافقان</th>
													<th scope="col">تعداد مخالفان</th>
													<th scope="col"> </th>
												</tr>
											</thead>
											<tbody>
												{AllPollOptions}
												<tr>
													<td>1</td>
													<td>1</td>
													<td>1</td>
													<td>1</td>
													<td>
														<Link to="/reservation/1">
															<button
																type="submit"
																className="submit-button"
															>
																ثبت
													</button>
														</Link>

													</td>
												</tr>
												<tr>
													<td>1</td>
													<td>1</td>
													<td>1</td>
													<td>1</td>
													<td>
														<button
															type="submit"
															className="submit-button">
															ثبت
													</button>
													</td>
												</tr>
											</tbody>
										</table>
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


interface Props {
	match: any;
}

interface State {
	poll: Poll;
}

