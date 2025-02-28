import React from "react";


const Button = (props) => {


    const onClickButton = () => {
        props.onChangeButton()
    }


    return (
        <>
            <button type={props.type} name={props.name} className={props.className} onClick={onClickButton}> {props.label}</button>
        </>
    )

}

export default Button
