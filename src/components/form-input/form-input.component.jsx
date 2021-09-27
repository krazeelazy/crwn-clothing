import React from "react";

import {
    GroupContainer,
    FormInputContainer,
    FormInputLabel
} from './form-input.styles';

const FormInput = ({ handleChange, label, ...props }) => (
    <GroupContainer>
        <FormInputContainer onChange={handleChange} {...props}/>
        {
            label ? // if there is a label render it
            (<FormInputLabel className={props.value.length ? 'shrink' : ''}> 
                {label}
            </FormInputLabel>)
            : null // else don't render anything
        }
    </GroupContainer>
);

export default FormInput;