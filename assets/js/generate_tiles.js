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

    // Sort by year descending
    data.sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));

    // Group by category/type
    const groups = data.reduce((acc, proj) => {
      const cat = proj.category || proj.type || 'Unsorted';
      (acc[cat] = acc[cat] || []).push(proj);
      return acc;
    }, {});

    mount.innerHTML = '';

    Object.entries(groups).forEach(([category, items], catIndex) => {
      // Category header
      const header = document.createElement('div');
      header.className = 'projects-header mb-4';
      header.innerHTML = `<h2 class="projects-category"><span style="color:#4fe7c9">${escapeHtml(category)}</span></h2>`;
      mount.appendChild(header);

      items.forEach((p, projIndex) => {
        // Project card
        const bar = document.createElement('article');
        bar.className = 'project-bar d-flex flex-column flex-md-row mb-4';

        // Images
        let imgs = [];
        if (Array.isArray(p.images)) {
          imgs = p.images.map(img => {
            if (typeof img === 'string') return { src: img, alt: p.name || 'project image' };
            if (typeof img === 'object' && img.src) return { src: img.src, alt: img.alt || (p.name || 'project image') };
            return null;
          }).filter(Boolean);
        } else if (p.img) imgs = [{ src: p.img, alt: p.name || 'project image' }];

        if (!imgs.length) imgs = [{ src: 'assets/images/transparent.png', alt: 'Placeholder' }];

        // Media column
        const media = document.createElement('div');
        media.className = 'project-media me-md-3 mb-3 mb-md-0 flex-shrink-0';

        if (imgs.length > 1) {
          const carouselId = `carousel-${catIndex}-${projIndex}`;
          media.innerHTML = `
            <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                ${imgs.map((img, i) => `
                  <div class="carousel-item ${i===0?'active':''}">
                    <img src="${escapeAttr(img.src)}" class="d-block w-100 rounded" alt="${escapeAttr(img.alt)}">
                  </div>`).join('')}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
          `;
        } else {
          media.innerHTML = `<img src="${escapeAttr(imgs[0].src)}" alt="${escapeAttr(imgs[0].alt)}" class="img-fluid rounded">`;
        }

        // Info column
        const info = document.createElement('div');
        info.className = 'project-info flex-grow-1';
        info.innerHTML = `
          <div class="project-title-row d-flex align-items-baseline gap-2 mb-2">
            <h3 class="project-title mb-0" style="color:#4fe7c9">${escapeHtml(p.name || 'Untitled')}</h3>
            ${p.year ? `<span class="project-year text-muted small">${escapeHtml(String(p.year))}</span>` : ''}
          </div>
          ${p.tagline ? `<p class="project-tagline fst-italic text-light mb-2">${escapeHtml(p.tagline)}</p>` : ''}
          ${p.description ? `<p class="project-desc text-light mb-2">${escapeHtml(p.description)}</p>` : ''}
          ${p.tech ? `<p class="project-tech text-info mb-2"><strong>Tech:</strong> ${escapeHtml(p.tech)}</p>` : ''}
          ${Array.isArray(p.links) && p.links.length ? `<p class="project-links mb-0">${p.links.map(l => `<a href="${escapeAttr(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label || l.url)}</a>`).join(' • ')}</p>` : ''}
        `;

        bar.appendChild(media);
        bar.appendChild(info);
        mount.appendChild(bar);
      });
    });
  })();
});

// Escape helpers
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));
}
function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, '&quot;');
}
