document.addEventListener('DOMContentLoaded', () => {
    const points = [
        { x: 50, y: 50 },
        { x: 150, y: 100 },
        { x: 200, y: 200 },
        { x: 300, y: 150 },
        { x: 400, y: 100 },
        { x: 500, y: 50 },
        { x: 300, y: 500 },
    ];

    const sonar = document.getElementById('sonar');
    const radarBar = document.querySelector('.radar-bar');

    for (let i = 1; i < 10; i++) {
        const horizontalLine = document.createElement('div');
        horizontalLine.classList.add('grid-line', 'horizontal');
        horizontalLine.style.top = `${(i * 10)}%`;
        sonar.appendChild(horizontalLine);

        const verticalLine = document.createElement('div');
        verticalLine.classList.add('grid-line', 'vertical');
        verticalLine.style.left = `${(i * 10)}%`;
        sonar.appendChild(verticalLine);
    }

    points.forEach(point => {
        const pointElement = document.createElement('div');
        pointElement.classList.add('point');
        pointElement.style.left = `${point.x}px`;
        pointElement.style.top = `${point.y}px`;
        pointElement.style.opacity = 0;
        sonar.appendChild(pointElement);

        const checkPointVisibility = () => {
            const radarTransform = getComputedStyle(radarBar).transform;
            if (radarTransform !== 'none') {
                const values = radarTransform.split('(')[1].split(')')[0].split(',');
                const a = values[0];
                const b = values[1];
                let radarAngle = Math.atan2(b, a) * (180 / Math.PI);

                let pointAngle = Math.atan2(point.y - sonar.clientHeight / 2, point.x - sonar.clientWidth / 2) * (180 / Math.PI);
                if (pointAngle < 0) pointAngle += 360;
                if (radarAngle < 0) radarAngle += 360;

                if (Math.abs(radarAngle - pointAngle) < 5) {
                    pointElement.style.opacity = 1;
                    setTimeout(() => {
                        pointElement.style.opacity = 0;
                    }, 1000);
                }
            }
        };

        setInterval(checkPointVisibility, 100);
    });
});