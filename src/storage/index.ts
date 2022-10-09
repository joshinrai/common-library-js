import { isStr } from '../data-type'

export function setStorage(name: any, value: any, type = 'localStorage') {
  if (!isStr(name)) {
    return
  }
  const storage = (window as any)[type]
  try {
    value = isStr(value) ? value : JSON.stringify(value)
    storage.setItem(name, value)
  } catch (e) {
    return e
  }
}

export function getStorage(name: any, type = 'localStorage') {
  if (!isStr(name)) {
    return void 0
  }
  const storage = (window as any)[type]
  try {
    let data = storage.getItem(name)
    return JSON.parse(data)
  } catch (e) {
    return storage.getItem(name) || null
  }
}

export function removeStorage(name: any, type = 'localStorage') {
  if (!isStr(name)) {
    return void 0
  }
  const storage = (window as any)[type]
  storage.removeItem(name)
}

export function clearStorage(type = 'localStorage') {
  const storage = (window as any)[type]
  storage.clear()
}
