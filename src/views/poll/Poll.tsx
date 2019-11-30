import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import "./Poll.scss";
import { toast, ToastContainer } from "react-toastify";
import { getPoll, Poll } from "src/api/PollAPI";
import PollInfo from "src/views/poll/PollOption";



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

	// componentDidMount() {
	// 	getPoll(this.state.poll.pollId).then(res => {
	// 		this.setState({
	// 			poll: res.data
	// 		});
	// 	}).catch(error => toast.warn(error.response.data));
	// }


	render() {

		const AllPollOptions = this.state.poll.options.map(option => {
			return (
				<PollInfo pollInfo={option} onOptionClick={() => {

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
												</tr>
											</thead>
											<tbody>
												{AllPollOptions}
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


interface Props {}

interface State {
	poll: Poll;
}

