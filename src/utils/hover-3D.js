let cards = document.querySelectorAll('.hover-card');

updateCards();
function rotateToMouse(e) {
    const card = e.currentTarget;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const bounds = card.getBoundingClientRect();
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    card.style.transform = `
    scale3d(1.07, 1.07, 1.07)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 2}deg
    )
  `;

    const glowElement = card.querySelector('.glow');
    if (glowElement) {
        glowElement.style.backgroundImage = `
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width / 2}px
        ${center.y * 2 + bounds.height / 2}px,
        #cc6ccc55,
        #0000000f
      )
    `;
    }
}

function handleMouseEnter(e) {
    const card = e.currentTarget;
    card.addEventListener('mousemove', rotateToMouse);
}

function handleMouseLeave(e) {
    const card = e.currentTarget;
    card.removeEventListener('mousemove', rotateToMouse);
    card.style.transform = '';
    const glowElement = card.querySelector('.glow');
    if (glowElement) {
        glowElement.style.backgroundImage = '';
    }
}

function updateCards() {
    cards = document.querySelectorAll('.hover-card');
    cards.forEach((card) => {
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
    });
}