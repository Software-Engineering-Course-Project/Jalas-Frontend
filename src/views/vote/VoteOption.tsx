import React, { Component } from "react";
import "src/scss/style.scss";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import "src/views/vote/Vote.scss";
import CheckBoxIcon from "material-ui-icons/CheckBox";

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

    render() {
        return (
            <tr>
                <th>
                    <input
                        type="text"
                        className="text-box col-5"
                        placeholder="نام خود را وارد کنید"
                        name="name"
                        // onChange={this.handleInputChange}
                    />
                </th>
                <td className="checkbox-size center-text">
                    <FormControlLabel
                        control={
                            <Checkbox
                            // onChange={this.handleChange()}
                                value="true"
                                color="primary"
                                
                                // checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}
                            />
                        }
                        label=""
                    />
                </td>
                <td>
                    <FormControlLabel
                        control={
                            <Checkbox

                                value="true"
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
