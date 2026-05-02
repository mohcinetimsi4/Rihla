import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useState, useEffect, useRef } from "react";

const POSITIONS = [5, 38, 12, 48, 20, 42];

const INITIAL_ENTRIES = [
    {
        id: 1,
        place: "Tamanrasset - Assekrem",
        date: "2024-03-12",
        note: "Lever de soleil incroyable, silence total.",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=75",
        friend: "Amine",
        rating: 5
    },
    {
        id: 2,
        place: "Béjaïa - Cap Carbon",
        date: "2024-01-05",
        note: "Falaises magnifiques et air pur.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=75",
        friend: "Sarah",
        rating: 4
    }
];

const cardStyle = (ml) => ({
    marginLeft: `${ml}%`,
    background: "white",
    padding: "14px 16px",
    borderRadius: "8px",
    boxShadow: "3px 4px 14px rgba(0,0,0,0.13)",
    width: "240px",
    border: "1px solid #d7ccc8",
    position: "relative",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default",
});

const inputStyle = {
    width: "100%",
    border: "1px solid #d7ccc8",
    padding: "8px 10px",
    borderRadius: "6px",
    fontFamily: "'Lora', serif",
    fontSize: "0.85rem",
    color: "#4e342e",
    background: "#fff",
    boxSizing: "border-box",
    marginBottom: "10px",
    outline: "none",
};

const Diary = () => {
    const [entries, setEntries] = useState(INITIAL_ENTRIES);
    const [showModal, setShowModal] = useState(false);
    const [newEntry, setNewEntry] = useState({ place: "", date: "", note: "", image: "", friend: "", rating: 5 });
    const containerRef = useRef(null);
    const svgRef = useRef(null);

    const handleAdd = () => {
        if (!newEntry.place) return;
        setEntries(prev => [...prev, { ...newEntry, id: Date.now() }]);
        setShowModal(false);
        setNewEntry({ place: "", date: "", note: "", image: "", friend: "", rating: 5 });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const svg = svgRef.current;
            const container = containerRef.current;
            if (!svg || !container) return;
            svg.innerHTML = "";
            const cards = container.querySelectorAll(".adv-card");
            if (cards.length < 2) return;
            const cRect = container.getBoundingClientRect();
            svg.setAttribute("viewBox", `0 0 ${cRect.width} ${cRect.height}`);
            let pts = "";
            cards.forEach(card => {
                const r = card.getBoundingClientRect();
                pts += `${r.left - cRect.left + r.width / 2},${r.top - cRect.top + r.height / 2} `;
            });
            const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            line.setAttribute("points", pts.trim());
            line.setAttribute("fill", "none");
            line.setAttribute("stroke", "#8d6e63");
            line.setAttribute("stroke-width", "2.5");
            line.setAttribute("stroke-dasharray", "8,8");
            line.setAttribute("stroke-linecap", "round");
            svg.appendChild(line);
        }, 150);
        return () => clearTimeout(timer);
    }, [entries]);

    return (
        <div style={{ minHeight: "100vh", background: "#f4ece0", fontFamily: "'Lora', serif" }}>
            <link
                href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Lora:ital,wght@0,400;1,400&display=swap"
                rel="stylesheet"
            />

            <Navbar transparent={false} />

            <main style={{ maxWidth: "760px", margin: "0 auto", paddingTop: "112px", paddingBottom: "64px", paddingLeft: "16px", paddingRight: "16px" }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <h1 style={{ fontFamily: "'Caveat', cursive", color: "#5d4037", fontSize: "2.4rem", fontWeight: 700, margin: "0 0 6px" }}>
                        📜 Mon Journal d'Aventures 📜
                    </h1>
                    <p style={{ color: "#a1887f", fontStyle: "italic", fontSize: "0.9rem", margin: 0 }}>
                        Les endroits que j'ai visités
                    </p>
                </div>

                {/* Journal */}
                <div ref={containerRef} style={{ position: "relative" }}>
                    <svg
                        ref={svgRef}
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
                    />

                    <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "72px", paddingBottom: "24px" }}>

                        {entries.map((item, i) => (
                            <div key={item.id} style={{ width: "100%", display: "flex" }}>
                                <div
                                    className="adv-card"
                                    style={cardStyle(POSITIONS[i % POSITIONS.length])}
                                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "4px 7px 20px rgba(0,0,0,0.18)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "3px 4px 14px rgba(0,0,0,0.13)"; }}
                                >
                                    {/* Ruban adhésif */}
                                    <div style={{ position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%) rotate(-2deg)", width: "52px", height: "18px", background: "rgba(255,220,100,0.55)", borderRadius: "2px" }} />

                                    <img
                                        src={item.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=75"}
                                        alt={item.place}
                                        style={{ width: "100%", height: "110px", objectFit: "cover", borderRadius: "5px", marginBottom: "10px" }}
                                        onError={e => { e.target.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=75"; }}
                                    />

                                    <h3 style={{ margin: "0 0 5px", color: "#5d4037", fontFamily: "'Caveat', cursive", fontSize: "1.2rem", fontWeight: 700 }}>
                                        {item.place}
                                    </h3>
                                    <p style={{ margin: "0 0 8px", color: "#6d4c41", fontStyle: "italic", fontSize: "0.8rem", lineHeight: 1.45 }}>
                                        "{item.note}"
                                    </p>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: "0.7rem", color: "#a1887f" }}>{item.date}</span>
                                        <span style={{ fontSize: "0.7rem", color: "#8d6e63" }}>@{item.friend}</span>
                                        <span style={{ fontSize: "0.7rem" }}>{"⭐".repeat(item.rating)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Bouton ajouter */}
                        <div style={{ display: "flex" }}>
                            <div
                                onClick={() => setShowModal(true)}
                                style={{ marginLeft: "20%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed #c8b89a", borderRadius: "8px", padding: "18px 0", cursor: "pointer", color: "#a1887f", fontFamily: "'Lora', serif", fontSize: "0.88rem", width: "200px", transition: "background 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.65)"}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                                + Ajouter une aventure
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(93,64,55,0.42)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
                    <div style={{ background: "#fdf8f0", borderRadius: "14px", padding: "26px", width: "100%", maxWidth: "390px", border: "1px solid #d7ccc8" }}>
                        <h2 style={{ fontFamily: "'Caveat', cursive", color: "#5d4037", fontSize: "1.6rem", margin: "0 0 16px" }}>
                            Nouvelle aventure ✈️
                        </h2>

                        <input style={inputStyle} placeholder="Lieu" value={newEntry.place} onChange={e => setNewEntry({ ...newEntry, place: e.target.value })} />
                        <input style={inputStyle} type="date" value={newEntry.date} onChange={e => setNewEntry({ ...newEntry, date: e.target.value })} />
                        <input style={inputStyle} placeholder="Image URL (Unsplash...)" value={newEntry.image} onChange={e => setNewEntry({ ...newEntry, image: e.target.value })} />
                        <input style={inputStyle} placeholder="Avec qui" value={newEntry.friend} onChange={e => setNewEntry({ ...newEntry, friend: e.target.value })} />
                        <textarea
                            style={{ ...inputStyle, minHeight: "64px", resize: "vertical" }}
                            placeholder="Description"
                            value={newEntry.note}
                            onChange={e => setNewEntry({ ...newEntry, note: e.target.value })}
                        />
                        <select style={inputStyle} value={newEntry.rating} onChange={e => setNewEntry({ ...newEntry, rating: Number(e.target.value) })}>
                            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{"⭐".repeat(n)} {n}</option>)}
                        </select>

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "6px" }}>
                            <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", color: "#a1887f", cursor: "pointer", fontFamily: "'Lora', serif", fontSize: "0.9rem" }}>
                                Annuler
                            </button>
                            <button onClick={handleAdd} style={{ background: "#8d6e63", color: "white", border: "none", borderRadius: "6px", padding: "8px 20px", fontFamily: "'Lora', serif", fontSize: "0.9rem", cursor: "pointer" }}>
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Diary;