import React, { Component } from "react";
import "src/scss/style.scss";

import { PollOption } from "src/api/PollAPI"


export default class PollInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                <tr>
                    <td>{this.props.pollInfo.date}</td>
                    <td>{this.props.pollInfo.time}</td>
                    <td>{this.props.pollInfo.agreed}</td>
                    <td>{this.props.pollInfo.disagreed}</td>
                    <td>
                        <div className="row justify-content-center">
                            <div className="col-sm-4">
                                <button
                                    type="submit"
                                    className="signupbtn submit-button">
                                    ثبت
								</button>
                            </div>
                        </div>
                    </td>
                </tr>
            </div>
        );
    }
}

interface Props {
    pollInfo: PollOption;
    onOptionClick?(): void;
}

interface State { }
