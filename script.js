const pageLoader = document.querySelector(".page-loader");

if (pageLoader) {
    const loaderStartedAt = performance.now();
    let loaderFinished = false;
    let loaderFinishTimer;

    const finishPageLoader = () => {
        if (loaderFinished) return;
        loaderFinished = true;
        window.clearTimeout(loaderFinishTimer);

        const minimumDisplayTime = 450;
        const elapsed = performance.now() - loaderStartedAt;
        window.setTimeout(() => {
            pageLoader.classList.add("is-leaving");
            document.documentElement.classList.remove("has-page-loader");
            window.setTimeout(() => pageLoader.remove(), 450);
        }, Math.max(0, minimumDisplayTime - elapsed));
    };

    window.addEventListener("load", finishPageLoader, { once: true });
    loaderFinishTimer = window.setTimeout(finishPageLoader, 2200);
    if (document.readyState === "complete") finishPageLoader();
}

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
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const linkPage = link.getAttribute("href")?.split("#")[0] || "index.html";
    if (linkPage === currentPage || (currentPage === "index.html" && link.getAttribute("href") === "#beranda")) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", () => {
        closeNavigation();
        navigation.querySelectorAll("a").forEach((item) => item.classList.toggle("is-active", item === link));
    });
});

document.addEventListener("click", (event) => {
    if (!navigation?.classList.contains("is-open")) return;
    if (!event.target.closest(".site-header")) closeNavigation();
});

window.matchMedia("(min-width: 960px)").addEventListener("change", closeNavigation);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
});

const transitionRibbon = document.querySelector(".transition-ribbon");
const ribbonToggle = transitionRibbon ? document.createElement("button") : null;

if (transitionRibbon && ribbonToggle) {
    ribbonToggle.type = "button";
    ribbonToggle.className = "ribbon-toggle";
    ribbonToggle.setAttribute("aria-pressed", "false");
    ribbonToggle.setAttribute("aria-label", "Jeda teks berjalan");
    ribbonToggle.innerHTML = "<span aria-hidden=\"true\">Ⅱ</span><small>Jeda</small>";
    transitionRibbon.append(ribbonToggle);
}

ribbonToggle?.addEventListener("click", () => {
    const paused = transitionRibbon?.classList.toggle("is-paused") ?? false;
    ribbonToggle.setAttribute("aria-pressed", String(paused));
    ribbonToggle.setAttribute("aria-label", paused ? "Lanjutkan teks berjalan" : "Jeda teks berjalan");
    const glyph = ribbonToggle.querySelector("span");
    if (glyph) glyph.textContent = paused ? "▶" : "Ⅱ";
});

const acts = [
    {
        kicker: "Babak I · Persembahan pembuka",
        title: "Panyembrama",
        description: "Adegan pembuka berupa ritual pembersihan arena dan pemujaan keselamatan. Puluhan penari pria duduk melingkar, memanjatkan doa bersama pemangku, lalu membangun keharmonisan ritme vokal cak-cak-cak secara polifonik yang menjadi musik pengiring alami sepanjang pertunjukan.",
        time: "18:00 WITA",
        image: "assets/pictures/hero-ceremony.png",
        imageAlt: "Pertunjukan Kecak di tebing Uluwatu",
    },
    {
        kicker: "Babak II · Lembayung",
        title: "Hutan Dandaka",
        description: "Menggambarkan masa pengasingan Sang Rama, Dewi Sita, dan Laksmana di tengah Hutan Dandaka. Suasana adegan ini menonjolkan kedamaian, kesetiaan, serta keharmonisan hidup sederhana mereka di alam bebas sebelum konflik utama dimulai.",
        time: "18:15 WITA",
        image: "assets/pictures/hutan-dandaka.jpg",
        imageAlt: "Rama, Sita, dan Laksmana berjalan memasuki Hutan Dandaka",
    },
    {
        kicker: "Babak III · Temaram",
        title: "Kijang Kencana",
        description: "Awal munculnya petaka dalam cerita. Marica menyamar menjadi sosok kijang berbulu emas yang sangat indah atas perintah Rahwana. Pesona kijang tersebut memikat hati Sita hingga meminta Rama mengejarnya, yang mengakibatkan Rama dan Laksmana terpisah jauh dari area perlindungan Sita.",
        time: "18:30 WITA",
        image: "assets/pictures/kijang-kencana.jpg",
        imageAlt: "Sita menunjuk kijang emas saat Rama dan Laksmana berada di hutan",
    },
    {
        kicker: "Babak IV · Senja gelap",
        title: "Penculikan Sita",
        description: "Rahwana memanfaatkan kelengaian situasi dengan menyamar sebagai pertapa tua untuk memperdaya Sita, lalu menculiknya terbang menuju Kerajaan Alengka. Burung Jatayu sempat datang menghadang dan bertarung sengit di udara demi menyelamatkan Sita, namun akhirnya gugur akibat tebas senjata Rahwana.",
        time: "18:45 WITA",
        image: "assets/pictures/penculikan-sita.jpg",
        imageAlt: "Rahwana menculik Sita menuju Kerajaan Alengka",
    },
    {
        kicker: "Babak V · Ujian api",
        title: "Klimaks Sakral",
        description: "Puncak pertunjukan yang memadukan aksi dramatis dan nilai tradisi spiritual. Adegan ini menampilkan aksi Hanoman mengamuk menerobos kobaran api, yang sering kali dipadukan dengan tradisi Sanghyang di mana penari bergerak di atas bara api sebagai simbol pembersihan dan pengusiran energi negatif dari arena.",
        time: "19:00 WITA",
        image: "assets/pictures/klimaks.jpg",
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

const kawiPassages = [
    {
        label: "Bahasa Kawi Jawa Kuno · adaptasi",
        verse: "“Om ksamam mam mahadewa, sarwaprani hitankara. Mamoca sarwa papebhyah, palayaswa sadasiwa.”",
        meter: "Metrum: Wirama Sardulawikridita",
        singer: "Dilantunkan: Juru Kidung & lingkaran cak",
        translation: "“Ya Hyang Mahadewa Penguasa Semesta, limpahkanlah ampunan dan kedamaian bagi segenap makhluk ciptaan-Mu. Bebaskan kami dari noda kenistaan dunia, lindungilah kami di bawah naungan kesucian abadi Sanghyang Sadasiwa.”",
        context: "Kidung pembuka mandala sebelum lingkaran penari membentuk lingkaran konsentris. Bertujuan menyucikan pelataran dari kekuatan bhuta kala agar pertunjukan diberkahi keselamatan.",
        vocals: ["[Solo Juru Krama]", "Cak-1 (Penyelag)", "Cak-2 (Pengoceh)", "Pung! (Juru Bass)"],
    },
    {
        label: "Bahasa Kawi Jawa Kuno · adaptasi",
        verse: "“Hana pwa ya marga nira sang ksatria wira. Rupanira kancana mriga lumampah ring alas Dandaka, mangoda manah nira Dewi Janaki.”",
        meter: "Metrum: Wirama Sardulawikridita",
        singer: "Dilantunkan: Juru Kidung & lingkaran cak",
        translation: "“Tersebutlah jalan yang ditempuh sang ksatria agung. Tampak kijang kencana berlari anggun di rimba Dandaka, memikat dan menggoda hasrat batin Sang Dewi Janaki (Sinta) untuk memilikinya.”",
        context: "Babak penculikan. Rahwana memerintahkan patih Marica menyamar menjadi Kijang Emas guna memancing Prabu Rama dan Laksamana meninggalkan gubuk pelindung Sinta.",
        vocals: ["[Solo Juru Krama]", "Cak-1 (Penyelag)", "Cak-2 (Bayang)", "Cak! (Denyut hutan)"],
    },
    {
        label: "Bahasa Kawi Jawa Kuno · adaptasi",
        verse: "“Mulat sang Hanoman ring sang dyah, sedih manganti wacana Rama. Cihna ali-ali mas kencana katur ring sang ayu, lila ical lara nira.”",
        meter: "Metrum: Wirama Sardulawikridita",
        singer: "Dilantunkan: Juru Kidung & lingkaran cak",
        translation: "“Maka memandanglah sang Hanoman kepada sang dewi yang lara menanti kabar suaminya. Diserahkan cincin emas kencana lambang cinta Rama, seketika sirnalah kepedihan batin sang putri suci.”",
        context: "Pertemuan rahasia di Taman Asoka. Hanoman menyelinap memanjat pohon nagasari untuk menguji kesetiaan Dewi Sinta sebelum memorak-porandakan istana Alengka.",
        vocals: ["[Solo Juru Krama]", "Cak-1 (Penyelag)", "Cak-2 (Tipu daya)", "Pung! (Tanda bahaya)"],
    },
    {
        label: "Bahasa Kawi Jawa Kuno · adaptasi",
        verse: "“Gumawe apuy sang Dasamuka, pinangan dening sang kapi kencana. Tan dadi awu anging dadi kembang, obong Alengka dening Hanoman.”",
        meter: "Metrum: Wirama Sardulawikridita",
        singer: "Dilantunkan: Juru Kidung / Dalang",
        translation: "“Dinyalakan api yang menjilat-jilat oleh Dasamuka, namun api itu justru disantap oleh sang kera emas. Tubuhnya tak menjadi abu melainkan semerbak bunga, hingga api itu dilemparkan membumihanguskan benteng Alengka.”",
        context: "Babak Hanoman Obong. Ekor Hanoman dililit sabut kelapa menyala, namun dengan kesaktian Bayu ia justru menari dan menendang bara api ke penjuru benteng Alengka.",
        vocals: ["[Solo Juru Krama]", "Cak-1 (Penyelag)", "Cak-2 (Pengoceh)", "Pung! (Juru Bass)"],
    },
];

const kawiTabs = [...document.querySelectorAll("[data-kawi-tab]")];
const kawiPanel = document.querySelector("#kawi-panel");
const kawiVerseLabel = document.querySelector("[data-kawi-verse-label]");
const kawiVerse = document.querySelector("[data-kawi-verse]");
const kawiMeter = document.querySelector("[data-kawi-meter]");
const kawiSinger = document.querySelector("[data-kawi-singer]");
const kawiTranslation = document.querySelector("[data-kawi-translation]");
const kawiContext = document.querySelector("[data-kawi-context]");
const kawiVocals = document.querySelector("[data-kawi-vocals]");

function selectKawiPassage(index, moveFocus = false) {
    const passage = kawiPassages[index];
    const selectedTab = kawiTabs[index];
    if (!passage || !selectedTab) return;

    kawiTabs.forEach((tab, tabIndex) => {
        const selected = tabIndex === index;
        tab.classList.toggle("is-active", selected);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
    });

    if (moveFocus) selectedTab.focus();
    if (kawiPanel) kawiPanel.setAttribute("aria-labelledby", selectedTab.id);
    if (kawiVerseLabel) kawiVerseLabel.textContent = passage.label;
    if (kawiVerse) kawiVerse.textContent = passage.verse;
    if (kawiMeter) kawiMeter.textContent = passage.meter;
    if (kawiSinger) kawiSinger.textContent = passage.singer;
    if (kawiTranslation) kawiTranslation.textContent = passage.translation;
    if (kawiContext) kawiContext.textContent = passage.context;
    if (kawiVocals) {
        kawiVocals.replaceChildren(...passage.vocals.map((part, partIndex) => {
            const role = document.createElement(partIndex === passage.vocals.length - 1 ? "strong" : "span");
            role.textContent = part;
            return role;
        }));
    }
}

kawiTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectKawiPassage(index));
    tab.addEventListener("keydown", (event) => {
        let nextIndex;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (index + 1) % kawiTabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (index - 1 + kawiTabs.length) % kawiTabs.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = kawiTabs.length - 1;
        } else {
            return;
        }
        event.preventDefault();
        selectKawiPassage(nextIndex, true);
    });
});

const audioButtons = [...document.querySelectorAll("[data-global-audio-toggle], [data-audio-toggle]:not([data-local-audio-toggle])")];
const localAudioButtons = [...document.querySelectorAll("[data-local-audio-toggle]")];
const audioBar = document.querySelector(".floating-audio");
const ritualAudio = document.querySelector("#ritual-audio");
const sanghyangAudio = document.querySelector("#sanghyang-audio");
const interfaceStatus = document.querySelector("#interface-status");
const audioLabels = [...document.querySelectorAll("[data-audio-label]")];
const audioPlayGlyph = document.querySelector(".floating-audio .play-glyph");
const audioPlayButton = document.querySelector(".floating-audio .audio-play");
const sanghyangPlayer = document.querySelector(".sanghyang-player");
const audioTrackName = ritualAudio?.dataset.trackName || "Tari Kecak";
const audioTrackKey = ritualAudio?.currentSrc || ritualAudio?.getAttribute("src") || audioTrackName;
const audioStateKey = "kecak-audio-state";
const sanghyangSeek = sanghyangPlayer?.querySelector(".sanghyang-audio-seek") || null;
const sanghyangCurrentTime = sanghyangPlayer?.querySelector("[data-audio-current-time]") || null;
const sanghyangDuration = sanghyangPlayer?.querySelector("[data-audio-duration]") || null;
const sanghyangPlayGlyph = sanghyangPlayer?.querySelector(".play-glyph") || null;
const sanghyangPlayButton = sanghyangPlayer?.querySelector(".audio-play") || null;
const ritualSeek = document.querySelector(".floating-audio .sanghyang-audio-seek") || null;
const ritualCurrentTime = document.querySelector(".floating-audio [data-audio-current-time]") || null;
const ritualDuration = document.querySelector(".floating-audio [data-audio-duration]") || null;

function saveAudioState(isPlaying) {
    if (!(ritualAudio instanceof HTMLAudioElement)) return;
    sessionStorage.setItem(audioStateKey, JSON.stringify({
        track: audioTrackKey,
        time: ritualAudio.currentTime,
        wasPlaying: isPlaying,
    }));
}

function restoreAudioState() {
    if (!(ritualAudio instanceof HTMLAudioElement)) return;
    try {
        const state = JSON.parse(sessionStorage.getItem(audioStateKey) || "null");
        if (state?.track !== audioTrackKey || !Number.isFinite(state.time) || state.time <= 0) return;
        ritualAudio.addEventListener("loadedmetadata", () => {
            ritualAudio.currentTime = Math.min(state.time, Math.max(0, ritualAudio.duration - .1));
            updateAudioProgress();
        }, { once: true });
    } catch {
        sessionStorage.removeItem(audioStateKey);
    }
}
function formatAudioTime(time) {
    if (!Number.isFinite(time) || time < 0) return "--:--";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateRitualProgress() {
    if (!(ritualAudio instanceof HTMLAudioElement)) return;
    const duration = ritualAudio.duration;
    const progress = Number.isFinite(duration) && duration > 0
        ? (ritualAudio.currentTime / duration) * 100
        : 0;
    if (ritualCurrentTime) ritualCurrentTime.textContent = formatAudioTime(ritualAudio.currentTime);
    if (ritualDuration) ritualDuration.textContent = formatAudioTime(duration);
    if (ritualSeek) {
        ritualSeek.value = String(progress);
        ritualSeek.disabled = !Number.isFinite(duration) || duration <= 0;
        ritualSeek.style.setProperty("--audio-progress", `${progress}%`);
    }
}

function updateSanghyangProgress() {
    if (!(sanghyangAudio instanceof HTMLAudioElement)) return;
    const duration = sanghyangAudio.duration;
    const progress = Number.isFinite(duration) && duration > 0
        ? (sanghyangAudio.currentTime / duration) * 100
        : 0;
    if (sanghyangCurrentTime) sanghyangCurrentTime.textContent = formatAudioTime(sanghyangAudio.currentTime);
    if (sanghyangDuration) sanghyangDuration.textContent = formatAudioTime(duration);
    if (sanghyangSeek) {
        sanghyangSeek.value = String(progress);
        sanghyangSeek.disabled = !Number.isFinite(duration) || duration <= 0;
        sanghyangSeek.style.setProperty("--audio-progress", `${progress}%`);
    }
}

function updateAudioProgress() {
    updateRitualProgress();
    updateSanghyangProgress();
}

audioLabels.forEach((label) => {
    label.dataset.defaultLabel = label.textContent.trim();
});

function updateAudioControls(isPlaying) {
    audioButtons.forEach((button) => button.setAttribute("aria-pressed", String(isPlaying)));
    audioBar?.classList.toggle("is-playing", isPlaying);
    sanghyangPlayer?.classList.remove("is-playing");

    audioLabels.forEach((label) => {
        if (sanghyangPlayer?.contains(label)) return;
        label.textContent = isPlaying ? "Sedang diputar" : label.dataset.defaultLabel || "Audio ritual langsung";
    });

    if (audioPlayGlyph) audioPlayGlyph.textContent = isPlaying ? "Ⅱ" : "▶";
    audioPlayButton?.setAttribute(
        "aria-label",
        `${isPlaying ? "Jeda" : "Putar"} ${audioTrackName}`,
    );
}

function toggleAudioPlayer(audio, button, name) {
    if (!(audio instanceof HTMLAudioElement)) return;
    if (audio.paused || audio.ended) {
        if (audio.ended) audio.currentTime = 0;
        audio.play().catch(() => {});
    } else {
        audio.pause();
    }
    button?.setAttribute("aria-label", `${audio.paused ? "Putar" : "Jeda"} ${name}`);
}

localAudioButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const willPlay = sanghyangAudio?.paused || sanghyangAudio?.ended;
        if (willPlay && ritualAudio && !ritualAudio.paused) ritualAudio.pause();
        toggleAudioPlayer(sanghyangAudio, button, "Kidung Sanghyang Dedari");
        if (sanghyangAudio && !sanghyangAudio.paused) {
            sanghyangPlayer?.classList.add("is-playing");
        } else {
            sanghyangPlayer?.classList.remove("is-playing");
        }
    });
});

sanghyangAudio?.addEventListener("play", () => {
    if (ritualAudio && !ritualAudio.paused) ritualAudio.pause();
    sanghyangPlayer?.classList.add("is-playing");
});
sanghyangAudio?.addEventListener("pause", () => sanghyangPlayer?.classList.remove("is-playing"));
sanghyangAudio?.addEventListener("ended", () => sanghyangPlayer?.classList.remove("is-playing"));

audioButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (!(ritualAudio instanceof HTMLAudioElement)) {
            if (interfaceStatus) interfaceStatus.textContent = "Pemutar audio tidak tersedia di halaman ini.";
            return;
        }

        if (ritualAudio.paused || ritualAudio.ended) {
            if (sanghyangAudio && !sanghyangAudio.paused) sanghyangAudio.pause();
            if (ritualAudio.ended) ritualAudio.currentTime = 0;
            ritualAudio.play().catch((error) => {
                if (interfaceStatus) {
                    interfaceStatus.textContent = error.name === "NotAllowedError"
                        ? "Pemutaran audio diblokir browser. Silakan tekan tombol putar lagi."
                        : `${audioTrackName} tidak dapat diputar. Periksa file audio dan coba lagi.`;
                }
            });
        } else {
            ritualAudio.pause();
        }
    });
});

restoreAudioState();

ritualAudio?.addEventListener("playing", () => {
    saveAudioState(true);
    updateAudioControls(true);
    if (interfaceStatus) interfaceStatus.textContent = `${audioTrackName} sedang diputar.`;
});

ritualAudio?.addEventListener("pause", () => {
    saveAudioState(false);
    updateAudioControls(false);
    if (interfaceStatus) interfaceStatus.textContent = `${audioTrackName} dijeda.`;
});

ritualAudio?.addEventListener("ended", () => {
    updateAudioControls(false);
    if (interfaceStatus) interfaceStatus.textContent = `${audioTrackName} selesai diputar.`;
});

ritualAudio?.addEventListener("waiting", () => {
    if (interfaceStatus) interfaceStatus.textContent = `Memuat ${audioTrackName}...`;
});

ritualAudio?.addEventListener("error", () => {
    updateAudioControls(false);
    if (interfaceStatus) interfaceStatus.textContent = `${audioTrackName} gagal dimuat. Periksa koneksi dan file audio.`;
});

ritualAudio?.addEventListener("loadedmetadata", updateRitualProgress);
ritualAudio?.addEventListener("timeupdate", () => {
    updateRitualProgress();
    if (!ritualAudio.paused) saveAudioState(true);
});
sanghyangAudio?.addEventListener("loadedmetadata", updateSanghyangProgress);
sanghyangAudio?.addEventListener("timeupdate", updateSanghyangProgress);
ritualSeek?.addEventListener("input", () => {
    if (!(ritualAudio instanceof HTMLAudioElement) || !Number.isFinite(ritualAudio.duration)) return;
    ritualAudio.currentTime = (Number(ritualSeek.value) / 100) * ritualAudio.duration;
});
sanghyangSeek?.addEventListener("input", () => {
    if (!(sanghyangAudio instanceof HTMLAudioElement) || !Number.isFinite(sanghyangAudio.duration)) return;
    sanghyangAudio.currentTime = (Number(sanghyangSeek.value) / 100) * sanghyangAudio.duration;
});

const navLinks = [...document.querySelectorAll(".nav-pill a")];
const navSections = navLinks
    .filter((link) => link.getAttribute("href")?.startsWith("#"))
    .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
    .filter(Boolean);

if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
                link.classList.toggle(
                    "is-active",
                    link.getAttribute("href") === `#${entry.target.id}`,
                );
            });
        });
    }, { rootMargin: "-30% 0px -60% 0px" });

    navSections.forEach((section) => navObserver.observe(section));

    const sanghyangStageLinks = [...document.querySelectorAll(".sanghyang-stage-link")];
    const sanghyangStages = [...document.querySelectorAll("[data-sanghyang-stage]")];
    const stageLinksById = new Map(
        sanghyangStageLinks.map((link) => [link.hash.slice(1), link]),
    );

    if (sanghyangStages.length && sanghyangStageLinks.length) {
        const setActiveSanghyangStage = (stageId) => {
            sanghyangStageLinks.forEach((link) => {
                const isActive = link.hash === `#${stageId}`;
                link.classList.toggle("is-active", isActive);
                if (isActive) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        };

        sanghyangStageLinks.forEach((link) => {
            link.addEventListener("click", () => setActiveSanghyangStage(link.hash.slice(1)));
        });

        const sanghyangStageObserver = new IntersectionObserver((entries) => {
            const visibleStage = entries
                .filter((entry) => entry.isIntersecting)
                .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

            if (!visibleStage) return;

            setActiveSanghyangStage(visibleStage.target.id);
        }, { rootMargin: "-25% 0px -60% 0px" });

        sanghyangStages.forEach((stage) => {
            if (stageLinksById.has(stage.id)) sanghyangStageObserver.observe(stage);
        });
    }
}

const historyTimeline = document.querySelector("[data-history-timeline]");
const timelineSpine = historyTimeline?.querySelector(".history-timeline-spine-fill");
const timelineEvents = [...(historyTimeline?.querySelectorAll("[data-timeline-step]") ?? [])];

if (historyTimeline && timelineSpine && timelineEvents.length) {
    let timelineFrame = 0;

    const updateTimelineProgress = () => {
        timelineFrame = 0;
        const spine = historyTimeline.querySelector(".history-timeline-spine");
        if (!spine) return;

        const spineRect = spine.getBoundingClientRect();
        const progress = Math.min(
            1,
            Math.max(0, (window.innerHeight * 0.58 - spineRect.top) / spineRect.height),
        );
        timelineSpine.style.transform = `scaleY(${progress})`;

        const revealLine = window.innerHeight * 0.58;
        timelineEvents.forEach((event) => {
            event.classList.toggle(
                "is-reached",
                event.getBoundingClientRect().top + event.offsetHeight * 0.5 <= revealLine,
            );
        });
    };

    const requestTimelineUpdate = () => {
        if (!timelineFrame) timelineFrame = window.requestAnimationFrame(updateTimelineProgress);
    };

    window.addEventListener("scroll", requestTimelineUpdate, { passive: true });
    window.addEventListener("resize", requestTimelineUpdate);
    requestTimelineUpdate();
}

const archiveViewer = document.querySelector("#archive-viewer");
const archiveOpenButtons = [...document.querySelectorAll("[data-archive-open]")];
let archiveOpener = null;

archiveOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (archiveViewer instanceof HTMLDialogElement && !archiveViewer.open) {
            archiveOpener = button;
            archiveViewer.showModal();
            moveCustomCursorToArchive(true);
        }
    });
});

archiveViewer?.querySelector("[data-archive-close]")?.addEventListener("click", () => {
    if (archiveViewer instanceof HTMLDialogElement) archiveViewer.close();
});

archiveViewer?.addEventListener("close", () => {
    moveCustomCursorToArchive(false);
    if (archiveOpener?.isConnected) archiveOpener.focus();
    archiveOpener = null;
});

archiveViewer?.addEventListener("cancel", (event) => {
    event.preventDefault();
    if (archiveViewer instanceof HTMLDialogElement) archiveViewer.close();
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !(archiveViewer instanceof HTMLDialogElement) || !archiveViewer.open) return;
    event.preventDefault();
    archiveViewer.close();
});

archiveViewer?.addEventListener("click", (event) => {
    if (event.target === archiveViewer && archiveViewer instanceof HTMLDialogElement) {
        archiveViewer.close();
    }
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const customCursor = document.querySelector(".custom-cursor");
const customCursorParent = customCursor?.parentNode;
const customCursorNextSibling = customCursor?.nextSibling;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function moveCustomCursorToArchive(isOpen) {
    if (!(archiveViewer instanceof HTMLDialogElement) || !customCursor) return;

    if (isOpen) {
        archiveViewer.append(customCursor);
        if (finePointer.matches && !reducedMotion.matches) {
            document.body.classList.add("cursor-ready");
        }
    } else if (customCursor.parentNode === archiveViewer && customCursorParent) {
        const nextSibling = customCursorNextSibling?.parentNode === customCursorParent
            ? customCursorNextSibling
            : null;
        customCursorParent.insertBefore(customCursor, nextSibling);
    }
}

if (customCursor && finePointer.matches && !reducedMotion.matches) {
    document.addEventListener("pointermove", (event) => {
        customCursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
        document.body.classList.add("cursor-ready");
        customCursor.classList.toggle(
            "is-hovering",
            event.target instanceof Element && Boolean(
                event.target.closest("a, button, [role='button'], input, summary, [role='tab'], .btn-visitor-type, .btn-stepper"),
            ),
        );
    });

    document.addEventListener("pointerdown", () => customCursor.classList.add("is-pressed"));
    document.addEventListener("pointerup", () => customCursor.classList.remove("is-pressed"));
    document.addEventListener("pointerout", (event) => {
        if (!event.relatedTarget) {
            if (archiveViewer instanceof HTMLDialogElement && archiveViewer.open) return;
            document.body.classList.remove("cursor-ready");
            customCursor.classList.remove("is-hovering", "is-pressed");
        }
    });
    window.addEventListener("blur", () => {
        document.body.classList.remove("cursor-ready");
        customCursor.classList.remove("is-hovering", "is-pressed");
    });
}


function initCostumeGallery() {
    const viewer = document.querySelector("#costume-viewer");
    const opener = document.querySelector("[data-costume-open]");
    if (viewer && opener instanceof HTMLButtonElement) {
        opener.addEventListener("click", () => {
            viewer.showModal();
            if (customCursor && finePointer.matches && !reducedMotion.matches) {
                viewer.append(customCursor);
                customCursor.style.zIndex = "1002";
            }
        });
        viewer.querySelector("[data-costume-close]")?.addEventListener("click", () => viewer.close());
        viewer.addEventListener("cancel", (event) => { event.preventDefault(); viewer.close(); });
        viewer.addEventListener("close", () => {
            if (customCursor && customCursorParent) customCursorParent.insertBefore(customCursor, customCursorNextSibling);
        });
        viewer.addEventListener("click", (event) => { if (event.target === viewer) viewer.close(); });
    }
    const gallery = document.querySelector("[data-costume-gallery]");
    const detail = document.querySelector("[data-costume-detail], #costume-detail");
    if (!gallery || !detail) return;

    const content = {
        mudra: ["Bahasa batin", "Jemari sebagai doa yang bergerak", "Mudra mengubah gestur menjadi tanda: tenang, waspada, dan terhubung dengan alam niskala. Tekukan jemari menjadi bahasa tanpa suara sebelum energi pertunjukan bergerak."],
        gelungan: ["Struktur kepala", "Gelungan emas sebagai poros wibawa", "Gelungan menyusun siluet tokoh dari kulit kerbau, prada kencana, dan bunga kamboja. Tingginya menegaskan kedudukan sekaligus mengarahkan perhatian pada pusat spiritual kepala."],
        poleng: ["Keseimbangan kosmis", "Poleng yang menjaga Rwa Bhineda", "Motif hitam-putih merangkum dua daya yang berlawanan namun saling melengkapi. Di dalam lingkaran Kecak, kain poleng menjadi penanda ritme, kebersamaan, dan keseimbangan."],
    };
    const title = detail.querySelector("[data-costume-title]");
    const kicker = detail.querySelector("[data-costume-kicker]");
    const copy = detail.querySelector("[data-costume-copy]");
    const buttons = [...gallery.querySelectorAll("[data-costume-photo]")];
    buttons.forEach((button) => button.addEventListener("click", () => {
        const values = content[button.dataset.costumePhoto];
        if (!values) return;
        buttons.forEach((item) => { item.classList.toggle("is-active", item === button); item.setAttribute("aria-expanded", item === button ? "true" : "false"); });
        [kicker.textContent, title.textContent, copy.textContent] = values;
        detail.classList.add("is-visible");
    }));
    detail.querySelector("[data-costume-close]")?.addEventListener("click", () => detail.classList.remove("is-visible"));
}

function initScrollReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }
    document.documentElement.classList.add("has-scroll-reveal");
    const autoSelectors = [
        "main > section",
        "main > article",
        ".panel",
        ".wisdom-quote",
        ".morphology-gallery-card",
        ".morphology-card",
        ".exploration-card",
        ".act-card",
        ".lore-card",
        ".stat-cards article",
        ".glossary-card",
        ".character-card",
        ".kawi-card",
        ".costume-card",
        ".history-section",
        ".timeline-card",
        ".archive-card",
        ".monograph-card",
        ".dramaturgi-next-card",
        ".interactive-card",
        ".history-closing",
        ".footer-intro",
        ".footer-column"
    ];

    const elementsToAnimate = document.querySelectorAll(autoSelectors.join(", "));
    elementsToAnimate.forEach((el) => {
        if (!el.hasAttribute("data-reveal") && !el.classList.contains("reveal-on-scroll")) {
            el.classList.add("reveal-on-scroll");
        }
    });

    const targets = document.querySelectorAll("[data-reveal], .reveal-on-scroll");
    if (!targets.length) return;

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: "0px 0px -40px 0px",
            threshold: 0.08
        });

        targets.forEach((target) => {
            const rect = target.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                window.setTimeout(() => {
                    target.classList.add("is-revealed");
                }, 100);
            } else {
                observer.observe(target);
            }
        });
    } else {
        targets.forEach((target) => target.classList.add("is-revealed"));
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { initCostumeGallery(); initScrollReveal(); });
} else {
    initCostumeGallery();
    initScrollReveal();
}

(() => {
    const MAP_SPOTS = [
        { id: "amphitheater", zone: "ZONA PEMENTASAN", title: "Kecak Amphitheater", description: "Tribun melingkar untuk menikmati Tari Kecak saat matahari terbenam.", details: "Pintu dibuka pukul 17:00 WITA. Pertunjukan dimulai pukul 18:00 WITA.", rules: ["Datang lebih awal", "Jaga ketenangan selama pertunjukan"], x: 68, y: 54 },
        { id: "sacred", zone: "ZONA SAKRAL", title: "Pura Luhur & Candi Bentar", description: "Kawasan suci yang menjadi pusat penghormatan dan persembahyangan.", details: "Kenakan pakaian sopan dan ikuti arahan petugas adat.", rules: ["Gunakan kain dan selendang", "Hormati area persembahyangan"], x: 30, y: 31 },
        { id: "trail", zone: "JALUR PANORAMA", title: "Jalur Titian Panorama", description: "Jalur tebing dengan panorama Samudra Hindia.", details: "Panjang jalur sekitar 1,2 km. Waspadai tepian tebing.", rules: ["Tetap di jalur resmi", "Jangan melewati pembatas"], x: 48, y: 76 },
    ];

    const FAQ_ITEMS = [
        { question: "Kapan Tari Kecak dipentaskan?", answer: "Pementasan berlangsung setiap hari pukul 18:00–19:00 WITA. Datang sebelum pintu dibuka pukul 17:00 WITA." },
        { question: "Apa yang harus dikenakan saat memasuki pura?", answer: "Kenakan pakaian sopan, kain, dan selendang. Petugas dapat membantu pengunjung yang belum memiliki perlengkapan adat." },
        { question: "Apakah tiket dapat dipesan secara online?", answer: "Ya. Gunakan tombol reservasi resmi pada halaman ini untuk memilih tanggal dan jumlah tiket." },
        { question: "Apakah kawasan ramah untuk anak-anak?", answer: "Kawasan terbuka untuk keluarga, namun tetap awasi anak-anak karena beberapa jalur berada di dekat tebing." },
    ];

    class SoundscapeEngine {
        constructor() { this.context = null; this.source = null; this.gain = null; }
        start() {
            if (!this.context) {
                this.context = new (window.AudioContext || window.webkitAudioContext)();
                this.gain = this.context.createGain();
                this.gain.gain.value = 0.035;
                this.gain.connect(this.context.destination);
                const buffer = this.context.createBuffer(1, this.context.sampleRate * 2, this.context.sampleRate);
                const data = buffer.getChannelData(0);
                for (let index = 0; index < data.length; index += 1) data[index] = (Math.random() * 2 - 1) * 0.18;
                this.source = this.context.createBufferSource();
                this.source.buffer = buffer;
                this.source.loop = true;
                this.source.connect(this.gain);
                this.source.start();
            }
            return this.context.resume();
        }
        stop() { return this.context?.suspend(); }
    }

    const mapContainer = document.querySelector("#mapPinsContainer");
    const mapPopup = document.querySelector("#mapSpotPopup");
    const faqContainer = document.querySelector("#faqContainer");
    const bookingModal = document.querySelector("#bookingModal");
    const bookingForm = document.querySelector("#bookingForm");
    const soundscapeButton = document.querySelector("[data-audio-toggle], [data-soundscape-toggle]");
    const soundscape = new SoundscapeEngine();

    const setMapSpot = (spot) => {
        if (!spot) return;
        document.querySelectorAll(".panduan-tab").forEach((tab) => tab.setAttribute("aria-selected", String(tab.id.toLowerCase().includes(spot.id))));
        document.querySelector("#popupZone")?.replaceChildren(document.createTextNode(spot.zone));
        document.querySelector("#popupTitle")?.replaceChildren(document.createTextNode(spot.title));
        document.querySelector("#popupDesc")?.replaceChildren(document.createTextNode(spot.description));
        document.querySelector("#popupDetails")?.replaceChildren(document.createTextNode(spot.details));
        const rules = document.querySelector("#popupRulesBox");
        if (rules) rules.replaceChildren(...spot.rules.map((rule) => { const item = document.createElement("div"); item.className = "component"; item.textContent = rule; return item; }));
        mapPopup?.classList.remove("is-hidden");
    };

    if (mapContainer && mapPopup) {
        MAP_SPOTS.forEach((spot) => {
            const pin = document.createElement("button");
            pin.type = "button";
            pin.className = "position-absolute button";
            pin.style.left = `${spot.x}%`;
            pin.style.top = `${spot.y}%`;
            pin.setAttribute("aria-label", spot.title);
            pin.textContent = "•";
            pin.addEventListener("click", () => setMapSpot(spot));
            mapContainer.append(pin);
        });
        document.querySelector("#btnClosePopup")?.addEventListener("click", () => mapPopup.classList.add("is-hidden"));
        mapPopup.addEventListener("click", (event) => { if (event.target === mapPopup) mapPopup.classList.add("is-hidden"); });
        [["#mapTabAmphitheater", "amphitheater"], ["#mapTabSacred", "sacred"], ["#mapTabTrail", "trail"]].forEach(([selector, id]) => document.querySelector(selector)?.addEventListener("click", () => setMapSpot(MAP_SPOTS.find((spot) => spot.id === id))));
    }

    if (faqContainer) {
        FAQ_ITEMS.forEach((item) => {
            const details = document.createElement("details");
            details.className = "card";
            const summary = document.createElement("summary");
            summary.className = "heading";
            summary.textContent = item.question;
            const answer = document.createElement("p");
            answer.className = "copy";
            answer.textContent = item.answer;
            details.append(summary, answer);
            faqContainer.append(details);
        });
    }

    let lastBookingOpener = null;
    const getModalFocusable = () => bookingModal?.querySelectorAll("button, input, [href], [tabindex]:not([tabindex='-1'])") || [];
    const toggleBooking = (visible, opener = null) => {
        if (!bookingModal) return;
        bookingModal.classList.toggle("is-hidden", !visible);
        bookingModal.setAttribute("aria-hidden", String(!visible));
        document.body.classList.toggle("modal-open", visible);
        if (visible) {
            lastBookingOpener = opener || lastBookingOpener;
            window.setTimeout(() => document.querySelector("#bookingDateInput")?.focus(), 0);
        } else if (lastBookingOpener instanceof HTMLElement) {
            lastBookingOpener.focus();
        }
    };
    ["#btnHeroBooking", "#btnSectionBooking", "#btnHeaderBooking", "#btnCalloutBooking"].forEach((selector) => document.querySelector(selector)?.addEventListener("click", (event) => toggleBooking(true, event.currentTarget)));
    document.querySelector("#btnCloseBookingModal")?.addEventListener("click", () => toggleBooking(false));
    bookingModal?.addEventListener("click", (event) => { if (event.target === bookingModal) toggleBooking(false); });
    document.querySelector("#btnNewBooking")?.addEventListener("click", () => { bookingForm?.classList.remove("is-hidden"); document.querySelector("#ticketPassView")?.classList.add("is-hidden"); });
    document.addEventListener("keydown", (event) => {
        if (bookingModal && !bookingModal.classList.contains("is-hidden") && event.key === "Tab") {
            const focusable = [...getModalFocusable()];
            if (focusable.length) {
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
            return;
        }
        if (event.key !== "Escape") return;
        if (bookingModal && !bookingModal.classList.contains("is-hidden")) toggleBooking(false);
        if (mapPopup && !mapPopup.classList.contains("is-hidden")) mapPopup.classList.add("is-hidden");
    });

    if (bookingForm) {
        let isForeigner = false;
        const btnDomestik = document.querySelector("#btnVisitorDomestik");
        const btnForeigner = document.querySelector("#btnVisitorForeigner");
        const counts = { adult: 2, kecak: 2 };
        const updateTotal = () => {
            const adultRate = isForeigner ? 50000 : 30000;
            const total = counts.adult * adultRate + counts.kecak * 150000;
            const grandTotalEl = document.querySelector("#bookingGrandTotal");
            if (grandTotalEl) {
                grandTotalEl.textContent = `Rp ${total.toLocaleString("id-ID")}`;
                grandTotalEl.classList.remove("is-updated");
                requestAnimationFrame(() => grandTotalEl.classList.add("is-updated"));
            }
        };
        btnDomestik?.addEventListener("click", () => {
            isForeigner = false;
            btnDomestik.classList.add("is-active");
            btnForeigner?.classList.remove("is-active");
            updateTotal();
        });
        btnForeigner?.addEventListener("click", () => {
            isForeigner = true;
            btnForeigner.classList.add("is-active");
            btnDomestik?.classList.remove("is-active");
            updateTotal();
        });
        [["#btnMinusAdult", "adult", -1], ["#btnPlusAdult", "adult", 1], ["#btnMinusKecak", "kecak", -1], ["#btnPlusKecak", "kecak", 1]].forEach(([selector, key, change]) => document.querySelector(selector)?.addEventListener("click", () => { counts[key] = Math.max(0, counts[key] + change); document.querySelector(`#count${key[0].toUpperCase()}${key.slice(1)}`).textContent = counts[key]; updateTotal(); }));
        bookingForm.addEventListener("submit", (event) => { event.preventDefault(); document.querySelector("#passCustName").textContent = document.querySelector("#custName").value; document.querySelector("#passTotalAmount").textContent = document.querySelector("#bookingGrandTotal").textContent; document.querySelector("#passBookingCode").textContent = `ULU-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`; bookingForm.classList.add("is-hidden"); document.querySelector("#ticketPassView")?.classList.remove("is-hidden"); });
    }

    soundscapeButton?.addEventListener("click", () => { const active = soundscapeButton.getAttribute("aria-pressed") === "true"; (active ? soundscape.stop() : soundscape.start()).catch?.(() => {}); soundscapeButton.setAttribute("aria-pressed", String(!active)); });
})();
