const https = require('https');

const searchWikiImages = (query) => {
    return new Promise((resolve) => {
        https.get(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=pageimages&piprop=original&format=json`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.query && parsed.query.pages) {
                        const pages = Object.values(parsed.query.pages);
                        if (pages.length > 0 && pages[0].original) {
                            resolve(pages[0].original.source);
                            return;
                        }
                    }
                    resolve(null);
                } catch (e) { resolve(null); }
            });
        });
    });
};

async function run() {
    const images = {
        dantewada: await searchWikiImages('Dantewada'),
        danteshwari: await searchWikiImages('Danteshwari Temple'),
        barsoor: await searchWikiImages('Barsoor'),
        bastar: await searchWikiImages('Bastar district'),
        waterfall: await searchWikiImages('Chitrakote Falls'),
        food: await searchWikiImages('Indian thali'),
        hotel: await searchWikiImages('Resort India')
    };
    console.log(JSON.stringify(images, null, 2));
}

run();
