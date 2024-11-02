export function updateThemeColor(variable, color) {
  document.documentElement.style.setProperty(`--${variable}`, color);
}
