console.log("popup.js is running");


const toggleButton = document.getElementById("toggleButton");

let isActive = false

chrome.storage.sync.get(["active"], (data) => {
    isActive = data.active || false;
    toggleButton.style.backgroundColor = isActive ? "green" : "red";
});

toggleButton.addEventListener("click", () => {
    isActive = !isActive;

    if (isActive) {
        toggleButton.style.background = "green";
        chrome.storage.sync.set({ active: true })

    } 
    else {
        toggleButton.style.backgroundColor = "red";
        chrome.storage.sync.set({ active: false })

    }

     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "TOGGLE", active: isActive });
    });

});
//tell content


const saveButton = document.getElementById("saveButton");
const keywordsInput = document.getElementById("keywords");
const message = document.getElementById("message");

saveButton.addEventListener("click", () => {
    const keywords = keywordsInput.value
        .split(",")
        .map(word => word.trim().toLowerCase())
        .filter(word => word !== "");


     
    if(!isActive) {
        message.textContent = "please turn on Shield First";
    }

    else{
        if (keywords.length === 0) {
        saveButton.style.backgroundColor = "red";
        message.textContent = "Please enter at least one keyword.";
        return;
        }

    

    chrome.storage.sync.get(["keywords"], (data) => {
    const existing = data.keywords || [];
    const newKeywords = keywords; // your already-parsed array
    const merged = [...new Set([...existing, ...newKeywords])]; // merge, no duplicates

    chrome.storage.sync.set({ keywords: merged }, () => {
        saveButton.style.backgroundColor = "green";
        message.textContent = "Keywords saved successfully!";
        message.style.color = "green";
        console.log("Saved keywords:", merged);
        keywordsInput.value = "";
    });
});

    
        }
    

});


