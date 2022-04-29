document.addEventListener('DOMContentLoaded', function () {
	
	let bto = document.getElementById("send")

	bto.addEventListener("click",async()=>{
		txt = document.getElementById("texto").value
		nbm = document.getElementById("numero").value
		chrome.storage.sync.set({txt,nbm})
		let [tab] = await chrome.tabs.query({active: true, currentWindow:true}) // Find current tab
		
		chrome.scripting.executeScript({ // Run the following script on our tab
			target: {tabId: tab.id},
			function: () => {
				main = document.querySelector("#main");
				textarea = main.querySelector(`Div[contenteditable]`);
				chrome.storage.sync.get("txt",({txt}) => {txto = txt});
				chrome.storage.sync.get("nbm",({nbm}) => {nbr = nbm});
				setTimeout(() => {
					for(let i = 0; i < nbr ; i++){
						textarea.textContent = txto;
						textarea.dispatchEvent(new InputEvent("input", { bubbles: true}))
						main.querySelector(`[data-testid="send"]`).click()
						console.log("Está no loop: ",i  + 1)
					};
				}, 1);
			}
				
		})
	})
})