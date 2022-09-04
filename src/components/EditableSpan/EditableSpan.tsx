import React, {useState, ChangeEvent} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = React.memo( (props: EditableSpanType) => {

    const [newTitle, setNewTitle] = useState('')
    const [edit, setEdit] = useState(false)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        setEdit(true)
        setNewTitle(props.title)
    }
    const onBlurHandler = () => {
        setEdit(false)
        setNewTitle('')
        props.callBack(newTitle)
    }

    return (
        edit
            ? <TextField id="standard-basic"
                         label="enter text"
                         variant="standard"
                         value={newTitle}
                         onBlur={onBlurHandler}
                         onChange={onChangeInputHandler}
                         autoFocus
                         size={"small"}/>
            : <span onDoubleClick={onClickHandler}>{props.title}</span>
    )
})