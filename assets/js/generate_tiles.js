document.addEventListener('DOMContentLoaded', async () => {
  const mount = document.getElementById('project-list') || document.querySelector('.tiles-container');
  if (!mount) {
    console.warn('No mount element found for projects. Add <div id="project-list"></div> or .tiles-container to your page.');
    return;
  }

  (async function loadAndRender() {
    let data;
    try {
      const res = await fetch('assets/data/projects.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = await res.json();
      if (!Array.isArray(data)) throw new Error('projects.json must be an array');
    } catch (err) {
      console.error('Failed to load projects.json', err);
      mount.innerHTML = `<p style="color:#f66">Failed to load projects. See console for details.</p>`;
      return;
    }

    // Sort by year (desc) if present, otherwise keep original order.
    data.sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));

    // Group by category/type
    const groups = data.reduce((acc, proj) => {
      const cat = proj.category || proj.type || 'Unsorted';
      (acc[cat] = acc[cat] || []).push(proj);
      return acc;
    }, {});

    // Clear mount then render
    mount.innerHTML = '';

    Object.entries(groups).forEach(([category, items]) => {
      const header = document.createElement('div');
      header.className = 'projects-header';
      header.innerHTML = `<h2 class="projects-category"><span style="color:#4fe7c9">${escapeHtml(category)}</span></h2>`;
      mount.appendChild(header);

      items.forEach((p) => {
        const bar = document.createElement('article');
        bar.className = 'project-bar';

        // pick images array (prefer images[], fallback to img)
        let imgs = [];
        if (Array.isArray(p.images)) {
          imgs = p.images.map(img => {
            if (typeof img === 'string') {
              return { src: img, alt: p.name || 'project image' };
            }
            if (typeof img === 'object' && img.src) {
              return { src: img.src, alt: img.alt || (p.name || 'project image') };
            }
            return null;
          }).filter(Boolean);
        } else if (p.img) {
          imgs = [{ src: p.img, alt: p.name || 'project image' }];
        }

        if (!imgs.length) {
          imgs = [{ src: 'assets/images/transparent.png', alt: 'Placeholder transparent image' }];
        }

        // build media column (carousel if multiple images)
        const media = document.createElement('div');
        media.className = 'project-media';

        if (imgs.length > 1) {
          // carousel structure
          media.innerHTML = `
            <div class="carousel-container" role="region" aria-label="${escapeAttr(p.name || 'project images')}">
              <button class="prev-btn" aria-label="Previous image" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
              </button>
              <div class="carousel-images">
                ${imgs.map((src, i) => `<img src="${escapeAttr(src)}" class="carousel-image${i===0 ? ' active' : ''}" alt="${escapeAttr(p.name || 'project image')}">`).join('')}
              </div>
              <button class="next-btn" aria-label="Next image" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
              </button>
            </div>`;
        } else {
          media.innerHTML = `<img src="${escapeAttr(imgs[0].src)}" alt="${escapeAttr(imgs[0].alt)}" loading="lazy">`;
        }

        // info column
        const info = document.createElement('div');
        info.className = 'project-info';
        info.innerHTML = `
          <div class="project-title-row">
            <h3 class="project-title">${escapeHtml(p.name || 'Untitled')}</h3>
            ${p.year ? `<span class="project-year">${escapeHtml(String(p.year))}</span>` : ''}
          </div>
          ${p.tagline ? `<p class="project-tagline">${escapeHtml(p.tagline)}</p>` : ''}
          ${p.description ? `<p class="project-desc">${escapeHtml(p.description)}</p>` : ''}
          ${p.tech ? `<p class="project-tech"><strong>Tech:</strong> ${escapeHtml(p.tech)}</p>` : ''}
          ${Array.isArray(p.links) && p.links.length ? `<p class="project-links">${p.links.map(l => `<a href="${escapeAttr(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label || l.url)}</a>`).join(' • ')}</p>` : ''}
        `;

        bar.appendChild(media);
        bar.appendChild(info);
        mount.appendChild(bar);
      });
    });

    // init carousels
    initCarousels();
  })();
});
function initPopups() {
  const popupViews = document.querySelectorAll('.popup-view');
  const popupBtns  = document.querySelectorAll('.popup-btn');
  const closeBtns  = document.querySelectorAll('.close-btn');
  const dimOverlays = document.querySelectorAll('.dim-overlay');
  const parentContainers = document.querySelectorAll('#product-list, .product-container');

  const openPopup = i => {
    popupViews[i].classList.add('active');
    parentContainers.forEach(c => c.classList.add('dimmed'));
    dimOverlays.forEach(d => d.classList.add('active'));
  };
  const closeAll = () => {
    popupViews.forEach(v => v.classList.remove('active'));
    parentContainers.forEach(c => c.classList.remove('dimmed'));
    dimOverlays.forEach(d => d.classList.remove('active'));
  };

  popupBtns.forEach((btn, i) => btn.addEventListener('click', () => openPopup(i)));
  closeBtns.forEach(btn => btn.addEventListener('click', closeAll));
  document.addEventListener('click', e => {
    popupViews.forEach((view, i) => {
      if (view.classList.contains('active')) {
        const card = view.querySelector('.popup-card');
        if (!card.contains(e.target) && !e.target.closest('.popup-btn')) closeAll();
      }
    });
  });
  document.addEventListener('keydown', e => e.key==='Escape' && closeAll());
}

function initCarousels() {
  document.querySelectorAll('.carousel-container').forEach(car => {
    const imgs = car.querySelectorAll('.carousel-image');
    let idx = 0;
    car.querySelector('.next-btn').addEventListener('click', () => {
      imgs[idx].classList.remove('active');
      idx = (idx + 1) % imgs.length;
      imgs[idx].classList.add('active');
    });
    car.querySelector('.prev-btn').addEventListener('click', () => {
      imgs[idx].classList.remove('active');
      idx = (idx + imgs.length - 1) % imgs.length;
      imgs[idx].classList.add('active');
    });
  });
}

// escape for HTML content
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));
}
// escape for attributes (uses HTML-escaped string and double-quote safe)
function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, '&quot;');
}