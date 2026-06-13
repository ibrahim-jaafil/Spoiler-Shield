console.log("content script check")


const blurwords = ["this season","found out","found","caught","episode","dead","dies","kills","gets killed","killed", "kill","shoots","stabs","kisses","marries","breaks up","divorces","wins","loses","betrays","reveals","confesses","confession","secret","surprise","twist","plot twist","ending","finale","death"]

function blurSpoilers(keywords) {   
   document.querySelectorAll('p, h1, h2, h3').forEach(p => {
        const text = p.textContent.toLowerCase();
        const hasKeyword = keywords.some(word => text.includes(word.toLowerCase()));
        const hasBlurword = blurwords.some(word => text.includes(word.toLowerCase()));

        if (hasKeyword) {
            if(hasBlurword){
            
            p.setAttribute('style', 'filter: blur(8px) !important');
            console.log(`Blocked spoiler: ${text}`);
        }
    }
    })


    document.querySelectorAll('span.font-chirp').forEach(tweet => {
        const text = tweet.textContent.toLowerCase();
        const hasKeyword = keywords.some(word => text.includes(word.toLowerCase()));
        const hasBlurword = blurwords.some(word => text.includes(word.toLowerCase()));

           if (hasKeyword) {
            if(hasBlurword){
             tweet.setAttribute('style', 'filter: blur(8px) !important');
            console.log('tried');
    }
           }
            const article = tweet.closest('article');
            if (article) {
                article.querySelectorAll('img').forEach(img => {
                    if (!img.src.includes('profile_images')) {
                        img.setAttribute('style', 'filter: blur(8px) !important');
                        console.log('Blurred image');
                    }
                });
            }


    })

}

    chrome.storage.sync.get(["active","keywords"], (data) => {
    const keywords = data.keywords || [];

    console.log("Loaded keywords:", keywords);
    
        if (!data.active) return;

    // Run once on load
    blurSpoilers(keywords);

    // Watch for new content being added (Twitter, Reddit, etc.)
    const observer = new MutationObserver(() => {
        blurSpoilers(keywords);
    });


    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});


chrome.storage.sync.get(["active", "keywords"], (data) => {
    if (data.active) {
        startBlurring(data.keywords || []);
    }
});

// react instantly when toggle is clicked
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "TOGGLE") {
        if (msg.enabled) {
            chrome.storage.sync.get(["keywords"], (data) => {
                blurSpoilers(data.keywords || []);
            });
        } 
    }
});

