export function isValidName(name: string): boolean {
  const nameRegex = /^[А-ЯЁA-Zа-яёa-z\- ]+$/
  return nameRegex.test(name)
}

export function isValidLogin(login: string): boolean {
  const loginRegex = /^(?!^\d+$)[\w-]{3,20}$/
  return loginRegex.test(login)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/
  return passwordRegex.test(password)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?\d{10,15}$/
  return phoneRegex.test(phone)
}
