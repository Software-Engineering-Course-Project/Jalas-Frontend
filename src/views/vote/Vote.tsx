import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import "src/scss/style.scss";
import VoteOption from 'src/views/vote/VoteOption';
import "src/views/vote/Vote.scss";
import { getPollTime, getPollUser, postVote, canVote } from 'src/api/VoteAPI';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { getPoll } from 'src/api/PollAPI';
import CommentBox from "src/views/common/CommentBox";

export default class Status extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: "",
            times: [],
            participants: [],
            name: "",
            vote: [],
            canVote: 1
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

    componentDidMount() {
        const {
            match: { params }
        } = this.props;

        getPoll(params.pollId).then(res => {
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
                });
                var ts = [];
                for (var i = 0; i < this.state.times.length; i++) {
                    ts.push(0);
                }
                this.setState({
                    vote: ts
                });
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

        canVote(params.pollId).then((res) => {

            this.setState({
                canVote: res.data.value
            })
        }).catch(error => toast.warn(error.response));
    }

    checkOption = (event: any) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        var splited = name.split("-");
        var index = splited[1];
        var updatedArray = [...this.state.vote];
        if (updatedArray[index] == 1) {
            updatedArray[index] = 0;
            this.setState({
                vote: updatedArray
            });
        } else if (updatedArray[index] == 0) {
            updatedArray[index] = 1;
            this.setState({
                vote: updatedArray
            });
        }
        this.setState({
            selects: updatedArray,
        } as any);
    }

    checkbox = (number: any) => {
        var temp = [];
        for (var i = 0; i < number; i++) {
            temp.push(
                <td className="checkbox-size center-text" >
                    <FormControlLabel
                        control={
                            <Checkbox
                                name={"ckeckbox-" + i}
                                color="primary"
                                onChange={(e: any) => this.checkOption(e)}
                            />
                        }
                        label=""
                    />
                </td>)

        }
        return (temp);
    }

    submit = () => {
        const {
            match: { params }
        } = this.props;
        var data = {
            name: this.state.name,
            vote: this.state.vote
        };

        postVote(params.pollId, data).catch(error => { toast.warn(error.response); });

    }

    voteOption = ()=>{
        if (this.state.canVote == 1) {
            return (

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

            );
        }
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
                <Header isUserLoggedIn={true} />
                <main>
                    <div className="container h-100">
                        <div className="row justify-content-center align-items-center main-height">
                            <div className="col-md-3">
                                <CommentBox pollId={this.props.match.params.pollId}></CommentBox>
                            </div>
                            <div className="col-md-9">
                                <form className="py-3 px-5" onSubmit={this.submit}>
                                    <h1 className="center-text m-4">موضوع:{this.state.title}</h1>
                                    <div >
                                        <table className="table table-bordered">
                                            <tr>
                                                <th></th>
                                                {timeComponent}
                                            </tr>
                                            {this.voteOption()}
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
    name: any,
    vote: any,
    canVote: any
}