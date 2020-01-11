import React, { Component } from "react";
import "src/scss/style.scss";
import { Link } from "react-router-dom";
import { PollOption } from "src/api/PollAPI"


export default class PollInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.pollInfo.start.date}</td>
                <td>{this.props.pollInfo.start.time}</td>
                <td>{this.props.pollInfo.end.time}</td>
                <td>{this.props.pollInfo.agreed}</td>
                <td>{this.props.pollInfo.disagreed}</td>
                <td>{this.props.pollInfo.if_needed}</td>
                {this.props.status ? "" : (
                    <Link to={"/reservation/" + this.props.pollID + "/" + this.props.pollInfo.id}>
                        <td>
                            <button
                                type="submit"
                                className="submit-button">
                                ثبت
						</button>
                        </td>
                    </Link>
                    )}

            </tr>
        );
    }
}

interface Props {
    pollInfo: PollOption;
    pollID: number;
    status: any;
}

interface State { }
