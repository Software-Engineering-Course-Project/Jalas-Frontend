import React, { Component } from "react";
import "src/scss/style.scss";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import "src/views/vote/Vote.scss";

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
        } else {
            this.setState({
                checked: true
            });
        }
    };

    checkbox = (checked: any) => {
        if (checked == 1) {
            return (
                <td className="checkbox-size center-text">
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                            />
                        }
                        label=""
                        checked
                    />
                </td>
            );
        } else if (checked == 0) {
            return (
                <td className="checkbox-size center-text">
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                            />
                        }
                        label=""
                        checked={false}
                    />
                </td>
            );
        }
    }



    render() {
        const full = ( <tr>
            <th>
                {this.props.name}
            </th>
            {this.props.options ? this.props.options.map((option: any) => this.checkbox(option)) : <div/>}
        </tr>)
        
        return full;
    }
}

interface Props {
    name: any,
    options: any,
    numOfOptions:any
}

interface State {
    checked: boolean;
}
