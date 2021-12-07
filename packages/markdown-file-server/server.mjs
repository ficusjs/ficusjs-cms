import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs'
import markdownToJson from '@ficusjs/cms-markdown-to-json'

const app = express()
const port = 3001

function normalizePath (path) {
  let np = path.substr(1)
  if (!np.endsWith('.md')) {
    np = `${np}.md`
  }
  return np
}

function handleGet (req, res) {
  const path = normalizePath(req.path)
  if (existsSync(path)) {
    const result = markdownToJson(readFileSync(path))
    res.json({ content: result.content, data: result.data })
  } else {
    res.status(404).end()
  }
}

function handlePost (req, res) {
  const path = normalizePath(req.path)
  if (existsSync(path)) {
    res
      .status(400)
      .json({ error: `${path} already exists` })
      .end()
  } else {
    const result = markdownToJson.stringify(req.body.content, req.body.data)
    writeFileSync(path, result, { encoding: 'utf8' })
    res.status(201).end()
  }
}

function handlePut (req, res) {
  const path = normalizePath(req.path)
  if (existsSync(path)) {
    const result = markdownToJson.stringify(req.body.content, req.body.data)
    writeFileSync(path, result, { encoding: 'utf8' })
    res.status(204).end()
  } else {
    res.status(404).end()
  }
}

function handleDelete (req, res) {
  const path = normalizePath(req.path)
  if (existsSync(path)) {
    unlinkSync(path)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
}

app.use(cors())
app.use(bodyParser.json())

app.all('*', function (req, res) {
  switch (req.method) {
    case 'GET':
      handleGet(req, res)
      break
    case 'POST':
      handlePost(req, res)
      break
    case 'PUT':
      handlePut(req, res)
      break
    case 'DELETE':
      handleDelete(req, res)
      break
    default:
      res
        .status(405)
        .header('Allow', 'GET, POST, PUT, DELETE')
        .end()
  }
})

app.listen(port, () => {
  console.log(`Local file server listening at http://localhost:${port}`)
})
