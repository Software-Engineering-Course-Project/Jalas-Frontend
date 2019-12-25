import React, { Component } from 'react';

import Header from 'src/views/common/Header.tsx';
import Footer from 'src/views/common/Footer.tsx';
import PollInfo from "src/views/home/PollInfo";
import "src/scss/style.scss";
import "src/views/home/home.scss";
import { Poll , getAllPolls} from "src/api/PollAPI";


import { ToastContainer, toast } from 'react-toastify';
export default class home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
        allPolls:[]
    };
  }

  componentDidMount() {
    getAllPolls().then(res => {
      this.setState({
        allPolls: res.data,
      });
      
    }).catch(error => toast.warn(error.response));
  }
  
  render() {
    

    const AllPoll = this.state.allPolls.map((poll:any) => {
      return (
        <PollInfo poll={poll}  onProjectClick={() => {
          window.location.assign("/poll/" + poll.fields.meeting);
        }} />
      );
    });

    return (
      <div>
        <Header isUserLoggedIn={true} />
        <main>
          <div className="container main">
            <div className="projects">
              {AllPoll}
            </div>
          </div>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    )
  }
}

interface Props {}
interface State {
    allPolls:any
}