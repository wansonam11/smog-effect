// const canvas = document.getElementById("waveCanvas");
// const scene = new THREE.Scene();
// const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
// const camera = new THREE.OrthographicCamera(
//   -1, // 왼쪽
//   1, // 오른쪽
//   1, // 위쪽
//   -1, // 아래쪽
//   0, // 가까운 클리핑 평면
//   1 // 먼 클리핑 평면
// );

// // 렌더러 초기 설정
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);

// // ShaderMaterial 정의
// const material = new THREE.ShaderMaterial({
//   vertexShader: `
//     varying vec2 vUv;

//     void main() {
//       vUv = uv; // UV 좌표 전달
//       gl_Position = vec4(position, 1.0);
//     }
//   `,
//   fragmentShader: `
//     uniform float uTime;
//     varying vec2 vUv;

//     float random(vec2 st) {
//       return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
//     }

//     float noise(vec2 st) {
//       vec2 i = floor(st);
//       vec2 f = fract(st);

//       float a = random(i);
//       float b = random(i + vec2(1.0, 0.0));
//       float c = random(i + vec2(0.0, 1.0));
//       float d = random(i + vec2(1.0, 1.0));

//       vec2 u = f * f * (3.0 - 2.0 * f);

//       return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
//     }

//     void main() {
//       vec2 st = vUv * 3.0; // 텍스처 확대
//       float n = noise(st + uTime * 0.4); // 시간에 따른 애니메이션
//       n += 0.5 * noise(st * 2.0 + uTime * 0.2); // 다양한 크기의 노이즈 추가
//       n += 0.25 * noise(st * 4.0 + uTime * 0.3); // 더 세밀한 노이즈 추가

//       // 회색빛이 도는 색상
//       vec3 color = mix(vec3(0.6, 0.6, 0.6), vec3(0.9, 0.9, 0.9), n);
//       gl_FragColor = vec4(color, 1.0);
//     }
//   `,
//   uniforms: {
//     uTime: { value: 0 }, // 시간 값을 전달
//   },
//   transparent: true, // 투명도 활성화
// });

// // PlaneGeometry 생성 (화면에 꽉 차게 설정)
// const geometry = new THREE.PlaneGeometry(2, 2);

// // Mesh 생성
// const plane = new THREE.Mesh(geometry, material);
// scene.add(plane);

// // 애니메이션 루프
// const clock = new THREE.Clock();
// function animate() {
//   requestAnimationFrame(animate);

//   // 시간 업데이트
//   material.uniforms.uTime.value = clock.getElapsedTime();

//   // 렌더링
//   renderer.render(scene, camera);
// }
// animate();

// // 창 크기 변경 처리
// function resizeCanvas() {
//   const width = window.innerWidth;
//   const height = window.innerHeight;

//   // 렌더링 크기 업데이트
//   renderer.setSize(width, height);

//   // 카메라 종횡비 업데이트
//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();
// }

// // 초기 설정 및 창 크기 변경 이벤트 리스너
// resizeCanvas();
// window.addEventListener("resize", resizeCanvas);
const canvas = document.getElementById("waveCanvas");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
const camera = new THREE.OrthographicCamera(
  -1, // 왼쪽
  1, // 오른쪽
  1, // 위쪽
  -1, // 아래쪽
  0, // 가까운 클리핑 평면
  1 // 먼 클리핑 평면
);

// 렌더러 초기 설정
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// ShaderMaterial 정의
const material = new THREE.ShaderMaterial({
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv; // UV 좌표 전달
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 st = vUv * 1.5; // 텍스처 스케일 확대 (기존 3.0 → 1.5)
      float n = noise(st + uTime * 0.4); // 시간에 따른 애니메이션
      n += 0.5 * noise(st * 2.0 + uTime * 0.2); // 다양한 크기의 노이즈 추가
      n += 0.25 * noise(st * 4.0 + uTime * 0.3); // 더 세밀한 노이즈 추가

      // 회색빛이 도는 색상
      vec3 color = mix(vec3(0.6, 0.6, 0.6), vec3(0.9, 0.9, 0.9), n);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  uniforms: {
    uTime: { value: 0 }, // 시간 값을 전달
  },
  transparent: true, // 투명도 활성화
});

// PlaneGeometry 생성 (크기 확대)
const geometry = new THREE.PlaneGeometry(3, 3); // 기존 2x2에서 4x4로 확대

// Mesh 생성
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// 애니메이션 루프
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  // 시간 업데이트
  material.uniforms.uTime.value = clock.getElapsedTime();

  // 렌더링
  renderer.render(scene, camera);
}
animate();

// 창 크기 변경 처리
function resizeCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // 렌더링 크기 업데이트
  renderer.setSize(width, height);
}

// 초기 설정 및 창 크기 변경 이벤트 리스너
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
