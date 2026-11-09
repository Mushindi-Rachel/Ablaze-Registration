// ============================================================
//  Youth Ablaze 2026 — personal ticket (drawn on a canvas)
//  Shown after a successful registration. Guests can share it
//  to WhatsApp as an image, or download it.
// ============================================================

const EVENT = {
    name: "YOUTH ABLAZE ’26",
    subtitle: "INTERDENOMINATIONAL CONFERENCE",
    org: "JESUS CELEBRATION CENTRE KISUMU  •  YOUTHS MINISTRY",
    date: "14–18 DEC 2026",
    days: "Monday – Friday",
    time: "8:00AM – 7:00PM",
    venue: "Kisumu — between Moi Stadium & Kisumu National Polytechnic",
    theme: "#Know the God of your Father  •  1 Chronicles 28:9",
};

// The ticket is meant to be shared on WhatsApp, so private details are partly hidden.
// Set to true if you want the full phone number printed on the ticket.
const SHOW_FULL_PHONE = false;

// Logo is embedded (not loaded from a file) so the ticket can always be exported, even when
// the page is opened straight from a folder on a computer.
const LOGO_SRC = "data:image/png;base64,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";
const SHARE_URL = window.location.href.split("#")[0].split("?")[0];
const FONT = 'Inter, "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif';

// ---------- Ticket number ----------
function makeTicketId() {
    // No 0/O/1/I so it is easy to read out loud
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes = crypto.getRandomValues(new Uint8Array(6));
    return "YA26-" + Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

// ---------- Details shown on the ticket ----------
function formatPhone(raw) {
    let d = String(raw || "").replace(/[^\d]/g, "");
    if (d.startsWith("254")) d = "0" + d.slice(3);
    if (d.length !== 10) return String(raw || "").trim();
    return SHOW_FULL_PHONE ? `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}` : `${d.slice(0, 4)} ••• ${d.slice(7)}`;
}

function formatPayment(data) {
    const method = { mpesa: "M-Pesa", cash: "Cash" }[data.payment];
    if (!method) return "Boarder fee";
    const ref = String(data.paymentRef || "").trim();
    return ref ? `${method} · ••••${ref.slice(-4)}` : method;
}

function formatAgeGender(data) {
    const gender = data.gender ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : "";
    const age = data.age ? `${data.age} yrs` : "";
    return [age, gender].filter(Boolean).join(" · ") || "—";
}

// ---------- Canvas helpers ----------
function loadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null); // ticket still works without the logo
        img.src = src;
    });
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

// Text with manual letter-spacing (works in every browser)
function spacedText(ctx, text, x, y, spacing, align = "left") {
    const widths = Array.from(text, (ch) => ctx.measureText(ch).width);
    const total = widths.reduce((a, b) => a + b, 0) + spacing * (text.length - 1);
    let cx = align === "center" ? x - total / 2 : align === "right" ? x - total : x;
    const prev = ctx.textAlign;
    ctx.textAlign = "left";
    Array.from(text).forEach((ch, i) => {
        ctx.fillText(ch, cx, y);
        cx += widths[i] + spacing;
    });
    ctx.textAlign = prev;
}

// Shrink a font until the text fits
function fitFont(ctx, text, weight, maxWidth, startSize, minSize = 24) {
    let size = startSize;
    do {
        ctx.font = `${weight} ${size}px ${FONT}`;
        size -= 2;
    } while (ctx.measureText(text).width > maxWidth && size > minSize);
}

// Repeatable "barcode" generated from the ticket number
function drawBarcode(ctx, seed, x, y, w, h) {
    let n = 0;
    for (const ch of seed) n = (n * 31 + ch.charCodeAt(0)) >>> 0;
    const rand = () => ((n = (n * 1664525 + 1013904223) >>> 0) / 4294967296);
    ctx.fillStyle = "#3a1a0a";
    let cx = x;
    while (cx < x + w - 6) {
        const bar = 2 + Math.floor(rand() * 4);
        ctx.fillRect(cx, y, bar, h);
        cx += bar + 2 + Math.floor(rand() * 4);
    }
}

// ---------- Draw the ticket ----------
async function buildTicket(data, useLogo = true) {
    const W = 1000,
        H = 1610;
    const CX = 50,
        CY = 50,
        CW = 900,
        CH = 1510; // the card
    const PERF = 1166; // where the stub is torn off
    const MID = W / 2;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const logo = useLogo ? await loadImage(LOGO_SRC) : null;

    // Backdrop
    ctx.fillStyle = "#1a0b07";
    ctx.fillRect(0, 0, W, H);

    // Card shadow + clip
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.55)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 12;
    roundRect(ctx, CX, CY, CW, CH, 44);
    ctx.fillStyle = "#fff5e4";
    ctx.fill();
    ctx.restore();

    ctx.save();
    roundRect(ctx, CX, CY, CW, CH, 44);
    ctx.clip();

    // Main (top) gradient
    const g = ctx.createLinearGradient(CX, CY, CX + CW, PERF);
    g.addColorStop(0, "#ff9800");
    g.addColorStop(1, "#c8280a");
    ctx.fillStyle = g;
    ctx.fillRect(CX, CY, CW, PERF - CY);

    // Soft glow
    const glow = ctx.createRadialGradient(CX + 120, PERF - 80, 20, CX + 120, PERF - 80, 520);
    glow.addColorStop(0, "rgba(255,225,110,0.40)");
    glow.addColorStop(1, "rgba(255,225,110,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(CX, CY, CW, PERF - CY);

    // Stub (bottom)
    ctx.fillStyle = "#fff5e4";
    ctx.fillRect(CX, PERF, CW, CY + CH - PERF);
    ctx.restore();

    // Notches
    ctx.fillStyle = "#1a0b07";
    [CX, CX + CW].forEach((nx) => {
        ctx.beginPath();
        ctx.arc(nx, PERF, 34, 0, Math.PI * 2);
        ctx.fill();
    });

    // Perforation
    ctx.save();
    ctx.setLineDash([14, 12]);
    ctx.strokeStyle = "rgba(120,60,20,0.55)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(CX + 50, PERF);
    ctx.lineTo(CX + CW - 50, PERF);
    ctx.stroke();
    ctx.restore();

    // ---- Header ----
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = `600 21px ${FONT}`;
    spacedText(ctx, EVENT.org, MID, 112, 2.2, "center");

    if (logo) {
        const lw = 360;
        const lh = (logo.height / logo.width) * lw;
        ctx.drawImage(logo, MID - lw / 2, 140, lw, lh);
    }

    ctx.fillStyle = "#fff";
    fitFont(ctx, EVENT.name, 800, 780, 104);
    ctx.textAlign = "center";
    ctx.fillText(EVENT.name, MID, 468);

    ctx.fillStyle = "#ffeeaa";
    ctx.font = `700 25px ${FONT}`;
    spacedText(ctx, EVENT.subtitle, MID, 515, 5.5, "center");

    // Divider
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillRect(CX + 70, 548, CW - 140, 2);

    // ---- Attendee ----
    ctx.textAlign = "left";
    const LX = CX + 70;
    const RX = MID + 30;
    const label = (text, x, y) => {
        ctx.fillStyle = "#ffeeaa";
        ctx.font = `700 18px ${FONT}`;
        spacedText(ctx, text, x, y, 3.2);
    };

    label("ATTENDEE", LX, 598);
    ctx.fillStyle = "#fff";
    fitFont(ctx, data.name.toUpperCase(), 800, CW - 140, 68, 30);
    ctx.fillText(data.name.toUpperCase(), LX, 664);

    ctx.fillStyle = "rgba(255,255,255,0.92)";
    fitFont(ctx, data.church, 500, CW - 140, 31, 18);
    ctx.fillText(data.church, LX, 708);

    // ---- Attendee details ----
    const value = (text, x, y, maxW = 400) => {
        ctx.fillStyle = "#fff";
        fitFont(ctx, text, 800, maxW, 34, 20);
        ctx.fillText(text, x, y);
    };
    const isBoarder = data.accommodation === "boarder";

    label("PHONE", LX, 774);
    value(formatPhone(data.phone), LX, 820, 360);
    label("AGE & GENDER", RX, 774);
    value(formatAgeGender(data), RX, 820);

    label("ACCOMMODATION", LX, 884);
    value(isBoarder ? "Boarder" : "Day Scholar", LX, 930, 360);
    label(isBoarder ? "PAYMENT" : "ENTRY", RX, 884);
    value(isBoarder ? formatPayment(data) : "Free entry", RX, 930);

    // ---- Event details ----
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillRect(LX, 966, CW - 140, 2);

    label("DATE", LX, 1008);
    ctx.fillStyle = "#fff";
    ctx.font = `800 36px ${FONT}`;
    ctx.fillText(EVENT.date, LX, 1052);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = `500 21px ${FONT}`;
    ctx.fillText(EVENT.days, LX, 1083);

    label("TIME", RX, 1008);
    ctx.fillStyle = "#fff";
    ctx.font = `800 36px ${FONT}`;
    ctx.fillText(EVENT.time, RX, 1052);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = `500 21px ${FONT}`;
    ctx.fillText("Daily", RX, 1083);

    ctx.fillStyle = "rgba(255,255,255,0.92)";
    fitFont(ctx, "Venue: " + EVENT.venue, 500, CW - 140, 21, 15);
    ctx.fillText("Venue: " + EVENT.venue, LX, 1136);

    // ---- Stub ----
    ctx.fillStyle = "#7a2a08";
    ctx.font = `700 19px ${FONT}`;
    spacedText(ctx, "TICKET NO.", MID, 1222, 4, "center");

    ctx.fillStyle = "#c8280a";
    ctx.font = `800 70px ui-monospace, "SF Mono", Menlo, Consolas, monospace`;
    spacedText(ctx, data.ticketId, MID, 1300, 6, "center");

    drawBarcode(ctx, data.ticketId, CX + 110, 1328, CW - 220, 100);

    ctx.fillStyle = "#5a3a28";
    ctx.font = `600 22px ${FONT}`;
    ctx.textAlign = "center";
    ctx.fillText("Show this ticket at registration", MID, 1472);
    ctx.fillStyle = "#c8280a";
    ctx.font = `italic 700 22px ${FONT}`;
    ctx.fillText(EVENT.theme, MID, 1512);

    const url = canvas.toDataURL("image/png");
    let blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) blob = await (await fetch(url)).blob();
    return { blob, url };
}

// ---------- Share / download ----------
function shareText(data) {
    return (
        `🔥 I’m registered for Youth Ablaze ’26!\n` +
        `📅 14–18 December 2026, Kisumu\n` +
        `🎟 Ticket: ${data.ticketId}\n` +
        `#KnowTheGodOfYourFather\n\n` +
        `Register here: ${SHARE_URL}`
    );
}

function downloadTicket(blob, data) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Youth-Ablaze-Ticket-${data.ticketId}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

async function shareTicket(blob, data) {
    const file = new File([blob], `Youth-Ablaze-Ticket-${data.ticketId}.png`, { type: "image/png" });

    // Phones: opens the share sheet with the ticket image attached (pick WhatsApp)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({ files: [file], text: shareText(data), title: "Youth Ablaze ’26 Ticket" });
            return;
        } catch (err) {
            if (err.name === "AbortError") return; // person closed the share sheet
        }
    }

    // Desktop / older browsers: save the image, then open WhatsApp with the message
    downloadTicket(blob, data);
    window.open("https://wa.me/?text=" + encodeURIComponent(shareText(data)), "_blank", "noopener");
}

// ---------- Show the ticket in a popup ----------
async function showTicket(data) {
    let ticket = null;
    for (const useLogo of[true, false]) {
        try {
            ticket = await buildTicket(data, useLogo);
            break;
        } catch (err) {
            console.error("Ticket could not be drawn", err);
        }
    }

    // If the ticket or the popup library is unavailable, fall back to a simple message
    if (!ticket || !window.Swal) {
        const msg = `Registration successful! Your ticket number is ${data.ticketId}.`;
        return window.Swal ? Swal.fire({ icon: "success", title: "You’re registered!", text: msg, confirmButtonColor: "#e25909" }) : alert(msg);
    }

    const wrap = document.createElement("div");
    wrap.className = "ticket-wrap";

    const img = document.createElement("img");
    img.src = ticket.url;
    img.alt = `Your Youth Ablaze ticket, number ${data.ticketId}`;
    img.className = "ticket-preview";

    const actions = document.createElement("div");
    actions.className = "ticket-actions";

    const waBtn = document.createElement("button");
    waBtn.type = "button";
    waBtn.className = "btn-wa";
    waBtn.textContent = "Share on WhatsApp";
    waBtn.addEventListener("click", () => shareTicket(ticket.blob, data));

    const dlBtn = document.createElement("button");
    dlBtn.type = "button";
    dlBtn.className = "btn-ghost";
    dlBtn.textContent = "Download ticket";
    dlBtn.addEventListener("click", () => downloadTicket(ticket.blob, data));

    const hint = document.createElement("p");
    hint.className = "ticket-hint";
    hint.textContent = "Save your ticket — you’ll show it at registration.";

    actions.append(waBtn, dlBtn);
    wrap.append(img, actions, hint);

    return Swal.fire({
        title: "🎉 You’re registered!",
        html: wrap,
        width: 560,
        showCloseButton: true,
        confirmButtonText: "Done",
        confirmButtonColor: "#e25909",
    });
}