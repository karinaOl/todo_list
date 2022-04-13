import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    callBack:(title: string)=>void
}

export const AddItemForm = (props: AddItemFormType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.callBack(title)
        }else{
            setError('Title is required')
        }
        setTitle('')
    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            onClickAddTaskHandler()
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            <input
                className={error ? "error" : ''}
                value={title}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
            />
            <button onClick={onClickAddTaskHandler}>+</button>
            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
    )
}