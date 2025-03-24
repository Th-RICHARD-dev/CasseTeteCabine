document.addEventListener('DOMContentLoaded', () => {
    const points = [
        { angle: 0, radius: 20, data: 'gjridgbid' },
        { angle: 45, radius: 40, data: 'hrduigq' },
        { angle: 90, radius: 60, data: 'djserfnkv' },
        { angle: 135, radius: 80, data: 'vsr,ospr' },
        { angle: 180, radius: 100, data: 'vrsopqzf' },
        { angle: 225, radius: 80, data: 'bhdijselwm' },
        { angle: 270, radius: 20, data: 'capsule' },
        { angle: 315, radius: 40, data: 'extra' },
    ];

    const sonar = document.getElementById('sonar');
    const radarBar = document.querySelector('.radar-bar');
    const info = document.getElementById('info');
    let selectedPoint = null;

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
        pointElement.style.left = `calc(50% + ${point.radius * Math.cos(point.angle * Math.PI / 180)}%)`;
        pointElement.style.top = `calc(50% + ${point.radius * Math.sin(point.angle * Math.PI / 180)}%)`; // Adjusted calculation
        pointElement.style.opacity = 0;
        pointElement.setAttribute('data-info', point.data);

        if (point.data === 'capsule') {
            pointElement.classList.add('capsule');
        }

        pointElement.addEventListener('click', () => {
            if (selectedPoint) {
                selectedPoint.classList.remove('selected');
            }
            pointElement.classList.add('selected');
            selectedPoint = pointElement;
            info.textContent = point.data;
        });

        sonar.appendChild(pointElement);

        const checkPointVisibility = () => {
            const radarTransform = getComputedStyle(radarBar).transform;
            if (radarTransform !== 'none') {
                const values = radarTransform.split('(')[1].split(')')[0].split(',');
                const a = values[0];
                const b = values[1];
                let radarAngle = Math.atan2(b, a) * (180 / Math.PI);

                let pointAngle = point.angle;
                if (pointAngle < 0) pointAngle += 360;
                if (radarAngle < 0) radarAngle += 360;

                if (Math.abs(radarAngle - pointAngle) < 5) {
                    pointElement.style.opacity = 1;
                    setTimeout(() => {
                        if (!pointElement.classList.contains('selected')) {
                            pointElement.style.opacity = 0;
                        }
                    }, 1000);
                }
            }
        };

        setInterval(checkPointVisibility, 100);
    });
});
