import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import {getLoges} from 'src/api/LoggingAPI';
import "src/scss/style.scss";




export default class Logger extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            text:""
        }
    }

  
    componentDidMount() {
        getLoges().then(res =>{
            var temp = res.data.split("\n")
            console.log(temp);
            this.setState({
                text:temp
            })
        })
    }


    render() {
        
        return (
            <div>
                {this.state.text}
            </div>
        );
    }
}

interface Props {}
interface State {
    text:any
}