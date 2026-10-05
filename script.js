const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

function closeNavigation() {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Buka navigasi");
    navigation.classList.remove("is-open");
}

menuButton?.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Buka navigasi" : "Tutup navigasi");
    navigation?.classList.toggle("is-open", !isExpanded);
});

navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        closeNavigation();
        navigation.querySelectorAll("a").forEach((item) => item.classList.toggle("is-active", item === link));
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
});

const acts = [
    {
        kicker: "Babak I · Persembahan pembuka",
        title: "Panyembrama",
        description: "Adegan pembuka berupa ritual pembersihan arena dan pemujaan keselamatan. Puluhan penari pria duduk melingkar, memanjatkan doa bersama pemangku, lalu membangun keharmonisan ritme vokal cak-cak-cak secara polifonik yang menjadi musik pengiring alami sepanjang pertunjukan.",
        time: "18:00 WITA",
        image: "assets/figma/hero-ceremony.png",
        imageAlt: "Pertunjukan Kecak di tebing Uluwatu",
    },
    {
        kicker: "Babak II · Lembayung",
        title: "Hutan Dandaka",
        description: "Menggambarkan masa pengasingan Sang Rama, Dewi Sita, dan Laksmana di tengah Hutan Dandaka. Suasana adegan ini menonjolkan kedamaian, kesetiaan, serta keharmonisan hidup sederhana mereka di alam bebas sebelum konflik utama dimulai.",
        time: "18:15 WITA",
        image: "assets/figma/hutan-dandaka.jpg",
        imageAlt: "Rama, Sita, dan Laksmana berjalan memasuki Hutan Dandaka",
    },
    {
        kicker: "Babak III · Temaram",
        title: "Kijang Kencana",
        description: "Awal munculnya petaka dalam cerita. Marica menyamar menjadi sosok kijang berbulu emas yang sangat indah atas perintah Rahwana. Pesona kijang tersebut memikat hati Sita hingga meminta Rama mengejarnya, yang mengakibatkan Rama dan Laksmana terpisah jauh dari area perlindungan Sita.",
        time: "18:30 WITA",
        image: "assets/figma/kijang-kencana.jpg",
        imageAlt: "Sita menunjuk kijang emas saat Rama dan Laksmana berada di hutan",
    },
    {
        kicker: "Babak IV · Senja gelap",
        title: "Penculikan Sita",
        description: "Rahwana memanfaatkan kelengaian situasi dengan menyamar sebagai pertapa tua untuk memperdaya Sita, lalu menculiknya terbang menuju Kerajaan Alengka. Burung Jatayu sempat datang menghadang dan bertarung sengit di udara demi menyelamatkan Sita, namun akhirnya gugur akibat tebas senjata Rahwana.",
        time: "18:45 WITA",
        image: "assets/figma/penculikan-sita.jpg",
        imageAlt: "Rahwana menculik Sita menuju Kerajaan Alengka",
    },
    {
        kicker: "Babak V · Ujian api",
        title: "Klimaks Sakral",
        description: "Puncak pertunjukan yang memadukan aksi dramatis dan nilai tradisi spiritual. Adegan ini menampilkan aksi Hanoman mengamuk menerobos kobaran api, yang sering kali dipadukan dengan tradisi Sanghyang di mana penari bergerak di atas bara api sebagai simbol pembersihan dan pengusiran energi negatif dari arena.",
        time: "19:00 WITA",
        image: "assets/figma/klimaks.jpg",
        imageAlt: "Hanoman dan pasukan Rama bertempur melawan Rahwana di Alengka",
    },
];

const actTabs = [...document.querySelectorAll(".act-tab")];
const actKicker = document.querySelector("[data-act-kicker]");
const actTitle = document.querySelector("[data-act-title]");
const actDescription = document.querySelector("[data-act-description]");
const actTime = document.querySelector("[data-act-time]");
const actImage = document.querySelector("[data-act-image]");
const actCounter = document.querySelector(".act-feature-meta span:last-child");

actTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const index = Number(tab.dataset.act);
        const act = acts[index];
        if (!act) return;

        actTabs.forEach((item, itemIndex) => {
            const selected = itemIndex === index;
            item.classList.toggle("is-active", selected);
            item.setAttribute("aria-selected", String(selected));
        });

        if (actKicker) actKicker.textContent = act.kicker;
        if (actTitle) actTitle.textContent = act.title;
        if (actDescription) actDescription.textContent = act.description;
        if (actTime) actTime.textContent = act.time;
        if (actImage) {
            actImage.src = act.image;
            actImage.alt = act.imageAlt;
        }
        if (actCounter) actCounter.textContent = `${String(index + 1).padStart(2, "0")} / 05`;
    });
});

const soundLayers = [
    {
        title: "Juru Tare / Pung (Fondasi Bass)",
        description: "Mendengungkan nada rendah yang mensimulasikan tabuhan gong kempur secara siklikal, menjaga trance melingkar.",
    },
    {
        title: "Cak Kotekan Interlocking",
        description: "Pola cak yang saling menyahut membentuk jalinan ritme silang dan menjaga denyut pertunjukan tetap bergerak.",
    },
    {
        title: "Sir / Desisan Tinggi",
        description: "Lapisan desisan memberi aksen cepat di atas fondasi bass, menambah ketegangan pada setiap babak.",
    },
    {
        title: "Juru Tembang & Krama",
        description: "Pelantun kidung dan pengarah lakon mengikat melodi, narasi, dan respons lingkaran penyuara.",
    },
];

const layerTabs = [...document.querySelectorAll(".sound-layer")];
const layerTitle = document.querySelector("[data-layer-title]");
const layerDescription = document.querySelector("[data-layer-description]");

layerTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const index = Number(tab.dataset.layer);
        const layer = soundLayers[index];
        if (!layer) return;

        layerTabs.forEach((item, itemIndex) => {
            const selected = itemIndex === index;
            item.classList.toggle("is-active", selected);
            item.setAttribute("aria-selected", String(selected));
        });

        if (layerTitle) layerTitle.textContent = layer.title;
        if (layerDescription) layerDescription.textContent = layer.description;
    });
});

const audioButtons = [...document.querySelectorAll("[data-audio-toggle]")];
const audioBar = document.querySelector(".floating-audio");
const ritualAudio = document.querySelector("#ritual-audio");
const interfaceStatus = document.querySelector("#interface-status");
const audioLabels = [...document.querySelectorAll("[data-audio-label]")];
const audioPlayGlyph = document.querySelector(".play-glyph");
const audioPlayButton = document.querySelector(".audio-play");

audioLabels.forEach((label) => {
    label.dataset.defaultLabel = label.textContent.trim();
});

function updateAudioControls(isPlaying) {
    audioButtons.forEach((button) => button.setAttribute("aria-pressed", String(isPlaying)));
    audioBar?.classList.toggle("is-playing", isPlaying);

    audioLabels.forEach((label) => {
        label.textContent = isPlaying ? "Sedang diputar" : label.dataset.defaultLabel || "Audio ritual langsung";
    });

    if (audioPlayGlyph) audioPlayGlyph.textContent = isPlaying ? "Ⅱ" : "▶";
    audioPlayButton?.setAttribute("aria-label", isPlaying ? "Jeda audio ritual" : "Putar audio ritual");
}

audioButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (!(ritualAudio instanceof HTMLAudioElement)) {
            if (interfaceStatus) interfaceStatus.textContent = "Pemutar audio tidak tersedia di halaman ini.";
            return;
        }

        if (ritualAudio.paused || ritualAudio.ended) {
            if (ritualAudio.ended) ritualAudio.currentTime = 0;
            ritualAudio.play().catch((error) => {
                if (interfaceStatus) {
                    interfaceStatus.textContent = error.name === "NotAllowedError"
                        ? "Pemutaran audio diblokir browser. Silakan tekan tombol putar lagi."
                        : "Audio tidak dapat diputar. Periksa file audio dan coba lagi.";
                }
            });
        } else {
            ritualAudio.pause();
        }
    });
});

ritualAudio?.addEventListener("playing", () => {
    updateAudioControls(true);
    if (interfaceStatus) interfaceStatus.textContent = "Audio Tari Kecak sedang diputar.";
});

ritualAudio?.addEventListener("pause", () => {
    updateAudioControls(false);
    if (interfaceStatus) interfaceStatus.textContent = "Audio Tari Kecak dijeda.";
});

ritualAudio?.addEventListener("ended", () => {
    updateAudioControls(false);
    if (interfaceStatus) interfaceStatus.textContent = "Audio Tari Kecak selesai diputar.";
});

ritualAudio?.addEventListener("waiting", () => {
    if (interfaceStatus) interfaceStatus.textContent = "Memuat audio Tari Kecak...";
});

ritualAudio?.addEventListener("error", () => {
    updateAudioControls(false);
    if (interfaceStatus) interfaceStatus.textContent = "Audio gagal dimuat. Periksa koneksi dan file audio.";
});

const navLinks = [...document.querySelectorAll(".nav-pill a")];
const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
                link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-30% 0px -60% 0px" });

    navSections.forEach((section) => navObserver.observe(section));
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const customCursor = document.querySelector(".custom-cursor");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (customCursor && finePointer.matches && !reducedMotion.matches) {
    document.addEventListener("pointermove", (event) => {
        customCursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
        document.body.classList.add("cursor-ready");
        customCursor.classList.toggle(
            "is-hovering",
            event.target instanceof Element && Boolean(event.target.closest("a, button, [role='button']")),
        );
    });

    document.addEventListener("pointerdown", () => customCursor.classList.add("is-pressed"));
    document.addEventListener("pointerup", () => customCursor.classList.remove("is-pressed"));
    document.addEventListener("pointerout", (event) => {
        if (!event.relatedTarget) {
            document.body.classList.remove("cursor-ready");
            customCursor.classList.remove("is-hovering", "is-pressed");
        }
    });
    window.addEventListener("blur", () => {
        document.body.classList.remove("cursor-ready");
        customCursor.classList.remove("is-hovering", "is-pressed");
    });
}
