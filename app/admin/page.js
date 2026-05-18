"use client";

import { useState } from "react";
import { createFeed } from "@/services/feedService";

const CATEGORIES = ["motivation", "fitness", "mindset", "nutrition"];
const PRIORITIES = ["low", "medium", "high"];

const PRIORITY_STYLES = {
    low: { bg: "#1a2744", border: "#2a4080", text: "#6b9fff", dot: "#4a7fff" },
    medium: { bg: "#2a1f00", border: "#5c4300", text: "#ffb830", dot: "#ffaa00" },
    high: { bg: "#2a0a0a", border: "#6b1a1a", text: "#ff6b6b", dot: "#ff4444" },
};

const CATEGORY_ICONS = {
    motivation: "⚡",
    fitness: "💪",
    mindset: "🧠",
    nutrition: "🥗",
};

const DEFAULT_FORM = {
    title: "",
    message: "",
    coachName: "",
    category: "motivation",
    priority: "medium",
};

export default function AdminPage() {
    const [form, setForm] = useState(DEFAULT_FORM);
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(null);
    const [focused, setFocused] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createFeed(form);
            setConfirmed(form);
            setForm(DEFAULT_FORM);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false); // ← this was the real fix
        }
    };


    const inputStyle = (name) => ({
        width: "100%",
        padding: "14px 16px",
        borderRadius: "12px",
        background: focused === name ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${focused === name ? "rgba(160,120,255,0.5)" : "rgba(255,255,255,0.08)"}`,
        color: "#f0f0f0",
        fontSize: "14px",
        fontFamily: "'DM Sans', sans-serif",
        outline: "none",
        transition: "all 0.2s ease",
        boxSizing: "border-box",
        boxShadow: focused === name ? "0 0 0 3px rgba(130,80,255,0.12)" : "none",
    });

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <div style={{
                minHeight: "100vh",
                background: "#080810",
                backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(80,40,160,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(30,100,200,0.08) 0%, transparent 50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                fontFamily: "'DM Sans', sans-serif",
            }}>

                <div style={{
                    width: "100%",
                    maxWidth: "520px",
                }}>

                    {/* Header */}
                    <div style={{ marginBottom: "28px", textAlign: "center" }}>
                        <div style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "6px 14px",
                            borderRadius: "100px",
                            background: "rgba(130,80,255,0.12)",
                            border: "1px solid rgba(130,80,255,0.2)",
                            marginBottom: "16px",
                        }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a060ff", display: "inline-block", animation: "pulse 2s infinite" }} />
                            <span style={{ fontSize: "12px", color: "#a080ff", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Admin Panel</span>
                        </div>
                        <h1 style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#ffffff",
                            fontFamily: "'Space Grotesk', sans-serif",
                            margin: 0,
                            letterSpacing: "-0.5px",
                        }}>
                            Create Feed Post
                        </h1>
                        <p style={{ margin: "8px 0 0", fontSize: "14px", color: "rgba(255,255,255,0.35)" }}>
                            Broadcast messages to your athletes
                        </p>
                    </div>

                    {/* Confirmation Box */}
                    {confirmed && (
                        <div style={{
                            marginBottom: "20px",
                            borderRadius: "16px",
                            background: "rgba(20, 160, 80, 0.08)",
                            border: "1px solid rgba(20, 200, 80, 0.2)",
                            padding: "20px",
                            position: "relative",
                            overflow: "hidden",
                            animation: "slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}>
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                                background: "linear-gradient(90deg, #20c060, #00ffaa)",
                            }} />

                            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                                <div style={{
                                    width: "36px", height: "36px", borderRadius: "50%",
                                    background: "rgba(20,200,80,0.15)", border: "1px solid rgba(20,200,80,0.3)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0, fontSize: "16px",
                                }}>✓</div>

                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: "0 0 4px", fontSize: "13px", fontWeight: 600, color: "#40e080", letterSpacing: "0.03em", textTransform: "uppercase" }}>
                                        Feed Published
                                    </p>
                                    <p style={{ margin: "0 0 10px", fontSize: "15px", fontWeight: 600, color: "#f0f0f0" }}>
                                        {confirmed.title}
                                    </p>
                                    <p style={{ margin: "0 0 12px", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                                        {confirmed.message}
                                    </p>
                                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                        <span style={{ fontSize: "12px", padding: "3px 10px", borderRadius: "100px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                                            {CATEGORY_ICONS[confirmed.category]} {confirmed.category}
                                        </span>
                                        <span style={{
                                            fontSize: "12px", padding: "3px 10px", borderRadius: "100px",
                                            background: PRIORITY_STYLES[confirmed.priority].bg,
                                            color: PRIORITY_STYLES[confirmed.priority].text,
                                            border: `1px solid ${PRIORITY_STYLES[confirmed.priority].border}`,
                                        }}>
                                            {confirmed.priority} priority
                                        </span>
                                        {confirmed.coachName && (
                                            <span style={{ fontSize: "12px", padding: "3px 10px", borderRadius: "100px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
                                                👨‍🏫 {confirmed.coachName}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setConfirmed(null)}
                                    style={{
                                        background: "none", border: "none", color: "rgba(255,255,255,0.3)",
                                        cursor: "pointer", fontSize: "18px", padding: "0", lineHeight: 1, flexShrink: 0,
                                    }}
                                >×</button>
                            </div>
                        </div>
                    )}

                    {/* Form Card */}
                    <div style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "20px",
                        padding: "28px",
                        backdropFilter: "blur(20px)",
                    }}>

                        <form onSubmit={handleSubmit}>

                            {/* Title */}
                            <div style={{ marginBottom: "14px" }}>
                                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Title</label>
                                <input
                                    name="title"
                                    placeholder="e.g. Morning Mindset Boost"
                                    value={form.title}
                                    onChange={handleChange}
                                    onFocus={() => setFocused("title")}
                                    onBlur={() => setFocused(null)}
                                    required
                                    style={inputStyle("title")}
                                />
                            </div>

                            {/* Message */}
                            <div style={{ marginBottom: "14px" }}>
                                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Message</label>
                                <textarea
                                    name="message"
                                    placeholder="Write your message to athletes..."
                                    value={form.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocused("message")}
                                    onBlur={() => setFocused(null)}
                                    required
                                    rows={4}
                                    style={{ ...inputStyle("message"), resize: "vertical", lineHeight: 1.6 }}
                                />
                            </div>

                            {/* Coach */}
                            <div style={{ marginBottom: "14px" }}>
                                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Coach Name</label>
                                <input
                                    name="coachName"
                                    placeholder="e.g. Coach Marcus"
                                    value={form.coachName}
                                    onChange={handleChange}
                                    onFocus={() => setFocused("coachName")}
                                    onBlur={() => setFocused(null)}
                                    style={inputStyle("coachName")}
                                />
                            </div>

                            {/* Category + Priority */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>

                                {/* Category Pills */}
                                <div>
                                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Category</label>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                        {CATEGORIES.map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setForm({ ...form, category: cat })}
                                                style={{
                                                    padding: "8px 12px",
                                                    borderRadius: "8px",
                                                    border: form.category === cat ? "1px solid rgba(130,80,255,0.4)" : "1px solid rgba(255,255,255,0.06)",
                                                    background: form.category === cat ? "rgba(130,80,255,0.15)" : "rgba(255,255,255,0.02)",
                                                    color: form.category === cat ? "#c090ff" : "rgba(255,255,255,0.4)",
                                                    fontSize: "13px",
                                                    cursor: "pointer",
                                                    textAlign: "left",
                                                    transition: "all 0.15s ease",
                                                    fontFamily: "'DM Sans', sans-serif",
                                                    fontWeight: form.category === cat ? 600 : 400,
                                                }}
                                            >
                                                {CATEGORY_ICONS[cat]} {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Priority Pills */}
                                <div>
                                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Priority</label>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                        {PRIORITIES.map((p) => (
                                            <button
                                                key={p}
                                                type="button"
                                                onClick={() => setForm({ ...form, priority: p })}
                                                style={{
                                                    padding: "8px 12px",
                                                    borderRadius: "8px",
                                                    border: form.priority === p ? `1px solid ${PRIORITY_STYLES[p].border}` : "1px solid rgba(255,255,255,0.06)",
                                                    background: form.priority === p ? PRIORITY_STYLES[p].bg : "rgba(255,255,255,0.02)",
                                                    color: form.priority === p ? PRIORITY_STYLES[p].text : "rgba(255,255,255,0.4)",
                                                    fontSize: "13px",
                                                    cursor: "pointer",
                                                    textAlign: "left",
                                                    transition: "all 0.15s ease",
                                                    fontFamily: "'DM Sans', sans-serif",
                                                    fontWeight: form.priority === p ? 600 : 400,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                }}
                                            >
                                                <span style={{
                                                    width: "6px", height: "6px", borderRadius: "50%",
                                                    background: form.priority === p ? PRIORITY_STYLES[p].dot : "rgba(255,255,255,0.2)",
                                                    flexShrink: 0,
                                                    transition: "background 0.15s",
                                                }} />
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading || !form.title || !form.message}
                                style={{
                                    width: "100%",
                                    padding: "15px",
                                    borderRadius: "12px",
                                    border: "none",
                                    background: loading ? "rgba(100,60,200,0.3)" : "linear-gradient(135deg, #7030e0 0%, #5020c0 100%)",
                                    color: "#ffffff",
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    cursor: loading || !form.title || !form.message ? "not-allowed" : "pointer",
                                    transition: "all 0.2s ease",
                                    letterSpacing: "0.02em",
                                    opacity: !form.title || !form.message ? 0.5 : 1,
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading && form.title && form.message) e.target.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; }}
                            >
                                {loading ? (
                                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                        <span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                                        Publishing...
                                    </span>
                                ) : "Publish Feed →"}
                            </button>

                        </form>
                    </div>

                    {/* Divider hint */}
                    <p style={{ textAlign: "center", marginTop: "16px", fontSize: "12px", color: "rgba(255,255,255,0.18)" }}>
                        Posts are broadcast in real-time to all athletes
                    </p>
                </div>

                <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
          select option { background: #1a1a2e; color: #f0f0f0; }
        `}</style>
            </div>
        </>
    );
}