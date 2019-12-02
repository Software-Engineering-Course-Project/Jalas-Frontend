import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import "src/scss/style.scss";
import {  ReservedMeeting, postRoom } from "src/api/ReservationAPI";


export default class Status extends Component<Props, State> {
    constructor(props: Props) {
        super(props);  
        
        this.state = {
            reservedRoom: {
                pollId: 0,
                title: "",
                start: {
                    date: "",
                    time: ""
                },
                end: {
                    date: "",
                    time: ""
                },
                roomNumber: 0,
                status: 0,
                isCancle: false
            }
        }
    }

    componentDidMount(){
        const {
            match: { params }
        } = this.props;

        postRoom(params.room, params.reservationId).then((res) => {
            console.log(res);
            var temp = this.state.reservedRoom;
            temp.title = res.data[0].fields.title;
            temp.pollId = res.data[0].fields.pollId;
            temp.start.date = res.data[0].fields.date;
            temp.start.time = res.data[0].fields.startTime;
            temp.end.time = res.data[0].fields.endTime;
            temp.end.date = res.data[0].fields.date;
            temp.status = res.data[0].fields.status;
            temp.roomNumber = res.data[0].fields.room;
            temp.isCancle = res.data[0].fields.isCancel;
            this.setState({
                reservedRoom: temp
            })
        }).catch(error => { 
            toast.warn(error.response); });
    }

    render() {
        const roomReserved = (
            <div>
                <Header />
                <main>
                    <div className="container h-100">
                        <div className="row justify-content-center align-items-center main-height">
                            <div className="col-md-9">
                                <form className="py-3 px-5">
                                    <h1 className="center-text m-4"></h1>
                                    <div>
                                        {this.state.reservedRoom.title}
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

        return (
            <div>
                {roomReserved}
            </div>
        );
    }
}

interface Props {
    match:any;
}
interface State {
    reservedRoom: ReservedMeeting;
}