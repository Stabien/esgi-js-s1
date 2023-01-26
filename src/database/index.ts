let db
const connection = window.indexedDB.open('NavigOS', 1)

connection.onerror = () => {
  throw new Error('IndexedDB connection failed')
}

connection.onsuccess = (event: Event) => {
  db = (event.target as IDBRequest).result as IDBDatabase
  db.onerror = (event: Event) => {
    throw new Error(`Database error: ${(event.target as unknown as DOMException).message}`)
  }

  const tictactoeObject = db.createObjectStore('tictactoe', { keyPath: 'score' })
}

export default db
