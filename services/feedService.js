const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8800";

export const createFeed = async (payload) => {
    const res = await fetch(`${API_URL}/create-feed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to create feed");
    }

    return data;
};

export const getFeeds = async () => {
    const res = await fetch(`${API_URL}/get-feeds`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch feeds");
    }

    return data.data;
};