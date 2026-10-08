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

const ribbonToggle = document.querySelector("[data-ribbon-toggle]");
const transitionRibbon = document.querySelector(".transition-ribbon");

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

const audioButtons = [...document.querySelectorAll("[data-audio-toggle]")];
const audioBar = document.querySelector(".floating-audio");
const ritualAudio = document.querySelector("#ritual-audio");
const interfaceStatus = document.querySelector("#interface-status");
const audioLabels = [...document.querySelectorAll("[data-audio-label]")];
const audioPlayGlyph = document.querySelector(".play-glyph");
const audioPlayButton = document.querySelector(".audio-play");
const sanghyangPlayer = document.querySelector(".sanghyang-player");
const audioTrackName = ritualAudio?.dataset.trackName || "Tari Kecak";
const audioSeek = document.querySelector(".sanghyang-audio-seek");
const audioCurrentTime = document.querySelector("[data-audio-current-time]");
const audioDuration = document.querySelector("[data-audio-duration]");

function formatAudioTime(time) {
    if (!Number.isFinite(time) || time < 0) return "--:--";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateAudioProgress() {
    if (!(ritualAudio instanceof HTMLAudioElement)) return;

    const duration = ritualAudio.duration;
    const progress = Number.isFinite(duration) && duration > 0
        ? (ritualAudio.currentTime / duration) * 100
        : 0;

    if (audioCurrentTime) audioCurrentTime.textContent = formatAudioTime(ritualAudio.currentTime);
    if (audioDuration) audioDuration.textContent = formatAudioTime(duration);
    if (audioSeek) {
        audioSeek.value = String(progress);
        audioSeek.disabled = !Number.isFinite(duration) || duration <= 0;
        audioSeek.style.setProperty("--audio-progress", `${progress}%`);
    }
}

audioLabels.forEach((label) => {
    label.dataset.defaultLabel = label.textContent.trim();
});

function updateAudioControls(isPlaying) {
    audioButtons.forEach((button) => button.setAttribute("aria-pressed", String(isPlaying)));
    audioBar?.classList.toggle("is-playing", isPlaying);
    sanghyangPlayer?.classList.toggle("is-playing", isPlaying);

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
                        : `${audioTrackName} tidak dapat diputar. Periksa file audio dan coba lagi.`;
                }
            });
        } else {
            ritualAudio.pause();
        }
    });
});

ritualAudio?.addEventListener("playing", () => {
    updateAudioControls(true);
    if (interfaceStatus) interfaceStatus.textContent = `${audioTrackName} sedang diputar.`;
});

ritualAudio?.addEventListener("pause", () => {
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

ritualAudio?.addEventListener("loadedmetadata", updateAudioProgress);
ritualAudio?.addEventListener("timeupdate", updateAudioProgress);
audioSeek?.addEventListener("input", () => {
    if (!(ritualAudio instanceof HTMLAudioElement) || !Number.isFinite(ritualAudio.duration)) return;
    ritualAudio.currentTime = (Number(audioSeek.value) / 100) * ritualAudio.duration;
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
