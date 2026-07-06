import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import * as THREE from 'three'

const DAY_TEXTURE = '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
const NIGHT_TEXTURE = '//unpkg.com/three-globe/example/img/earth-night.jpg'

// --- Sun position (approximation, plenty accurate for rendering) ---
// Returns [lng, lat] of the point on Earth directly under the sun right now,
// so the lit half and the terminator always match real time. No timezone
// needed — it's computed from UTC.
function sunPosAt(dt = new Date()) {
  const dayStart = new Date(dt).setUTCHours(0, 0, 0, 0)
  const dayFraction = (dt - dayStart) / 864e5
  const yearStart = Date.UTC(dt.getUTCFullYear(), 0, 0)
  const dayOfYear = Math.floor((dt - yearStart) / 864e5)
  // Solar declination (degrees)
  const declination = -23.44 * Math.cos(((2 * Math.PI) / 365) * (dayOfYear + 10))
  // Equation of time (minutes)
  const b = (2 * Math.PI * (dayOfYear - 81)) / 364
  const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b)
  const lng = 180 - dayFraction * 360 - eot / 4
  return [lng, declination]
}

// --- Day/night shader: blends the two textures across the terminator ---
const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec2 vUv;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  #define PI 3.141592653589793
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform vec2 sunPosition;    // [lng, lat] under the sun
  uniform vec2 globeRotation;  // camera POV [lng, lat]
  varying vec3 vNormal;
  varying vec2 vUv;

  float toRad(in float a) { return a * PI / 180.0; }

  vec3 polar2Cartesian(in vec2 c) { // [lng, lat]
    float theta = toRad(90.0 - c.x);
    float phi = toRad(90.0 - c.y);
    return vec3(sin(phi) * cos(theta), cos(phi), sin(phi) * sin(theta));
  }

  void main() {
    float invLon = toRad(globeRotation.x);
    float invLat = -toRad(globeRotation.y);
    mat3 rotX = mat3(
      1, 0, 0,
      0, cos(invLat), -sin(invLat),
      0, sin(invLat), cos(invLat)
    );
    mat3 rotY = mat3(
      cos(invLon), 0, sin(invLon),
      0, 1, 0,
      -sin(invLon), 0, cos(invLon)
    );
    vec3 sunDirection = rotX * rotY * polar2Cartesian(sunPosition);
    float intensity = dot(normalize(vNormal), normalize(sunDirection));
    vec4 dayColor = texture2D(dayTexture, vUv);
    vec4 nightColor = texture2D(nightTexture, vUv);
    // Night grading: gamma (1.6) crushes the dim ocean/terrain toward black,
    // then gain (2.2) boosts what's left — the city lights.
    nightColor.rgb = pow(nightColor.rgb, vec3(1.6)) * 2.2;
    // Twilight band: widen/narrow by changing the +/- range
    float blendFactor = smoothstep(-0.12, 0.12, intensity);
    gl_FragColor = mix(nightColor, dayColor, blendFactor);
  }
`

export default function GlobeView({ locations, selected, onSelect }) {
  const globeRef = useRef()
  const containerRef = useRef()
  const [size, setSize] = useState({ width: 0, height: 0 })

  // Custom globe material blending day/night textures
  const globeMaterial = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: null },
        nightTexture: { value: null },
        sunPosition: { value: new THREE.Vector2() },
        globeRotation: { value: new THREE.Vector2() },
      },
      vertexShader,
      fragmentShader,
    })
    const loader = new THREE.TextureLoader()
    // Note: don't set texture.colorSpace here — the custom shader outputs
    // colors as-is, so decoding to linear would render everything too dark.
    loader.load(DAY_TEXTURE, (t) => {
      material.uniforms.dayTexture.value = t
    })
    loader.load(NIGHT_TEXTURE, (t) => {
      material.uniforms.nightTexture.value = t
    })
    return material
  }, [])

  // Keep the sun where it actually is; refresh once a minute
  useEffect(() => {
    const update = () => {
      const [lng, lat] = sunPosAt(new Date())
      globeMaterial.uniforms.sunPosition.value.set(lng, lat)
    }
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [globeMaterial])

  // The shader needs the camera POV to orient the sun correctly
  const handleZoom = useCallback(
    ({ lng, lat }) => {
      globeMaterial.uniforms.globeRotation.value.set(lng, lat)
    },
    [globeMaterial],
  )

  // Fit globe canvas to its container
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Slow auto-rotate
  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return
    const controls = globe.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controls.enableDamping = true
  }, [])

  // Pause rotation + fly to a location when selected
  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return
    if (selected) {
      globe.controls().autoRotate = false
      globe.pointOfView({ lat: selected.lat, lng: selected.lng, altitude: 1.2 }, 900)
    } else {
      globe.controls().autoRotate = false
    }
  }, [selected])

  // Apple Photos–style marker: photo thumbnail card with count badge + tail
  const makeMarker = (loc) => {
    const el = document.createElement('div')
    el.className = 'photo-marker'
    el.innerHTML = `
      <div class="photo-marker-inner">
        <div class="photo-marker-card">
          <img src="${loc.photos[0].thumb}" alt="${loc.city}" draggable="false" />
          <span class="photo-marker-count">${loc.photoCount.toLocaleString()}</span>
        </div>
        <div class="photo-marker-tail"></div>
      </div>
    `
    el.title = `${loc.city}, ${loc.country}`
    el.onclick = (e) => {
      e.stopPropagation()
      onSelect(loc)
    }
    return el
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Globe
        ref={globeRef}
        width={size.width}
        height={size.height}
        backgroundColor="rgba(0,0,0,0)"
        globeMaterial={globeMaterial}
        onZoom={handleZoom}
        atmosphereColor="#38bdf8"
        atmosphereAltitude={0.18}
        // Photo thumbnail markers (Apple Photos style)
        htmlElementsData={locations}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.01}
        htmlElement={makeMarker}
        htmlTransitionDuration={0}
      />
    </div>
  )
}
