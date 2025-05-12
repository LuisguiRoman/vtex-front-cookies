import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles';

const CSS_HANDLES = [
  'button',
  'spinner',
  'phrase',
  'luckyNumber',
] as const;

export const Fortune = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const [phrase, setPhrase] = useState<string>('')
  const [lucky, setLucky] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const fetchFortune = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/dataentities/CF/search?_fields=CookieFortune&_pageSize=100');
      const data = await res.json() as Array<{ phrase: string }>;

      const random = data[Math.floor(Math.random() * data.length)].phrase;
      setPhrase(random)

      const gen = () => Math.floor(Math.random() * 90 + 10)
      const part1 = gen().toString()
      const part2 = gen().toString()
      const part3 = `${gen()}${gen()}`.slice(0, 4)
      setLucky(`${part1}-${part2}-${part3}`)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        className={handles.button}
        onClick={fetchFortune}
        disabled={loading}
      >
        {loading ? <span className={handles.spinner}>Cargando...</span> : 'Sacar Fortuna'}
      </button>

      {phrase && (
        <h3 className={handles.phrase}>{phrase}</h3>
      )}
      {lucky && (
        <h5 className={handles.luckyNumber}>{lucky}</h5>
      )}
    </div>
  )
}

export default Fortune;
