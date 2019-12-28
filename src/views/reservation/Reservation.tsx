import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import "src/scss/style.scss";
import { getReservation, postOption, ReservedMeeting, RoomStatus } from "src/api/ReservationAPI";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Status from "src/views/status/Status"

export default class Reservation extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            rooms: []
        };
    }


    componentDidMount() {
        const {
            match: { params }
        } = this.props;

        postOption(params.reservationId).catch(error => {
            return <Redirect to={"/poll/" + params.pollId} />
        });

        getReservation(params.reservationId).then(res => {
            if(res.data.availableRooms.length == 0){
                alert("در این ساعت اتاقی موجود نمی‌باشد.");
            }
            
            this.setState({
                rooms: res.data.availableRooms
            })
        }).catch(error => {
            // toast.warn(error.response.data);
            alert("سیستم رزواسیون پاسخگو نمی‌باشد. لطفا صفحه را به روز کنید.");
        });
    }

    render() {
        const reservOptions = this.state.rooms.map(room => {
            return (
                <tr>
                    <td>{room}</td>
                    <td>
                        <Link to={'/status/' + this.props.match.params.pollId + "/" + this.props.match.params.reservationId + "/" + room}>
                            <button
                                type="submit"
                                className="submit-button">
                                ثبت
                            </button>
                        </Link>
                    </td >
                </tr >
            );
        });

        const reserveRoom = (
            <div>
                <Header isUserLoggedIn={true}/>
                <main>
                    <div className="container h-100">
                        <div className="row justify-content-center align-items-center main-height">
                            <div className="col-md-9">
                                <form className="py-3 px-5">
                                    <h1 className="center-text m-4"></h1>
                                    <div>
                                        <table className="table table-hover" >
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">شماره اتاق</th>
                                                    <th scope="col"> </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reservOptions}
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );


        return (
            <div>
                {reserveRoom}
            </div >
        );
    }
}

interface Props {
    match: any;
}
interface State {
    rooms: number[];
}