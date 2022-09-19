require('dotenv').config({ path: `.env-${process.env.NODE_ENV}` })
const createApp = require('./createApp')

const app = createApp()
const PORT = process.env.PORT || 8000
app.all('*', (req, res) => res.send('<h1>Error404! Page not found!<h1>'))
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
