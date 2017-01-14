chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            var infoSpan = document.querySelectorAll('div.item_description');
	    for (var i = 0; i < infoSpan.length; i++) {
                infoSpan[i].innerHTML = infoSpan[i].innerHTML.replace(/.+/, '<span class="episodelist">' + infoSpan[i].innerHTML.match(/.+/) + '</span>');
	    }
			var seasonFlag = document.getElementsByClassName('episodelist');
			if (seasonFlag.length > 0){
				var btn = document.createElement("BUTTON");
				var t = document.createTextNode("Turn Off Spoilers");
				var seasonlist = document.document.getElementsByClassName('episode-list-select');
				btn.appendChild(t);
				seasonlist[0].appendChild(btn);
				btn.addEventListener('click', clearCSS, false);
				btn.id = 'spoilerbutton';
			}
			
			var findSpoilers = function (){
                //show page
                var wrapSpanShow = document.querySelectorAll('td.character > div');
                for (var i = 0; i < wrapSpanShow.length; i++) {
                    var item = wrapSpanShow[i];
                    if (item.querySelectorAll('.episodelist').length == 0){
                        item.innerHTML = item.innerHTML.replace(/\(\d.*?\)/, '<span class="episodelist">' + item.innerHTML.match(/\(\d.*?\)/) + '</span>');
                    }
                }

                //actor page
                var wrapSpanActor = document.querySelectorAll('.filmo-episodes');
                for (var i = 0; i < wrapSpanActor.length; i++) {
                    var item = wrapSpanActor[i];
                    if (item.querySelectorAll('.episodelist').length == 0){
                       item.innerHTML = '<span class="episodelist">' + item.innerHTML + '</span>';
                    }
                }
                //character page
                var wrapSpanChar = document.querySelectorAll('#tn15content ol>li>a:nth-child(n+2),#tn15content ol>li>a:first-child');
                for (var i = 0; i < wrapSpanChar.length; i++) {
                    var item = wrapSpanChar[i];
                    if (item.querySelectorAll('.episodelist').length == 0){
                        item.innerHTML = '<span class="episodelist">' + item.innerHTML + '</span>';
                    }
                }                
            };
            findSpoilers();

            //required for when user clicks show more on actor page
            var links = document.querySelectorAll(".filmo-row");
            for (var i = 0; i <= links.length && links.length != 0; i++){
                try{
                    var item = links[i];
                    item.addEventListener("DOMNodeInserted", function(evt){
                        if (document.getElementsByClassName('button-on-mode').length === 1){
                            findSpoilers();
                        }
                        this.removeEventListener("DOMNodeInserted", this);
                    });
                } catch(err){}
            }

			//make button so the user can clear the spoilers
			//only make if class:episodelist exists
			var listFlag = document.getElementsByClassName('episodelist');
			if (listFlag.length > 0){
				var btn = document.createElement("BUTTON");
				var t = document.createTextNode("Turn Off Spoilers");
				var castlist = document.getElementsByClassName('castlist_label');
                var actorPage = document.getElementById('jumpto');
                var charPage = document.getElementsByClassName('headerinline');
				btn.appendChild(t);
                btn.addEventListener('click', clearCSS, false);
                btn.id = 'spoilerbutton';
                btn.className = 'button-on-mode';

                if (castlist[0]){
                    castlist[0].appendChild(btn);
                }
                else if (actorPage){
                    actorPage.appendChild(btn);                        
                }
                else if (charPage) {
                    charPage[0].appendChild(btn);
                }
			}
			
			//the function changes the span class so it 'resets' back to before
            function clearCSS() {
                var list = document.getElementsByClassName('episodelist');
                var button = document.getElementById('spoilerbutton');
                //Spoilers Off
                if (list[0]) {
                    list = [].slice.call(list, 0);
                    for (var i = 0; i < list.length; ++i)
                        list[i].className = "clearlist";
					//Changes button text to opposite
                    button.innerHTML = 'Turn On Spoilers';
                    button.className = 'button-off-mode';
                //Spoilers On
                } else {
                    list = document.getElementsByClassName('clearlist');
                    list = [].slice.call(list, 0);
                    for (var i = 0; i < list.length; ++i)
                        list[i].className = "episodelist";
                    button.innerHTML = 'Turn Off Spoilers';
                    button.className = 'button-on-mode';
                    findSpoilers();
                }

            }
        }
    }, 10);
});
