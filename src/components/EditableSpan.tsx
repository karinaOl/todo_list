import React, {useState, ChangeEvent} from "react";

type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {

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
            ? <input value={newTitle}
                     onBlur={onBlurHandler}
                     onChange={onChangeInputHandler}
                     autoFocus
            />
            : <span onDoubleClick={onClickHandler}>{props.title}</span>
    )
}