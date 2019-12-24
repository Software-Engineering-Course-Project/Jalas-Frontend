import React, { Component } from "react";
import "src/scss/style.scss";
import "src/views/home/PollInfo.scss";
import { Poll } from "src/api/PollAPI";



export default class PollInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        return (
            <div className="row project">

                <div className="col-10 p-0 pr-3">
                    <div className="row m-0">
                        <h5 className="title m-0">{"نام"}</h5>
                        
                    </div>
                    <p className="description mb-0">{"توضیح"}</p>
                    <p className="blue budget my-1"><b>بودجه: تومان</b></p>

                </div>
            </div>
        );
    }
}

interface Props {
    poll: Poll;
    onProjectClick?(): void;
}
interface State {}