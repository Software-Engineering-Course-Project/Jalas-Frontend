import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import "src/scss/style.scss";
import {getMeetings} from "src/api/MeetingAPI";
import {RoomStatus} from "src/api/MeetingAPI"

import { Link } from "react-router-dom";
import {getAllPolls} from "src/api/PollAPI";
import PollInfo from "src/views/home/PollInfo";


export default class MyMeeting extends Component<Props, State> {
    constructor(props: Props) {
    super(props);
    this.state = {
        allMeetings:[]
    };
  }

  componentDidMount() {
    getMeetings().then(res => {
      this.setState({
        allMeetings: res.data,
      });
      console.log(this.state.allMeetings)
    }).catch(error => toast.warn(error.response));
  }

  render() {


    const AllMeetings = this.state.allMeetings.map((meeting:any) => {
        console.log(meeting)
      return (
         <tr>
            <td>{meeting.fields.title}</td>
            <td>{meeting.fields.date}</td>
            <td>{meeting.fields.startTime}</td>
            <td>{meeting.fields.endTime}</td>
            <td>{meeting.fields.room}</td>
         </tr>
      );
    });

    return (
      <div>
        <Header isUserLoggedIn={true} />
        <main>
        <div className="container h-100">
		<div className="row justify-content-center align-items-center main-height">
          <div className="container main">
            <form className="py-3 px-5">
              <div>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">عنوان</th>
                            <th scope="col">تاریخ</th>
                            <th scope="col">زمان شروع</th>
                            <th scope="col">زمان پایان</th>
                            <th scope="col">اتاق</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {AllMeetings}
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
    )
  }
}

interface Props {}
interface State {
    allMeetings:any
}