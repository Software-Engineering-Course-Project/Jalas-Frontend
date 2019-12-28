import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import 'src/views/create/Create.scss';
import { toast, ToastContainer } from "react-toastify";
import { postCreatePoll, getPollId } from 'src/api/CreateAPI';
import { getPoll, Poll, getOptions, PollOption, getParticipant, modifyPoll } from "src/api/PollAPI";

export default class EditPoll extends Component<Props, State>  {
    constructor(props: Props) {
        super(props);
        this.state = {
            items: [],
            value: "",
            error: null,
            options: [],
            pollId: 0,
            oId: -1,
            title: "",
            text: "",
            selects: [{
                start_time: "",
                end_time: "",
                date: ""
            }]
        };
    }

    componentDidMount() {
        const {
            match: { params }
        } = this.props;

        getPoll(params.pollId).then(res => {
            if(res.data[0].fields.state){
                toast.warn("این نظرسنجی به اتمام رسیده است.");
                window.location.assign('/home');
            }

            this.setState({
                title: res.data[0].fields.title,
                pollId: res.data[0].fields.meeting
            })
            this.setState({
                selects: []
            } as any)

            getOptions(params.pollId).then(optRes => {
                for (var i = 0; i < optRes.data.length; i++) {

                    var temp = this.state.selects;

                    temp = ({
                        start: {
                            date: optRes.data[i].fields.date,
                            time: optRes.data[i].fields.startTime
                        },
                        end: {
                            date: optRes.data[i].fields.date,
                            time: optRes.data[i].fields.endTime
                        },
                        agreed: optRes.data[i].fields.agree,
                        disagreed: optRes.data[i].fields.disagree
                    } as any);

                    this.makeOption(temp);
                }
            }).catch(error => toast.warn(error.response));
        }).catch(error => { toast.warn(error.response.data); });


        getParticipant(params.pollId).then(res => {
            this.setState({
                items: res.data.participants
            })
        }).catch(error => { toast.warn(error.response); });
    }

    handleInputChange = (event: any) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        } as any);

    };

    handleOptionInputChange = (event: any) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        var splited = name.split("-");
        var textName = splited[0];
        var index = splited[1];
        var updatedArray = [...this.state.selects];
        if (textName == "date") {
            updatedArray[index].date = value;
        } else if (textName == "start_time") {
            updatedArray[index].start_time = value;
        } else if (textName == "end_time") {
            updatedArray[index].end_time = value;
        }
        this.setState({
            selects: updatedArray,
        } as any);

    }

    handleDelete = (item: any) => {
        this.setState({
            items: this.state.items.filter((i: any) => i !== item)
        });
    };

    handleKeyDown = (evt: any) => {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();

            var value = this.state.value.trim();

            if (value && this.isValid(value)) {
                this.setState({
                    items: [...this.state.items, this.state.value],
                    value: ""
                } as any);
            }
        }
    };

    isValid(email: any) {
        let error = null;

        if (this.isInList(email)) {
            error = `${email} قبلا اضافه شده است.`;
        }

        if (!this.isEmail(email)) {
            error = `${email} یک ایمیل درست نمی‌باشد.`;
        }
        if (error) {
            this.setState({ error });
            return false;
        }

        return true;
    }

    isInList(email: any) {
        return this.state.items.includes(email);
    }

    isEmail(email: any) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    handleChange = (evt: any) => {
        this.setState({
            value: evt.target.value,
            error: null
        });
    };

    makeOption = (input: any) => {
        var temp = {
            start_time: input.start.time,
            end_time: input.end.time,
            date: input.start.date
        };

        this.setState({
            oId: this.state.oId + 1
        });

        this.setState({
            selects: [...this.state.selects, temp]
        } as any)

        this.setState({
            options: [...this.state.options, this.option(this.state.oId)]
        });
    }

    addOption = (event: any) => {
        event.preventDefault();

        var temp = {
            start_time: "",
            end_time: "",
            date: ""
        };

        this.setState({
            oId: this.state.oId + 1,
            selects: [...this.state.selects, temp]
        } as any, () => {
            this.setState({
                options: [...this.state.options, this.option(this.state.oId)]
            });
        });

    }

    deleteOption = (event: any, ID: any) => {
        event.preventDefault();
        var numberOfOptions = 0;
        this.state.options.map((option: any) => {
            if (option != "") {
                numberOfOptions = numberOfOptions + 1;
            }
        });

        const updatedSelectArray = [...this.state.selects];
        updatedSelectArray[ID] = {
            start_time: "",
            end_time: "",
            date: ""
        };

        this.setState({
            selects: updatedSelectArray
        } as any);

        if (numberOfOptions > 1) {
            const updatedArray = [...this.state.options];
            updatedArray[ID] = "";
            this.setState({
                options: updatedArray
            });
        } else {
            toast.warn("باید حتما یک زمان برای جلسه انتخاب کنید");
        }
    }

    option = (oId: any) => {

        return (
            <div className="row mb-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="text-box"
                        placeholder="تاریخ: yyyy-mm-dd "
                        name={"date-" + oId}
                        onChange={this.handleOptionInputChange}
                        value={this.state.selects[oId].date}
                        required
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="text-box "
                        placeholder="زمان شروع"
                        name={"start_time-" + oId}
                        onChange={this.handleOptionInputChange}
                        value={this.state.selects[oId].start_time}
                        required
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="text-box"
                        placeholder="زمان پایان"
                        name={"end_time-" + oId}
                        onChange={this.handleOptionInputChange}
                        value={this.state.selects[oId].end_time}
                        required
                    />
                </div>
                <div className="col-md-1">
                    <button
                        className="click-button"
                        onClick={this.addOption}>
                        +
                </button>
                </div>
                <div className="col-md-1">
                    <button
                        className="delete-button"
                        onClick={(e) => this.deleteOption(e, oId)}
                    >
                        -
            </button>
                </div>
            </div>
        );
    }

    submit = () => {
        var i;
        var options = [];
        for (i = 0; i < this.state.selects.length; i++) {
            if (this.state.selects[i].date != "") {
                options.push(this.state.selects[i]);
            }
        }

        var content = {
            title: this.state.title,
            text: this.state.text,
            participants: this.state.items,
            selects: options,
            link: "http://localhost:3000/vote/"
        };

        modifyPoll(this.props.match.params.pollId, content).catch(error => { toast.warn(error.response.data); })
        toast.success("جلسه با موفقیت ویرایش شد.");
        this.props.history.push('/home');
    }

    render() {

        const participants = (
            <div className="row">
                <div className="col-md-12">
                    <label className="mt-3">
                        <b>شرکت کنندگان</b>
                    </label>

                    <div className="row">
                        {this.state.items.map((item: any) => (
                            <div className="tag-item right-placeholder" key={item}>
                                {item}
                                <button
                                    type="button"
                                    className="button"
                                    onClick={() => this.handleDelete(item)}
                                >
                                    &times;
                        </button>
                            </div>
                        ))}
                    </div>
                    <input
                        className={(this.state.error && " has-error") + " text-box"}
                        value={this.state.value}
                        placeholder="ایمیل شرکت ‌کننده را وارد نمایید"
                        onKeyDown={this.handleKeyDown}
                        onChange={this.handleChange}
                    />
                    {this.state.error && <p className="error">{this.state.error}</p>}
                </div>
            </div>
        );
        const AllOptions = this.state.selects.map((select, index) => {
            if (this.state.options[index] != "" ) {
                return (
                    this.option(index)
                );
            }
        });


        return (
            <div>
                <Header isUserLoggedIn={true} />
                <main>
                    <div className="container h-100">
                        <div className="row justify-content-center align-items-center main-height">
                            <div className="col-md-9">
                                <form
                                    onSubmit={this.submit}
                                    className="py-3 px-5"
                                >
                                    <h1 className="center-text"> ویرایش نظرسنجی</h1>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>
                                                <b>عنوان جلسه</b>
                                            </label>
                                            <input
                                                type="textarea"
                                                className="text-box"
                                                placeholder="عنوان جلسه را وارد کنید"
                                                name="title"
                                                onChange={this.handleInputChange}
                                                value={this.state.title}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        {participants}
                                    </div>
                                    <div>
                                        <label className="mt-3">
                                            <b>گزینه‌ها</b>
                                        </label>

                                    </div>
                                    {AllOptions}
                                    <div className="row justify-content-center">
                                        <div className="col-sm-4">
                                            <button
                                                type="submit"
                                                className="signupbtn register-button mt-3"
                                            >
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
            </div>
        );
    }
}

interface Props {
    history: any,
    match: any;
}

interface State {
    items: any,
    value: any,
    error: any,
    options: any,
    title: any,
    oId: any,
    text: any,
    pollId: any,
    selects: [{
        date: any,
        start_time: any,
        end_time: any
    }],
}