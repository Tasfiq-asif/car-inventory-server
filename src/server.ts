import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

// Add a root route to the app
app.get('/', (req, res) => {
  res.send('Hello, welcome to the server!')
})

async function server() {
  try {
    // First try to connect to database
    console.log('Connecting to database...')
    await mongoose.connect(config.database_url as string)
    console.log('Database connection successful!')

    // Then start the server
    await app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`)
    })
  } catch (error) {
    console.log('Error starting server:', error)
    process.exit(1)
  }
}

server()
