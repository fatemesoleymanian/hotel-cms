export const projectStatus = [
  {
    label: 'اتمام یافته',
    value: 0,
    bgColor: 'green'
  },
  {
    label: 'درحال اجرا',
    value: 1,
    bgColor: 'amber-9'
  },
  {
    label: 'آتی',
    value: 2,
    bgColor: 'grey'
  }
]

export function getProjectStatus (process) {
  if (process == null) {
    return projectStatus[2]
  } else if (process > 0 && process < 100) {
    return projectStatus[1]
  } else if (process === 100) {
    return projectStatus[0]
  }
}
