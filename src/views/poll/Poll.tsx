import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import "./Poll.scss";
import { toast, ToastContainer } from "react-toastify";
import { getPoll, Poll, getOptions, PollOption, closePoll } from "src/api/PollAPI";
import PollInfo from "src/views/poll/PollOption";
import CommentBox from "src/views/comment/Comment";
import { Link } from "react-router-dom";


export default class poll extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			poll: {
				pollId: 0,
				title: "",
				options: []
			},
			pollId: 0,
			state: false,
			status: false
		}
	}

	componentDidMount() {
		const {
			match: { params }
		} = this.props;

		this.setState({
			pollId: params.pollId
		})

		getPoll(params.pollId).then(res => {
			var pollTemp = this.state.poll;
			pollTemp.title = res.data[0].fields.title;
			pollTemp.pollId = res.data[0].fields.meeting;
			this.setState({
				state: res.data[0].fields.state,
				status: res.data[0].fields.status
			})
			getOptions(params.pollId).then(optRes => {
				for (var i = 0; i < optRes.data.length; i++) {

					pollTemp.options.push({
						id: optRes.data[i].pk,
						start: {
							date: optRes.data[i].fields.date,
							time: optRes.data[i].fields.startTime
						},
						end: {
							date: optRes.data[i].fields.date,
							time: optRes.data[i].fields.endTime
						},
						agreed: optRes.data[i].fields.agree,
						disagreed: optRes.data[i].fields.disagree,
						if_needed: optRes.data[i].fields.if_needed
					});
				}
				this.setState({
					poll: pollTemp
				});
			}).catch(error => toast.warn(error.response));
		}).catch(error => { toast.warn(error.response); });
	}

	closePoll = ()=>{
		closePoll(this.state.pollId).then((res) =>
			toast.success('نظرسنجی با موفقیت بسته شد.')
		)
	}


	render() {

		const AllPollOptions = this.state.poll.options.map(option => {
			return (
				<PollInfo status={this.state.state} pollInfo={option} pollID={this.state.poll.pollId} />
			);
		});
		return (
			<div>
				<Header isUserLoggedIn={true} />
				<main>
					<div className="container h-100">
						<div className="row justify-content-center align-items-center main-height">
							<div className="col-md-12">
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
													<th scope="col">در صورت نیاز</th>
													<th scope="col"> </th>
												</tr>
											</thead>
											<tbody>
												{AllPollOptions}
											</tbody>
										</table>
									</div>
									<div>
										<div>
											<div className="col-4 center">
												{this.state.state ? (
													<Link to={"/mymeeting"}>
														<button
															type="submit"
															className="click-button">
															جلسات من
												</button>
													</Link>
												) : (
														<Link to={"/edit/" + this.state.poll.pollId}>
															<button
																type="submit"
																className="click-button">
																ویرایش
													</button>
														</Link>
													)}
												<Link to={"/comment/" + this.state.poll.pollId}>
													<button
														type="submit"
														className="click-button">
														دیدن کامنت‌ها
													</button>
												</Link>
												{!this.state.status ? (
													<Link to={"/vote/" + this.state.poll.pollId}>
													<button
														type="submit"
														className="click-button">
														رای دادن
													</button>
												</Link>
												) : ""}

												{!this.state.status ? (
													<button
														type="submit"
														className="click-button color-button"
														onClick={this.closePoll}>
														بستن نظرسنجی
												</button>
												) : ""}
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}
}


interface Props {
	match: any;
}

interface State {
	poll: Poll;
	pollId: any;
	state: any;
	status: any;
}

