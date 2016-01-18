(function ($) {

	$.expr[':'].textEquals = function(a, i, m) {
		return $(a).text().match("^" + m[3] + "$");
	};

	var MoreMenu = function (element, options) {
		this.$element = $(element);
		this.totalWidth = 0;
		this.containerWidth = this.$element.width();
		this.menuWidth = 0;
		this.hiddenWidth = 0;
		this.visibleWidth = 0;
		this.lastElementVisble = -1;
		this.keys = new Array();
		this.items = new Array();
		this.lastWindowWidth = $(window).width();
		this.uninited = true;
		this.options = $.extend({}, MoreMenu.DEFAULTS, options);

		if($(window).width() > this.options.minWidth) {
			this.init();
		}

		$that = this;
		$(window).bind('resize',function(e) {
			$that.recalculate($that);
		});
	};

	MoreMenu.DEFAULTS = {
		minWidth: 0,
		menuClass: 'mm-menu',
		menuTemplate: '<li class="mm-menu"><a href="#">More</a><ul class="mm-dropdown-menu"></ul></li>',
		dropdownMenuClass: 'mm-dropdown-menu'
	};

	MoreMenu.prototype.init = function() {
		$that = this;
		this.uninited = false;

		this.$element.find("> li").each(function(index) {
			$that.totalWidth += $(this).outerWidth();
			$that.visibleWidth += $(this).outerWidth();
			$that.items[$(this).children('a').text()] = {itemwidth: $(this).outerWidth(), itemelement: $(this)};
		});

		//Reverse the array because we want to be counting from the last nav item not the first
		for(var k in this.items) {
			this.keys.unshift(k);
		}

		this.$element.append(this.options.menuTemplate);
		this.$element.find('.mm-menu').hide();
		this.menuWidth = this.$element.find('.mm-menu').outerWidth();

		//Really don't want to do this.  Needs to find out why total width is smaller than nav width
		this.totalWidth += 30;

		this.down();
	}

	MoreMenu.prototype.down = function() {
		//Loop until we've hidden the nav items there isn't space for
		while(this.containerWidth + (this.hiddenWidth - this.menuWidth) <= this.totalWidth) {
			this.$element.find('.mm-menu').show();

			this.lastElementVisble++;

			//Update the length of the hidden and visible nav items
			this.hiddenWidth += this.items[this.keys[this.lastElementVisble]].itemwidth;
			this.visibleWidth -= this.items[this.keys[this.lastElementVisble]].itemwidth;

			//Hide the menu item in the main nav and add it to the more menu
			var $button = this.$element.find("> li a:textEquals('" + this.keys[this.lastElementVisble] + "')").parent().hide().clone();
			this.$element.find('.mm-dropdown-menu').prepend($button.show());
		}
	}

	MoreMenu.prototype.up = function() {
		//Check if the width of all the visible element plus the width of this element is smaller than the nav width
		if(this.lastElementVisble >= 0) {
			if(this.visibleWidth + (this.items[this.keys[this.lastElementVisble]].itemwidth + this.menuWidth) < this.containerWidth) {
				//Show the menu item in the main nav and remove it from the more menu
				this.items[this.keys[this.lastElementVisble]].itemelement.show();
				this.$element.find('.mm-dropdown-menu li a:textEquals("' + this.keys[this.lastElementVisble] + '")').remove();

				//Update the length of the hidden and visible nav items
				this.visibleWidth += this.items[this.keys[this.lastElementVisble]].itemwidth;
				this.hiddenWidth -= this.items[this.keys[this.lastElementVisble]].itemwidth;
				
				//Update the first element hidden
				if(this.lastElementVisble === 0) {
					this.$element.find('.mm-menu').hide();
				}

				this.lastElementVisble--;
			}
		}
	}

	MoreMenu.prototype.reinit = function() {
		$that = this;
		this.$element.find("> li:not(.mm-menu)").each(function(index) {
			$that.items[$(this).children('a').text()] = {itemwidth: $(this).outerWidth(), itemelement: $(this)};
		});

		this.keys = new Array();
		for(var k in this.items) {
			this.keys.unshift(k);
		}
	}

	MoreMenu.prototype.uninit = function() {
		this.uninited = true;
		this.$element.find('.mm-menu').remove();

		this.$element.find("> li").each(function(index) {
			$(this).show();
		});

		this.totalWidth = 0;
		this.containerWidth = this.$element.width();
		this.menuWidth = 0;
		this.hiddenWidth = 0;
		this.visibleWidth = 0;
		this.lastElementVisble = -1;
	}

	MoreMenu.prototype.recalculate = function() {
		if(this.options.minWidth !== 0 && window.matchMedia('(max-width: ' + this.options.minWidth + 'px)').matches) {
			this.uninit();
		} else {
			if(this.uninited === true) {
				this.init()
			} else {
				//Update the container width
				if(this.$element.outerWidth() != this.containerWidth) {
					this.containerWidth = this.$element.outerWidth();
					this.reinit();
				}

				//Check to see if the window is reducing in width
				if($(window).width() < this.lastWindowWidth) {
					this.down();
				}

				//Check to see if the window is increasing in width
				if($(window).width() > this.lastWindowWidth) {
					this.up();
				}

				//Store the new window width so we can compare against it when the window is resized again
				this.lastWindowWidth = $(window).width();
			}
		}
	}

	$.fn.moreMenu = function (option) {
		return this.each(function () {
			var $this = $(this);
			var options = typeof(option) === 'object' ? option : {};
			$this.data('moreMenu', data = new MoreMenu(this, options));
		});
	};
}(jQuery));