/*
* Override of js/varien/configurable.js
* add hide of configurable from when something is choosed
* remove +x.xx/-x.xx in configurable dropdown
*/

Product.Config.prototype.stringFromElementHided = false;

Product.Config.prototype.reloadPrice = function(){
	if (!this.stringFromElementHided) {
		this.stringFromElementHided = true;
		var jq = jQuery.noConflict(), 
			id = this.config.productId, 
			$productPriceElementWrapper = jq('#product-price-' + id);		
		$productPriceElementWrapper.find('.from-configurable-price').hide();
	}
	
    if (this.config.disablePriceReload) {
        return;
    }
    var price    = 0;
    var oldPrice = 0;
    for(var i=this.settings.length-1;i>=0;i--){
        var selected = this.settings[i].options[this.settings[i].selectedIndex];
        if(selected.config){
            price    += parseFloat(selected.config.price);
            oldPrice += parseFloat(selected.config.oldPrice);
        }
    }

    optionsPrice.changePrice('config', {'price': price, 'oldPrice': oldPrice});
    optionsPrice.reload();
};

Product.Config.prototype.getOptionLabel = function(option, price){
    var price = parseFloat(price);
    if (this.taxConfig.includeTax) {
        var tax = price / (100 + this.taxConfig.defaultTax) * this.taxConfig.defaultTax;
        var excl = price - tax;
        var incl = excl*(1+(this.taxConfig.currentTax/100));
    } else {
        var tax = price * (this.taxConfig.currentTax / 100);
        var excl = price;
        var incl = excl + tax;
    }

    if (this.taxConfig.showIncludeTax || this.taxConfig.showBothPrices) {
        price = incl;
    } else {
        price = excl;
    }

    var str = option.label;
    return str;
};

Product.Config.prototype.formatPrice = function(price, showSign){
	var str = '';
	price = parseFloat(price);
	if(showSign){
	    if(price<0){
	        price = -price;
	    }
	}
	
	var roundedPrice = (Math.round(price*100)/100).toString();
	
	if (this.prices && this.prices[roundedPrice]) {
	    str+= this.prices[roundedPrice];
	}
	else {
	    str+= this.priceTemplate.evaluate({price:price.toFixed(2)});
	}
	return str;
};