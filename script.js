const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * (window.screen.width / window.innerWidth);
canvas.height = window.innerHeight * (window.screen.height / window.innerHeight);

const gridSize = 50; // adjust grid size to your liking
const dotSize = 2; // adjust dot size to your liking

let dots = [];

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
    }
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, dotSize, dotSize);
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) {
            this.vx = -this.vx;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.vy = -this.vy;
        }
    }
}

for (let x = gridSize / 2; x < canvas.width; x += gridSize) {
    for (let y = gridSize / 2; y < canvas.height; y += gridSize) {
        dots.push(new Dot(x, y));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.length; i++) {
        dots[i].draw();
        dots[i].update();
        for (let j = i + 1; j < dots.length; j++) {
            const distX = dots[i].x - dots[j].x;
            const distY = dots[i].y - dots[j].y;
            const distance = Math.sqrt(distX * distX + distY * distY) * 0.5;
            if (distance < gridSize) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x + dotSize / 2, dots[i].y + dotSize / 2);
                ctx.lineTo(dots[j].x + dotSize / 2, dots[j].y + dotSize / 2);
                ctx.strokeStyle = "rgba(0, 255, 0, " + 12/distance + ")";
                ctx.lineWidth = 0.2;
                ctx.stroke();
            }
        }
    }
}

animate();