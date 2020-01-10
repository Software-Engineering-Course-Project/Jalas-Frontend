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
      console.log(poll);
      return (
        <PollInfo poll={poll}  onProjectClick={() => {
        
          if(poll.fields.is_owner == true)
            window.location.assign("/poll/" + poll.fields.meeting);
          else if(poll.fields.is_owner == false)
            window.location.assign("/vote/" + poll.fields.meeting);
        }} />
      );
    });

    return (
      <div>
        <Header isUserLoggedIn={true} />
        <main>
          <div className="container main">
            
            <div className="col-12 projects">
            <h1 className="center-text">نظرسنجی‌های من</h1>
                                    <hr />
              {AllPoll}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

interface Props {}
interface State {
    allPolls:any
}