  
export function getLocalStorage(key ) {
    return JSON.parse(window.localStorage.getItem(key) || null)
} 

export function setLocalStorage(key,data) {
 
    return window.localStorage.setItem(key,JSON.stringify(data))
}

export function removeLocalStorage(key) {
    return window.localStorage.removeItem(key)
}
