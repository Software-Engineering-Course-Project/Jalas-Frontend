import React, { Component } from "react";
import "src/views/common/Header.scss";
import "src/scss/style.scss";
import {sendComment, getAllComment} from "src/api/CommentAPI";
import { toast, ToastContainer } from "react-toastify";

export default class CommentBox extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            text:"",
            comments:[{
                text:"",
                author:""
            }]
        }
    }
    

    Comment = (author: any, text: any) => {
        return (
            <div className="comment">
                <h2 className="author">{author}</h2>
                {text}
            </div>
        )
    };

    CommentList = () => {
        return (
            <div className="comment-list">
                {this.props.data.map((c: any) => this.Comment(c.author, c.text))}
            </div>
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
    }

    render() {
        // getAllComment(this.props.pollId).then((res)=>{
        //     console.log(res);
        // }).catch(()=>{

        // })
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
                            onClick={()=> this.submit()}
                        >
                            ثبت
						</button>
                    </div>
                    <div>
                        {this.CommentList}
                    </div>
                </form>
            </div>
        );
    }
}

interface Props {
    pollId:any,
    data: any
}
interface State {
    text:any,
    comments: [{
        text:any,
        author:any
    }]
 }
