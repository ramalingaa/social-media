import { useRef, useEffect } from "react"
const useClickOutside = (callback) => {
    const domNode = useRef()
    useEffect(() => {
      const handler = (e) => {
        if(!domNode.current.contains(e.target)){
          callback((prev) => !prev)
        }
      }
      document.addEventListener("mousedown", handler)
      return () =>{ document.removeEventListener("mousedown", handler)}
    },[])
    return domNode
  }
  export { useClickOutside }