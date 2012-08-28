/*
* the file is used for some customisation for the contact form
* it is used in app/design/frontend/default/bouillet/template/contacts/form.phtml
*/

//----------------------- CustomContactForm Class -------------------------------

/* class that represents a form */
function CustomContactForm(id, options) {	
	this.fields = {}; // reset the object
	this.id = id;
	this.settings = options;
	this.initialize();
}

CustomContactForm.prototype.fields = {};
CustomContactForm.prototype.id = null;
CustomContactForm.prototype.type = null;

/* initialize the correct form from the given params */
CustomContactForm.prototype.initialize = function() {
	this.initializeJQuery();
	this.initializeForm();
	this.initializeType();
	
	this.addListenerOnCircularLink();	
	this.run();
};

CustomContactForm.prototype.run = function() {
	switch (this.type) {
		case "particulier":
			this.hideCompanyFied();
			this.showNameLabelForIndividual();
			this.setPhoneOptional();
		break;
		case "professionnel":
			this.showCompanyFied();
			this.showNameLabelForProfessional();
			this.setPhoneRequired();
		break;
	}
	
	this.setPageTitle();
	this.setPageImage();	
	this.setCircularLink();	
};

CustomContactForm.prototype.addListenerOnCircularLink = function() {
	var self = this;

	this.$('.contact-circular_link a').bind('click', function() {
		self.type = self.type == 'particulier' ? 'professionnel' : 'particulier';
		window.location.hash = self.type;
		self.run();
		return false;
	});
};

/* get a no conflict jQuery version to avoid conflicts with the magento prototype included framework */
CustomContactForm.prototype.initializeJQuery = function() {
	this.$ = jQuery.noConflict();		
};

/* initialize the form */
CustomContactForm.prototype.initializeForm = function() {
	this.form = this.$('#' + this.id);
};

/* get type from hash */ 
CustomContactForm.prototype.initializeType = function() {
	this.type = "particulier";	
	
	var hash = window.location.hash.substring(1);

	if (hash) {
		this.type = hash;
	}
	
	// change the form action
	var action = this.form.attr('action');
	action += '#' + this.type;

	this.form.attr({action: action});
};

/* show asterix and show company field */
CustomContactForm.prototype.showCompanyFied = function() {
	this.setCompanyRequired();
	this.getField('company').show();
};

/* hide company field */
CustomContactForm.prototype.hideCompanyFied = function() {
	this.getField('company').hide();
};

/* activate the correct label for individual contact form */
CustomContactForm.prototype.showNameLabelForIndividual = function() {
	var field = this.getField('name');
	field.getElement('label.particulier').show();		
	field.getElement('label.professionnel').hide();		
};

/* activate the correct label for professional contact form */
CustomContactForm.prototype.showNameLabelForProfessional = function() {	
	var field = this.getField('name');	
	field.getElement('label.professionnel').show()	
	field.getElement('label.particulier').hide();	
};

/* make the phone field required */ 
CustomContactForm.prototype.setPhoneRequired = function() {
	this.getField('telephone').setRequired();
};

/* make the phone field optional */ 
CustomContactForm.prototype.setPhoneOptional = function() {
	this.getField('telephone').setOptional();
};

/* make the company field required */ 
CustomContactForm.prototype.setCompanyRequired = function() {
	this.getField('company').setRequired();
};

CustomContactForm.prototype.setCircularLink = function() {
	var $el = this.$('.contact-circular_link a');
	var title = this.settings[this.type].circularLinkTitle;
	$el.html(title);
};

CustomContactForm.prototype.setPageTitle = function() {
	var $el = this.$('.page-title h1');
	var title = this.settings[this.type].pageTitle;
	$el.html(title);
};
	
CustomContactForm.prototype.setPageImage = function() {
	var $el = this.$('.page-image img');
	var src = this.settings.baseImages + this.type + '.jpg';
	$el.attr({src: src});
};

/* get a field */ 
CustomContactForm.prototype.getField = function(name) {
	// cache the element if needed
	if (typeof this.fields[name] == "undefined") {
		var $el = this.getElement('#field-' + name);
		this.fields[name] = new CustomContactField($el, this.$);
	}
	
	return this.fields[name];	
};

/* get an element in the form scope */
CustomContactForm.prototype.getElement = function(selector) {
	return this.$(selector, this.form);
};

//----------------------- CustomContactField Class -------------------------------

/* class that represent a field */
function CustomContactField($el, jq) {
	this.el = $el;
	this.$ = jq;
	this.elements = {}; // reset the object
}

CustomContactField.prototype.elements = {};

/* show the field */
CustomContactField.prototype.show = function() { this.el.show(); }
/* hide the field */ 
CustomContactField.prototype.hide = function() { this.el.hide(); }

/* get field label element */
CustomContactField.prototype.getLabel = function() {
	return this.getElement('label');
}

/* get input field element */
CustomContactField.prototype.getInput = function() {
	return this.getElement('input');
}

/* get an element in the field's scope */
CustomContactField.prototype.getElement = function(selector) {
	// cache the element if needed
	if (typeof this.elements[selector] == "undefined") {
		this.elements[selector] = this.$(selector, this.el);
	}
	return this.elements[selector];
}

/* activate the field validation */
CustomContactField.prototype.setRequired = function() {
	this.getLabel().addClass('required');
	this.showAsterix();
	this.getInput().addClass('required-entry');
}

/* desactivate the field validation */
CustomContactField.prototype.setOptional = function() {
	this.getLabel().removeClass('required');
	this.hideAsterix();
	this.getInput().removeClass('required-entry');	
}

/* show the label asterix element */ 
CustomContactField.prototype.showAsterix = function() {
	this.getElement('em').show();
}

/* hide the label asterix element */ 
CustomContactField.prototype.hideAsterix = function() {
	this.getElement('em').hide();
}