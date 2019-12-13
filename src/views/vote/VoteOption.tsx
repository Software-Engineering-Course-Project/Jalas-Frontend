import React, { Component } from "react";
import "src/scss/style.scss";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';


export default class PollInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    handleChange = () => (event: any) => {
        
        if (this.state.checked == true) {
            this.setState({
                checked: false
            });
        }else{
            this.setState({
                checked: true
            });
        }
    };

    render() {
        return (
            <tr>
                <td>12/11/11</td>
                <td>12:00</td>
                <td>13:00</td>
                <td>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.handleChange()}
                                value="checked"
                                color="primary"
                            />
                        }
                        label=""
                    />
                </td>
            </tr>
        );
    }
}

interface Props {

}

interface State {
    checked: boolean;
}
