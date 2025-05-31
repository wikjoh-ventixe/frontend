import styles from './Button.module.css'
import { ChevronDown, Plus} from "lucide-react"
import clsx from "clsx"

const Button = ({
  label = "Button",
  variant = "primary",
  bgColor = null,
  textColor = null,
  size = "medium",
  withIcon = false,
  withDropdown = false,
}) => {
  const iconSizeMap = {
    small: 12,
    medium: 14,
    large: 16,
  }

  const iconSize = iconSizeMap[size] || 14;
  const icon = withIcon ? <Plus size={iconSize} /> : null;
  const chevron = withDropdown ? <ChevronDown size={iconSize} /> : null;


  return (
    <button className={clsx(styles.button, styles[variant], styles[size])} style={{ ...(textColor && { color: textColor }), ...(bgColor && { backgroundColor: bgColor }) }}>
      {icon}
      <span>{label}</span>
      {chevron}
    </button>
  )
}
export default Button