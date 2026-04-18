import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const pngPath = path.join(root, 'public', 'favicon.png')
const outPath = path.join(root, 'public', 'favicon.svg')

const b64 = fs.readFileSync(pngPath).toString('base64')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="round"><circle cx="50" cy="50" r="50"/></clipPath>
  </defs>
  <image width="100" height="100" href="data:image/png;base64,${b64}" clip-path="url(#round)" preserveAspectRatio="xMidYMid slice"/>
</svg>
`
fs.writeFileSync(outPath, svg, 'utf8')
console.log('Wrote', outPath, `(${Math.round(svg.length / 1024)} KB)`)
