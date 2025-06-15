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

// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Menu przełączające widoki
    document.querySelectorAll('menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const viewNum = this.getAttribute('data-view');
            document.querySelectorAll('section .view').forEach(div => {
                if(div.getAttribute('data-view') === viewNum) {
                    div.style.display = '';
                } else {
                    div.style.display = 'none';
                }
            });
            // Opcjonalnie: podświetlanie aktywnego menu
            document.querySelectorAll('menu a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
