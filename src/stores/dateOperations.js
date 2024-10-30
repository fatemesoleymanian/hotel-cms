export const persianDate = {
  persianDateTime (date) {
    const d = new Date(date)
    const getParts = () => d.toLocaleDateString().split('/')
    const getPersianParts = () => d.toLocaleDateString('fa-IR').split('/')
    return {
      toLocaleDateString: () => d.toLocaleDateString('fa-IR-u-nu-latn'),
      getParts,
      getDay: () => d.getDay() === 6 ? 0 : d.getDay() + 1,
      getDate: () => getParts()[2],
      getMonth: () => getParts()[1] - 1,
      getYear: () => getParts()[0],
      getPersianYear: () => getPersianParts()[0],
      getPersianMonth: () => getPersianParts()[1],
      getPersianDay: () => getPersianParts()[2],
      getMonthName: () => d.toLocaleDateString('fa-IR', { month: 'long' }),
      getDayName: () => d.toLocaleDateString('fa-IR', { weekday: 'long' })
    }
  },

  getPersianLongDateTime (date) {
    // console.log(date)
    if (date == null) return ''
    const textDate = this.persianDateTime(date)
    return `${textDate.getDayName()} ${textDate.getPersianDay()} ${textDate.getMonthName()} ${textDate.getPersianYear()}`
  }
}

export function subtractDays (date1, date2) {
  const diffTime = Math.abs(date2 - date1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
