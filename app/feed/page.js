"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { getFeeds } from "@/services/feedService";

const PRIORITY_CONFIG = {
    low: { label: "Low", color: "#4a7fff", bg: "rgba(74,127,255,0.1)", border: "rgba(74,127,255,0.2)" },
    medium: { label: "Mid", color: "#ffaa00", bg: "rgba(255,170,0,0.1)", border: "rgba(255,170,0,0.2)" },
    high: { label: "High", color: "#ff4444", bg: "rgba(255,68,68,0.1)", border: "rgba(255,68,68,0.22)" },
};

const CATEGORY_ICONS = {
    motivation: "⚡",
    fitness: "💪",
    mindset: "🧠",
    nutrition: "🥗",
};

const CATEGORY_COLORS = {
    motivation: { bg: "rgba(130,80,255,0.1)", text: "#b080ff", border: "rgba(130,80,255,0.2)" },
    fitness: { bg: "rgba(20,180,80,0.1)", text: "#40d080", border: "rgba(20,180,80,0.2)" },
    mindset: { bg: "rgba(30,120,220,0.1)", text: "#50a0ff", border: "rgba(30,120,220,0.2)" },
    nutrition: { bg: "rgba(200,120,20,0.1)", text: "#e09040", border: "rgba(200,120,20,0.2)" },
};

function FeedCard({ feed, isNew }) {
    const [visible, setVisible] = useState(!isNew);
    const priority = PRIORITY_CONFIG[feed.priority] || PRIORITY_CONFIG.medium;
    const catStyle = CATEGORY_COLORS[feed.category] || CATEGORY_COLORS.motivation;
    const catIcon = CATEGORY_ICONS[feed.category] || "📌";

    useEffect(() => {
        if (isNew) {
            const t = setTimeout(() => setVisible(true), 50);
            return () => clearTimeout(t);
        }
    }, [isNew]);

    const timeAgo = (dateStr) => {
        if (!dateStr) return "just now";
        const diff = Date.now() - new Date(dateStr);
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return "just now";
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    return (
        <div style={{
            padding: "20px 22px",
            borderRadius: "16px",
            background: isNew ? "rgba(130,80,255,0.05)" : "rgba(255,255,255,0.025)",
            border: `1px solid ${isNew ? "rgba(130,80,255,0.2)" : "rgba(255,255,255,0.07)"}`,
            backdropFilter: "blur(12px)",
            transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-16px)",
            cursor: "default",
            position: "relative",
            overflow: "hidden",
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isNew ? "rgba(130,80,255,0.2)" : "rgba(255,255,255,0.07)";
                e.currentTarget.style.background = isNew ? "rgba(130,80,255,0.05)" : "rgba(255,255,255,0.025)";
            }}
        >
            {/* Priority accent bar */}
            <div style={{
                position: "absolute",
                left: 0, top: 0, bottom: 0,
                width: "3px",
                background: priority.color,
                borderRadius: "3px 0 0 3px",
                opacity: 0.7,
            }} />

            {/* NEW badge */}
            {isNew && (
                <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    padding: "3px 8px",
                    borderRadius: "100px",
                    background: "rgba(130,80,255,0.2)",
                    border: "1px solid rgba(130,80,255,0.35)",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#c090ff",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                }}>
                    NEW
                </div>
            )}

            {/* Top row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px", paddingLeft: "10px" }}>
                <h3 style={{
                    margin: 0,
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#f0f0f0",
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "-0.2px",
                    flex: 1,
                    paddingRight: "40px",
                }}>
                    {feed.title}
                </h3>
            </div>

            {/* Message */}
            <p style={{
                margin: "0 0 14px",
                fontSize: "14px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.65,
                paddingLeft: "10px",
            }}>
                {feed.message}
            </p>

            {/* Footer */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", paddingLeft: "10px" }}>

                {/* Category */}
                <span style={{
                    fontSize: "12px",
                    padding: "4px 10px",
                    borderRadius: "100px",
                    background: catStyle.bg,
                    color: catStyle.text,
                    border: `1px solid ${catStyle.border}`,
                    fontWeight: 500,
                }}>
                    {catIcon} {feed.category}
                </span>

                {/* Priority */}
                <span style={{
                    fontSize: "12px",
                    padding: "4px 10px",
                    borderRadius: "100px",
                    background: priority.bg,
                    color: priority.color,
                    border: `1px solid ${priority.border}`,
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: priority.color, display: "inline-block" }} />
                    {feed.priority}
                </span>

                <span style={{ flex: 1 }} />

                {/* Coach */}
                {feed.coachName && (
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                        👨‍🏫 {feed.coachName}
                    </span>
                )}

                {/* Time */}
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
                    {timeAgo(feed.createdAt)}
                </span>
            </div>
        </div>
    );
}

export default function FeedPage() {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newIds, setNewIds] = useState(new Set());
    const [activeFilter, setActiveFilter] = useState("all");
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = getSocket();

        const loadFeeds = async () => {
            try {
                const data = await getFeeds();
                setFeeds(data);
            } catch (err) {
                console.log(err.message);
            }
            setLoading(false);
        };

        loadFeeds();

        socket.on("connect", () => setConnected(true));
        socket.on("disconnect", () => setConnected(false));

        socket.on("newFeed", (newFeed) => {
            setFeeds((prev) => [newFeed, ...prev]);
            setNewIds((prev) => new Set([...prev, newFeed._id]));
            setTimeout(() => {
                setNewIds((prev) => {
                    const next = new Set(prev);
                    next.delete(newFeed._id);
                    return next;
                });
            }, 8000);
        });

        return () => {
            socket.off("newFeed");
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    const categories = ["all", "motivation", "fitness", "mindset", "nutrition"];
    const filtered = activeFilter === "all" ? feeds : feeds.filter((f) => f.category === activeFilter);

    const CATEGORY_ICONS_MAP = { all: "✦", motivation: "⚡", fitness: "💪", mindset: "🧠", nutrition: "🥗" };

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <div style={{
                minHeight: "100vh",
                background: "#080810",
                backgroundImage: "radial-gradient(ellipse at 80% 10%, rgba(80,40,160,0.1) 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(20,80,180,0.07) 0%, transparent 55%)",
                color: "#f0f0f0",
                fontFamily: "'DM Sans', sans-serif",
            }}>

                {/* Header */}
                <div style={{
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "sticky",
                    top: 0,
                    background: "rgba(8,8,16,0.85)",
                    backdropFilter: "blur(20px)",
                    zIndex: 10,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "20px" }}>🔥</span>
                        <div>
                            <h1 style={{
                                margin: 0,
                                fontSize: "18px",
                                fontWeight: 700,
                                fontFamily: "'Space Grotesk', sans-serif",
                                letterSpacing: "-0.3px",
                            }}>Live Feed</h1>
                            <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
                                {feeds.length} post{feeds.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>

                    {/* Connection status */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{
                            width: "7px", height: "7px", borderRadius: "50%",
                            background: connected ? "#20c060" : "#666",
                            display: "inline-block",
                            animation: connected ? "livePulse 2s infinite" : "none",
                        }} />
                        <span style={{ fontSize: "12px", color: connected ? "#40d080" : "rgba(255,255,255,0.3)" }}>
                            {connected ? "Live" : "Connecting..."}
                        </span>
                    </div>
                </div>

                {/* Filter bar */}
                <div style={{
                    padding: "16px 24px",
                    display: "flex",
                    gap: "8px",
                    overflowX: "auto",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            style={{
                                padding: "7px 14px",
                                borderRadius: "100px",
                                border: activeFilter === cat ? "1px solid rgba(130,80,255,0.4)" : "1px solid rgba(255,255,255,0.06)",
                                background: activeFilter === cat ? "rgba(130,80,255,0.15)" : "transparent",
                                color: activeFilter === cat ? "#c090ff" : "rgba(255,255,255,0.35)",
                                fontSize: "13px",
                                fontWeight: activeFilter === cat ? 600 : 400,
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                transition: "all 0.15s ease",
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            {CATEGORY_ICONS_MAP[cat]} {cat}
                        </button>
                    ))}
                </div>

                {/* Feed List */}
                <div style={{ maxWidth: "680px", margin: "0 auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>

                    {loading && (
                        <div style={{ textAlign: "center", padding: "60px 0" }}>
                            <div style={{
                                width: "32px", height: "32px", border: "2px solid rgba(255,255,255,0.1)",
                                borderTop: "2px solid rgba(130,80,255,0.7)", borderRadius: "50%",
                                animation: "spin 0.9s linear infinite",
                                margin: "0 auto 12px",
                            }} />
                            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px" }}>Loading feed...</p>
                        </div>
                    )}

                    {!loading && filtered.length === 0 && (
                        <div style={{ textAlign: "center", padding: "80px 0" }}>
                            <p style={{ fontSize: "32px", marginBottom: "12px" }}>📭</p>
                            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "14px" }}>
                                {activeFilter === "all" ? "No posts yet" : `No ${activeFilter} posts`}
                            </p>
                        </div>
                    )}

                    {filtered.map((feed) => (
                        <FeedCard key={feed._id} feed={feed} isNew={newIds.has(feed._id)} />
                    ))}

                </div>

                <style>{`
          @keyframes livePulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(32,192,96,0.4); }
            50% { opacity: 0.7; box-shadow: 0 0 0 4px rgba(32,192,96,0); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        </>
    );
}