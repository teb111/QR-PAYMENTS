import { BUTTON_ICONS } from "../services/constants"

export default function Button({
  text,
  disabled,
  icon,
  color = "none",
  Click,
  full = true,
  children
}) {
  const getIconSource = () => {
    switch (icon) {
      case BUTTON_ICONS.PAYSTACK:
        return "./images/paystack-logo.png"
      case BUTTON_ICONS.APPLE:
        return "./images/apple-logo.png"
      case BUTTON_ICONS.GOOGLE_PAY:
        return "./images/googlepay-logo.png"
      case BUTTON_ICONS.CARD:
        return "./images/creditcard-logo.png"
      case BUTTON_ICONS.ABSA:
        return "./images/absa-logo.png"
      case BUTTON_ICONS.KCB:
        return "./images/kcb-logo.png"
      case BUTTON_ICONS.NBK:
        return "./images/nbk-logo.png"
      default:
        return "./images/creditcard-logo.png"
    }
  }
  const performClick = () => {
    if (typeof Click === "function") {
      setTimeout(() => {
        Click()
      }, 300)
    }
  }

  return (
    <button
      disabled={disabled}
      className={`btn${color ? ` btn--${color}` : ""} ${
        !full ? "btn--width" : ""
      }`}
      onClick={performClick}
    >
      {icon ? (
        <img className="btn--icon-image" src={icon} alt={"button"} />
      ) : null}
      {text} {children}
    </button>
  )
}
