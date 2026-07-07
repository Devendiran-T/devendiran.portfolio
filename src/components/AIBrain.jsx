import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const AIBrain = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const W = mount.clientWidth
    const H = mount.clientHeight

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // ── Brain nodes on sphere surface ──
    const NODE_COUNT = 80
    const RADIUS     = 1.8
    const nodePositions = []
    const nodeMeshes    = []

    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x4f9eff })
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const pos   = new THREE.Vector3(
        RADIUS * Math.sin(phi) * Math.cos(theta),
        RADIUS * Math.sin(phi) * Math.sin(theta),
        RADIUS * Math.cos(phi)
      )
      nodePositions.push(pos)
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), nodeMat.clone())
      mesh.position.copy(pos)
      nodeMeshes.push(mesh)
    }

    // ── Connecting lines between nearby nodes ──
    const brainGroup = new THREE.Group()
    nodeMeshes.forEach(m => brainGroup.add(m))

    const lineMat = new THREE.LineBasicMaterial({ color: 0x4f9eff, transparent: true, opacity: 0.18 })
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.4) {
          const geo = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]])
          brainGroup.add(new THREE.Line(geo, lineMat))
        }
      }
    }
    scene.add(brainGroup)

    // ── Glowing core sphere ──
    const coreMat  = new THREE.MeshBasicMaterial({ color: 0x9b6bff, wireframe: true, transparent: true, opacity: 0.15 })
    const core     = new THREE.Mesh(new THREE.IcosahedronGeometry(1.75, 3), coreMat)
    scene.add(core)

    // ── Orbit rings ──
    const makeRing = (radius, color, rx, ry) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.007, 8, 120),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.45 })
      )
      m.rotation.x = rx
      m.rotation.y = ry
      return m
    }
    const ring1 = makeRing(2.2, 0x4f9eff, Math.PI / 2.5, 0)
    const ring2 = makeRing(2.5, 0x9b6bff, Math.PI / 5,   Math.PI / 4)
    const ring3 = makeRing(2.8, 0x4f9eff, Math.PI / 1.4, Math.PI / 6)
    scene.add(ring1, ring2, ring3)

    // ── Floating particles ──
    const PART = 200
    const pPos = new Float32Array(PART * 3)
    for (let i = 0; i < PART; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 9
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 9
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 9
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({ color: 0x4f9eff, size: 0.03, transparent: true, opacity: 0.6 })
    scene.add(new THREE.Points(pGeo, pMat))

    // ── Wave rings (pulse outward) ──
    const waves = [0, 1, 2].map(i => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(0.1, 0.006, 8, 80),
        new THREE.MeshBasicMaterial({ color: 0x9b6bff, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
      )
      m.userData.phase = i * (Math.PI * 2 / 3)
      scene.add(m)
      return m
    })

    // ── Neon glow ambient fog ──
    scene.fog = new THREE.FogExp2(0x050d1a, 0.045)

    // ── Mouse parallax ──
    let mouseX = 0, mouseY = 0
    const onMouse = (e) => {
      const rect = mount.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    }
    mount.addEventListener('mousemove', onMouse)

    // ── Animate ──
    let frameId
    let t = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      t += 0.012

      brainGroup.rotation.y += 0.003
      brainGroup.rotation.x += 0.001
      core.rotation.y       -= 0.002
      core.rotation.z       += 0.001

      ring1.rotation.z += 0.005
      ring2.rotation.z -= 0.004
      ring3.rotation.y += 0.003

      // parallax tilt
      brainGroup.rotation.y += mouseX * 0.0008
      brainGroup.rotation.x += mouseY * 0.0008

      // node pulse — vary opacity
      nodeMeshes.forEach((m, i) => {
        m.material.opacity = 0.6 + 0.4 * Math.sin(t + i * 0.4)
        m.material.transparent = true
      })

      // wave pulse expand
      waves.forEach((w) => {
        const s = 1 + 2.5 * ((Math.sin(t + w.userData.phase) + 1) / 2)
        w.scale.set(s, s, s)
        w.material.opacity = Math.max(0, 0.5 - (s - 1) / 2.5 * 0.5)
      })

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      mount.removeEventListener('mousemove', onMouse)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 0 40px #4f9eff44) drop-shadow(0 0 80px #9b6bff22)' }}
    />
  )
}

export default AIBrain
