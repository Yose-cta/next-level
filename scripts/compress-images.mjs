// scripts/compress-images.mjs
// One-shot script to compress oversized PNGs in /public using sharp.
// Strategy:
//   - PNG: re-encode with palette + max compression. Lossless to the eye for photos.
//   - Resize to max 1600px on longest side (still hi-res for retina) if larger.
//   - Keep original aspect ratio.
// Run: node scripts/compress-images.mjs
import sharp from 'sharp'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const TARGETS = [
  { file: 'public/hero.png', maxWidth: 1600 },
  { file: 'public/next-level-vip.png', maxWidth: 1600 },
  { file: 'public/og-cover.png', maxWidth: 1600 },
  { file: 'public/next-level-logo.png', maxWidth: 512 },
]

function fmtKB(bytes) {
  return (bytes / 1024).toFixed(0) + ' KB'
}
function fmtMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB'
}

console.log('🗜  Comprimiendo imágenes...\n')

let totalBefore = 0
let totalAfter = 0

for (const { file, maxWidth } of TARGETS) {
  const fullPath = path.resolve(file)
  const originalStat = await fs.stat(fullPath)
  const beforeBytes = originalStat.size

  // Buffer original to read metadata
  const inputBuffer = await fs.readFile(fullPath)
  const meta = await sharp(inputBuffer).metadata()

  // Determine if we need to resize
  const needsResize = meta.width && meta.width > maxWidth

  // Pipeline: optionally resize, then re-encode PNG with max compression
  let pipeline = sharp(inputBuffer)
  if (needsResize) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true })
  }
  // PNG with best compression. quality controls palette quantization.
  // effort 10 = max effort. compressionLevel 9 = max zlib.
  const optimized = await pipeline
    .png({
      quality: 90,
      compressionLevel: 9,
      effort: 10,
      palette: true, // 8-bit palette where possible — huge savings for photos with limited colors
    })
    .toBuffer()

  const afterBytes = optimized.length
  const reduction = ((1 - afterBytes / beforeBytes) * 100).toFixed(1)

  // Write back to same path
  await fs.writeFile(fullPath, optimized)

  totalBefore += beforeBytes
  totalAfter += afterBytes

  const resizeNote = needsResize
    ? ` (${meta.width}×${meta.height} → ${maxWidth}px max)`
    : ''
  console.log(
    `${file.padEnd(38)} ${fmtMB(beforeBytes).padStart(8)} → ${fmtKB(afterBytes).padStart(8)}  (-${reduction}%)${resizeNote}`
  )
}

console.log('\n─────────────────────────────────────────────────────────────')
console.log(
  `TOTAL                                  ${fmtMB(totalBefore).padStart(8)} → ${fmtMB(totalAfter).padStart(8)}  (-${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`
)
console.log('\n✅ Hecho. Verificá visualmente las imágenes antes de commitear.')
