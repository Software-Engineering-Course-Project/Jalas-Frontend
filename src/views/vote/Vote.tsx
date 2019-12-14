import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import "src/scss/style.scss";
import VoteOption from 'src/views/vote/VoteOption';
import "src/views/vote/Vote.scss";
import { getPollTime, getPollUser } from 'src/api/VoteAPI';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { getPoll } from 'src/api/PollAPI';


export default class Status extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: "",
            times: [],
            participants: [],
            name:"",
            vote:[]
        }

    }

    handleInputChange = (event: any) => {

        const target = event.target;
		const name = target.name;
        const value = target.value;
        
        this.setState({
            [name]:value
        } as any);
        
    };

    componentDidMount() {
        const {
            match: { params }
        } = this.props;

        getPoll(params.pollId).then(res => {
            console.log(res);
            this.setState({
                title: res.data[0].fields.title
            })
        }).catch(error => { toast.warn(error.response); });

        getPollTime(params.pollId).then((res) => {
            res.data.forEach((ans: any) => {
                var temp = {
                    date: ans.fields.date,
                    start: ans.fields.startTime,
                    end: ans.fields.endTime
                }
                this.setState({
                    times: [...this.state.times, temp]
                })
            })
        }).catch(error => toast.warn(error.response));

        getPollUser(params.pollId).then((res) => {
            res.data.map((ans: any) => {
                var temp = {
                    name: ans.name,
                    vote: ans.votes
                }
                this.setState({
                    participants: [...this.state.participants, temp]
                })
            })
        }).catch(error => toast.warn(error.response));
    }

    checkbox = (number: any) => {
        var temp = [];
        for (var i = 0; i < number; i++) {
            temp.push(
                <td className="checkbox-size center-text">
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                            />
                        }
                        label=""
                    />
                </td>)

        }
        return (temp);
    }

    render() {

        const timeComponent = this.state.times.map((time: any) => {
            return (
                <td>
                    <div>
                        {time.date} <br />
                        {time.start} <br />
                        {time.end}
                    </div>
                </td>
            );
        });

        const userComponent = this.state.participants.map((participant: any) => {
            return (
                <VoteOption name={participant.name} options={participant.vote} numOfOptions={this.state.times.length} />
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
                                    <h1 className="center-text m-4">موضوع:{this.state.title}</h1>
                                    <div >
                                        <table className="table table-bordered">
                                            <tr>
                                                <th></th>
                                                {timeComponent}
                                            </tr>
                                            <tr>
                                                <th>
                                                    <input
                                                        type="text"
                                                        className="text-box col-5"
                                                        placeholder="نام خود را وارد کنید"
                                                        name="name"
                                                        required
                                                        onChange={this.handleInputChange}
                                                    />
                                                </th>
                                                {this.checkbox(this.state.times.length)}
                                            </tr>

                                            {userComponent}
                                        </table>
                                        <div className="row justify-content-center">
                                            <div className="col-sm-4">
                                                <button
                                                    type="submit"
                                                    className="signupbtn register-button">
                                                    ثبت
											    </button>
                                            </div>
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

interface Props {
    pollId: number,
    match: any
}
interface State {
    title: any,
    times: any,
    participants: any,
    name:any,
    vote:any
}