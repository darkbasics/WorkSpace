function MiniCart() {
	this.$ = jQuery.noConflict();
	this.$trigger = this.$('.trigger-minicart');
	this.$cart = this.$('#minicart');
	
	this.height = this.$cart.height();
	
	this.autoCloseTimer = null;
	this.opening = false;
	this.closing = false;
	this.opened = false;
	
/* 	this.reset();	 */
	this.initialize();
};

MiniCart.prototype.settings = {
	durations: {
		open: 150,
		close: 250,
		autoClose: 200
	}
};

MiniCart.prototype.initialize = function() {
	var self = this;
	
	this.$trigger.on('mouseover', function() {
		self.open();
	});
	this.$cart.on('mouseenter', function() {
		self.open();
	});	
	this.$cart.on('mouseleave', function() {
		self.autoClose();
	});	
};

MiniCart.prototype.open = function(callback) {
	var self = this;
	
	this.resetAutoClose();
	
	if (!this.opened && !this.opening) {

		this.closing = false;
		this.opening = true;
												
		this.$cart.stop(true, true).slideDown(this.settings.durations.open, function() {
			self.opened = true;
			self.opening = false;
			
			if (callback) {
				callback();
			}
		});
	}
};

MiniCart.prototype.close = function(callback) {
	var self = this;

	this.resetAutoClose();

	if (!this.closing) {		
						
		this.opening = false;
		this.closing = true;
		this.opened = false;
						
		this.$cart.stop(true, true).slideUp(this.settings.durations.close, function() {
			self.closing = false;
			if (callback) {
				callback();
			}			
		});
	}
};

MiniCart.prototype.resetAutoClose = function() {
	if (this.autoCloseTimer) {
		clearTimeout(this.autoCloseTimer);
		this.autoCloseTimer = null;
	}	
};

MiniCart.prototype.openAndAutoClose = function(delay) {
	var self = this;
	this.open(function() {
		self.autoClose(delay);
	});
};

MiniCart.prototype.autoClose = function(delay) {
	var self = this;
	
	if (!delay) {
		delay = this.settings.durations.autoClose;
	}
	
	this.autoCloseTimer = setTimeout(function() {
		self.close();
	}, delay);
};