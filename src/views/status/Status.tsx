import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import "src/scss/style.scss";
import { ReservedMeeting, postRoom, getMeeting, cancelMetting } from "src/api/ReservationAPI";
import {RoomStatus} from "src/api/ReservationAPI"

import { Link } from "react-router-dom";


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

    componentWillMount() {
        const {
            match: { params }
        } = this.props;
        getMeeting(params.reservationId).then((res) => {
            var temp = this.state.reservedRoom;
            temp.title = res.data[0].fields.title;
            temp.pollId = res.data[0].fields.pollId;
            temp.start.date = res.data[0].fields.date;
            temp.start.time = res.data[0].fields.startTime;
            temp.end.time = res.data[0].fields.endTime;
            temp.end.date = res.data[0].fields.date;
            temp.status = res.data[0].fields.status;
            temp.roomNumber = params.room;
            temp.isCancle = res.data[0].fields.isCancel;
            this.setState({
                reservedRoom: temp
            })
        }).catch(error => {
            toast.warn(error.response.data);
        });
    }

    componentDidMount() {
        const {
            match: { params }
        } = this.props;

        postRoom(params.room, params.reservationId).then((res) => {
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
            if(error.response.status == 404){
                alert(error.response.data);
                window.location.assign("/reservation/" + params.pollId + "/" + params.reservationId);
            }
            if(error.response.status == 405){
                alert(error.response.data);
                // window.location.assign("/reservation/" + params.pollId + "/" + params.reservationId);
            }
        });
    }

    getStatus(){
        switch(this.state.reservedRoom.status){
            case 1:
                return RoomStatus[1]
            case 2:
                return RoomStatus[2]
            case 3:
                return RoomStatus[3]
            case 4:
                return RoomStatus[4]
        }
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
                                    <h1 className="center-text m-4">موضوع:{this.state.reservedRoom.title}</h1>
                                    <div>
                                        <table className="table table-hover">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">تاریخ</th>
                                                    <th scope="col">زمان شروع</th>
                                                    <th scope="col">زمان پایان</th>
                                                    <th scope="col"> شماره اتاق</th>
                                                    <th scope="col"> وضعیت</th>
                                                    <th scope="col"> </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{this.state.reservedRoom.start.date}</td>
                                                    <td>{this.state.reservedRoom.start.time}</td>
                                                    <td>{this.state.reservedRoom.end.time}</td>
                                                    <td>{this.state.reservedRoom.roomNumber}</td>
                                                    <td>{ this.getStatus()}</td>
                                                    <Link to={"/poll/" + this.props.match.params.pollId}>
                                                        <td>
                                                            <button
                                                                type="submit "
                                                                className="btn-danger"
                                                                onClick={()=>{
                                                                    cancelMetting(this.props.match.params.reservationId).then(res =>{
                                                                    }).catch(error =>{
                                                                        toast.warn(error.response.data);
                                                                    });
                                                                }}>
                                                                    لغو
						                                    </button>
                                                        </td>
                                                    </Link>
                                                </tr>
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

        return (
            <div>
                {roomReserved}
            </div>
        );
    }
}

interface Props {
    match: any;
}
interface State {
    reservedRoom: ReservedMeeting;
}