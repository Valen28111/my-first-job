import styles from "./button.module.css"

export default function Button(props) {
  return (
    <button {...props} className={styles.btn} />
  )
}
