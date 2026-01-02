/**
 * YABE UI FRAMEWORK v1.0.0
 * Yet Another BEnto UI themed framework 
 * 
 * @version 1.0.0
 * @license GPL3.0
 * @author HarutoHiroki (https://harutohiroki.com)
 */

(function(global) {
  'use strict';

  // =============================================================================
  // Default Configuration
  // =============================================================================
  
  const DEFAULTS = {
    card: {
      width: 4,
      height: 2,
      type: 'empty'
    },
    validation: {
      minWidth: 1,
      maxWidth: 12,
      minHeight: 1,
      maxHeight: 6
    },
    scrollThreshold: 100
  };

  // =============================================================================
  // SVG Icons
  // =============================================================================
  
  const ICONS = {
    sun: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>',
    mobileWarning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-4.2-5.78v1.75l3.2-2.99L12.8 9v1.7c-3.11.43-4.35 2.56-4.8 4.7 1.11-1.5 2.58-2.18 4.8-2.18z"/></svg>',
    moon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>',
    arrowUp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>',
    trendUp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>',
    trendDown: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"/></svg>',
    github: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>',
    twitter: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>',
    linkedin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
    link: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',
    youtube: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>',
    twitch: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>',
    kofi: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/></svg>',
    music: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',
    vr: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.74 6H3.21C2.54 6 2 6.54 2 7.21v9.58C2 17.46 2.54 18 3.21 18h5.58c.4 0 .77-.2 1-.53l2.21-3.3 2.21 3.3c.23.33.6.53 1 .53h5.53c.67 0 1.21-.54 1.21-1.21V7.21C22 6.54 21.46 6 20.74 6zM7.5 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm9 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>',
    code: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',
    location: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
    throne: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298 250"><path d="M208.15,131.15c-.98,1.98-2.27,3.77-3.82,5.34l-51.27,52.46c-.89,1.24-2.42,2.02-4.1,2.02s-3.22-.78-4.21-2.15l-51.18-52.34c-.25-.24-.52-.53-.77-.82-5.36-6.01-6.39-14.69-2.61-22.09L144.29,7.55c1.05-1.63,2.77-2.55,4.67-2.55s3.61,.91,4.61,2.44l54.23,106.29c2.85,5.57,2.98,12.09,.35,17.42Zm-57.55,91.9L15.52,85.7l-.43-.44c-1-.8-2.15-1.21-3.39-1.21-1.81,.07-3.4,.86-4.38,2.16-.92,1.22-1.19,2.8-.77,4.48L45.86,225.98c.94,3.23,2.46,6.23,4.55,8.89,.25,.34,.53,.67,.8,.99,4.67,5.41,11.71,8.38,19.01,8.38,2.83,0,5.7-.44,8.48-1.38,20.24-6.7,41.43-10.46,63.03-11.15,1.83-.14,3.65-.25,5.46-.34,1.5-.08,2.89-.8,3.79-1.97,.89-1.14,1.23-2.58,.96-3.97-.17-.83-.62-1.63-1.33-2.37ZM289.18,84.9c-1.71-1.17-3.89-1.1-6.17,.26l-.56,.34-116.15,118.31c-1.93,1.96-1.94,5.04-.02,7l20.24,20.7c2.4,2.46,5.48,4.14,8.93,4.87,9.18,1.93,18.29,4.47,27.09,7.54,2.04,.71,4.17,1.06,6.31,1.06,2.65,0,5.3-.54,7.83-1.62,4.36-1.78,8.13-4.59,10.9-8.14,2.07-2.65,3.61-5.65,4.56-8.91l39.32-135.35c.16-.63,.22-1.26,.17-1.8,0-1.72-.92-3.32-2.45-4.28Z"/></svg>',
    lastfm: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.584 17.21l-.88-2.392s-1.43 1.594-3.573 1.594c-1.897 0-3.244-1.649-3.244-4.288 0-3.382 1.704-4.591 3.381-4.591 2.42 0 3.189 1.567 3.849 3.574l.88 2.749c.88 2.666 2.529 4.81 7.285 4.81 3.409 0 5.718-1.044 5.718-3.793 0-2.227-1.265-3.381-3.63-3.931l-1.758-.385c-1.21-.275-1.567-.77-1.567-1.594 0-.935.742-1.484 1.952-1.484 1.32 0 2.034.495 2.144 1.677l2.749-.33c-.22-2.474-1.924-3.492-4.729-3.492-2.474 0-4.893.935-4.893 3.932 0 1.87.907 3.051 3.189 3.601l1.87.44c1.402.33 1.869.907 1.869 1.704 0 1.017-.99 1.43-2.86 1.43-2.776 0-3.93-1.457-4.59-3.464l-.907-2.75c-1.155-3.573-2.997-4.893-6.653-4.893C2.144 5.333 0 7.89 0 12.233c0 4.18 2.144 6.434 5.993 6.434 3.106 0 4.591-1.457 4.591-1.457z"/></svg>',
    play: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',
    blog: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>'
  };

  // =============================================================================
  // GitHub Chart Configuration
  // =============================================================================
  
  const GITHUB_COLORS = {
    dark: {
      0: '#161b22',
      1: '#0e4429',
      2: '#006d32',
      3: '#26a641',
      4: '#39d353'
    },
    light: {
      0: '#ebedf0',
      1: '#9be9a8',
      2: '#40c463',
      3: '#30a14e',
      4: '#216e39'
    }
  };

  const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // =============================================================================
  // GitHub Chart Class
  // =============================================================================
  
  class GitHubChart {
    constructor(options = {}) {
      this.username = options.username || '';
      this.months = options.months || 'auto';
      this.cellSize = options.cellSize || 10;
      this.cellGap = options.cellGap || 3;
      this.theme = options.theme || 'dark';
      this.container = options.container || null;
      this.contributionData = null;
      this.freeform = options.freeform || false;
    }

    async fetchContributionData() {
      if (!this.username) return null;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      try {
        const url = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(this.username)}?y=last`;
        const response = await fetch(url, { 
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        return await response.json();
      } catch (error) {
        clearTimeout(timeoutId);
        console.warn('GitHubChart: Fetch failed:', error.message);
        return null;
      }
    }

    calculateMonthsFromContainer(element) {
      const containerWidth = element.clientWidth || 300;
      const cellTotal = this.cellSize + this.cellGap;
      const availableWeeks = Math.floor(containerWidth / cellTotal);
      return Math.max(1, Math.min(12, Math.floor(availableWeeks / 4.3)));
    }

    processData(apiData, numMonths) {
      if (!apiData || !Array.isArray(apiData.contributions) || apiData.contributions.length === 0) return [];

      const contributions = apiData.contributions.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
      const lastDate = new Date(contributions[contributions.length - 1].date);
      const start = new Date(lastDate);
      start.setMonth(start.getMonth() - numMonths + 1);
      start.setDate(start.getDate() - start.getDay());

      const dateMap = {};
      for (const c of contributions) {
        dateMap[c.date] = {
          count: typeof c.count === 'number' ? c.count : 0,
          level: typeof c.level === 'number' ? c.level : 0
        };
      }

      const data = [];
      const current = new Date(start);
      while (current <= lastDate) {
        const dateStr = current.toISOString().split('T')[0];
        const contrib = dateMap[dateStr] || { count: 0, level: 0 };
        data.push({
          date: new Date(current),
          count: contrib.count,
          level: contrib.level
        });
        current.setDate(current.getDate() + 1);
      }
      return data;
    }

    generateSVG(data, containerWidth, containerHeight) {
      if (!data || data.length === 0) {
        return this.generateMessage('No data');
      }

      if (this.freeform) {
        const padding = 2;
        const width = containerWidth || 300;
        const height = containerHeight || 120;
        const n = Math.min(data.length, 5000);
        const gap = (this.cellGap || 2) * 2;
        
        let best = {cell: 0, cols: 1, rows: n};
        for (let cols = 1; cols <= n; cols++) {
          const rows = Math.ceil(n / cols);
          const totalGapW = gap * (cols - 1);
          const totalGapH = gap * (rows - 1);
          const cellW = (width - padding * 2 - totalGapW) / cols;
          const cellH = (height - padding * 2 - totalGapH) / rows;
          const cell = Math.floor(Math.min(cellW, cellH));
          if (cell > best.cell) {
            best = {cell, cols, rows};
          }
        }
        
        const cellSize = best.cell;
        const cols = best.cols;
        const rows = best.rows;
        const colors = GITHUB_COLORS[this.theme];
        const gridW = cols * cellSize + gap * (cols - 1);
        const gridH = rows * cellSize + gap * (rows - 1);
        const offsetX = padding + Math.max(0, Math.floor((width - 2 * padding - gridW) / 2));
        const offsetY = padding + Math.max(0, Math.floor((height - 2 * padding - gridH) / 2));
        
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">`;
        for (let i = 0; i < Math.min(data.length, cols * rows); i++) {
          const d = data[i];
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = offsetX + col * (cellSize + gap);
          const y = offsetY + row * (cellSize + gap);
          const color = colors[d.level] || colors[0];
          const dateStr = d.date.toISOString().split('T')[0];
          svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" fill="${color}"><title>${dateStr}: ${d.count} contributions</title></rect>`;
        }
        svg += '</svg>';
        return svg;
      }

      let startIdx = 0;
      while (startIdx < data.length && data[startIdx].date.getDay() !== 0) {
        startIdx++;
      }
      const chartData = data.slice(startIdx);

      const weeks = Math.ceil(chartData.length / 7);
      const cellTotal = this.cellSize + this.cellGap;
      const monthLabelHeight = 14;
      const padding = 2;
      
      const svgWidth = (weeks * cellTotal) + (padding * 2);
      const svgHeight = (7 * cellTotal) + monthLabelHeight + padding;

      let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet">`;

      let lastMonth = -1;
      let lastLabelX = -50;
      for (let week = 0; week < weeks; week++) {
        const idx = week * 7;
        if (idx >= chartData.length) break;
        const date = chartData[idx].date;
        const month = date.getMonth();
        const x = padding + (week * cellTotal);
        
        if (month !== lastMonth && (x - lastLabelX) > 25) {
          svg += `<text x="${x}" y="10" font-size="9" fill="${this.theme === 'dark' ? '#8b949e' : '#57606a'}" font-family="system-ui, sans-serif">${MONTH_NAMES[month]}</text>`;
          lastMonth = month;
          lastLabelX = x;
        }
      }

      const colors = GITHUB_COLORS[this.theme];
      for (let week = 0; week < weeks; week++) {
        for (let day = 0; day < 7; day++) {
          const idx = (week * 7) + day;
          if (idx >= chartData.length) continue;
          const d = chartData[idx];
          const x = padding + (week * cellTotal);
          const y = monthLabelHeight + (day * cellTotal);
          const color = colors[d.level] || colors[0];
          const dateStr = d.date.toISOString().split('T')[0];
          svg += `<rect x="${x}" y="${y}" width="${this.cellSize}" height="${this.cellSize}" rx="2" fill="${color}"><title>${dateStr}: ${d.count} contributions</title></rect>`;
        }
      }

      svg += '</svg>';
      return svg;
    }

    generateMessage(text) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 50" preserveAspectRatio="xMidYMid meet">
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="${this.theme === 'dark' ? '#8b949e' : '#57606a'}" font-family="system-ui, sans-serif">${text}</text>
      </svg>`;
    }

    async render(container) {
      const target = container || this.container;
      if (!target) return null;
      
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      if (!element) return null;
      
      if (!this.username) {
        element.innerHTML = this.generateMessage('No username');
        return element;
      }
      
      element.innerHTML = this.generateMessage('Loading...');
      
      let numMonths;
      if (this.months === 'auto') {
        numMonths = this.calculateMonthsFromContainer(element);
      } else {
        numMonths = parseInt(this.months) || 6;
      }
      
      if (!this.contributionData) {
        const apiData = await this.fetchContributionData();
        if (apiData && apiData.contributions) {
          this.contributionData = apiData;
        }
      }
      
      if (this.contributionData) {
        const processed = this.processData(this.contributionData, numMonths);
        element.innerHTML = this.generateSVG(processed, element.clientWidth, element.clientHeight);
      } else {
        element.innerHTML = this.generateMessage('Could not load data');
      }
      
      return element;
    }

    setTheme(theme) {
      this.theme = theme;
    }
  }

  // =============================================================================
  // Utility Functions
  // =============================================================================
  
  /**
   * Deep merge objects
   * @param {Object} target - Target object
   * @param {Object} source - Source object
   * @returns {Object} Merged object
   */
  function deepMerge(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  /**
   * Check if value is a plain object
   * @param {*} item - Value to check
   * @returns {boolean}
   */
  function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  /**
   * Sanitize HTML to prevent XSS
   * @param {string} str - String to sanitize
   * @returns {string}
   */
  function sanitizeHTML(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Validate card dimensions
   * @param {number} width - Card width
   * @param {number} height - Card height
   * @returns {Object} Validated dimensions
   */
  function validateDimensions(width, height) {
    const { validation } = DEFAULTS;
    return {
      width: Math.min(Math.max(width || DEFAULTS.card.width, validation.minWidth), validation.maxWidth),
      height: Math.min(Math.max(height || DEFAULTS.card.height, validation.minHeight), validation.maxHeight)
    };
  }

  /**
   * Apply basic syntax highlighting to code
   * @param {string} code - Code string
   * @param {string} language - Programming language
   * @returns {string} Highlighted HTML
   */
  function highlightSyntax(code, language) {
    if (!code) return '';
    
    // Sanitize first
    let highlighted = sanitizeHTML(code);
    
    // Use placeholders to avoid regex conflicts
    // Format: ___BENTO_PH_idx___
    const placeholders = [];
    const placeholder = (content, className) => {
      const idx = placeholders.length;
      placeholders.push(`<span class="${className}">${content}</span>`);
      return `___BENTO_PH_${idx}___`;
    };
    
    // Comments first (they should not be further processed)
    highlighted = highlighted.replace(/(\/\/.*$)/gm, (match) => placeholder(match, 'syntax-comment'));
    
    // Strings
    highlighted = highlighted.replace(/(&quot;(?:[^&]|&(?!quot;))*&quot;|&#39;(?:[^&]|&(?!#39;))*&#39;|"[^"]*"|'[^']*')/g, 
      (match) => placeholder(match, 'syntax-string'));
    
    // Keywords
    highlighted = highlighted.replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|typeof|instanceof)\b/g, 
      (match) => placeholder(match, 'syntax-keyword'));
    
    // Numbers (but not inside placeholders - check for preceding underscore)
    highlighted = highlighted.replace(/(?<!_)\b(\d+\.?\d*)\b(?!_)/g, 
      (match) => placeholder(match, 'syntax-number'));
    
    // Function calls
    highlighted = highlighted.replace(/\b([a-zA-Z_]\w*)\s*\(/g, 
      (match, name) => placeholder(name, 'syntax-function') + '(');
    
    // Restore placeholders
    highlighted = highlighted.replace(/___BENTO_PH_(\d+)___/g, (match, idx) => placeholders[parseInt(idx, 10)]);
    
    return highlighted;
  }

  /**
   * Parse inline text styling markup
   * Supports (can be combined/nested):
   *   **bold**              - Bold text
   *   *italic*              - Italic text
   *   __underline__         - Underlined text
   *   ~~strikethrough~~     - Strikethrough text
   *   ==highlight==         - Highlighted text (default color)
   *   ==#color|text==       - Highlighted text with custom color
   *   `code`                - Inline code
   *   [text](color:#fff)    - Custom styled text with CSS properties
   *   {{#color}}text{{/}}   - Colored text shorthand
   *   ^^text^^              - Jump/bounce effect (each character bounces)
   *   ++text++              - Rainbow text effect (animated colors)
   * 
   * @param {string} text - Text to parse
   * @param {boolean} enableStyles - Whether to enable inline styling
   * @returns {string} HTML with inline styles
   */
  function parseInlineStyles(text, enableStyles = false) {
    if (!text || typeof text !== 'string') return '';
    if (!enableStyles) return sanitizeHTML(text);
    
    // Process styles recursively to allow nesting
    function processStyles(input) {
      let result = input;
      let changed = true;
      
      // Keep processing until no more changes (handles nested styles)
      while (changed) {
        changed = false;
        const before = result;
        
        // Process custom styled text: [text](color:#fff;weight=bold)
        result = result.replace(/\[([^\[\]]+)\]\(([^)]+)\)/g, (match, innerText, styles) => {
          changed = true;
          const styleProps = [];
          const dataAttrs = [];
          
          styles.split(';').forEach(prop => {
            const parts = prop.split(':');
            if (parts.length < 2) return;
            const key = parts[0].trim();
            const value = parts.slice(1).join(':').trim();
            if (!key || !value) return;
            
            const cssMap = {
              'color': 'color',
              'bg': 'background-color',
              'background': 'background-color',
              'size': 'font-size',
              'weight': 'font-weight',
              'style': 'font-style',
              'decoration': 'text-decoration',
              'shadow': 'text-shadow',
              'transform': 'text-transform',
              'spacing': 'letter-spacing'
            };
            
            const cssProp = cssMap[key] || key;
            if (/^[a-zA-Z0-9#%,.()\s-]+$/.test(value)) {
              const varName = cssProp.replace(/-/g, '');
              dataAttrs.push(`data-style-${varName}="${value}"`);
              styleProps.push(`--bento-style-${varName}: ${value}`);
              styleProps.push(`${cssProp}: var(--bento-style-${varName})`);
            }
          });
          
          const processedInner = processStyles(innerText);
          if (styleProps.length > 0) {
            return `<span class="bento-text-styled" ${dataAttrs.join(' ')} style="${styleProps.join('; ')}">${processedInner}</span>`;
          }
          return `<span class="bento-text-styled">${processedInner}</span>`;
        });
        
        // Process color shorthand: {{#color}}text{{/}}
        result = result.replace(/\{\{([#a-zA-Z0-9]+)\}\}([\s\S]*?)\{\{\/\}\}/g, (match, color, innerText) => {
          changed = true;
          const safeColor = /^[#a-zA-Z0-9]+$/.test(color) ? color : 'inherit';
          const processedInner = processStyles(innerText);
          return `<span class="bento-text-colored" data-color="${safeColor}" style="--bento-text-color: ${safeColor}; color: var(--bento-text-color)">${processedInner}</span>`;
        });
        
        // Process highlight with custom color: ==#color|text== or ==text==
        result = result.replace(/==(?:#([a-fA-F0-9]{3,6}|[a-zA-Z]+)\|)?(.+?)==/g, (match, color, innerText) => {
          changed = true;
          const processedInner = processStyles(innerText);
          if (color) {
            const safeColor = /^[a-fA-F0-9]{3,6}$/.test(color) ? `#${color}` : color;
            return `<mark class="bento-text-highlight" data-highlight-color="${safeColor}" style="--bento-highlight-color: ${safeColor}; background-color: var(--bento-highlight-color)">${processedInner}</mark>`;
          }
          return `<mark class="bento-text-highlight">${processedInner}</mark>`;
        });
        
        // Process bold: **text**
        result = result.replace(/\*\*([^*]+)\*\*/g, (match, innerText) => {
          changed = true;
          const processedInner = processStyles(innerText);
          return `<strong class="bento-text-bold">${processedInner}</strong>`;
        });
        
        // Process italic: *text* (but not **)
        result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, (match, innerText) => {
          changed = true;
          const processedInner = processStyles(innerText);
          return `<em class="bento-text-italic">${processedInner}</em>`;
        });
        
        // Process underline: __text__
        result = result.replace(/__([^_]+)__/g, (match, innerText) => {
          changed = true;
          const processedInner = processStyles(innerText);
          return `<span class="bento-text-underline">${processedInner}</span>`;
        });
        
        // Process strikethrough: ~~text~~
        result = result.replace(/~~([^~]+)~~/g, (match, innerText) => {
          changed = true;
          const processedInner = processStyles(innerText);
          return `<span class="bento-text-strike">${processedInner}</span>`;
        });
        
        // Helper function to split text while preserving HTML tags
        function splitPreservingTags(str) {
          const parts = [];
          const regex = /(<[^>]+>)|(.)/g;
          let match;
          while ((match = regex.exec(str)) !== null) {
            if (match[1]) {
              // HTML tag - don't split it
              parts.push({ type: 'tag', value: match[1] });
            } else if (match[2]) {
              // Single character
              parts.push({ type: 'char', value: match[2] });
            }
          }
          return parts;
        }
        
        // Process jump effect: ^^text^^
        result = result.replace(/\^\^(.+?)\^\^/g, (match, innerText) => {
          changed = true;
          const processedInner = processStyles(innerText);
          // Split while preserving HTML tags
          const parts = splitPreservingTags(processedInner);
          let charIndex = 0;
          const wrappedParts = parts.map(part => {
            if (part.type === 'tag') {
              return part.value; // Keep tags as-is
            } else {
              const delay = charIndex * 0.05;
              charIndex++;
              if (part.value === ' ') {
                return `<span class="bento-text-jump-char" style="--jump-delay: ${delay}s"> </span>`;
              }
              return `<span class="bento-text-jump-char" style="--jump-delay: ${delay}s">${part.value}</span>`;
            }
          }).join('');
          return `<span class="bento-text-jump">${wrappedParts}</span>`;
        });
        
        // Process rainbow effect: ++text++
        result = result.replace(/\+\+(.+?)\+\+/g, (match, innerText) => {
          changed = true;
          const processedInner = processStyles(innerText);
          // Split into words, then wrap each word's characters
          // This prevents word-breaking while still animating each character
          const words = processedInner.split(/(\s+)/); // Split keeping spaces
          let globalCharIndex = 0;
          const wrappedWords = words.map(word => {
            if (/^\s+$/.test(word)) {
              // It's whitespace - return a space directly (not wrapped in word container)
              // This ensures proper spacing between word containers
              return ' ';
            }
            // It's a word - wrap each character but keep them in a nowrap container
            const parts = splitPreservingTags(word);
            const wrappedChars = parts.map(part => {
              if (part.type === 'tag') {
                return part.value;
              } else {
                const delay = globalCharIndex * 0.1;
                globalCharIndex++;
                return `<span class="bento-text-rainbow-char" style="--rainbow-delay: ${delay}s">${part.value}</span>`;
              }
            }).join('');
            return `<span class="bento-text-rainbow-word">${wrappedChars}</span>`;
          }).join('');
          return `<span class="bento-text-rainbow">${wrappedWords}</span>`;
        });
        
        // Process inline code: `text` (no nesting for code)
        result = result.replace(/`([^`]+)`/g, (match, innerText) => {
          changed = true;
          return `<code class="bento-text-code">${sanitizeHTML(innerText)}</code>`;
        });
        
        // Prevent infinite loops
        if (result === before) changed = false;
      }
      
      return result;
    }
    
    // Process all styles
    let result = processStyles(text);
    
    // Sanitize any remaining plain text (text not inside HTML tags)
    // Use a regex to find text outside of tags and sanitize it
    result = result.replace(/>([^<]+)</g, (match, textContent) => {
      return `>${sanitizeHTML(textContent)}<`;
    });
    
    // Handle text at the start (before first tag)
    result = result.replace(/^([^<]+)/, (match) => sanitizeHTML(match));
    
    // Handle text at the end (after last tag)
    result = result.replace(/([^>]+)$/, (match) => {
      if (!match.includes('<')) return sanitizeHTML(match);
      return match;
    });
    
    return result;
  }

  // =============================================================================
  // Card Renderers
  // =============================================================================
  
  const CardRenderers = {
    /**
     * Render text card
     */
    text: function(content) {
      const { title, description, footer, textStyle } = content;
      
      // Check if inline styling is enabled
      const enableInlineStyles = textStyle?.inlineStyles === true;
      const hoverOnly = textStyle?.hoverOnly === true;
      
      // Build style classes based on textStyle config
      let contentClasses = 'bento-card__content';
      if (enableInlineStyles && hoverOnly) {
        contentClasses += ' bento-card--inline-styled-hover';
      } else if (enableInlineStyles) {
        contentClasses += ' bento-card--inline-styled';
      }
      
      let html = `<div class="${contentClasses}">`;
      
      if (title) {
        html += `<h3 class="bento-card__title">${parseInlineStyles(title, enableInlineStyles)}</h3>`;
      }
      if (description) {
        html += `<p class="bento-card__description">${parseInlineStyles(description, enableInlineStyles)}</p>`;
      }
      if (footer) {
        html += `<div class="bento-card__footer">${parseInlineStyles(footer, enableInlineStyles)}</div>`;
      }
      
      html += '</div>';
      return html;
    },

    /**
     * Render image card
     */
    image: function(content) {
      const { src, alt, caption, textStyle } = content;
      const enableInlineStyles = textStyle?.inlineStyles === true;
      let html = '<div class="bento-card__image-wrapper">';
      
      if (src) {
        html += `<img class="bento-card__image" src="${sanitizeHTML(src)}" alt="${sanitizeHTML(alt || '')}" loading="lazy">`;
      }
      if (caption) {
        html += `<div class="bento-card__caption">${parseInlineStyles(caption, enableInlineStyles)}</div>`;
      }
      
      html += '</div>';
      return html;
    },

    /**
     * Render stat card
     */
    stat: function(content) {
      const { value, label, trend, textStyle } = content;
      const enableInlineStyles = textStyle?.inlineStyles === true;
      let html = '<div class="bento-card__content">';
      
      if (value !== undefined) {
        html += `<div class="bento-card__value">${parseInlineStyles(String(value), enableInlineStyles)}</div>`;
      }
      if (label) {
        html += `<div class="bento-card__label">${parseInlineStyles(label, enableInlineStyles)}</div>`;
      }
      if (trend) {
        const trendClass = trend.direction === 'positive' ? 'bento-card__trend--positive' : 'bento-card__trend--negative';
        const trendIcon = trend.direction === 'positive' ? ICONS.trendUp : ICONS.trendDown;
        html += `<div class="bento-card__trend ${trendClass}">`;
        html += `<span class="bento-card__trend-icon">${trendIcon}</span>`;
        html += `<span>${parseInlineStyles(trend.value || '', enableInlineStyles)}</span>`;
        html += '</div>';
      }
      
      html += '</div>';
      return html;
    },

    /**
     * Render chart card
     */
    chart: function(content) {
      const { title, data, textStyle } = content;
      const enableInlineStyles = textStyle?.inlineStyles === true;
      let html = '<div class="bento-card__content">';
      
      if (title) {
        html += `<div class="bento-card__chart-title">${parseInlineStyles(title, enableInlineStyles)}</div>`;
      }
      
      html += '<div class="bento-card__chart-container">';
      
      if (Array.isArray(data) && data.length > 0) {
        const maxValue = Math.max(...data.map(d => d.value || 0));
        
        data.forEach(item => {
          const heightPercent = maxValue > 0 ? ((item.value || 0) / maxValue) * 100 : 0;
          html += '<div class="bento-card__bar-wrapper">';
          html += `<div class="bento-card__bar" style="height: ${heightPercent}%" title="${sanitizeHTML(item.label || '')}: ${item.value || 0}"></div>`;
          html += `<span class="bento-card__bar-label">${sanitizeHTML(item.label || '')}</span>`;
          html += '</div>';
        });
      }
      
      html += '</div></div>';
      return html;
    },

    /**
     * Render empty card
     */
    empty: function(content) {
      const { message, textStyle } = content;
      const enableInlineStyles = textStyle?.inlineStyles === true;
      let html = '<div class="bento-card__content">';
      html += `<span class="bento-card__message">${parseInlineStyles(message || 'Empty', enableInlineStyles)}</span>`;
      html += '</div>';
      return html;
    },

    /**
     * Render bio card
     */
    bio: function(content) {
      const { avatar, name, role, description, socialLinks, textStyle } = content;
      const enableInlineStyles = textStyle?.inlineStyles === true;
      let html = '<div class="bento-card__content">';
      
      if (avatar) {
        html += `<img class="bento-card__avatar" src="${sanitizeHTML(avatar)}" alt="${sanitizeHTML(name || 'Avatar')}" loading="lazy">`;
      }
      if (name) {
        html += `<h3 class="bento-card__name">${parseInlineStyles(name, enableInlineStyles)}</h3>`;
      }
      if (role) {
        html += `<div class="bento-card__role">${parseInlineStyles(role, enableInlineStyles)}</div>`;
      }
      if (description) {
        html += `<p class="bento-card__bio-description">${parseInlineStyles(description, enableInlineStyles)}</p>`;
      }
      
      if (Array.isArray(socialLinks) && socialLinks.length > 0) {
        html += '<div class="bento-card__social-links">';
        socialLinks.forEach(link => {
          const icon = ICONS[link.icon] || ICONS.link;
          html += `<a href="${sanitizeHTML(link.url || '#')}" class="bento-card__social-link" target="_blank" rel="noopener noreferrer" title="${sanitizeHTML(link.label || '')}">${icon}</a>`;
        });
        html += '</div>';
      }
      
      html += '</div>';
      return html;
    },

    /**
     * Render media card
     */
    media: function(content) {
      const { src, type, caption, textStyle } = content;
      const enableInlineStyles = textStyle?.inlineStyles === true;
      let html = '<div class="bento-card__media-wrapper">';
      
      if (type === 'video') {
        html += `<video controls preload="metadata"><source src="${sanitizeHTML(src || '')}" type="video/mp4">Your browser does not support video.</video>`;
      } else if (type === 'audio') {
        html += `<audio controls preload="metadata"><source src="${sanitizeHTML(src || '')}" type="audio/mpeg">Your browser does not support audio.</audio>`;
      }
      
      if (caption) {
        html += `<div class="bento-card__media-caption">${parseInlineStyles(caption, enableInlineStyles)}</div>`;
      }
      
      html += '</div>';
      return html;
    },

    /**
     * Render list card
     */
    list: function(content) {
      const { title, items, textStyle } = content;
      const enableInlineStyles = textStyle?.inlineStyles === true;
      const hoverOnly = textStyle?.hoverOnly === true;
      
      let contentClasses = 'bento-card__content';
      if (enableInlineStyles && hoverOnly) {
        contentClasses += ' bento-card--inline-styled-hover';
      } else if (enableInlineStyles) {
        contentClasses += ' bento-card--inline-styled';
      }
      
      let html = `<div class="${contentClasses}">`;
      
      if (title) {
        html += `<h3 class="bento-card__list-title">${parseInlineStyles(title, enableInlineStyles)}</h3>`;
      }
      
      html += '<ul class="bento-card__list">';
      
      if (Array.isArray(items)) {
        items.forEach(item => {
          html += '<li class="bento-card__list-item">';
          html += '<span class="bento-card__list-bullet"></span>';
          html += `<span>${parseInlineStyles(item, enableInlineStyles)}</span>`;
          html += '</li>';
        });
      }
      
      html += '</ul></div>';
      return html;
    },

    /**
     * Render code card
     */
    code: function(content) {
      const { title, code, language, textStyle } = content;
      const enableInlineStyles = textStyle?.inlineStyles === true;
      let html = '<div class="bento-card__content">';
      
      if (title) {
        html += `<h3 class="bento-card__code-title">${parseInlineStyles(title, enableInlineStyles)}</h3>`;
      }
      
      html += '<div class="bento-card__code-block">';
      html += `<code class="bento-card__code">${highlightSyntax(code || '', language)}</code>`;
      html += '</div></div>';
      
      return html;
    },

    /**
     * Render GitHub activity card
     */
    github: function(content) {
      const { username, title, months, textStyle } = content;
      const enableInlineStyles = textStyle?.inlineStyles === true;
      let html = '<div class="bento-card__content bento-card__github-content">';
      
      // Header with GitHub icon, title and username link
      html += '<div class="bento-card__github-header">';
      html += `<span class="bento-card__github-icon">${ICONS.github}</span>`;
      html += `<span class="bento-card__github-title">${parseInlineStyles(title || 'GitHub Activity', enableInlineStyles)}</span>`;
      if (username) {
        html += `<a href="https://github.com/${sanitizeHTML(username)}" class="bento-card__github-username" target="_blank" rel="noopener noreferrer">@${sanitizeHTML(username)}</a>`;
      }
      html += '</div>';
      
      // Activity graph container - will be populated by GitHubChart
      // months can be 'auto' or a number (1-12)
      const monthsValue = months === 'auto' || months === undefined ? 'auto' : months;
      html += `<div class="bento-card__github-graph" data-username="${sanitizeHTML(username || '')}" data-months="${monthsValue}"></div>`;
      
      html += '</div>';
      return html;
    },

    /**
     * Render profile card (enhanced bio card)
     */
    profile: function(content) {
      const { avatar, name, alias, role, location, bio, interests, skills, socialLinks, textStyle } = content;
      const enableInlineStyles = textStyle?.inlineStyles === true;
      let html = '<div class="bento-card__content bento-card__profile-content">';
      
      // Left side - avatar and basic info
      html += '<div class="bento-card__profile-header">';
      if (avatar) {
        html += `<img class="bento-card__profile-avatar" src="${sanitizeHTML(avatar)}" alt="${sanitizeHTML(name || 'Profile')}" loading="lazy">`;
      }
      html += '<div class="bento-card__profile-info">';
      if (name) {
        html += `<h3 class="bento-card__profile-name">${parseInlineStyles(name, enableInlineStyles)}`;
        if (alias) {
          html += ` <span class="bento-card__profile-alias">// ${parseInlineStyles(alias, enableInlineStyles)}</span>`;
        }
        html += '</h3>';
      }
      if (role) {
        html += `<div class="bento-card__profile-role">${parseInlineStyles(role, enableInlineStyles)}</div>`;
      }
      if (location) {
        html += `<div class="bento-card__profile-location">${ICONS.location}<span>${parseInlineStyles(location, enableInlineStyles)}</span></div>`;
      }
      html += '</div>';
      html += '</div>';
      
      // Bio text
      if (bio) {
        html += `<p class="bento-card__profile-bio">${parseInlineStyles(bio, enableInlineStyles)}</p>`;
      }
      
      // Interests with icons
      if (Array.isArray(interests) && interests.length > 0) {
        html += '<div class="bento-card__profile-interests">';
        interests.forEach(interest => {
          const icon = ICONS[interest.icon] || '';
          html += `<span class="bento-card__profile-interest" title="${sanitizeHTML(interest.label || '')}">${icon}<span>${parseInlineStyles(interest.label || '', enableInlineStyles)}</span></span>`;
        });
        html += '</div>';
      }
      
      // Skills tags
      if (Array.isArray(skills) && skills.length > 0) {
        html += '<div class="bento-card__profile-skills">';
        skills.forEach(skill => {
          html += `<span class="bento-card__profile-skill">${parseInlineStyles(skill, enableInlineStyles)}</span>`;
        });
        html += '</div>';
      }
      
      // Social links
      if (Array.isArray(socialLinks) && socialLinks.length > 0) {
        html += '<div class="bento-card__profile-social">';
        socialLinks.forEach(link => {
          const icon = ICONS[link.icon] || ICONS.link;
          html += `<a href="${sanitizeHTML(link.url || '#')}" class="bento-card__profile-social-link" target="_blank" rel="noopener noreferrer" title="${sanitizeHTML(link.label || '')}">${icon}</a>`;
        });
        html += '</div>';
      }
      
      html += '</div>';
      return html;
    },

    /**
     * Render song card (Last.fm now playing)
     */
    song: function(content) {
      const { username, apiKey, title, textStyle } = content;
      const enableInlineStyles = textStyle?.inlineStyles === true;
      let html = '<div class="bento-card__content bento-card__song-content">';
      
      // Header
      html += '<div class="bento-card__song-header">';
      html += `<span class="bento-card__song-icon">${ICONS.lastfm}</span>`;
      html += `<span class="bento-card__song-title">${parseInlineStyles(title || 'Now Playing', enableInlineStyles)}</span>`;
      if (username) {
        html += `<a href="https://last.fm/user/${sanitizeHTML(username)}" class="bento-card__song-username" target="_blank" rel="noopener noreferrer">@${sanitizeHTML(username)}</a>`;
      }
      html += '</div>';
      
      // Song info container - will be populated by JS
      html += `<div class="bento-card__song-info" data-lastfm-user="${sanitizeHTML(username || '')}" data-lastfm-key="${sanitizeHTML(apiKey || 'none')}">`;
      html += '<div class="bento-card__song-loading">Loading...</div>';
      html += '</div>';
      
      html += '</div>';
      return html;
    },

    /**
     * Render latest blog post card
     */
    latestPost: function(content, cardHeight) {
      const { title, blogUrl, postsIndexUrl, textStyle } = content;
      const enableInlineStyles = textStyle?.inlineStyles === true;
      let html = '<div class="bento-card__content bento-card__latestpost-content">';
      
      // Post info container - will be populated by JS
      html += `<div class="bento-card__latestpost-info" data-posts-index="${sanitizeHTML(postsIndexUrl || 'posts/index.json')}" data-blog-url="${sanitizeHTML(blogUrl || 'blog.html')}" data-title="${sanitizeHTML(title || 'Latest Post')}" data-card-height="${cardHeight || 2}">`;
      html += '<div class="bento-card__latestpost-loading">Loading...</div>';
      html += '</div>';
      
      html += '</div>';
      return html;
    }
  };

  // =============================================================================
  // BentoUI Class
  // =============================================================================
  
  class BentoUI {
    /**
     * Create a BentoUI instance
     * @param {Object} config - Configuration object
     */
    constructor(config = {}) {
      this.config = deepMerge({
        container: '#bento-grid',
        nav: {
          enabled: true,
          container: '#bento-nav',
          logo: 'BentoUI',
          logoUrl: '#',
          links: [],
          theme: 'dark'
        },
        backToTop: {
          enabled: true
        },
        cards: []
      }, config);

      this.gridContainer = null;
      this.navContainer = null;
      this.backToTopButton = null;
      // Support both old {theme: {default: 'dark'}} and new {theme: 'dark'} format
      const themeConfig = this.config.nav.theme;
      this.currentTheme = (typeof themeConfig === 'object' ? themeConfig.default : themeConfig) || 'dark';

      this.init();
    }

    /**
     * Initialize the framework
     */
    init() {
      this.setupGrid();
      
      if (this.config.nav.enabled) {
        this.setupNavigation();
      }
      
      if (this.config.backToTop.enabled) {
        this.setupBackToTop();
      }
      
      if (this.config.mobileWarning?.enabled !== false) {
        this.setupMobileWarning();
      }

      this.applyTheme(this.currentTheme);
      this.render();
    }

    /**
     * Setup the grid container
     */
    setupGrid() {
      // Skip grid setup if container is explicitly null (e.g., for blog pages)
      if (this.config.container === null) {
        this.gridContainer = null;
        return;
      }
      
      this.gridContainer = document.querySelector(this.config.container);
      
      if (!this.gridContainer) {
        console.warn('BentoUI: Grid container not found, creating one.');
        this.gridContainer = document.createElement('div');
        this.gridContainer.id = this.config.container.replace('#', '');
        this.gridContainer.className = 'bento-grid';
        
        const container = document.querySelector('.bento-container') || document.body;
        container.appendChild(this.gridContainer);
      }
      
      if (!this.gridContainer.classList.contains('bento-grid')) {
        this.gridContainer.classList.add('bento-grid');
      }
    }

    /**
     * Setup navigation bar
     */
    setupNavigation() {
      const { nav } = this.config;
      let navElement = document.querySelector(nav.container);

      if (!navElement) {
        navElement = document.createElement('nav');
        navElement.id = nav.container.replace('#', '');
        navElement.className = 'bento-nav';
        
        const container = document.querySelector('.bento-container');
        if (container) {
          container.parentNode.insertBefore(navElement, container);
        } else {
          document.body.insertBefore(navElement, document.body.firstChild);
        }
      }

      let html = '';
      
      // Logo
      html += `<a href="${sanitizeHTML(nav.logoUrl || '#')}" class="bento-nav__logo">${sanitizeHTML(nav.logo || 'BentoUI')}</a>`;
      
      // Links
      if (Array.isArray(nav.links) && nav.links.length > 0) {
        html += '<div class="bento-nav__links">';
        nav.links.forEach(link => {
          const activeClass = link.active ? ' bento-nav__link--active' : '';
          html += `<a href="${sanitizeHTML(link.url || '#')}" class="bento-nav__link${activeClass}">${sanitizeHTML(link.label || '')}</a>`;
        });
        html += '</div>';
      }
      
      // Actions (Theme Toggle)
      html += '<div class="bento-nav__actions">';
      html += `<button class="bento-nav__theme-toggle" aria-label="Toggle theme">${this.currentTheme === 'dark' ? ICONS.sun : ICONS.moon}</button>`;
      html += '</div>';

      navElement.innerHTML = html;
      this.navContainer = navElement;

      // Theme toggle event
      const themeToggle = navElement.querySelector('.bento-nav__theme-toggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', () => this.toggleTheme());
      }
    }

    /**
     * Setup back to top button
     */
    setupBackToTop() {
      this.backToTopButton = document.createElement('button');
      this.backToTopButton.className = 'bento-back-to-top';
      this.backToTopButton.setAttribute('aria-label', 'Back to top');
      this.backToTopButton.innerHTML = ICONS.arrowUp;
      
      document.body.appendChild(this.backToTopButton);

      // Click handler
      this.backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Scroll handler
      window.addEventListener('scroll', () => {
        if (window.scrollY > DEFAULTS.scrollThreshold) {
          this.backToTopButton.classList.add('bento-back-to-top--visible');
        } else {
          this.backToTopButton.classList.remove('bento-back-to-top--visible');
        }
      }, { passive: true });
    }

    /**
     * Setup mobile warning popup
     */
    setupMobileWarning() {
      const mobileBreakpoint = this.config.mobileWarning?.breakpoint || 768;
      const storageKey = 'bento-mobile-warning-dismissed';
      
      // Check if already dismissed this session
      try {
        if (sessionStorage.getItem(storageKey)) return;
      } catch (e) {}
      
      // Check screen size
      if (window.innerWidth > mobileBreakpoint) return;
      
      // Create warning popup
      const warning = document.createElement('div');
      warning.className = 'bento-mobile-warning';
      warning.innerHTML = `
        <div class="bento-mobile-warning__backdrop"></div>
        <div class="bento-mobile-warning__box">
          <div class="bento-mobile-warning__icon">${ICONS.mobileWarning}</div>
          <h3 class="bento-mobile-warning__title">Small Screen Detected</h3>
          <p class="bento-mobile-warning__message">
            This site is best experienced on a <strong>larger screen</strong>. 
            The developer had a life and didn't fully optimize for mobile, 
            so some things might look a bit wonky.
          </p>
          <button class="bento-mobile-warning__dismiss">I'll survive</button>
          <p class="bento-mobile-warning__note">Tap outside or click the button to dismiss</p>
        </div>
      `;
      
      document.body.appendChild(warning);
      
      // Show with slight delay for animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          warning.classList.add('bento-mobile-warning--visible');
        });
      });
      
      // Dismiss function
      const dismiss = () => {
        warning.classList.remove('bento-mobile-warning--visible');
        try {
          sessionStorage.setItem(storageKey, 'true');
        } catch (e) {}
        setTimeout(() => warning.remove(), 300);
      };
      
      // Event listeners
      warning.querySelector('.bento-mobile-warning__backdrop').addEventListener('click', dismiss);
      warning.querySelector('.bento-mobile-warning__dismiss').addEventListener('click', dismiss);
      
      // Also dismiss on Escape key
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          dismiss();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    }

    /**
     * Toggle between light and dark theme
     */
    toggleTheme() {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(this.currentTheme);
    }

    /**
     * Apply theme to document
     * @param {string} theme - Theme name ('dark' or 'light')
     */
    applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      
      // Update theme toggle icon
      if (this.navContainer) {
        const themeToggle = this.navContainer.querySelector('.bento-nav__theme-toggle');
        if (themeToggle) {
          themeToggle.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
        }
      }
      
      // Update GitHub charts theme
      if (this.gridContainer) {
        const chartContainers = this.gridContainer.querySelectorAll('.bento-card__github-graph[data-username]');
        chartContainers.forEach(container => {
          if (container._githubChart) {
            container._githubChart.setTheme(theme);
            container._githubChart.render(container);
          }
        });
      }

      // Store preference
      try {
        localStorage.setItem('bento-theme', theme);
      } catch (e) {
        // localStorage not available
      }
    }

    /**
     * Load saved theme preference
     */
    loadSavedTheme() {
      try {
        const saved = localStorage.getItem('bento-theme');
        if (saved) {
          this.currentTheme = saved;
          this.applyTheme(saved);
        }
      } catch (e) {
        // localStorage not available
      }
    }

    /**
     * Render all cards to the grid
     */
    render() {
      if (!this.gridContainer) return;
      
      this.gridContainer.innerHTML = '';
      
      if (!Array.isArray(this.config.cards)) {
        console.warn('BentoUI: No cards array provided.');
        return;
      }

      this.config.cards.forEach((cardConfig, index) => {
        try {
          const cardElement = this.createCard(cardConfig, index);
          if (cardElement) {
            this.gridContainer.appendChild(cardElement);
          }
        } catch (error) {
          console.error(`BentoUI: Error rendering card ${index}:`, error);
        }
      });
      
      // Initialize GitHub charts after DOM is updated
      this.initGitHubCharts();
      
      // Initialize Last.fm cards
      this.initLastFmCards();
      
      // Initialize latest post cards
      this.initLatestPostCards();
    }

    /**
     * Initialize GitHub contribution charts
     */
    initGitHubCharts() {
      if (!this.gridContainer) return;
      
      const chartContainers = this.gridContainer.querySelectorAll('.bento-card__github-graph[data-username]');
      chartContainers.forEach(container => {
        const username = container.dataset.username;
        const monthsAttr = container.dataset.months;
        // Support 'auto' string or number
        const months = monthsAttr === 'auto' ? 'auto' : (parseInt(monthsAttr) || 'auto');

        // Try to get freeform from the card config if available
        let freeform = false;
        if (container.closest('.bento-card')) {
          // Try to find the card index from a data attribute if available
          const cardIndex = container.closest('.bento-card').dataset.cardIndex;
          if (typeof cardIndex !== 'undefined' && this.config.cards[cardIndex] && this.config.cards[cardIndex].content && typeof this.config.cards[cardIndex].content.freeform !== 'undefined') {
            freeform = !!this.config.cards[cardIndex].content.freeform;
          }
        }

        if (username) {
          const chart = new GitHubChart({
            username: username,
            months: months,
            theme: this.currentTheme,
            cellSize: 10,
            cellGap: 2,
            freeform: freeform
          });
          chart.render(container);
          // Store reference for theme updates
          container._githubChart = chart;
        }
      });
    }

    /**
     * Initialize Last.fm song cards
     */
    initLastFmCards() {
      const songContainers = this.gridContainer.querySelectorAll('.bento-card__song-info[data-lastfm-user]');
      songContainers.forEach(container => {
        const username = container.dataset.lastfmUser;
        const apiKey = container.dataset.lastfmKey;
        
        if (username && apiKey) {
          this.fetchLastFmTrack(container, username, apiKey);
          
          // Auto-refresh every 30 seconds
          container._lastfmInterval = setInterval(() => {
            this.fetchLastFmTrack(container, username, apiKey);
          }, 30000);
        } else {
          container.innerHTML = '<div class="bento-card__song-error">API key required</div>';
        }
      });
    }

    /**
     * Fetch latest track from Last.fm
     */
    async fetchLastFmTrack(container, username, apiKey) {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(username)}&api_key=${encodeURIComponent(apiKey)}&format=json&limit=1`
        );
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        const track = data?.recenttracks?.track?.[0];
        
        if (track) {
          const isNowPlaying = track['@attr']?.nowplaying === 'true';
          const albumArt = track.image?.[2]?.['#text'] || track.image?.[1]?.['#text'] || '';
          const trackName = track.name || 'Unknown Track';
          const artistName = track.artist?.['#text'] || track.artist || 'Unknown Artist';
          const albumName = track.album?.['#text'] || '';
          const trackUrl = track.url || '#';
          
          let html = '<div class="bento-card__song-track">';
          
          // Album art
          if (albumArt) {
            html += `<img class="bento-card__song-art" src="${sanitizeHTML(albumArt)}" alt="${sanitizeHTML(albumName)}" loading="lazy">`;
          } else {
            html += `<div class="bento-card__song-art bento-card__song-art--placeholder">${ICONS.music}</div>`;
          }
          
          // Track info
          html += '<div class="bento-card__song-details">';
          html += `<a href="${sanitizeHTML(trackUrl)}" class="bento-card__song-name" target="_blank" rel="noopener noreferrer">${sanitizeHTML(trackName)}</a>`;
          html += `<div class="bento-card__song-artist">${sanitizeHTML(artistName)}</div>`;
          if (albumName) {
            html += `<div class="bento-card__song-album">${sanitizeHTML(albumName)}</div>`;
          }
          html += '</div>';
          
          // Now playing indicator
          if (isNowPlaying) {
            html += '<div class="bento-card__song-playing"><span class="bento-card__song-bars"><span></span><span></span><span></span></span></div>';
          }
          
          html += '</div>';
          container.innerHTML = html;
        } else {
          container.innerHTML = '<div class="bento-card__song-error">No recent tracks</div>';
        }
      } catch (error) {
        console.warn('BentoUI: Failed to fetch Last.fm data:', error);
        container.innerHTML = '<div class="bento-card__song-error">Could not load track</div>';
      }
    }

    /**
     * Initialize latest blog post cards
     */
    initLatestPostCards() {
      if (!this.gridContainer) return;
      
      const postContainers = this.gridContainer.querySelectorAll('.bento-card__latestpost-info[data-posts-index]');
      postContainers.forEach(container => {
        const postsIndexUrl = container.dataset.postsIndex;
        const blogUrl = container.dataset.blogUrl;
        
        if (postsIndexUrl) {
          this.fetchLatestPost(container, postsIndexUrl, blogUrl);
        } else {
          container.innerHTML = '<div class="bento-card__latestpost-error">Posts index URL required</div>';
        }
      });
    }

    /**
     * Fetch latest blog post from index.json
     */
    async fetchLatestPost(container, postsIndexUrl, blogUrl) {
      try {
        const response = await fetch(postsIndexUrl);
        
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const posts = await response.json();
        
        // Sort by date (newest first) and get the latest
        const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        const post = sortedPosts[0];
        const cardTitle = container.dataset.title || 'Latest Post';
        const cardHeight = parseInt(container.dataset.cardHeight) || 2;
        
        // Dynamic content based on card height
        const excerptLines = cardHeight >= 3 ? 4 : cardHeight >= 2 ? 3 : 2;
        const maxTags = cardHeight >= 3 ? 4 : 3;
        const showReadTime = cardHeight >= 2;
        
        if (post) {
          // Use hash-based routing to match the blog engine's URL format
          const postUrl = `${blogUrl}#post/${encodeURIComponent(post.slug)}`;
          // Parse as local time by appending T00:00:00 to avoid UTC interpretation
          const dateFormatted = new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
          
          let html = '';
          
          // Left accent bar
          html += '<div class="bento-card__latestpost-accent"></div>';
          
          // Main content area
          html += '<div class="bento-card__latestpost-main">';
          
          // Label and meta row
          html += '<div class="bento-card__latestpost-top">';
          html += `<span class="bento-card__latestpost-label">${sanitizeHTML(cardTitle)}</span>`;
          html += '<div class="bento-card__latestpost-topmeta">';
          if (showReadTime && post.readTime) {
            html += `<span class="bento-card__latestpost-readtime">${post.readTime} min read</span>`;
            html += '<span class="bento-card__latestpost-separator">•</span>';
          }
          html += `<span class="bento-card__latestpost-date">${dateFormatted}</span>`;
          html += '</div>';
          html += '</div>';
          
          // Post title (clickable)
          html += `<a href="${sanitizeHTML(postUrl)}" class="bento-card__latestpost-name">${sanitizeHTML(post.title || 'Untitled')}</a>`;
          
          // Excerpt with dynamic line clamp
          html += `<p class="bento-card__latestpost-excerpt" style="-webkit-line-clamp: ${excerptLines}; line-clamp: ${excerptLines};">${sanitizeHTML(post.excerpt || '')}</p>`;
          
          // Bottom row with tags and read more
          html += '<div class="bento-card__latestpost-bottom">';
          if (Array.isArray(post.tags) && post.tags.length > 0) {
            html += '<div class="bento-card__latestpost-tags">';
            post.tags.slice(0, maxTags).forEach(tag => {
              html += `<span class="bento-card__latestpost-tag">#${sanitizeHTML(tag)}</span>`;
            });
            html += '</div>';
          }
          html += `<a href="${sanitizeHTML(postUrl)}" class="bento-card__latestpost-readmore">Read more →</a>`;
          html += '</div>';
          
          html += '</div>';
          container.innerHTML = html;
        } else {
          container.innerHTML = '<div class="bento-card__latestpost-error">No posts found</div>';
        }
      } catch (error) {
        console.warn('BentoUI: Failed to fetch latest post:', error);
        container.innerHTML = '<div class="bento-card__latestpost-error">Could not load post</div>';
      }
    }

    /**
     * Create a single card element
     * @param {Object} cardConfig - Card configuration
     * @param {number} index - Card index
     * @returns {HTMLElement|null}
     */
    createCard(cardConfig, index) {
      if (!cardConfig || typeof cardConfig !== 'object') {
        console.warn(`BentoUI: Invalid card config at index ${index}`);
        return null;
      }

      const {
        type = DEFAULTS.card.type,
        width,
        height,
        x,
        y,
        content = {}
      } = cardConfig;

      // Validate dimensions
      const dims = validateDimensions(width, height);

      // Create card element
      const card = document.createElement('div');
      card.className = `bento-card bento-card--${sanitizeHTML(type)}`;
      card.setAttribute('data-card-index', index);
      
      // Add data attributes for responsive CSS
      card.setAttribute('data-width', dims.width);
      card.setAttribute('data-height', dims.height);

      // Set grid position and span
      if (typeof x === 'number') {
        card.style.gridColumn = `${x + 1} / span ${dims.width}`;
      } else {
        card.style.gridColumn = `span ${dims.width}`;
      }

      if (typeof y === 'number') {
        card.style.gridRow = `${y + 1} / span ${dims.height}`;
      } else {
        card.style.gridRow = `span ${dims.height}`;
      }

      // Render content based on type
      const renderer = CardRenderers[type];
      if (renderer) {
        // Pass card height for renderers that need it (like latestPost)
        card.innerHTML = renderer(content, dims.height);
      } else {
        console.warn(`BentoUI: Unknown card type "${type}", falling back to empty`);
        card.innerHTML = CardRenderers.empty({ message: `Unknown type: ${type}` });
      }

      return card;
    }

    /**
     * Add a new card
     * @param {Object} cardConfig - Card configuration
     */
    addCard(cardConfig) {
      this.config.cards.push(cardConfig);
      this.render();
    }

    /**
     * Remove a card by index
     * @param {number} index - Card index
     */
    removeCard(index) {
      if (index >= 0 && index < this.config.cards.length) {
        this.config.cards.splice(index, 1);
        this.render();
      }
    }

    /**
     * Update a card by index
     * @param {number} index - Card index
     * @param {Object} cardConfig - New card configuration
     */
    updateCard(index, cardConfig) {
      if (index >= 0 && index < this.config.cards.length) {
        this.config.cards[index] = deepMerge(this.config.cards[index], cardConfig);
        this.render();
      }
    }

    /**
     * Set all cards
     * @param {Array} cards - Array of card configurations
     */
    setCards(cards) {
      if (Array.isArray(cards)) {
        this.config.cards = cards;
        this.render();
      }
    }

    /**
     * Destroy the BentoUI instance
     */
    destroy() {
      if (this.gridContainer) {
        this.gridContainer.innerHTML = '';
      }
      if (this.backToTopButton) {
        this.backToTopButton.remove();
      }
    }
  }

  // =============================================================================
  // Export
  // =============================================================================
  
  // Support CommonJS, AMD, and browser globals
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = BentoUI;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() { return BentoUI; });
  } else {
    global.BentoUI = BentoUI;
  }

})(typeof window !== 'undefined' ? window : this);
