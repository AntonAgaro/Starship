import React, { useState, useEffect } from 'react'

const useLocalStorage = <T, U extends string>(
  initialValue: T,
  key: U
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const getValue = () => {
    const storage = localStorage.getItem(key)

    if (storage) {
      return JSON.parse(storage)
    }

    return initialValue
  }

  const [value, setValue] = useState<T>(getValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}

export default useLocalStorage
