// script.js
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.createElement('button');
    btn.textContent = '🌙 Tryb ciemny';
    btn.style.position = 'fixed';
    btn.style.bottom = '30px';
    btn.style.right = '30px';
    btn.style.padding = '12px 20px';
    btn.style.border = 'none';
    btn.style.borderRadius = '8px';
    btn.style.background = '#4e54c8';
    btn.style.color = '#fff';
    btn.style.cursor = 'pointer';
    btn.style.zIndex = 1000;
    btn.style.boxShadow = '0 2px 8px #4e54c866';

    let dark = false;

    btn.onclick = function() {
        document.body.classList.toggle('darkmode');
        dark = !dark;
        btn.textContent = dark ? '☀️ Tryb jasny' : '🌙 Tryb ciemny';
    }

    document.body.appendChild(btn);
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const viewNum = this.getAttribute('data-view');
            document.querySelectorAll('section .view').forEach(div => {
                // Pokaż tylko wybrany widok
                div.style.display = (div.getAttribute('data-view') === viewNum) ? '' : 'none';
            });
            // Podświetlenie aktywnego menu
            document.querySelectorAll('menu a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });
});


function updateClock() {
  const clock = document.getElementById('clock');
  if (clock) {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${h}:${m}:${s}`;
  }
}

// Odświeżaj zegar co sekundę tylko jeśli widoczny jest widok 1
let clockInterval = null;

function handleViewSwitch(viewNum) {
  if (viewNum === "1") {
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
  } else if (clockInterval) {
    clearInterval(clockInterval);
    clockInterval = null;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('menu a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const viewNum = this.getAttribute('data-view');
      document.querySelectorAll('section .view').forEach(div => {
        div.style.display = (div.getAttribute('data-view') === viewNum) ? '' : 'none';
      });
      document.querySelectorAll('menu a').forEach(a => a.classList.remove('active'));
      this.classList.add('active');
      handleViewSwitch(viewNum);
    });
  });
  // domyślnie zegar uruchamia się, jeśli startowy widok to 1
  handleViewSwitch("1");
});

function createCalendar(year, month) {
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const table = document.createElement('table');
    table.className = 'calendar-table';

    // Nagłówki dni tygodnia
    const days = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];
    const thead = table.createTHead();
    const row = thead.insertRow();
    for (let d of days) {
        const th = document.createElement('th');
        th.textContent = d;
        row.appendChild(th);
    }

    // Komórki dni miesiąca
    const tbody = table.createTBody();
    let tr = tbody.insertRow();
    let dayOfWeek = (firstDay.getDay() + 6) % 7; // Przesunięcie: poniedziałek = 0
    for (let i = 0; i < dayOfWeek; i++) tr.insertCell(); // Puste przed początkiem

    for (let d = 1; d <= lastDay.getDate(); d++) {
        if (dayOfWeek === 7) {
            tr = tbody.insertRow();
            dayOfWeek = 0;
        }
        const td = tr.insertCell();
        td.textContent = d;
        if (isCurrentMonth && d === today.getDate()) {
            td.className = 'today';
        }
        dayOfWeek++;
    }
    return table;
}

// Po załadowaniu widoku menu 2:
function showCalendar() {
    const now = new Date();
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = ''; // Wyczyszczenie poprzedniego kalendarza
    calendarDiv.appendChild(createCalendar(now.getFullYear(), now.getMonth()));
}

// Wywołaj showCalendar() gdy użytkownik przełącza na Menu 2
// Jeśli masz już obsługę przełączania widoków, dodaj wywołanie showCalendar tam, gdzie pokazujesz widok 2
document.querySelectorAll('menu a[data-view]').forEach(link => {
    link.addEventListener('click', function() {
        const view = this.getAttribute('data-view');
        if(view === "2") showCalendar();
    });
});

// Możesz też wywołać raz na starcie, jeśli Menu 2 jest domyślnie widoczne
