import * as THREE from 'three'

export class ParticleField {
  public points: THREE.Points
  private geometry: THREE.BufferGeometry
  private material: THREE.PointsMaterial
  private particleCount = 2000
  private positions: Float32Array
  private initialPositions: Float32Array
  private velocities: Float32Array

  constructor() {
    this.geometry = new THREE.BufferGeometry()
    this.positions = new Float32Array(this.particleCount * 3)
    this.initialPositions = new Float32Array(this.particleCount * 3)
    this.velocities = new Float32Array(this.particleCount * 3)

    const colors = new Float32Array(this.particleCount * 3)

    // Palette: Neon green (#c0fb50) and Lavender/Blue (#8ca6ff) and White
    const colorAccent = new THREE.Color('#c0fb50')
    const colorBlue = new THREE.Color('#8ca6ff')
    const colorWhite = new THREE.Color('#ffffff')

    const spread = 80

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3

      // Distribute particles in a spherical/layered volume
      const x = (Math.random() - 0.5) * spread
      const y = (Math.random() - 0.5) * spread
      const z = (Math.random() - 0.5) * spread

      this.positions[i3] = x
      this.positions[i3 + 1] = y
      this.positions[i3 + 2] = z

      this.initialPositions[i3] = x
      this.initialPositions[i3 + 1] = y
      this.initialPositions[i3 + 2] = z

      this.velocities[i3] = (Math.random() - 0.5) * 0.02
      this.velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
      this.velocities[i3 + 2] = (Math.random() - 0.5) * 0.02

      // Color distribution: 60% white/muted, 25% accent green, 15% blue
      const rand = Math.random()
      let c = colorWhite
      if (rand < 0.25) {
        c = colorAccent
      } else if (rand < 0.4) {
        c = colorBlue
      }

      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Create subtle circular particle texture programmatically
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 32, 32)
    }

    const texture = new THREE.CanvasTexture(canvas)

    this.material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    this.points = new THREE.Points(this.geometry, this.material)
  }

  public update(time: number, mouseX: number, mouseY: number) {
    const posAttr = this.geometry.getAttribute('position') as THREE.BufferAttribute
    const positions = posAttr.array as Float32Array

    // Subtle drift + mouse interaction
    const t = time * 0.0008

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3

      // Harmonic oscillation
      positions[i3 + 1] = this.initialPositions[i3 + 1] + Math.sin(t + this.initialPositions[i3] * 0.1) * 2
      positions[i3] = this.initialPositions[i3] + Math.cos(t + this.initialPositions[i3 + 2] * 0.1) * 1.5

      // Subtle reaction to mouse offset
      positions[i3] += (mouseX * 5 - positions[i3]) * 0.0005
      positions[i3 + 1] += (-mouseY * 5 - positions[i3 + 1]) * 0.0005
    }

    posAttr.needsUpdate = true

    // Slow ambient rotation of the entire particle cloud
    this.points.rotation.y = time * 0.0001
    this.points.rotation.x = Math.sin(time * 0.00005) * 0.1
  }

  public dispose() {
    this.geometry.dispose()
    this.material.map?.dispose()
    this.material.dispose()
  }
}
