import React, { Component } from "react";
import "src/views/common/Header.scss";
import "src/scss/style.scss";
import { sendComment, getAllComment } from "src/api/CommentAPI";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default class CommentBox extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            text: "",
            comments: [{
                text: "",
                author: ""
            }]
        }
    }

    componentWillMount = () => {
        getAllComment(this.props.pollId).then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                this.setState({
                    comments: [...this.state.comments, {
                        text: res.data[i].fields.text,
                        author: res.data[i].fields.username
                    }]
                } as any);
            }
        }).catch((error) => { toast.warn(error.response); })
        
        this.setState({
            comments: this.state.comments.filter((i: any) => i.author !== "")
        } as any);

    }

    CommentList = () => {
        return (
            <div className="comment-list">
                {this.state.comments.map((c: any) => {
                    return (
                        < div >
                            <div className="
                            l       qwaesdrtfgho
                            tr">
                               {c.author}:{c.text}
                            </div>
                        </div>
                    )
                })
                }
            </div >
        )
    };

    handleInputChange = (event: any) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        } as any);
    };

    submit = () => {
        sendComment(this.props.pollId, this.state.text).catch((error) => {
            toast.warn(error.data);
        });
        // window.location.assign('/poll/' + this.props.pollId);
    }

    render() {

        return (
            <div>
                <form className="comment-form form-group" onSubmit={() => { }}>

                    <div className="input-group">
                        <input type="text"
                            name="text"
                            placeholder="چیزی بگو..."
                            onChange={this.handleInputChange}
                            required
                            className="form-control" />
                    </div>

                    <div className="comment-center">
                        <button
                            type="submit"
                            className="signupbtn comment-button"
                            onClick={() => this.submit()}
                        >
                            ثبت
						</button>
                    </div>
                    <div>
                        {this.CommentList()}
                    </div>
                </form>
            </div>
        );
    }
}

interface Props {
    pollId: any,
}
interface State {
    text: any,
    comments: [{
        text: any,
        author: any
    }]
}
