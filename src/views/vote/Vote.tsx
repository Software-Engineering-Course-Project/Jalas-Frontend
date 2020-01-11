import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import "src/scss/style.scss";
import VoteOption from 'src/views/vote/VoteOption';
import "src/views/vote/Vote.scss";
import { getPollTime, getPollUser, postVote, canVote, getPollTitle, getVoterName } from 'src/api/VoteAPI';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';


const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
    root: {
        color: red[400],
        '&$checked': {
            color: red[600],
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

export default class Status extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: "",
            times: [],
            participants: [],
            name: "",
            vote: [],
            canVote: 1,
            selectedValue: [],
            voterName:""
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

        getPollTitle(params.pollId).then(res => {
            console.log(res)
            this.setState({
                title: res.data.title
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
                    ts.push('b');
                }
                this.setState({
                    selectedValue: ts
                });
            })
        }).catch(error => toast.warn(error.response));

        getPollUser(params.pollId).then((res) => {
            res.data.map((ans: any) => {
                var temp = {
                    name: ans.name,
                    vote: ans.votes,
                    
                }
                this.setState({
                    participants: [...this.state.participants, temp]
                })
            })
        }).catch(error => toast.warn(error.response));

        canVote(params.pollId).then((res) => {
            if (res.data.value == 2)
                window.location.assign('/home');
            
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

    handleSelectedValue = (event: any) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        var splited = name.split("-");
        var index = splited[1];
        console.log(index);
        console.log(splited);
        var updatedArray = [...this.state.selectedValue];
        updatedArray[index] = value;

        if (value === 'c') {
            toast.info('این گزینه برای زمانی است که شما میخواهید در صورت نیاز در جلسه حضور داشته باشید.');
        }

        this.setState({
            selectedValue: updatedArray
        } as any)
    }

    checkbox = (number: any) => {
        var temp = [];

        for (var i = 0; i < number; i++) {
            temp.push(
                <td className="checkbox-size center-text" >
                    <RedRadio
                        checked={this.state.selectedValue[i] === 'a'}
                        onChange={this.handleSelectedValue}
                        value='a'
                        name={"a-" + i}
                        inputProps={{ 'aria-label': 'A' }}
                    />

                    <GreenRadio
                        checked={this.state.selectedValue[i] === 'b'}
                        onChange={this.handleSelectedValue}
                        value="b"
                        name={"b-" + i}
                        inputProps={{ 'aria-label': 'B' }}
                    />

                    <Radio
                        checked={this.state.selectedValue[i] === 'c'}
                        onChange={this.handleSelectedValue}
                        value="c"
                        color="default"
                        name={"c-" + i}
                        inputProps={{ 'aria-label': 'C' }}
                    />
                </td>)

        }
        return (temp);
    }

    submit = () => {
        const {
            match: { params }
        } = this.props;

        var temp = [];
        for (var i = 0; i < this.state.selectedValue.length; i++) {
            if (this.state.selectedValue[i] == 'b')
                temp.push(1);
            else if (this.state.selectedValue[i] == 'a')
                temp.push(0);
            else if (this.state.selectedValue[i] == 'c')
                temp.push(2);
        }
        var data = {
            name: this.state.name,
            vote: temp
        };
        console.log(temp);
        if (this.state.name != "")
            postVote(params.pollId, data).catch(error => { toast.warn(error.response); });

    }

    voteOption = () => {
        if (this.state.canVote == 1 && this.state.voterName == "") {
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
        }else if(this.state.canVote == 1 && this.state.voterName != ""){
            return(
                <tr>
                    <th>
                        {this.state.name}
                    </th>
                    {this.checkbox(this.state.times.length)}
                </tr>
            );
        }
    }


    editVote = ()=>{
        getVoterName(this.props.match.params.pollId).then((res)=>{
            this.setState({
                name:res.data.name,
                voterName:res.data.name
            })
        }).catch((err)=> toast.warn(err.response))
        this.setState({
            canVote: 1
        })
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

                            <div className="col-md-12">
                                <form className="py-3 px-5" onSubmit={this.submit}>
                                    <h1 className="center-text m-4">موضوع:{this.state.title}</h1>
                                    <hr />
                                    <div >
                                        <table className="table table-bordered">
                                            <tr>
                                                <th></th>
                                                {timeComponent}
                                            </tr>
                                            {this.voteOption()}
                                            {userComponent}
                                        </table>
                                        <div className="col-4 center">
                                            {this.state.canVote ? (
                                                <button
                                                    type="submit"
                                                    className="signupbtn register-button"
                                                    onClick={() => this.submit()}>
                                                    ثبت
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="signupbtn register-button"
                                                    onClick={() => this.editVote()}>
                                                    ویرایش
                                                </button>
                                            )}
                                            <Link to={"/comment/" + this.props.match.params.pollId}>
                                                <button
                                                    type="submit"
                                                    className="button-size click-button ">
                                                    دیدن کامنت‌ها
													</button>
                                            </Link>

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
    canVote: any,
    selectedValue: any,
    voterName: any
}
