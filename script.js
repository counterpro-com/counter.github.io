(() => {
	if (document.body.dataset.dynamicUiLoaded === "true") {
		return;
	}

	const stylesheetHref = document.querySelector('link[rel="stylesheet"]')?.getAttribute('href') || 'style.css';
	const basePath = stylesheetHref.startsWith('../') ? '../' : './';
	if (!document.querySelector('link[data-bootstrap-icons]')) {
		const bootstrapIcons = document.createElement('link');
		bootstrapIcons.rel = 'stylesheet';
		bootstrapIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
		bootstrapIcons.dataset.bootstrapIcons = 'true';
		document.head.appendChild(bootstrapIcons);
	}

	const headerMarkup = `
		<header class="header">
			<div class="container nav">
				<a class="brand" href="${basePath}index.html"><img class="brand-mark" src="${basePath}assets/logo.png" alt="" />Counter <span>Pro</span></a>
				<button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="site-navigation">
					<span></span><span></span><span></span>
				</button>

				<nav class="nav-links" id="site-navigation" aria-label="Main navigation">
					<a href="${basePath}index.html">Home</a>
					<a href="${basePath}about/">About</a>
					<details class="nav-dropdown">
						<summary>Explore</summary>
						<div class="nav-dropdown-menu">
							<a href="${basePath}index.html#features">Features</a>
							<a href="${basePath}tally-counter-app/">Tally Counter</a>
							<a href="${basePath}tasbih-counter-app/">Tasbih Counter</a>
							<a href="${basePath}rep-counter-app/">Rep Counter</a>
							<a href="${basePath}habit-counter-app/">Habit Counter</a>
							<a href="${basePath}inventory-counter-app/">Inventory Counter</a>
							<a href="${basePath}multiple-counter-app/">Multiple Counters</a>
						</div>
					</details>
					<a href="${basePath}faq/">FAQ</a>
					<a href="${basePath}blog/">Blogs</a>
					<a class="btn btn-small btn-primary" href="https://play.google.com/store/apps/details?id=com.counterpro" target="_blank" rel="noopener"><i class="bi bi-google-play" aria-hidden="true"></i>Download</a>
				</nav>
			</div>
		</header>
	`;

	const footerMarkup = `
		<footer class="footer">
			<div class="container footer-grid">
				<div class="footer-about">
					<p class="brand"><img class="brand-mark" src="${basePath}assets/logo.png" alt="" />Counter <span>Pro</span></p>
					<p>A simple counter for the routines, workouts, and everyday tasks that matter.</p>
					<a class="footer-download" href="https://play.google.com/store/apps/details?id=com.counterpro" target="_blank" rel="noopener"><i class="bi bi-google-play" aria-hidden="true"></i>Get it on Google Play <i class="bi bi-arrow-up-right download-icon" aria-hidden="true"></i></a>
				</div>

				<div class="footer-links">
					<div class="footer-link-group">
						<p class="footer-heading">Explore</p>
					<a href="${basePath}index.html">Home</a>
						<a href="${basePath}about/">About</a>
						<a href="${basePath}faq/">FAQs</a>
						<a href="${basePath}blog/">Blogs</a>
					</div>
					<div class="footer-link-group">
						<p class="footer-heading">Counter guides</p>
					<a href="${basePath}tally-counter-app/">Tally Counter</a>
					<a href="${basePath}tasbih-counter-app/">Tasbih Counter</a>
					<a href="${basePath}rep-counter-app/">Rep Counter</a>
					</div>
					<div class="footer-link-group">
						<p class="footer-heading">Everyday use</p>
					<a href="${basePath}habit-counter-app/">Habit Counter</a>
					<a href="${basePath}inventory-counter-app/">Inventory Counter</a>
					<a href="${basePath}multiple-counter-app/">Multiple Counters</a>
					</div>
				</div>
			</div>

			<div class="container footer-bottom">
				<p class="copyright">© <span id="year"></span> Counter Pro. All rights reserved.</p>
				<a href="${basePath}index.html">Back to top ↑</a>
			</div>
		</footer>
	`;

	const header = document.querySelector('header.header');
	const footer = document.querySelector('footer.footer');

	if (header) {
		header.outerHTML = headerMarkup;
	} else {
		const headerFragment = document.createRange().createContextualFragment(headerMarkup);
		document.body.insertBefore(headerFragment, document.body.firstChild);
	}

	if (footer) {
		footer.outerHTML = footerMarkup;
	} else {
		const footerFragment = document.createRange().createContextualFragment(footerMarkup);
		document.body.appendChild(footerFragment);
	}

	const year = document.getElementById('year');
	if (year) {
		year.textContent = new Date().getFullYear();
	}

	const menuToggle = document.querySelector('.menu-toggle');
	const navigation = document.getElementById('site-navigation');
	const mobileNavigation = window.matchMedia('(max-width: 900px)');
	navigation.hidden = mobileNavigation.matches;
	const closeNavigation = () => {
		navigation.hidden = true;
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Open navigation menu');
	};

	menuToggle.addEventListener('click', () => {
		const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
		navigation.hidden = isExpanded;
		menuToggle.setAttribute('aria-expanded', String(!isExpanded));
		menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
	});

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
		const revealGroups = [
			{ selector: '.hero .container > :not(.hero-grid), .hero-grid > div:first-child > *', motion: 'rise', stagger: 95 },
			{ selector: 'main > .section:not(.counter-style-section) > .container > h2, main > .section:not(.counter-style-section) > .container > .section-sub', motion: 'rise' },
			{ selector: '.grid > .card, .counter-style-item', motion: 'rise', stagger: 75 },
			{ selector: '.use-case-points > li', motion: 'slide-left', stagger: 75 },
			{ selector: '.step-list > *', motion: 'scale', stagger: 110 },
			{ selector: '.routine-layout > div, .routine-layout > ol', motion: 'slide-right', stagger: 120 },
			{ selector: '.session-intro, .session-rules > p', motion: 'slide-left', stagger: 85 },
			{ selector: '.limits-columns > div', motion: 'rise', stagger: 120 },
			{ selector: '.download-band-inner', motion: 'rise' },
			{ selector: 'main > .section:not(.counter-style-section) > .container.narrow > details', motion: 'slide-left', stagger: 60 },
			{ selector: 'article.section > .container > h2, article.section > .container > p, article.section > .container > ul, article.section > .container > ol, .article-counter-visual, .about-look-grid > figure', motion: 'rise', stagger: 55 },
			{ selector: '.footer-about > *, .footer-link-group, .footer-bottom > *', motion: 'rise', stagger: 70 }
		];
		const homepage = basePath === './' && (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html'));
		if (homepage) {
			document.body.classList.add('page-home');
		} else {
			revealGroups.push({ selector: '.hero-product-image', motion: 'rise' });
		}

		const revealed = new WeakSet();
		const revealObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

		revealGroups.forEach(({ selector, motion, stagger = 0 }) => {
			document.querySelectorAll(selector).forEach((element, index) => {
				if (revealed.has(element)) {
					return;
				}
				revealed.add(element);
				element.classList.add('motion-reveal');
				element.dataset.motion = motion;
				element.style.setProperty('--motion-delay', `${(index % 7) * stagger}ms`);
				revealObserver.observe(element);
			});
		});

		document.body.classList.add('motion-ready');
	}

	navigation.addEventListener('click', (event) => {
		if (event.target.closest('a')) {
			closeNavigation();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && !navigation.hidden) {
			closeNavigation();
			menuToggle.focus();
		}
	});

	mobileNavigation.addEventListener('change', (event) => {
		navigation.hidden = event.matches;
		menuToggle.setAttribute('aria-expanded', 'false');
	});

	const currentPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
	document.querySelectorAll('.nav-links a:not(.btn), .nav-dropdown-menu a').forEach((link) => {
		const linkPath = new URL(link.href, window.location.href).pathname.replace(/index\.html$/, '').replace(/\/$/, '');
		const isBlogRoute = linkPath.endsWith('/blog') && currentPath.startsWith(linkPath + '/');
		const isFeatureLink = link.hash === '#features';
		const isCurrentFeature = isFeatureLink && window.location.hash === '#features';
		if ((!isFeatureLink && linkPath === currentPath) || isBlogRoute || isCurrentFeature) {
			link.setAttribute('aria-current', 'page');
			link.closest('.nav-dropdown')?.setAttribute('open', '');
		}
	});

	document.body.dataset.dynamicUiLoaded = 'true';
})();