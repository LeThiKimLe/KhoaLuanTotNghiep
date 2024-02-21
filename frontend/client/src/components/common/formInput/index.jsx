import styles from "./styles.module.css"
import {useState} from 'react'
import Select from 'react-select'

const FormInput = (props) => {
    const [focused, setFocused] = useState(false)
    const {label, errorMessage, onChange, id, name, required,type, options, roles, editable, readOnly, className, inputWidth, ...inputProps } = props;
    const handleFocus = (e) => {
        setFocused(true)
    }

    const handleSelect = (selectedOption) => {
        const selected ={
            target:{
                name: name,
                value: selectedOption
            }
        }
        onChange(selected)
    }

    return (
        <div className={`${styles.formInput} ${className? className: ''}`}>
            <label className={styles.inputLabel}> 
                {label} 
                <span className={styles['input-required']}> {required? '*':''} </span>
            </label>
            <div className={styles.inputContain} style={{width: inputWidth ? inputWidth : '60%'}}>
            {type !== 'select' ?  
                (<input {...inputProps}
                    name={name}
                    onChange={onChange}
                    onBlur={handleFocus}
                    type = {type}
                    focused={focused.toString()}
                    required= {required}
                    readOnly = {readOnly ? readOnly : false}
                    className={`${styles.inputInput} ${readOnly ? styles.readonly : ''}`}/>)
                :
                (
                    <Select {...inputProps}
                            id={"select-" + name}
                            options={options}
                            onChange={handleSelect}
                            isDisabled= {readOnly ? readOnly : false}
                            className={`${styles.inputSelect} ${readOnly? styles.readonly : ''}`}>
                    </Select>
                )
            }
            <span className={styles.inputError} id={"error-" + name}>{errorMessage}</span>
            </div>
        </div>
    )
}

export default FormInput