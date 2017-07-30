const USER_ID_KEY = 'uid'

export default function getUserId (storage = window ? window.localStorage : null) {
  if (storage && storage.getItem(USER_ID_KEY)) {
    return storage.getItem(USER_ID_KEY)
  }

  const userId = Math.random() + '.' + Math.random()
  if (storage) {
    storage.setItem(USER_ID_KEY, userId)
  }

  return userId
}
