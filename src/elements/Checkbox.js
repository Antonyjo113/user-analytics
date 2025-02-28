import React from "react";


const Checkbox = (props) => {


    const onChange = (e) => {
        props.onChangeCheck(e)
    }


    return (
        <>
            {props?.name && <label>{props.name}</label> }

            <input 
                type="checkbox"
                id={props.id} 
                name={props.name} 
                checked={props.value} 
                className={props.className}
                onChange={(e) => onChange(e)} 
            />
        </>
    )

}

export default Checkbox
