import React from "react"
import Button from "../Button"
import styles from "./ToastPlayground.module.css"
import ToastShelf from "../ToastShelf"

import { ToastContext } from "../ToastProvider"

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"]

function ToastPlayground() {
  // const [message, setMessage] = React.useState("")
  const { toasts, setToasts } = React.useContext(ToastContext)
  const messageRef = React.useRef()
  const [variant, setVariant] = React.useState("notice")

  function handleSubmit(e) {
    e.preventDefault()
    const message = messageRef.current.value

    const newToast = {
      message,
      variant,
      id: crypto.randomUUID(),
    }

    setToasts([...toasts, newToast])

    // afters wipe message
    messageRef.current.value = ""
    setVariant("notice")
  }

  function handleDismiss(e, id) {
    e.preventDefault()

    const newToasts = toasts.filter((toast) => toast.id !== id)
    setToasts(newToasts)
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              ref={messageRef}
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option, index) => {
              return (
                <label htmlFor={`variant-${option}`} key={`variant-${index}`}>
                  <input
                    id={`variant-${option}`}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={variant === option}
                    onChange={(event) => {
                      setVariant(event.target.value)
                    }}
                  />
                  {option}
                </label>
              )
            })}

            {toasts && (
              <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />
            )}

            {/* TODO Other Variant radio buttons here */}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit" value="Submit">
              Pop Toast!
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ToastPlayground
