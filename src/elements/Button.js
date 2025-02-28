import React from "react";


const Button = (props) => {


    const onClickButton = () => {
        props.onChangeButton()
    }


    return (
        <>
            <button name={props.name} className={props.class} onClick={onClickButton}> {props.label}</button>
        </>
    )

}

export default Button
