/*
 * Hyde (hyde.ai) — Preloader Waves & Text Scramble JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
    // Hide loader after 2.5s
    setTimeout(() => {
        const loader = document.getElementById("loaderComponent");
        if (loader) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }
    }, 2500);

    // Text Scramble Effect
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    function scrambleText(el, originalText, duration = 0.6) {
        let progress = { value: 0 };
        let tick = 0;

        const interval = setInterval(() => {
            tick++;
            progress.value += 0.05;

            if (tick % 2 === 0) {
                const resolvedCount = Math.floor(progress.value * originalText.length);
                let display = "";
                for (let i = 0; i < originalText.length; i++) {
                    if (originalText[i] === " ") {
                        display += " ";
                    } else if (i < resolvedCount) {
                        display += originalText[i];
                    } else {
                        display += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                el.textContent = display;
            }

            if (progress.value >= 1) {
                clearInterval(interval);
                el.textContent = originalText;
            }
        }, 30);
    }

    document.querySelectorAll(".btn-scramble, .nav-link").forEach((btn) => {
        const original = btn.textContent.trim();
        btn.addEventListener("mouseenter", () => {
            scrambleText(btn, original, 0.5);
        });
    });

    // ASCII Wave Canvas Preloader
    (function () {
        const el = document.getElementById("ao");
        if (!el) return;

        let cols = 60, rows = 25;
        const CHARSET = [" ", ".", ":", "-", "=", "+", "*", "#", "@"];
        let animT = 0;

        function render() {
            let html = "";
            for (let row = 0; row < rows; row++) {
                let line = "";
                for (let col = 0; col < cols; col++) {
                    let d = Math.hypot(col - 30, row - 12);
                    let phase = (d - animT * 4) / 5;
                    let v = Math.sin(phase) * 0.5 + 0.5;
                    let charIdx = Math.floor(v * (CHARSET.length - 1));
                    line += CHARSET[charIdx];
                }
                html += line + "\n";
            }
            el.textContent = html;
        }

        setInterval(() => {
            animT += 0.1;
            render();
        }, 50);
    })();
});
