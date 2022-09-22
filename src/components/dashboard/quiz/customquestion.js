import React from 'react';
import PropTypes from 'prop-types'
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomQuestion = ({ onChange, options, value, className }) => {
    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    };
    return (
        <div className={className}>

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 cel-pt-20">
                <div
                    contentEditable="true"
                    className="content-editable action-link"
                >
                    <div className="action-button">
                        <div className="delete-icon">
                            <DeleteIcon />
                        </div>
                        <FormGroup>
                            <FormControlLabel
                                label="Right Answer"
                                control={<Checkbox />}
                            />
                        </FormGroup>
                    </div>
                    Type an answer option here
                </div>
            </div>
        </div>

    )
}
CustomQuestion.propTypes = {
    onChange: PropTypes.func,

    options: PropTypes.array,
    value: PropTypes.string,
    className: PropTypes.string,
}

export default CustomQuestion;