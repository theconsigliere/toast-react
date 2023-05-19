import React from "react"
import Toast from "../Toast"
import styles from "./ToastShelf.module.css"

function ToastShelf({ toasts, handleDismiss }) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast, i) => (
        <li className={styles.toastWrapper} key={i}>
          <Toast
            variant={toast.variant}
            handleDismiss={handleDismiss}
            id={toast.id}
          >
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  )
}

export default ToastShelf
