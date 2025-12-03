import useResize from "../hooks/useResize"
import styles from "./floor.module.css"

export default function Floor(props) {
  const { size } = useResize()

  return (
    <div {...props} className={styles.floor} style={{ width: `${size}px`, height: `${size}px` }} />
  )
}
