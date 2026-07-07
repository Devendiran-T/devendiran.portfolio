import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const NODE_COUNT = 60
const RADIUS = 2.2

const NeuralCanvas = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 5.5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    // Nodes on sphere surface
    const nodePositions = Array.from({ length: NODE_COUNT }, () => {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      return new THREE.Vector3(
        RADIUS * Math.sin(phi) * Math.cos(theta),
        RADIUS * Math.sin(phi) * Math.sin(theta),
        RADIUS * Math.cos(phi)
      )
    })

    // Node spheres
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x4f9eff })
    const nodeGroup = new THREE.Group()
    nodePositions.forEach((pos) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), nodeMat)
      mesh.position.copy(pos)
      nodeGroup.add(mesh)
    })
    scene.add(nodeGroup)

    // Edges between nearby nodes
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x4f9eff, transparent: true, opacity: 0.25 })
    const edgeGroup = new THREE.Group()
    const MAX_DIST = 1.6
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < MAX_DIST) {
          const geo = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]])
          edgeGroup.add(new THREE.Line(geo, edgeMat))
        }
      }
    }
    scene.add(edgeGroup)

    // Outer glow ring
    const ringGeo = new THREE.TorusGeometry(RADIUS + 0.15, 0.012, 8, 120)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x9b6bff, transparent: true, opacity: 0.5 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 4
    scene.add(ring)

    // Animate
    let frameId
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      nodeGroup.rotation.y += 0.003
      nodeGroup.rotation.x += 0.001
      edgeGroup.rotation.y += 0.003
      edgeGroup.rotation.x += 0.001
      ring.rotation.z += 0.004
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
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="neural-canvas w-full h-full" />
}

export default NeuralCanvas
