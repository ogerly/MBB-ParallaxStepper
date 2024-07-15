import { state } from './stepper.js';

export const formDataDisplay = document.getElementById('form-data-display');
export const formInputs = document.querySelectorAll('input');

export const maxMonths = 3;

export const serviceOptions = {
    damen: [
        { name: "Haarschnitt", time: 30 },
        { name: "Färben", time: 60 },
        { name: "Strähnen", time: 90 },
        { name: "Styling", time: 30 },
        { name: "Maniküre", time: 45 },
        { name: "Pediküre", time: 45 },
        { name: "Gesichtsbehandlung", time: 60 },
        { name: "Massage", time: 60 }
    ],
    herren: [
        { name: "Haarschnitt trocken", time: 30 },
        { name: "Haarschnitt mit Waschen", time: 45 },
        { name: "Haarschnitt mit Waschen und Pflege", time: 60 },
        { name: "Bartpflege", time: 30 },
        { name: "Bartpflege mit Pflege", time: 45 },
        { name: "Färben", time: 45 },
        { name: "Gesichtsbehandlung", time: 45 }
    ],
    kinder: [
        { name: "Haarschnitt", time: 20 },
        { name: "Styling", time: 15 }
    ]
};

export function updateServiceOptions() {
    const serviceOptionsContainer = document.getElementById('service-options');
    serviceOptionsContainer.innerHTML = '';

    if (state.selectedCategory && serviceOptions[state.selectedCategory]) {
        serviceOptions[state.selectedCategory].forEach((service, index) => {
            const serviceBox = document.createElement('div');
            serviceBox.classList.add('service-box');

            serviceBox.innerHTML = `
                <p>${service.name}</p>
                <p>${service.time} min</p>
            `;

            serviceBox.addEventListener('click', () => {
                serviceBox.classList.toggle('selected');
                if (serviceBox.classList.contains('selected')) {
                    state.selectedServices.push(service.name);
                    state.totalTime += service.time;
                } else {
                    state.selectedServices = state.selectedServices.filter(s => s !== service.name);
                    state.totalTime -= service.time;
                }
                updateTimeDisplay();
                updateFormDataDisplay();
            });

            serviceOptionsContainer.appendChild(serviceBox);
        });
    }
    updateTimeDisplay();
}

export function updateSummary() {
    const selectedServicesElement = document.getElementById('selected-services');
    const totalTimeElement = document.getElementById('total-time');

    selectedServicesElement.innerHTML = `<p>Services: ${state.selectedServices.join(', ')}</p>`;
    totalTimeElement.innerHTML = `<p>Gesamtzeit: ${state.totalTime} min</p>`;
}

export function generateCalendar(year, month) {
    const calendar = document.getElementById('calendar');
    const currentMonthYear = document.getElementById('current-month-year');
    calendar.innerHTML = '';

    const date = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();

    currentMonthYear.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    for (let i = 0; i < date.getDay(); i++) {
        calendar.appendChild(document.createElement('div'));
    }

    for (let i = 1; i <= lastDay; i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-day');
        day.textContent = i;

        const currentDateToCheck = new Date(year, month, i);
        const isWeekend = currentDateToCheck.getDay() === 0 || currentDateToCheck.getDay() === 6;

        if (currentDateToCheck < state.currentDate || isWeekend) {
            day.classList.add('disabled');
            if (isWeekend) day.classList.add('weekend');
        } else {
            day.addEventListener('click', () => {
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                day.classList.add('selected');
                state.selectedDate = new Date(year, month, i);
                showTimeSlots();
                updateFormDataDisplay();
            });
        }

        calendar.appendChild(day);
    }
}

export function showTimeSlots() {
    const timeSlotsContainer = document.getElementById('time-slots-container');
    const timeSlotsDiv = document.getElementById('time-slots');
    timeSlotsContainer.innerHTML = '';
    timeSlotsDiv.style.display = 'block';

    for (let hour = 10; hour < 18; hour++) {
        const timeSlot = document.createElement('div');
        timeSlot.classList.add('time-slot');
        timeSlot.textContent = `${hour}:00`;
        timeSlot.addEventListener('click', () => {
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
            timeSlot.classList.add('selected');
            state.selectedTime = `${hour}:00`;
            updateFormDataDisplay();
        });
        timeSlotsContainer.appendChild(timeSlot);
    }
}

export function updateTimeDisplay() {
    const timeDisplay = document.getElementById('time-display');
    timeDisplay.textContent = `Gesamtzeit: ${state.totalTime} min`;
}

export function updateFormDataDisplay() {
    formDataDisplay.innerHTML = '';
    if (state.selectedCategory) {
        const categorySpan = document.createElement('span');
        categorySpan.textContent = `Kategorie: ${state.selectedCategory}`;
        formDataDisplay.appendChild(categorySpan);
    }
    if (state.selectedServices.length > 0) {
        const servicesSpan = document.createElement('span');
        servicesSpan.textContent = `Services: ${state.selectedServices.join(', ')}`;
        formDataDisplay.appendChild(servicesSpan);
    }
    const timeSpan = document.createElement('span');
    timeSpan.textContent = `Gesamtzeit: ${state.totalTime} min`;
    formDataDisplay.appendChild(timeSpan);
    if (state.selectedDate) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = `Termin: ${state.selectedDate.toLocaleDateString()}`;
        formDataDisplay.appendChild(dateSpan);
    }
    if (state.selectedTime) {
        const timeSpan = document.createElement('span');
        timeSpan.textContent = `Uhrzeit: ${state.selectedTime}`;
        formDataDisplay.appendChild(timeSpan);
    }
    formInputs.forEach(input => {
        if (input.value) {
            const span = document.createElement('span');
            span.textContent = `${input.placeholder}: ${input.value}`;
            formDataDisplay.appendChild(span);
        }
    });
}
