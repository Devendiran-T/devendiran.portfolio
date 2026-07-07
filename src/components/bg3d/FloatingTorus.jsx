import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// AI Neural Network — layered nodes with animated signal pulses
const FloatingTorus = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const W = mount.clientWidth, H = mount.clientHeight

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.set(0, 0, 7)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    // ── Neural network layers ──
    // Each layer: [x position, number of nodes]
    const layers = [
      { x: -3.0, count: 3 },
      { x: -1.5, count: 5 },
      { x:  0.0, count: 6 },
      { x:  1.5, count: 5 },
      { x:  3.0, count: 3 },
    ]

    const nodeSpacing = 0.9
    const allNodes = []   // { mesh, layer, index }
    const pulses   = []   // { line, progress, speed, from, to }

    // Build nodes
    layers.forEach((layer, li) => {
      const offsetY = -(layer.count - 1) * nodeSpacing * 0.5
      for (let i = 0; i < layer.count; i++) {
        const y = offsetY + i * nodeSpacing
        const color = li === 0 || li === layers.length - 1 ? 0x9b6bff : 0x4f9eff
        const mat  = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85 })
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), mat)
        mesh.position.set(layer.x, y, 0)
        mesh.userData.phase = Math.random() * Math.PI * 2
        group.add(mesh)
        allNodes.push({ mesh, layer: li, index: i })
      }
    })

    // Build connections between adjacent layers
    const connections = []
    for (let li = 0; li < layers.length - 1; li++) {
      const fromNodes = allNodes.filter(n => n.layer === li)
      const toNodes   = allNodes.filter(n => n.layer === li + 1)
      fromNodes.forEach(from => {
        toNodes.forEach(to => {
          const points = [from.mesh.position.clone(), to.mesh.position.clone()]
          const geo = new THREE.BufferGeometry().setFromPoints(points)
          const mat = new THREE.LineBasicMaterial({ color: 0x4f9eff, transparent: true, opacity: 0.12 })
          const line = new THREE.Line(geo, mat)
          group.add(line)
          connections.push({ line, from: from.mesh.position, to: to.mesh.position })
        })
      })
    }

    // Pulse dots travelling along connections
    const pulseMat = () => new THREE.MeshBasicMaterial({ color: 0x00eaff, transparent: true, opacity: 0.95 })
    for (let i = 0; i < 18; i++) {
      const conn = connections[Math.floor(Math.random() * connections.length)]
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), pulseMat())
      group.add(mesh)
      pulses.push({ mesh, from: conn.from, to: conn.to, progress: Math.random(), speed: 0.004 + Math.random() * 0.006 })
    }

    // Outer glow ring
    const ringGeo = new THREE.TorusGeometry(3.8, 0.025, 8, 120)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x4f9eff, transparent: true, opacity: 0.18 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI * 0.15
    group.add(ring)

    // Second decorative ring
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(4.2, 0.015, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x9b6bff, transparent: true, opacity: 0.10 })
    )
    ring2.rotation.x = -Math.PI * 0.25
    ring2.rotation.y =  Math.PI * 0.1
    group.add(ring2)

    // ── Animate ──
    let frameId, t = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      t += 0.012

      // Slow group rotation
      group.rotation.y += 0.003

      // Pulse nodes
      allNodes.forEach(({ mesh }) => {
        const s = 0.88 + 0.18 * Math.sin(t + mesh.userData.phase)
        mesh.scale.setScalar(s)
      })

      // Move signal pulses
      pulses.forEach(p => {
        p.progress += p.speed
        if (p.progress > 1) {
          p.progress = 0
          // pick a new random connection
          const conn = connections[Math.floor(Math.random() * connections.length)]
          p.from = conn.from
          p.to   = conn.to
        }
        p.mesh.position.lerpVectors(p.from, p.to, p.progress)
        p.mesh.material.opacity = 0.5 + 0.5 * Math.sin(p.progress * Math.PI)
      })

      // Spin rings
      ring.rotation.z  += 0.002
      ring2.rotation.z -= 0.0015

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 0 30px #4f9eff55)' }}
    />
  )
}

export default FloatingTorus
