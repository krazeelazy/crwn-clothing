import React from "react";

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className='group'>
        <input className='form-input' onChange={handleChange} {...otherProps}/>
        {
            label ? // if there is a label render it
            (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}> 
                {label}
            </label>)
            : null // else don't render anything
        }
    </div>
);

export default FormInput;