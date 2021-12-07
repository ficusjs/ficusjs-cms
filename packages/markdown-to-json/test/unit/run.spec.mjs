import test from 'ava'
import markdownToJson from '../../dist/markdown-to-json.mjs'

test('markdown to JSON', t => {
  const result = markdownToJson('---\ntitle: Home\n---\nOther stuff')
  t.deepEqual(result, { data: { title: 'Home' }, content: 'Other stuff', excerpt: '', isEmpty: false })
})

test('JSON to markdown', t => {
  const result = markdownToJson.stringify('foo bar baz', { title: 'Home' })
  const expected = `---
title: Home
---
foo bar baz
`
  t.is(result, expected)
})

test('JSON to markdown', t => {
  const result = markdownToJson.stringify('foo bar baz', { title: 'Home' })
  const expected = `---
title: Home
---
foo bar baz
`
  t.is(result, expected)
})
