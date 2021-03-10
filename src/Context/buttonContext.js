import React ,{createContext, useState, useContext} from 'react'

const ButtonComponents = createContext()

export default function ButtonComponentPrivider(props) {
  const [styleKeyfontBottom, setStyleKeyfontBottom] = useState({height:'0.612vh'})
  const [actionAtack,setActionAtack ] = useState("")

  return(
    <ButtonComponents.Provider
      value={{
        styleKeyfontBottom,
        setStyleKeyfontBottom,
        actionAtack,
        setActionAtack
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
    actionAtack,
    setActionAtack
  } = context
  return{
    styleKeyfontBottom,
    setStyleKeyfontBottom,
    actionAtack,
    setActionAtack
  }
}