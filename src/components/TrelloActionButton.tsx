import { Button, TextareaAutosize } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { ChangeEvent, useState } from "react";

interface TrelloActionButtonProps {
    list: any
}



export function TrelloActionButton ({list}: TrelloActionButtonProps) {

    const [title, setTitle] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

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
          : <div onBlur={formHandler}>
            <Card
            style={{
                minHeight: 85,
                minWidth: 272,
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
                onChange={textareaTitleHandler} placeholder={placeholder}/>
            </Card>
            <div style={styles.formButtonGroup}>
            <Button variant="contained" style={{
                color: "white",
                backgroundColor: "#5aac44"
            }}>
                {buttonTitle} {" "}
            </Button>
            <Icon style={{marginLeft: 8, cursor: 'pointer'}}>X</Icon>
          </div>
        </div>
        }
        </>
    );
}
