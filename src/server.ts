import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

async function server() {
  try {
    await app.listen(config.port, () => {
      console.log(`server is running in port ${config.port}`)
    })
    await mongoose.connect(config.database_url as string)
  } catch (error) {
    console.log(error)
  }
}

server()
