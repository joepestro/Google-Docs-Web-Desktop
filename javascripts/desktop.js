var desktop = Class.create();	
desktop.prototype = {
	//
	//	Setup Variables
	//
	numIcons : 0,
	currentJsonFeedData : null,
	lw : null,
	pageDimensions : {
		width : null,
		height : null
	},
	//
	//	Initialize the lightwindow.
	//
	initialize : function(jsonFeedData) {
		this.currentJsonFeedData = jsonFeedData;
		this._getPageDimensions();
		this.addIcons(jsonFeedData);
	},
	//
	//	Refresh desktop content.
	//
	refresh : function() {
		new Ajax.Request('./docs.php',
		{
			method: 'post',
			parameters: {sessionToken: $('googleSessionToken').innerHTML},
			onSuccess: function(transport) {
				var response = transport.responseText || "";
				
				// Only update if we found new content
				if (myDesktop._feedHasChanged(myDesktop.currentJsonFeedData, response)) {
					myDesktop.removeAllIcons();
					myDesktop.addIcons(response);
				}
				
				myDesktop.currentJsonFeedData = response;
			},
			onFailure: function(){ alert('An error has occurred with the Google Docs Data API. Please try again in a few minutes.') }
		});
	},
	//
	//	Add multiple icons to the desktop.
	//
	addIcons : function(jsonFeedData) {
		var obj = jsonFeedData.evalJSON();
		if (!obj.feed.entry)
			this.addIcon('Google Web Desktop Sample', 'http://docs.google.com/View?docid=dgx38x7c_38c532pt', 'document');
		else {
			for (var i = 0; i < obj.feed.entry.length; i++)
				this.addIcon(obj.feed.entry[i].title.$t, obj.feed.entry[i].link[0].href, obj.feed.entry[i].category[0].label);
		}
	},
	//
	//	Add a single icon to the desktop.
	//
	addIcon : function(iconName, url, documentType) {
		var icon = document.createElement('ul');
		icon.setAttribute('id', 'icon'+this.numIcons);
		icon.setAttribute('title', url);
	
		icon.ondblclick = this.showEditWindow.bindAsEventListener(this, iconName, url, documentType);
		
		var imageName;
		switch (documentType) {
			case 'spreadsheet':
				imageName = 'spread.gif';
				break;
			case 'presentation':
				imageName = 'pres.gif';
				break;
			default:
				imageName = 'doc.gif';
		}
		
		icon.innerHTML = '<li><img src="images/icons/' + imageName + '" /></li><li class="label">' + iconName + '</li>';
		
		$('icons').appendChild(icon);
		new Draggable('icon'+this.numIcons);
		this.numIcons++;	
	},
	//
	//	Remove all icons from the desktop.
	//
	removeAllIcons : function() {
		if ($('icons').hasChildNodes()) {
			while ($('icons').childNodes.length >= 1)
				$('icons').removeChild($('icons').firstChild);	
		}
	},
	//
	//	Show lightbox to edit a document
	//
	showEditWindow : function(e, windowName, url, documentType) {
		var helpMessage = 'Having cookie issues? No problem, <a href="' + url + '" target="_blank">edit ' + documentType + ' in a new window</a>.';
			
		myLightWindow.activateWindow({
			href: url, 
			title: windowName,
			caption: helpMessage,
			type: 'external'
		});
	},
	// 
	//  Compare the icons in two JSON feed strings
	//
	_feedHasChanged : function(o, c) {
		var original = o.evalJSON();
		var current = c.evalJSON();
		
		if (!original.feed.entry || !current.feed.entry)
			return true;
		
		if (original.feed.entry.length != current.feed.entry.length)
			return true;
			
		for (var i = 0; i < original.feed.entry.length; i++) {
			if (original.feed.entry[i].title.$t != current.feed.entry[i].title.$t)
				return true;
			else if (original.feed.entry[i].link[0].href != current.feed.entry[i].link[0].href)
				return true;
			else if (original.feed.entry[i].category[0].label != current.feed.entry[i].category[0].label)
				return true;
		}
		
		return false;
	},
	// 
	//  Get the actual page size
	//
	_getPageDimensions : function() {
		var xScroll, yScroll;
		if (window.innerHeight && window.scrollMaxY) {	
			xScroll = document.body.scrollWidth;
			yScroll = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){ 
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		} else { 
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}

		var windowWidth, windowHeight;
		if (self.innerHeight) {	
			windowWidth = self.innerWidth;
			windowHeight = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) { 
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else if (document.body) { 
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}	

		if(yScroll < windowHeight){
			this.pageDimensions.height = windowHeight;
		} else { 
			this.pageDimensions.height = yScroll;
		}

		if(xScroll < windowWidth){	
			this.pageDimensions.width = windowWidth;
		} else {
			this.pageDimensions.width = xScroll;
		}
	}
}

/*-----------------------------------------------------------------------------------------------*/

Event.observe(window, 'load', desktopInit, false);

//
//	Set up all of our links
//

var myDesktop = null;

function desktopInit() {
	var jsonFeedData = $('jsonFeedData').innerHTML;
	if (jsonFeedData == 'null' || jsonFeedData.indexOf('feed') == -1) // fix this
		jsonFeedData = null;
	
	if (!jsonFeedData) {
		// No token present (or invalid token), show welcome message as-is
		Element.hide('manage');
	}
	else {
		// Token is present, prepare the desktop
		
		// Clear welcome message 
		Element.hide('welcome');
		
		// Create new desktop class
		myDesktop = new desktop(jsonFeedData);
		
		// Set up auto-refresh for desktop, poll every 5 minutes
		new PeriodicalExecuter(myDesktop.refresh, 300);
		
		// Assign actions to new document links
		var newDoc = document.getElementsByClassName('normal', $('manage'));
		Event.observe(newDoc[0], 'click', addIconAfterLoad.bindAsEventListener(this, 'Untitled', 'http://docs.google.com/MiscCommands?command=newdoc&redirectToDocument=true', 'document'));
		Event.observe(newDoc[1], 'click', addIconAfterLoad.bindAsEventListener(this, 'Untitled', 'http://spreadsheets.google.com/ccc?new', 'spreadsheet'));
		Event.observe(newDoc[2], 'click', addIconAfterLoad.bindAsEventListener(this, 'Untitled', 'http://docs.google.com/?action=new_presentation', 'presentation'));
	}
}

function addIconAfterLoad(e) {
	var data = $A(arguments);
	data.shift();
	myDesktop.addIcon(data[0], data[1], data[2]);	
}