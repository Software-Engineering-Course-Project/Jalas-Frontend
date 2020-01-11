import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import { getSetting, setSetting } from 'src/api/SettingAPI';
import "src/scss/style.scss";
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

export default class Setting extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            arrangeMetting: false,
            addOption: false,
            newVote: false,
            removeOption: false,
            newParticipant: false,
            closePoll: false,
            closeMeeting: false,
            createPoll: false
        }
    }

    handleInputChange = (event: any) => {
        const target = event.target;
        const name = target.name;

        if (name == 'arrangeMetting') {
            this.setState({
                [name]: !this.state.arrangeMetting
            } as any);
        } else if (name == 'addOption') {
            this.setState({
                [name]: !this.state.addOption
            } as any);
        } else if (name == 'newVote') {
            this.setState({
                [name]: !this.state.newVote
            } as any);
        } else if (name == 'removeOption') {
            this.setState({
                [name]: !this.state.removeOption
            } as any);
        } else if (name == 'newParticipant') {
            this.setState({
                [name]: !this.state.newParticipant
            } as any);
        } else if (name == 'closePoll') {
            this.setState({
                [name]: !this.state.closePoll
            } as any);
        } else if (name == 'closeMeeting') {
            this.setState({
                [name]: !this.state.closeMeeting
            } as any);
        } else if (name == 'createPoll') {
            this.setState({
                [name]: !this.state.createPoll
            } as any);
        }
    };

    componentDidMount() {
        getSetting().then((res) => {
            console.log(res)
            this.setState({
                arrangeMetting: res.data[0].fields.arrange_meeting,
                addOption: res.data[0].fields.add_option,
                newVote: res.data[0].fields.new_vote,
                removeOption: res.data[0].fields.remove_option,
                newParticipant: res.data[0].fields.add_new_participant,
                closePoll: res.data[0].fields.close_poll,
                closeMeeting: res.data[0].fields.close_meeting,
                createPoll: res.data[0].fields.create_poll
            })
        }).catch((err) => toast.warn(err.response))
    }

    submit = () => {

        var temp = {
            arrange_meeting: this.state.arrangeMetting,
            create_poll: this.state.createPoll,
            add_option:this.state.addOption ,
            new_vote:this.state.newVote ,
            remove_option:this.state.removeOption ,
            add_new_participant:this.state.newParticipant ,
            close_poll:this.state.closePoll ,
            close_meeting:this.state.closeMeeting 
        }

        setSetting(temp).then((res)=>{
            toast.success('تنظیمات با موفقیت به روز رسانی شد.')
        }).catch((err) => toast.warn(err.response));
    }


    render() {
        return (
            <div>
                <Header isUserLoggedIn={true} />
                <main>
                    <div className="container h-100">
                        <div className="row justify-content-center align-items-center main-height">
                            <div className="col-md-12">
                                <form className="py-3 px-5" onSubmit={this.submit}>
                                    <h1 className="center-text m-4">تنظیمات ارسال ایمیل</h1>
                                    <div>
                                        <table className="table table-hover">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">رزرو کامل</th>
                                                    <th scope="col">ساخت نظرسنجی</th>
                                                    <th scope="col">اضافه شدن گزینه</th>
                                                    <th scope="col">رای جدید</th>
                                                    <th scope="col">حذف گزینه</th>
                                                    <th scope="col">تغیرات شرکت کنندگان</th>
                                                    <th scope="col">بستن نظرسنجی</th>
                                                    <th scope="col">لغو جلسه</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <td>
                                                    <GreenRadio
                                                        checked={this.state.arrangeMetting === true}
                                                        onClick={this.handleInputChange}
                                                        name="arrangeMetting"
                                                    />
                                                </td>
                                                <td>
                                                    <GreenRadio
                                                        checked={this.state.createPoll === true}
                                                        onClick={this.handleInputChange}
                                                        name="createPoll"
                                                    />
                                                </td>
                                                <td>
                                                    <GreenRadio
                                                        checked={this.state.addOption === true}
                                                        onClick={this.handleInputChange}
                                                        name="addOption"
                                                    />
                                                </td>
                                                <td>
                                                    <GreenRadio
                                                        checked={this.state.newVote === true}
                                                        onClick={this.handleInputChange}
                                                        name="newVote"
                                                    />
                                                </td>
                                                <td>
                                                    <GreenRadio
                                                        checked={this.state.removeOption === true}
                                                        onClick={this.handleInputChange}
                                                        name="removeOption"
                                                    />
                                                </td>
                                                <td>
                                                    <GreenRadio
                                                        checked={this.state.newParticipant === true}
                                                        onClick={this.handleInputChange}
                                                        name="newParticipant"
                                                    />
                                                </td>
                                                <td>
                                                    <GreenRadio
                                                        checked={this.state.closePoll === true}
                                                        onClick={this.handleInputChange}
                                                        name="closePoll"
                                                    />
                                                </td>
                                                <td>
                                                    <GreenRadio
                                                        checked={this.state.closeMeeting === true}
                                                        onClick={this.handleInputChange}
                                                        name="closeMeeting"
                                                    />
                                                </td>
                                            </tbody>
                                        </table>
                                        <div className="row justify-content-center">
                                        <div className="col-sm-4">
                                            <button
                                                type="submit"
                                                className="signupbtn register-button "
                                            >
                                                ثبت
											</button>
                                        </div>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main >
                <Footer />
            </div>
        );
    }
}

interface Props { }
interface State {
    arrangeMetting: any,
    addOption: any,
    newVote: any,
    removeOption: any,
    newParticipant: any,
    closePoll: any,
    closeMeeting: any,
    createPoll: any
}