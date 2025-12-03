import useResize from "../hooks/useResize"
import styles from "./grass.module.css"

export default function Grass(props) {
  const { size } = useResize()

  return (
    <div {...props} className={styles.grass} style={{ width: `${size}px`, height: `${size}px` }} />
  )
}
