import useResize from "../hooks/useResize"
import styles from "./target.module.css"

export default function Target({ xy, ...props }) {
  const { size } = useResize()

  return (
    <span
      {...props}
      className={styles.target}
      style={{
        top: `${xy.row * size}px`,
        left: `${xy.col * size}px`,
        width: `${size}px`,
        height: `${size}px`
      }}
    />
  )
}
