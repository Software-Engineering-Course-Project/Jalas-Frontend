import React, { Component } from "react";
import "src/scss/style.scss";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import "src/views/vote/Vote.scss";

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);


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
                    <GreenRadio
                        checked={true}
                    />
                </td>
            );
        } else if (checked == 0) {
            return (
                <td className="checkbox-size center-text">
                    <Radio
                        checked={true}
                    />
                </td>
            );
        } else if (checked == 2) {
            return (
                <td className="checkbox-size center-text">
                    <Radio
                        checked={true}
                        color="default"
                    />
                </td>
            );
        } else{
            return(
            <td className="checkbox-size center-text">
                <h6>بدون رای</h6> 
            </td>)
        }
    }



    render() {
        const full = (
        <tr>
            <th>
                {this.props.name}
            </th>
            {this.props.options ? this.props.options.map((option: any) => this.checkbox(option)) : <div />}
        </tr>)

        return full;
    }
}

interface Props {
    name: any,
    options: any,
    numOfOptions: any
}

interface State {
    checked: boolean;
}
