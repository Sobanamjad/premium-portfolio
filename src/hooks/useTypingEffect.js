import { useEffect, useState } from 'react'

/**
 * Cycles through an array of words with a typing / deleting animation.
 * @param {string[]} words
 * @param {{typingSpeed?: number, deletingSpeed?: number, pause?: number}} options
 */
export default function useTypingEffect(words = [], options = {}) {
  const { typingSpeed = 80, deletingSpeed = 40, pause = 1600 } = options
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words.length) return undefined
    const current = words[wordIndex % words.length]
    let timeout

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        )
      }, isDeleting ? deletingSpeed : typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause])

  return text
}
