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

    await mongoose.connect(config.database_url as string)

    // Then start the server
    await app.listen(config.port, () => {
      console.log(`server is running in port ${config.port}`)
    })
    await mongoose.connect(config.database_url as string)
  } catch (error) {
    console.log(error)
  }
}

server()
