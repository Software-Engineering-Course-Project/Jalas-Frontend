import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import "./Poll.scss";
import { toast, ToastContainer } from "react-toastify";
import { getPoll, Poll, getOptions, PollOption } from "src/api/PollAPI";
import PollInfo from "src/views/poll/PollOption";
import { Link } from "react-router-dom";
import { number } from "prop-types";



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
			var pollTemp = this.state.poll;
			pollTemp.title = res.data[0].fields.title;
			pollTemp.pollId = res.data[0].fields.meeting;
			getOptions(params.pollId).then(optRes => {
				for (var i = 0; i < optRes.data.length ; i++) {
					pollTemp.options.push({
						id: optRes.data[i].pk,
						start: {
							date: optRes.data[i].fields.date,
							time:optRes.data[i].fields.startTime
						},
						end: {
							date: optRes.data[i].fields.date,
							time:optRes.data[i].fields.endTime
						},
						agreed: optRes.data[i].fields.agree,
						disagreed: optRes.data[i].fields.disagree
					});
				}
				this.setState({
					poll: pollTemp
				});
			}).catch(error => toast.warn(error.response));
		}).catch(error => {toast.warn(error.response.data);});
	}


	render() {

		const AllPollOptions = this.state.poll.options.map(option => {
			return (
				<PollInfo pollInfo={option} pollID={this.state.poll.pollId} />
			);
		});
		console.log(this.state.poll.options);
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
													<th scope="col">زمان شروع</th>
													<th scope="col">زمان پایان</th>
													<th scope="col">تعداد موافقان</th>
													<th scope="col">تعداد مخالفان</th>
													<th scope="col"> </th>
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


interface Props {
	match: any;
}

interface State {
	poll: Poll;
}
