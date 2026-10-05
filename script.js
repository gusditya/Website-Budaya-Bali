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
        description: "Pelita dinyalakan dan lingkaran penyuara membuka perjalanan dengan doa serta sambutan. Suasana senja perlahan menjadi panggung bagi kisah Ramayana.",
        time: "18:00 WITA",
    },
    {
        kicker: "Babak II · Lembayung",
        title: "Hutan Dandaka",
        description: "Rama, Sita, dan Laksmana memasuki hutan pengasingan. Lapisan suara membangun suasana rimba dan pertanda buruk yang mendekat.",
        time: "18:15 WITA",
    },
    {
        kicker: "Babak III · Temaram",
        title: "Kijang Kencana",
        description: "Kijang ajaib memancing Sita menjauh dari perlindungan. Intrik Rahwana mengubah ketenangan menjadi awal penculikan.",
        time: "18:30 WITA",
    },
    {
        kicker: "Babak IV · Senja gelap",
        title: "Penculikan Sita",
        description: "Rahwana membawa Sita ke Alengka. Seruan para penyuara mengiringi perpisahan dan perjalanan Rama untuk menemukan kembali sang istri.",
        time: "18:45 WITA",
    },
    {
        kicker: "Babak V · Ujian api",
        title: "Klimaks Sakral",
        description: "Hanoman menerobos benteng Alengka. Nyala api dan paduan suara mencapai klimaks dalam kemenangan dharma atas adharma.",
        time: "19:00 WITA",
    },
];

const actTabs = [...document.querySelectorAll(".act-tab")];
const actKicker = document.querySelector("[data-act-kicker]");
const actTitle = document.querySelector("[data-act-title]");
const actDescription = document.querySelector("[data-act-description]");
const actTime = document.querySelector("[data-act-time]");
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
const interfaceStatus = document.querySelector("#interface-status");
let audioDemoActive = false;

audioButtons.forEach((button) => {
    button.addEventListener("click", () => {
        audioDemoActive = !audioDemoActive;
        audioButtons.forEach((item) => item.setAttribute("aria-pressed", String(audioDemoActive)));
        audioBar?.classList.toggle("is-playing", audioDemoActive);
        document.querySelectorAll("[data-audio-label]").forEach((label) => {
            label.textContent = audioDemoActive ? "Pratinjau ritme aktif" : label.dataset.defaultLabel || "Audio ritual langsung";
        });
        if (interfaceStatus) {
            interfaceStatus.textContent = audioDemoActive
                ? "Animasi pratinjau audio aktif. File audio belum disertakan."
                : "Animasi pratinjau audio dijeda.";
        }
    });
});

document.querySelectorAll("[data-audio-label]").forEach((label) => {
    label.dataset.defaultLabel = label.textContent.trim();
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
