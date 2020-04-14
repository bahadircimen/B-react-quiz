import React, {Component} from 'react';

class FormInput extends Component {
    render() {
        const {name, type, placeholder, onChange, onClick, className, value, error, children, label, checked, required, ...props}=this.props
        console.log(className)
        if (className===undefined){
            return (
                <React.Fragment>
                    <label>{label}</label>
                    <input
                        id={name}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        className={className}
                        onChange={onChange}
                        onClick={onClick}
                        value={value}
                        checked={checked}
                        style={error && {border: 'solid 1px red'}}
                        required={required}
                    />
                </React.Fragment>
            );
        }
        else {
            return (
                <div className={className}>
                    <label htmlFor={name}>{label}</label>
                    <input
                        id={name}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        className={className}
                        onChange={onChange}
                        onClick={onClick}
                        value={value}
                        checked={checked}
                        style={error && {border: 'solid 1px red'}}
                        required={required}
                    />
                </div>
            );
        }
    }
}

export default FormInput;