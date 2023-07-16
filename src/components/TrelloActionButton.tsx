import { Button, TextareaAutosize } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { ChangeEvent, useEffect, useState } from "react";

interface TrelloActionButtonProps {
    list: any
    onAddList?: (title: string) => void
    onAddItem?: (title: string) => void
}


export function TrelloActionButton ({list, onAddList, onAddItem}: TrelloActionButtonProps) {

    const [title, setTitle] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const onAddListHandler = (newTitle: string) => {
        if(title.trim().length > 0) {
            onAddList && onAddList(newTitle)
            setTitle('')
            setIsFormOpen(false)
        }   
    }

    const onAddItemHandler = (newTitle: string) => {
        if(title.trim().length > 0) {
            onAddItem && onAddItem(newTitle)
            setTitle('')
            setIsFormOpen(false)
        }   
    }

    const buttonText = list ? "Add another list" : "Add another card"
    const buttonOpacity = list ? 1 : 0.5
    const buttonTextColor = list ? "white" : "inherit"
    const buttonTextBackground = list ? "rgba(0,0,0,0.15)" : "inherit"
    
    const formHandler = () => setIsFormOpen(!isFormOpen)
    const textareaTitleHandler = (e: ChangeEvent<HTMLTextAreaElement>) => setTitle(e.currentTarget.value)

    const styles = {
        openForButtonGroup: {
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            borderRadius: 3,
            height: 36,
            width: 272,
            paddingLeft: 10
        },
        formButtonGroup: {
            marginTop: 8,
            display: "flex",
            alignItems: "center"
        }
    }

    const placeholder = list ? "Enter list title..." : "Enter placeholder for this card..."

    const buttonTitle = list ? "Add List" : "Add Card" 

    return (<>
        {!isFormOpen ? <div
        onClick={formHandler}
            style={{
              ...styles.openForButtonGroup,
              opacity: buttonOpacity,
              color: buttonTextColor,
              background: buttonTextBackground,
            }}
          >
            <Icon>+</Icon>
            <p>{buttonText}</p>
          </div>
          : <div /* onBlur={formHandler} */>
            <Card
            style={{
                minHeight: 35,
                minWidth: 282,
                padding: "6px 8px 2px"
            }}>
                <TextareaAutosize 
                style={{
                    resize: 'none',
                    width: '100%',
                    overflow: 'hidden',
                    outline: 'none',
                    border: 'none'
                }}
                maxRows={3}
                onChange={textareaTitleHandler} placeholder={placeholder}/>
            </Card>
            <div style={styles.formButtonGroup}>
            <Button variant="contained" style={{
                color: "white",
                backgroundColor: "#5aac44"
            }}
                onClick={() => list ? onAddListHandler(title) : onAddItemHandler(title)}
            >
                {buttonTitle} {" "}
            </Button>
            <Icon style={{marginLeft: 8, cursor: 'pointer'}}
            onClick={formHandler}
            >X</Icon>
          </div>
        </div>
        }
        </>
    );
}
