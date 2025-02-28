import React from "react";


const Input = (props) => {


    const onChange = (e) => {
        props.onChangeText(e)
    }


    return (
        <div>
            {props?.label && <div><label>{props.label}</label></div> }
            <input 
                id={props.id} 
                name={props.name} 
                value={props.value} 
                className={props.className}
                placeholder={props.placeholder}
                onChange={(e) => onChange(e)} 
            />
        </div>
    )

}

export default Input
