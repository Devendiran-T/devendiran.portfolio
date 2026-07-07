import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Wireframe octahedron cluster — used in Projects section
const FloatingOctahedron = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const W = mount.clientWidth, H = mount.clientHeight

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const configs = [
      { r: 1.3, pos: [0, 0, 0],       color: 0x9b6bff },
      { r: 0.8, pos: [1.8, 0.6, -1],  color: 0x4f9eff },
      { r: 0.5, pos: [-1.5, -0.8, 0], color: 0x9b6bff },
      { r: 0.4, pos: [0.6, -1.4, 0.6],color: 0x4f9eff },
    ]

    configs.forEach(({ r, pos, color }) => {
      const mat  = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.16 })
      const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(r, 0), mat)
      mesh.position.set(...pos)
      mesh.userData.rx = (Math.random() - 0.5) * 0.009
      mesh.userData.ry = (Math.random() - 0.5) * 0.012
      group.add(mesh)
    })

    let frameId
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      group.children.forEach(m => { m.rotation.x += m.userData.rx; m.rotation.y += m.userData.ry })
      group.rotation.y += 0.0025
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(frameId); window.removeEventListener('resize', onResize); if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); renderer.dispose() }
  }, [])

  return <div ref={mountRef} className="w-full h-full" style={{ filter: 'drop-shadow(0 0 20px #9b6bff33)' }} />
}

export default FloatingOctahedron
