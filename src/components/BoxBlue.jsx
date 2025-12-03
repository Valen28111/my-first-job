import useResize from "../hooks/useResize"
import styles from "./box-blue.module.css"

export default function BoxBlue({ xy, ...props }) {
  const { size } = useResize()

  return (
    <span
      {...props}
      className={styles.box}
      style={{
        top: `${xy.row * size}px`,
        left: `${xy.col * size}px`,
        width: `${size}px`,
        height: `${size}px`
      }}
    />
  )
}
