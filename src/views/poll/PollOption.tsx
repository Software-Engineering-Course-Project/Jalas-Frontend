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
                    <td>{this.props.pollInfo.start}</td>
                    <td>{this.props.pollInfo.end}</td>
                    <td>{this.props.pollInfo.agreed}</td>
                    <td>{this.props.pollInfo.disagreed}</td>
                    <td>
                        <button
                            type="submit"
                            className="submit-button">
                            ثبت
						</button>
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
