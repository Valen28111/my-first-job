import useResize from "../hooks/useResize"
import styles from "./board.module.css"

export default function Board(props) {
  const { size } = useResize()

  return (
    <div {...props} className={styles.container} style={{ width: `${size * 9}px` }} />
  )
}
