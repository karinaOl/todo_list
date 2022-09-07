import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";

type AddItemFormType = {
    callBack: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.callBack(title)
        } else {
            setError("Title is required")
        }
        setTitle("")
    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null)
        }
        if (e.key === "Enter") {
            onClickAddTaskHandler()
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
                       error={!!error}
                       disabled={props.disabled}/>
            <IconButton
                onClick={onClickAddTaskHandler} color={"primary"}
                style={{
                    color: "violet"
                }}
            >
                <AddCircleOutline/>
            </IconButton>
            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
    )
})