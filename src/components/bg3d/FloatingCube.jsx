import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Wireframe rotating cube cluster — used in Experience section
const FloatingCube = () => {
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

    const sizes   = [2.8, 1.8, 1.2, 0.8]
    const offsets = [
      [0, 0, 0], [2.8, 1.4, -1.5], [-2.4, -1.0, -0.8], [1.4, -2.0, 1.2]
    ]
    const colors  = [0x4f9eff, 0x9b6bff, 0x4f9eff, 0x9b6bff]

    sizes.forEach((s, i) => {
      const mat  = new THREE.MeshBasicMaterial({ color: colors[i], wireframe: true, transparent: true, opacity: 0.28 })
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), mat)
      mesh.position.set(...offsets[i])
      mesh.userData.rx = (Math.random() - 0.5) * 0.012
      mesh.userData.ry = (Math.random() - 0.5) * 0.014
      group.add(mesh)
    })

    let frameId
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      group.children.forEach(m => {
        m.rotation.x += m.userData.rx
        m.rotation.y += m.userData.ry
      })
      group.rotation.y += 0.004
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h; camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(frameId); window.removeEventListener('resize', onResize); if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); renderer.dispose() }
  }, [])

  return <div ref={mountRef} className="w-full h-full" style={{ filter: 'drop-shadow(0 0 20px #4f9eff33)' }} />
}

export default FloatingCube
