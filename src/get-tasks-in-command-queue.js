export default function getTasksInCommandQueue () {
  if (typeof window === 'undefined') {
    return []
  }

  return window.galite && window.galite.q || []
}