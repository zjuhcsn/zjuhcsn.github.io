document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.className = 'orb-container';
  container.id = 'orbContainer';
  
  // 创建6个圆点
  for (let i = 0; i < 6; i++) {
    const orb = document.createElement('div');
    orb.className = 'orb';
    container.appendChild(orb);
  }
  document.body.appendChild(container);

  // 运行动画逻辑
  const orbs = document.querySelectorAll('.orb');
  let mouseX = window.innerWidth/2;
  let mouseY = window.innerHeight/2;
  let containerX = mouseX;
  let containerY = mouseY;
  const ease = 0.25;
  const radius = 45;
  let angle = 0;

  orbs.forEach((orb, index) => {
    orb.baseAngle = (360 / 6) * index;
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    containerX += (mouseX - containerX) * ease;
    containerY += (mouseY - containerY) * ease;
    container.style.left = `${containerX}px`;
    container.style.top = `${containerY}px`;

    const orbitSpeed = 1.5;
    const spinSpeed = 10;
    
    orbs.forEach((orb, index) => {
      const orbitAngle = orb.baseAngle + angle * orbitSpeed;
      const spinAngle = angle * spinSpeed;
      const radians = orbitAngle * Math.PI / 180;
      const x = Math.cos(radians) * radius;
      const y = Math.sin(radians) * radius;
      
      orb.style.transform = `translate(${x}px, ${y}px) rotate(${spinAngle}deg)`;
      orb.style.color = `hsl(${(index * 60) % 360}, 100%, 65%)`;
    });

    angle += 1.5;
    requestAnimationFrame(animate);
  }

  animate();
});