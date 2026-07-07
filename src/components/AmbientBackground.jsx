import { useEffect, useRef } from 'react'

const AmbientBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let frameId, W, H

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Grid-distributed nodes with tiny jitter — guarantees even spread
    const COLS = 14, ROWS = 9
    const nodes = []
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        nodes.push({
          nx:    (c + 0.5) / COLS + (Math.random() - 0.5) * 0.05,
          ny:    (r + 0.5) / ROWS + (Math.random() - 0.5) * 0.05,
          vx:    (Math.random() - 0.5) * 0.000055,
          vy:    (Math.random() - 0.5) * 0.000055,
          r:     0.9 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          blue:  Math.random() > 0.45,
        })
      }
    }

    let t = 0

    const draw = () => {
      frameId = requestAnimationFrame(draw)
      t += 1

      // dark base
      ctx.fillStyle = '#050d1a'
      ctx.fillRect(0, 0, W, H)

      // very subtle full-canvas gradient tint — no focal point
      const vg = ctx.createLinearGradient(0, 0, W, H)
      vg.addColorStop(0,   'rgba(79,158,255,0.025)')
      vg.addColorStop(0.5, 'rgba(5,13,26,0)')
      vg.addColorStop(1,   'rgba(155,107,255,0.025)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, W, H)

      // move nodes — wrap edges
      nodes.forEach((n) => {
        n.nx += n.vx; n.ny += n.vy
        if (n.nx < 0) n.nx = 1; if (n.nx > 1) n.nx = 0
        if (n.ny < 0) n.ny = 1; if (n.ny > 1) n.ny = 0
      })

      // edges
      const THRESH = 0.13
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = (nodes[i].nx - nodes[j].nx)
          const dy   = (nodes[i].ny - nodes[j].ny) * (H / W)
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < THRESH) {
            const a   = (1 - dist / THRESH) * 0.28
            const col = nodes[i].blue ? '79,158,255' : '155,107,255'
            ctx.beginPath()
            ctx.moveTo(nodes[i].nx * W, nodes[i].ny * H)
            ctx.lineTo(nodes[j].nx * W, nodes[j].ny * H)
            ctx.strokeStyle = `rgba(${col},${a})`
            ctx.lineWidth   = 0.7
            ctx.stroke()
          }
        }
      }

      // nodes
      nodes.forEach((n) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.022 + n.phase)
        const col   = n.blue ? '79,158,255' : '155,107,255'
        ctx.beginPath()
        ctx.arc(n.nx * W, n.ny * H, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${col},${0.35 + pulse * 0.40})`
        ctx.fill()
      })
    }

    draw()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

export default AmbientBackground
