console.log("popup.js is running");


const toggleButton = document.getElementById("toggleButton");
console.log(toggleButton)
let isActive = false;

toggleButton.addEventListener("click", () => {
    isActive = !isActive;

    if (isActive) {
        toggleButton.style.background = "green";
    } 
    else {
        toggleButton.style.backgroundColor = "red";
    }
});


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

    

    chrome.storage.sync.set({ keywords: keywords }, () => {
        saveButton.style.backgroundColor = "green";
        message.textContent = "Keywords saved successfully!";
        message.style.color = "green";
        console.log("Saved keywords:", keywords);
         keywordsInput.value = "";
    });
    
        }
    

});


