export function updateParallax(stepIndex) {
    const translateX = stepIndex * -33.33; // Each step translates the background by 33.33%

    document.getElementById('layer1').style.transform = `translateX(${translateX * 0.3}%)`;
    document.getElementById('layer2').style.transform = `translateX(${translateX * 0.2}%)`;
    document.getElementById('layer3').style.transform = `translateX(${translateX * 0.1}%)`;
}
