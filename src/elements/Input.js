import React from "react";


const Input = (props) => {


    const onChange = (e) => {
        props.onChangeText(e)
    }


    return (
        <>
            {/* <p>Input</p> */}
            <input 
                id={props.id} 
                name={props.name} 
                value={props.value} 
                className={props.class}
                onChange={(e) => onChange(e)} 
            />
        </>
    )

}

export default Input
