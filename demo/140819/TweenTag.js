 /*
 * @author Eia (http://github.com/EIA http://about.me/eia)
 *
 * for feature requests or bugs, please visit https://github.com/EIA/TweenTag.js
 *
 * licensed under the MIT license 
 */


TweenTag = function($tags){
	this.tTags = $tags?$tags:[];
	this.currencLaunchPercent = 0;
	this.callbacks = {};
	//console.log(this);
	//console.log(this.tTags);
};

TweenTag.TAG_LAUNCH = "tag_launch";

TweenTag.prototype = {
	constructor: TweenTag,

	updatePercent: function($percent){
		//console.log("---------");
		//console.log(this);
		//console.log(this.tTags);
		//console.log("$percent: "+$percent+ " "+this.tTags[0]);
		//
		if (this.tTags[0] == null) {
			return;
		};
		if ($percent >= this.tTags[0] ) {
			this.currencLaunchPercent = this.tTags[0];
			this.tTags.shift();
			//console.log("!: "+this.currencLaunchPercent);
			//console.log("this.TAG_LAUNCH: "+TweenTag.TAG_LAUNCH);
			this.dispatchEvent(TweenTag.TAG_LAUNCH);
			this.updatePercent($percent);
		};
		return this;
	},


	/*
	 * clear tag array
	 */
	clear: function() {
		this.tTags = [];
	},

	/*
	 * shift tag array
	 */
	shift: function() {
		return this.tTags.shift();
	},

	/*
	 * range: 0-1;
	 */
	push: function($tagPercent) {
		this.tTags.push($tagPercent);
		this.tTags.sort();
		return this;
	},

	/*
	 * return tTags;
	 */
	getTags: function() {
		return this.tTags;
	},

	/*
	 * return currentLaunchPercent
	 */
	getCurrencLaunchPercent: function() {
		return this.currencLaunchPercent;
	},




	addCallback: function(name, callback) {
        this.callbacks[name] = callback;
    },
    
    removeCallback: function(name) {
        delete this.callbacks[name];
    },
    
    dispatchEvent: function(name, args) {
    	//console.log("dispatchEvent > "+name);
        var callback = this.callbacks[name];
        //console.log("callback: "+callback);
        if (callback) {
            callback(args);
        }
    }
}