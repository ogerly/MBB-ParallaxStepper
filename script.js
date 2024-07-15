import { showStep, categoryBoxes, nextButtons, prevButtons, state } from './stepper.js';
import { updateFormDataDisplay } from './form.js';

console.log("selectedCategory", state.selectedCategory);
console.log("selectedServices", state.selectedServices);
console.log("totalTime", state.totalTime);

document.addEventListener('DOMContentLoaded', () => {
    // Initial display
    showStep(0);
    updateFormDataDisplay();

    categoryBoxes.forEach(box => {
        console.log("box1", box);
        box.addEventListener('click', () => {
            console.log("box2", box);
            console.log("box.dataset", box.dataset); // Debugging-Ausgabe hinzufügen

            if (box.dataset && box.dataset.category) {
                categoryBoxes.forEach(b => b.classList.remove('selected'));
                box.classList.add('selected');
                state.selectedCategory = box.dataset.category; // Diese Zeile kann jetzt funktionieren, da selectedCategory im state Objekt ist
                state.selectedServices = []; // Zurücksetzen der ausgewählten Services
                state.totalTime = 0; // Zurücksetzen der Gesamtzeit
                updateFormDataDisplay();

                if (state.currentStep < state.totalSteps - 1) {
                    state.currentStep += 1;
                    showStep(state.currentStep); // Stelle sicher, dass showStep aufgerufen wird
                }
            } else {
                console.error("box.dataset.category is undefined", box);
            }
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (state.currentStep < state.totalSteps - 1) {
                state.currentStep += 1;
                showStep(state.currentStep);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (state.currentStep > 0) {
                state.currentStep -= 1;
                showStep(state.currentStep);
            }
        });
    });
});
