const mongoose = require('mongoose')
const databaseName = 'test'

describe('test connection', () => {
  let conn
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`
    conn = await mongoose.connect(url, { useNewUrlParser: true })
  })
  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })

  it('connection should be defined', async () => {
    expect(conn).toBeDefined()
  })
})
