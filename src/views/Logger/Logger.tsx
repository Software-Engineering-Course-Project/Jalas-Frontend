import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import { getLoges } from 'src/api/LoggingAPI';
import "src/scss/style.scss";




export default class Logger extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            text: []
        }
    }

    componentDidMount() {
        getLoges().then(res => {
            var temp = res.data.split("&&");
            this.setState({
                text: temp
            })
        })
    }

    render() {

        var temp = this.state.text.map((t:any)=>{
            return(
                <h4>
                    {t}
                </h4>
            )
        })

        return (
            <div> 
                {temp}
            </div>
        );
    }
}

interface Props { }
interface State {
    text: any
}