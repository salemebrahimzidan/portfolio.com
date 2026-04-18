import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const p = resolve(process.cwd(), 'ref.html')
if (!existsSync(p)) {
  console.log('ref.html not found in project root; nothing to do.')
  process.exit(0)
}

let s = readFileSync(p, 'utf8')
const next = s.replaceAll('bg-gradient-to-r', 'bg-linear-to-r').replaceAll('bg-gradient-to-b', 'bg-linear-to-b')
if (next === s) {
  console.log('No bg-gradient-to-r / bg-gradient-to-b classes found.')
  process.exit(0)
}

writeFileSync(p, next, 'utf8')
console.log('Updated ref.html: bg-gradient-to-* -> bg-linear-to-*')
