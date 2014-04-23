chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
			
			//Wrap span so only episodes and not character is affected.
            var wrapSpan = document.querySelectorAll('td.character > div');
            for (var i = 0; i < wrapSpan.length; i++) {
                wrapSpan[i].innerHTML = wrapSpan[i].innerHTML.replace(/\(\d.*?\)/, '<span class="episodelist">' + wrapSpan[i].innerHTML.match(/\(\d.*?\)/) + '</span>');
            }
			
			//make button so the user can clear the spoilers
            var btn = document.createElement("BUTTON");
            var t = document.createTextNode("Turn Off Spoilers");
            var castlist = document.getElementsByClassName('castlist_label');
            btn.appendChild(t);
            castlist[0].appendChild(btn);
            btn.addEventListener('click', clearCSS, false);
            btn.id = 'spoilerbutton';

			//the function changes the span class so it 'resets' back to before
            function clearCSS() {
                var list = document.getElementsByClassName('episodelist');
                var button = document.getElementById('spoilerbutton');
                if (list[0]) {
					//the loop ends because length will become 0
					//becomes 0 as every change to DOM is updated live
                    while (list.length)
						//changes the first element every passthrough until done
                        list[0].className = 'clearlist';
					//Changes button text to opposite
                    button.innerHTML = 'Turn On Spoilers';
                } else {
                    var list2 = document.getElementsByClassName('clearlist');
                    while (list2.length)
                        list2[0].className = 'episodelist';
                    button.innerHTML = 'Turn Off Spoilers';
                }

            }
        }
    }, 10);
});