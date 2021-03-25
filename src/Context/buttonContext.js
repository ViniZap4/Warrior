import React ,{createContext, useState, useContext} from 'react'

const ButtonComponents = createContext()

export default function ButtonComponentPrivider(props) {
  const [styleKeyfontBottom, setStyleKeyfontBottom] = useState({height:'0.612vh'})
  const [actionButton,setActionButton ] = useState("")
  const [stopActionButton,setStopActionButton] =  useState("")
  return(
    <ButtonComponents.Provider
      value={{
        styleKeyfontBottom,
        setStyleKeyfontBottom,
        actionButton,
        setActionButton,
        stopActionButton,
        setStopActionButton
      }}
    >
      {props.children}
    </ButtonComponents.Provider>
  );
}

export function  useButtonContext() {
  const context = useContext(ButtonComponents)
  const errorMessage = "The UseButtonContext need to be inside in ButtonComponentPrivider"
  if(!context) throw console.error(errorMessage)
  const {
    styleKeyfontBottom,
    setStyleKeyfontBottom,
    actionButton,
    setActionButton,
    stopActionButton,
    setStopActionButton
  } = context
  return{
    styleKeyfontBottom,
    setStyleKeyfontBottom,
    actionButton,
    setActionButton,
    stopActionButton,
    setStopActionButton
  }
}