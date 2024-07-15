import { updateServiceOptions, updateSummary, generateCalendar } from './form.js';
import { updateParallax } from './parallax.js';
import { updateFormDataDisplay } from './form.js';

export const steps = document.querySelectorAll('.step');
export const nextButtons = document.querySelectorAll('button[id^="next"]');
export const prevButtons = document.querySelectorAll('button[id^="prev"]');
export const categoryBoxes = document.querySelectorAll('.category-box');

export const state = {
    currentStep: 0,
    totalSteps: steps.length,
    selectedCategory: null,
    selectedServices: [],
    totalTime: 0,
    currentDate: new Date(),
    selectedDate: null,
    selectedTime: null
};

export function showStep(stepIndex) {
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === stepIndex);
    });
    updateParallax(stepIndex);

    if (stepIndex === 1) {
        updateServiceOptions();
    } else if (stepIndex === 2) {
        updateSummary();
        generateCalendar(state.currentDate.getFullYear(), state.currentDate.getMonth());
    }
    
    updateFormDataDisplay();
}
