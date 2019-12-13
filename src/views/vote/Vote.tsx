import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import "src/scss/style.scss";
import VoteOption from 'src/views/vote/VoteOption';

export default class Status extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Header />
                <main>
                    <div className="container h-100">
                        <div className="row justify-content-center align-items-center main-height">
                            <div className="col-md-9">
                                <form className="py-3 px-5">
                                    <h1 className="center-text m-4">موضوع:</h1>
                                    <div >
                                        <table className="table table-hover">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">تاریخ</th>
                                                    <th scope="col">زمان شروع</th>
                                                    <th scope="col">زمان پایان</th>
                                                    <th scope="col"></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <VoteOption></VoteOption>
                                            </tbody>
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

}
interface State {

}