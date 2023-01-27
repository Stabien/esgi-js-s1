import { setTictactoeScores } from '../store/actions'

const initDB = (): void => {
  const connection = indexedDB.open('NavigOS', 5)

  connection.onerror = () => {
    throw new Error('IndexedDB connection failed')
  }

  connection.onupgradeneeded = (event: Event) => {
    const db = (event.target as IDBRequest).result as IDBDatabase

    db.onerror = (event: Event) => {
      throw new Error(`Database error: ${(event.target as unknown as DOMException).message}`)
    }

    db.createObjectStore('tictactoe', { keyPath: 'score' })
  }

  connection.onsuccess = () => {
    setTictactoeScores()
  }
}

export default initDB
