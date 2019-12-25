import React, { Component } from "react";
import "src/scss/style.scss";
import "src/views/home/PollInfo.scss";
import { Poll } from "src/api/PollAPI";



export default class PollInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
       console.log(this.props.poll)
        return (
            <div className="row project" onClick={this.props.onProjectClick}>
                    <h5 className="title p-4">{this.props.poll.fields.title}</h5>
            </div>
        );
    }
}

interface Props {
    poll: any;
    onProjectClick?(): void;
}
interface State {}