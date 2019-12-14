import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import "./Create.scss";
import { toast, ToastContainer } from "react-toastify";


export default class Create extends Component<Props, State>  {
    constructor(props: Props) {
        super(props);
        this.state = {
            items: [],
            value: "",
            error: null,
            options: [this.option(0)],
            oId: 0
        };
    }

    handleInputChange = (event: any) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        } as any);
    };

    handleDelete = (item: any) => {
        this.setState({
            items: this.state.items.filter((i:any) =>  i !== item)
        });
    };

    handleKeyDown = (evt: any) => {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();

            var value = this.state.value.trim();

            if (value && this.isValid(value)) {
                this.setState({
                    items: [...this.state.items, this.state.value],
                    value: ""
                } as any);
            }
        }
    };

    isValid(email: any) {
        let error = null;

        if (this.isInList(email)) {
            error = `${email} قبلا اضافه شده است.`;
        }

        if (!this.isEmail(email)) {
            error = `${email} یک ایمیل درست نمی‌باشد.`;
        }
        if (error) {
            this.setState({ error });
            return false;
        }

        return true;
    }

    isInList(email: any) {
        return this.state.items.includes(email);
    }

    isEmail(email: any) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    handleChange = (evt: any) => {
        this.setState({
            value: evt.target.value,
            error: null
        });
    };

    addOption = (event: any) => {
        event.preventDefault();
        this.setState({
            oId: this.state.oId + 1
        })
        this.setState({
            options: [...this.state.options, this.option(this.state.oId + 1)]
        });
    }

    deleteOption = (event: any, ID: any) => {
        event.preventDefault();
        var numberOfOptions = 0;
        this.state.options.map((option:any)=>{
            console.log(option);
            if (option != "") {
                numberOfOptions = numberOfOptions + 1;
            }
        });
        
        if (numberOfOptions > 1) {
            const updatedArray = [...this.state.options];
            updatedArray[ID] = "";
            this.setState({
                options: updatedArray,
            });
        }else{
            toast.warn("باید حتما یک زمان برای جلسه انتخاب کنید");
        }
    }

    option = (oId: any) => {
        var ID = oId;
        return (
            <div className="row mb-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="text-box"
                        placeholder="تاریخ"
                        name="date"
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="text-box "
                        placeholder="زمان شروع"
                        name="startTime"
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="text-box"
                        placeholder="زمان پایان"
                        name="endTime"
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="col-md-1">
                    <button
                        className="click-button"
                        onClick={this.addOption}>
                        +
                </button>
                </div>
                <div className="col-md-1">
                    <button
                        className="delete-button"
                        onClick={(e) => this.deleteOption(e, ID)}
                    >
                        -
            </button>
                </div>
            </div>
        );
    }

    render() {

        const participants = (
            <div className="row">
                <div className="col-md-12">
                    <label className="mt-3">
                        <b>شرکت کنندگان</b>
                    </label>

                    <div className="row">
                        {this.state.items.map((item: any) => (
                            <div className="tag-item right-placeholder" key={item}>
                                {item}
                                <button
                                    type="button"
                                    className="button"
                                    onClick={() => this.handleDelete(item)}
                                >
                                    &times;
                        </button>
                            </div>
                        ))}
                    </div>
                    <input
                        className={(this.state.error && " has-error") + " text-box"}
                        value={this.state.value}
                        placeholder="ایمیل شرکت ‌کننده را وارد نمایید"
                        onKeyDown={this.handleKeyDown}
                        onChange={this.handleChange}
                    />
                    {this.state.error && <p className="error">{this.state.error}</p>}
                </div>
            </div>
        );

        return (
            <div>
                <Header />
                <main>
                    <div className="container h-100">
                        <div className="row justify-content-center align-items-center main-height">
                            <div className="col-md-9">
                                <form
                                    className="py-3 px-5"
                                >
                                    <h1 className="center-text"> ساخت نظرسنجی</h1>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>
                                                <b>عنوان جلسه</b>
                                            </label>
                                            <input
                                                type="text"
                                                className="text-box"
                                                placeholder="عنوان جلسه را وارد کنید"
                                                name="title"
                                                onChange={this.handleInputChange}

                                            />
                                        </div>
                                    </div>

                                    <div>
                                        {participants}
                                    </div>
                                    <div>
                                        <label className="mt-3">
                                            <b>گزینه‌ها</b>
                                        </label>
                                        {this.state.options}
                                    </div>

                                    <div className="row justify-content-center">
                                        <div className="col-sm-4">
                                            <button
                                                type="submit"
                                                className="signupbtn register-button mt-3">
                                                ثبت
											</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
                <ToastContainer />
            </div>
        );
    }
}

interface Props { }

interface State {
    items: any,
    value: any,
    error: any,
    options: any,
    oId: any
}