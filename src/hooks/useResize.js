import { useContext } from "react"
import { ResizeContext } from "../contexts/resize"

export default function useResize() {
  const context = useContext(ResizeContext)

  if (!context) {
    throw new Error('useResize must be within ResizeProvider')
  }

  return context
}
