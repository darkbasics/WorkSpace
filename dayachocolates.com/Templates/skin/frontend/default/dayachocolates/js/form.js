/*
In modern browsers,
{
	12: {name: 'hello'},
	5: {name: 'world'}
}
would become
{
	5: {name: 'world'},
	12: {name: 'hello'}
}
So in app/code/local/Mage/Directory/Helper/Data.php, we add '_' before the id/key of each region.
*/   

RegionUpdater.prototype.update = function(){
    if (this.regions[this.countryEl.value]) {
        var i, option, region, def;

        if (this.regionTextEl) {
            def = this.regionTextEl.value.toLowerCase();
            this.regionTextEl.value = '';
        }
        if (!def) {
            def = this.regionSelectEl.getAttribute('defaultValue');
        }

        this.regionSelectEl.options.length = 1;
        
        var regionsCountry = this.regions[this.countryEl.value];
        
        for (regionId in this.regions[this.countryEl.value]) {
            region = this.regions[this.countryEl.value][regionId];

            option = document.createElement('OPTION');
            option.value = regionId.substr(1, regionId.length);
         
            option.text = region.name;

            if (this.regionSelectEl.options.add) {
                this.regionSelectEl.options.add(option);
            } else {
                this.regionSelectEl.appendChild(option);
            }

            if (regionId==def || region.name.toLowerCase()==def || region.code.toLowerCase()==def) {
                this.regionSelectEl.value = regionId;
            }
        }

        if (this.disableAction=='hide') {
            if (this.regionTextEl) {
                this.regionTextEl.style.display = 'none';
            }

            this.regionSelectEl.style.display = '';
        } else if (this.disableAction=='disable') {
            if (this.regionTextEl) {
                this.regionTextEl.disabled = true;
            }
            this.regionSelectEl.disabled = false;
        }
        this.setMarkDisplay(this.regionSelectEl, true);
    } else {
        if (this.disableAction=='hide') {
            if (this.regionTextEl) {
                this.regionTextEl.style.display = '';
            }
            this.regionSelectEl.style.display = 'none';
            Validation.reset(this.regionSelectEl);
        } else if (this.disableAction=='disable') {
            if (this.regionTextEl) {
                this.regionTextEl.disabled = false;
            }
            this.regionSelectEl.disabled = true;
        } else if (this.disableAction=='nullify') {
            this.regionSelectEl.options.length = 1;
            this.regionSelectEl.value = '';
            this.regionSelectEl.selectedIndex = 0;
            this.lastCountryId = '';
        }
        this.setMarkDisplay(this.regionSelectEl, false);
    }


	// Make Zip and its label required/optional
    var zipUpdater = new ZipUpdater(this.countryEl.value, this.zipEl);
    zipUpdater.update();
};