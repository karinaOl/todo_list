import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

type AddItemFormType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.callBack(title)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTaskHandler()
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            <TextField id="outlined-basic"
                       label="Title is required"
                       variant="outlined"
                       className={error ? "error" : ''}
                       value={title}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressInputHandler}
                       size={"small"}
                       error={error}/>
            <Button variant="contained"
                    onClick={onClickAddTaskHandler}
                    style={{
                        maxWidth: "39px",
                        maxHeight: "39px",
                        minWidth: "39px",
                        minHeight: "39px",
                        backgroundColor: "violet"
                    }}
            >+</Button>
            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
    )
}