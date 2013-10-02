
(function(exports) {
	'use strict';

	function Sticky(elem, options) {
		var sticky = this;

		if ( ! (this instanceof Sticky)) {
			return new Sticky(elem, options);
		}

		if (! elem) return null;

		if (elem instanceof Element) {
			elem = [elem];
		}

		sticky.sticked = [];

		this.options = options || {};

		for (var i = 0; i < elem.length; i++) {
			var element = elem[i];

			sticky.sticked.push({
				node: element,
				rect: element.getBoundingClientRect(),
				sticked: false
			});
		}

		window.addEventListener('scroll', function() {
			for (var i = 0; i < sticky.sticked.length; i++) {
				var element = sticky.sticked[i], y = window.scrollY + (sticky.options['spacing']||0);


				if (y >= element.rect.top && ! element.sticked) {
					
					element.node.style.width = element.rect.width+'px';
					element.node.style.position = 'fixed';
					element.node.style.top = 0+(sticky.options['spacing']||0)+'px';

					if (sticky.options.stick) {
						sticky.options.stick.apply(element.node, [element.rect]);
					}

					element.sticked = true;
					
				}
				else if (y < element.rect.top && element.sticked) {
					element.node.style.position = 'static';
					element.node.style.top = 'auto';

					if (sticky.options.unstick) {
						sticky.options.unstick.apply(element.node, [element.rect]);
					}
					
					element.sticked = false;
				}
			}
		});
	}

	exports.Sticky = Sticky;
})(window);
