import useResize from "../hooks/useResize"
import styles from "./player.module.css"

export default function Player({ direction, xy, ...props }) {
  const { size } = useResize()

  return (
    <div
      {...props}
      className={`${styles.player} ${styles[direction]}`}
      style={{
        top: `${xy.row * size}px`,
        left: `${xy.col * size}px`,
        width: `${size}px`,
        height: `${size}px`
      }}
    />
  )
}
