import useResize from "../hooks/useResize";
import styles from "./virtual-keyboard.module.css";

export default function VirtualKeyboard({ move, setDirection }) {
  const { width } = useResize();

  if (width > 918) {
    return null;
  }

  return (
    <div className={styles.pad} role="group" aria-label="Flechas de control">
      <button
        onClick={() => {
          setDirection("up");
          move(-9);
        }}
        className={`${styles.key} ${styles.up}`}
        aria-label="Arriba"
        title="Arriba"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l-8 8h5v8h6v-8h5z" /></svg>
      </button>

      <button
        onClick={() => {
          setDirection("left");
          move(-1);
        }}
        className={`${styles.key} ${styles.left}`}
        aria-label="Izquierda"
        title="Izquierda"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l8 8v-5h8v-6h-8V4z" /></svg>
      </button>

      <button
        onClick={() => {
          setDirection("right");
          move(1);
        }}
        className={`${styles.key} ${styles.right}`}
        aria-label="Derecha"
        title="Derecha"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12l-8-8v5H4v6h8v5z" /></svg>
      </button>

      <button
        onClick={() => {
          setDirection("down");
          move(9);
        }}
        className={`${styles.key} ${styles.down}`}
        aria-label="Abajo"
        title="Abajo"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20l8-8h-5V4h-6v8H4z" /></svg>
      </button>
    </div>
  );
}
