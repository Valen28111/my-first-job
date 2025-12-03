import useResize from "../hooks/useResize"
import styles from "./box.module.css"

export default function Box(props) {
  const { size } = useResize()

  return (
    <div {...props} className={styles.box} style={{ width: `${size}px`, height: `${size}px` }} />
  )
}
