import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const getConfig = (w) => {
  if (w < 480) return { camZ: 4.5, nodes: 80,  scale: 1.6 }
  if (w < 768) return { camZ: 4.5, nodes: 120, scale: 1.8 }
  if (w < 1024)return { camZ: 5.0, nodes: 160, scale: 2.0 }
  return           { camZ: 5.5, nodes: 200, scale: 2.2 }
}

const BrainMesh = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    let W = mount.clientWidth
    let H = mount.clientHeight
    let cfg = getConfig(W)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 100)
    camera.position.set(0, 0, cfg.camZ)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const buildBrain = (nodeCount, scale) => {
      const group = new THREE.Group()
      group.scale.setScalar(scale)
      group.position.set(0, 0, 0)
      scene.add(group)

      const nodes = []

      const brainRadius = (theta, phi) => {
        const fold =
          0.08 * Math.sin(6 * theta) * Math.cos(4 * phi) +
          0.06 * Math.sin(10 * theta + 1.2) * Math.cos(6 * phi) +
          0.04 * Math.cos(8 * theta) * Math.sin(5 * phi + 0.8) +
          0.05 * Math.sin(4 * theta + 2.0) * Math.cos(3 * phi)
        return 1.0 + fold
      }

      for (let i = 0; i < nodeCount; i++) {
        const phi   = Math.acos(1 - 2 * (i + 0.5) / nodeCount)
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        const r  = brainRadius(theta, phi)
        const sx = Math.sin(phi) * Math.cos(theta)
        const sy = Math.sin(phi) * Math.sin(theta)
        const sz = Math.cos(phi)
        if (sz < -0.35) continue

        const mat  = new THREE.MeshBasicMaterial({ color: 0x4f9eff, transparent: true, opacity: 0.6 + Math.random() * 0.4 })
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.032 + Math.random() * 0.018, 6, 6), mat)
        mesh.position.set(sx * r * 1.35, sz * r * 1.10 + 0.15, sy * r * 0.85)
        mesh.userData.phase = Math.random() * Math.PI * 2
        mesh.userData.base  = mat.opacity
        nodes.push(mesh)
        group.add(mesh)
      }

      const innerCount = Math.floor(nodeCount * 0.3)
      for (let i = 0; i < innerCount; i++) {
        let x, y, z
        do {
          x = (Math.random() - 0.5) * 2.4
          y = (Math.random() - 0.5) * 1.8
          z = (Math.random() - 0.5) * 1.4
        } while ((x*x)/1.82 + (y*y)/1.21 + (z*z)/0.72 > 0.85 || y < -0.35)
        const mat  = new THREE.MeshBasicMaterial({ color: 0x9b6bff, transparent: true, opacity: 0.25 + Math.random() * 0.25 })
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.02 + Math.random() * 0.015, 5, 5), mat)
        mesh.position.set(x, y + 0.15, z)
        mesh.userData.phase = Math.random() * Math.PI * 2
        mesh.userData.base  = mat.opacity
        nodes.push(mesh)
        group.add(mesh)
      }

      const MAX_DIST = 0.42
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = nodes[i].position.distanceTo(nodes[j].position)
          if (d < MAX_DIST) {
            const geo = new THREE.BufferGeometry().setFromPoints([nodes[i].position, nodes[j].position])
            group.add(new THREE.Line(geo,
              new THREE.LineBasicMaterial({ color: 0x4f9eff, transparent: true, opacity: (1 - d / MAX_DIST) * 0.20 })
            ))
          }
        }
      }

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.18, 0.55, 10),
        new THREE.MeshBasicMaterial({ color: 0x4f9eff, transparent: true, opacity: 0.30 })
      )
      stem.position.set(0, -0.65, 0)
      group.add(stem)

      const fp = []
      for (let i = 0; i <= 30; i++) {
        const t = (i / 30) * Math.PI - Math.PI / 2
        fp.push(new THREE.Vector3(0, Math.sin(t) * 0.55 + 0.15, Math.cos(t) * 0.82))
      }
      group.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(fp),
        new THREE.LineBasicMaterial({ color: 0x9b6bff, transparent: true, opacity: 0.35 })
      ))

      return { group, nodes }
    }

    let { group, nodes } = buildBrain(cfg.nodes, cfg.scale)

    let frameId, t = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      t += 0.007
      group.rotation.y += 0.0025
      nodes.forEach(n => {
        n.scale.setScalar(0.82 + 0.20 * Math.sin(t + n.userData.phase))
        n.material.opacity = n.userData.base * (0.65 + 0.35 * Math.sin(t * 0.6 + n.userData.phase))
      })
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      W = mount.clientWidth
      H = mount.clientHeight
      const newCfg = getConfig(W)
      camera.aspect = W / H
      camera.position.set(0, 0, newCfg.camZ)
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
      if (newCfg.nodes !== cfg.nodes) {
        scene.remove(group)
        group.traverse(obj => {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) obj.material.dispose()
        });
        ({ group, nodes } = buildBrain(newCfg.nodes, newCfg.scale))
        cfg = newCfg
      } else {
        group.scale.setScalar(newCfg.scale)
        group.position.set(0, 0, 0)
      }
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
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', filter: 'drop-shadow(0 0 40px #4f9eff44)' }}
    />
  )
}

export default BrainMesh
