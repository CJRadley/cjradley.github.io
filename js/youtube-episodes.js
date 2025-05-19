// Fetch and display latest Quantum Dispatch YouTube episodes

const MAX_RESULTS = 3; // Number of episodes to show on homepage

async function fetchLatestEpisodes() {
    // Fetch from your backend endpoint instead of YouTube API directly
    const url = `/api/youtube-episodes?maxResults=${MAX_RESULTS}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
}

function createEpisodeCard(video) {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const description = video.snippet.description;
    const thumbnail = video.snippet.thumbnails.medium.url;
    const episodeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const episodePage = `pages/episodes/episode-${videoId}.html`;

    return `
    <article class="episode-card">
        <a href="${episodePage}">
            <img src="${thumbnail}" alt="${title}">
        </a>
        <div class="episode-info">
            <h3>${title}</h3>
            <p>${description.substring(0, 120)}...</p>
            <iframe width="100%" height="180" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            <a href="${episodePage}" class="cta-btn small">Show Notes</a>
        </div>
    </article>
    `;
}

async function renderLatestEpisodes() {
    const container = document.getElementById('latest-episodes');
    if (!container) return;
    try {
        const episodes = await fetchLatestEpisodes();
        container.innerHTML = episodes.map(createEpisodeCard).join('');
    } catch (e) {
        container.innerHTML = '<p>Unable to load episodes at this time.</p>';
    }
}

document.addEventListener('DOMContentLoaded', renderLatestEpisodes);
