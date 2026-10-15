// ── Screen navigation helper ──
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── Plant list stored in memory ──
let plants = [];

function renderPlants() {
  const list = document.getElementById('plant-list'); 
  list.innerHTML = '';
  plants.forEach((plant, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" id="plant-${index}" ${plant.watered ? 'checked' : ''}
             aria-label="Mark ${plant.name} as watered">
      <label for="plant-${index}" style="${plant.watered ? 'text-decoration:line-through;color:#78966D' : ''}">
        ${plant.name}
      </label>
    `;
    // Toggle watered state
    li.querySelector('input').addEventListener('change', () => {
      plants[index].watered = !plants[index].watered;
      renderPlants();
    });
    list.appendChild(li);
  });
}

// ── Button events ──
document.getElementById('btn-add').addEventListener('click', () => {
  showScreen('screen-action');
});

document.getElementById('btn-cancel').addEventListener('click', () => {
  showScreen('screen-home');
});

document.getElementById('btn-save').addEventListener('click', () => {
  const name = document.getElementById('plant-name').value.trim();
  if (!name) {
    alert('Please enter a plant name. 🌱');
    return;
  }
  plants.push({ name, watered: false });
  renderPlants();
  document.getElementById('plant-name').value = '';
  showScreen('screen-confirm');
});

document.getElementById('btn-home').addEventListener('click', () => {
  showScreen('screen-home');
});

// Initialize
renderPlants();

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker registered'))
      .catch(err => console.error('SW registration failed:', err));
  });
}