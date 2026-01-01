// NOT PART OF BENTO UI, just a personal script for projects page

// Initialize BentoUI for navigation
const bento = new BentoUI({
  container: null, // No grid needed
  nav: {
    enabled: true,
    container: '#bento-nav',
    logo: 'HarutoHiroki',
    logoUrl: 'index.html',
    links: [
      { label: 'Home', url: 'index.html' },
      { label: 'Works', url: 'projects.html', active: true },
      { label: 'Blog', url: 'blog.html' },
      { label: 'Graphs', url: 'https://graphtool.harutohiroki.com' },
      { label: 'Contact', url: 'mailto:root@harutohiroki.com' }
    ],
    theme: 'dark'
  },
  backToTop: {
    enabled: true
  }
});

class ProjectsEngine {
  constructor() {
    this.projects = [];
    this.filteredProjects = [];
    this.currentFilter = 'all';
    this.gridEl = document.querySelector('#projects-grid');
    
    this.init();
  }
  
  async init() {
    await this.loadProjects();
    this.setupFilters();
    this.renderProjects();
  }
  
  async loadProjects() {
    try {
      const response = await fetch('assets/data/projects.json');
      if (!response.ok) throw new Error('Failed to load projects');
      this.projects = await response.json();
      this.filteredProjects = [...this.projects];
    } catch (error) {
      console.error('Error loading projects:', error);
      this.projects = [];
      this.filteredProjects = [];
    }
  }
  
  setupFilters() {
    const filterBtns = document.querySelectorAll('.projects-filters__btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('projects-filters__btn--active'));
        btn.classList.add('projects-filters__btn--active');
        
        // Apply filter
        this.currentFilter = btn.dataset.filter;
        this.applyFilter();
      });
    });
  }
  
  applyFilter() {
    if (this.currentFilter === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(p => p.category === this.currentFilter);
    }
    this.renderProjects();
  }
  
  renderProjects() {
    if (!this.gridEl) return;
    
    if (this.filteredProjects.length === 0) {
      this.gridEl.innerHTML = `
        <div class="projects-empty">
          <div class="projects-empty__icon">📦</div>
          <h3 class="projects-empty__title">No projects found</h3>
          <p class="projects-empty__text">Try a different filter</p>
        </div>
      `;
      return;
    }
    
    const html = this.filteredProjects.map(project => this.renderProjectCard(project)).join('');
    this.gridEl.innerHTML = html;
  }
  
  renderProjectCard(project) {
    const linksHtml = project.links?.map(link => `
      <a href="${this.escapeHtml(link.url)}" class="project-card__link" target="_blank" rel="noopener noreferrer">
        ${this.escapeHtml(link.label)}
      </a>
    `).join('') || '';
    
    const imageHtml = project.images?.[0] ? `
      <div class="project-card__image-wrapper">
        <img src="${this.escapeHtml(project.images[0].src)}" alt="${this.escapeHtml(project.images[0].alt)}" class="project-card__image" loading="lazy">
      </div>
    ` : '';
    
    return `
      <article class="project-card">
        ${imageHtml}
        <div class="project-card__content">
          <div class="project-card__header">
            <span class="project-card__category">${this.escapeHtml(project.category)}</span>
            <span class="project-card__year">${project.year}</span>
          </div>
          <h2 class="project-card__title">${this.escapeHtml(project.name)}</h2>
          <p class="project-card__tagline">${this.escapeHtml(project.tagline)}</p>
          <p class="project-card__description">${this.escapeHtml(project.description)}</p>
          <div class="project-card__tech">
            ${project.tech.split(', ').map(t => `<span class="project-card__tech-tag">${this.escapeHtml(t)}</span>`).join('')}
          </div>
          ${project.notes ? `<p class="project-card__notes">${this.escapeHtml(project.notes)}</p>` : ''}
          <div class="project-card__links">
            ${linksHtml}
          </div>
        </div>
      </article>
    `;
  }
  
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize
const projectsEngine = new ProjectsEngine();
