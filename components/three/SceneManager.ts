import * as THREE from 'three'
import { ParticleField } from './ParticleField'

export class SceneManager {
  private container: HTMLElement
  private renderer: THREE.WebGLRenderer
  private camera: THREE.PerspectiveCamera
  private scene: THREE.Scene
  private particleField: ParticleField
  private wireframeGroup: THREE.Group

  // Mouse coords & lerped coords for silky parallax
  public mouseX = 0
  public mouseY = 0
  private targetCameraX = 0
  private targetCameraY = 0

  private resizeHandler: () => void

  constructor(container: HTMLElement) {
    this.container = container

    // 1. Scene setup
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2('#000000', 0.015)

    // 2. Camera setup
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    this.camera.position.z = 45

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(0x000000, 0)

    this.container.appendChild(this.renderer.domElement)

    // 4. Add Particle Field
    this.particleField = new ParticleField()
    this.scene.add(this.particleField.points)

    // 5. Add cybernetic geometric wireframe core
    this.wireframeGroup = new THREE.Group()

    const icosaGeometry = new THREE.IcosahedronGeometry(12, 1)
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: 0xc0fb50,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    })
    const icosaMesh = new THREE.Mesh(icosaGeometry, icosaMaterial)
    this.wireframeGroup.add(icosaMesh)

    const innerGeometry = new THREE.OctahedronGeometry(6, 0)
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x8ca6ff,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    })
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial)
    this.wireframeGroup.add(innerMesh)

    this.scene.add(this.wireframeGroup)

    // 6. Handle resize
    this.resizeHandler = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      this.camera.aspect = w / h
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(w, h)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', this.resizeHandler)
  }

  public setMouse(normX: number, normY: number) {
    this.mouseX = normX
    this.mouseY = normY
  }

  public render(time: number) {
    // Silky lerp camera toward target mouse position
    this.targetCameraX += (this.mouseX * 6 - this.targetCameraX) * 0.05
    this.targetCameraY += (-this.mouseY * 6 - this.targetCameraY) * 0.05

    this.camera.position.x = this.targetCameraX
    this.camera.position.y = this.targetCameraY
    this.camera.lookAt(0, 0, 0)

    // Update particle field
    this.particleField.update(time, this.mouseX, this.mouseY)

    // Rotate geometric cyber core
    this.wireframeGroup.rotation.x = time * 0.0003
    this.wireframeGroup.rotation.y = time * 0.0005

    this.renderer.render(this.scene, this.camera)
  }

  public dispose() {
    window.removeEventListener('resize', this.resizeHandler)

    this.particleField.dispose()

    this.wireframeGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose())
        } else {
          child.material.dispose()
        }
      }
    })

    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement)
    }

    this.renderer.dispose()
  }
}
