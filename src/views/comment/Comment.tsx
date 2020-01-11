import React, { Component } from "react";
import "src/views/common/Header.scss";
import "src/scss/style.scss";
import "src/views/comment/comment.scss";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import { sendComment, getAllComment, sendEditComment, sendReply, deleteComment } from "src/api/CommentAPI";
import { toast } from "react-toastify";

export default class Comment extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pollId: 0,
            text: "",
            comments: [{
                text: "",
                author: "",
                isEdit: false,
                level: 0,
                pk: 0,
                isReply: false,
                reply: "",
                canDelete: true,
                canEdit: true
            }]
        }
    }

    componentWillMount = () => {
        const {
            match: { params }
        } = this.props;

        this.setState({
            pollId: params.pollId
        })

        getAllComment(params.pollId).then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                this.setState({
                    comments: [...this.state.comments, {
                        text: res.data[i].fields.text,
                        author: res.data[i].fields.username,
                        level: res.data[i].fields.level,
                        canEdit: res.data[i].fields.can_edit,
                        canDelete: res.data[i].fields.can_delete,
                        isEdit: false,
                        pk: res.data[i].pk,
                        isReply: false,
                        reply: ""
                    }]
                } as any);
            }
        }).catch((error) => { toast.warn(error.response); })

        this.setState({
            comments: this.state.comments.filter((i: any) => i.author !== "")
        } as any);

    }

    editComment = (index: any) => {
        var temp = this.state.comments;
        temp[index].isEdit = true;
        this.setState({
            comments: temp
        })
    }

    replyComment = (index: any) => {
        var temp = this.state.comments;
        temp[index].isReply = true;
        this.setState({
            comments: temp
        })
    }

    deleteComment = (index: any) => {
        deleteComment(this.state.comments[index].pk).then((res) => toast.success(res.data))
        window.location.assign('/comment/' + this.state.pollId);
    }

    allOptions = (index: any) => {
        return (

            <div className="row">
                <div className="row col-4">
                    <button
                        onClick={() => { this.replyComment(index) }}
                        className="btn btn-success">
                        پاسخ
                            </button>
                </div>
                <div className="col-4">
                    <form>
                        {this.state.comments[index].canDelete ? (<button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => this.deleteComment(index)}
                        >
                            حذف
                            </button>) : ""}

                    </form>
                </div>
                <div className="col-4 ">
                    {this.state.comments[index].canEdit ? (<button
                        onClick={() => this.editComment(index)}
                        className="btn btn-info">
                        ویرایش
                            </button>) : ""}

                </div>

            </div>
        );
    }

    handleEditInputChange = (event: any, index: any) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        var temp = this.state.comments;
        temp[index].text = value;
        this.setState({
            comments: temp
        })
    }

    submitEdit = (index: any, text: any) => {

        sendEditComment(this.state.comments[index].pk, text).catch((error) => {
            toast.warn(error.data);
        });

        this.props.history.push('/comment/' + this.state.pollId);
    }

    showEdit = (index: any, text: any) => {
        return (
            <form className="make-rtl form-group" onSubmit={() => { }}>
                <div className="row">
                    <div className="col-8 input-group ">
                        <input type="text"
                            name="text"
                            value={text}
                            onChange={(e: any) => this.handleEditInputChange(e, index)}
                            required
                            className="form-control make-rtl" />
                    </div>

                    <div className="col-4">
                        <button
                            className="btn btn-success"
                            onClick={() => { this.submitEdit(index, text) }}>
                            ثبت
                </button>
                    </div>
                </div>
            </form>
        )
    }

    replyStyle = (margin: any) => {
        let temp = {
            'margin-right': margin * 20 + 'px'
        } as any;

        return temp;
    }

    sendReply = (index: any) => {
        sendReply(this.state.comments[index].pk, this.state.comments[index].reply).catch((error) => {
            toast.warn(error.data);
        });
        this.props.history.push('/comment/' + this.state.pollId);
    }

    handleReplyInputChange = (event: any, index: any) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        var temp = this.state.comments;
        temp[index].reply = value;
        this.setState({
            comments: temp
        })
    }

    showReplyBox = (index: any) => {
        return (
            <form>
                <div className="comment-margin row" style={this.replyStyle(this.state.comments[index].level + 1)}>
                    <div className="col-8">
                        <div className="input-group">
                            <input type="text"
                                name="text"
                                placeholder="پاسخ دهید..."
                                onChange={(e: any) => this.handleReplyInputChange(e, index)}
                                required
                                className="form-control" />
                        </div>
                    </div>
                    <div className="col-3">
                        <div>
                            <button
                                type="submit"
                                className="btn btn-success  mr-5"
                                onClick={() => this.sendReply(index)}
                            >
                                ثبت
                    </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    CommentList = () => {
        return (
            <div>
                {this.state.comments.map((c: any, index: any) => {
                    return (
                        <div>
                            <div className="comment-margin row" style={this.replyStyle(c.level)}>
                                <div className="col-8 center">
                                    <div className="row">
                                        <div>
                                        &nbsp; {c.author} : &nbsp;
                                    </div>
                                        <div className="make-ltr">
                                            {c.isEdit ? this.showEdit(index, c.text) : c.text}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    {c.isEdit ? "" : this.allOptions(index)}
                                </div>
                            </div >
                            {c.isReply ? this.showReplyBox(index) : ""}
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
        sendComment(this.state.pollId, this.state.text).catch((error) => {
            toast.warn(error.data);
        });
        this.props.history.push('/comment/' + this.state.pollId);
    }

    render() {

        return (
            <div>
                <Header isUserLoggedIn={true} />
                <main>
                    <div className="container h-100">
                        <div className="row justify-content-center align-items-center main-height">
                            <div className="col-md-8">
                                <form className="form-group" onSubmit={() => { }}>
                                    <h1 className="center-text"> نظرات</h1>
                                    <hr />
                                    <div className="input-group">
                                        <input type="text"
                                            name="text"
                                            placeholder="چیزی بگو..."
                                            onChange={this.handleInputChange}
                                            required
                                            className="form-control" />
                                    </div>

                                    <div className="p-2 text-center" >
                                        <button

                                            type="submit"
                                            className="btn btn-success"
                                            onClick={() => this.submit()}
                                        >
                                            ثبت
                                        </button>
                                    </div>

                                </form>
                                {this.CommentList()}
                            </div>

                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

interface Props {
    match: any;
    history: any;
}
interface State {
    pollId: number,
    text: any,
    comments: [{
        text: any,
        author: any,
        isEdit: any,
        level: any,
        pk: any,
        isReply: any,
        reply: any,
        canDelete: any,
        canEdit: any
    }]
}
