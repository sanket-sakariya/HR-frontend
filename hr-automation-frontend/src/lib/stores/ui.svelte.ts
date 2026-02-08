class UIStore {
  sidebarOpen = $state(true);
  sidebarCollapsed = $state(false);
  theme = $state<'dark' | 'light'>('dark');
  isMobile = $state(false);

  constructor() {
    if (typeof window !== 'undefined') {
      this.checkMobile();
      window.addEventListener('resize', () => this.checkMobile());
    }
  }

  private checkMobile() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleSidebarCollapse() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  openSidebar() {
    this.sidebarOpen = true;
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', this.theme === 'dark');
    }
  }
}

export const uiStore = new UIStore();
