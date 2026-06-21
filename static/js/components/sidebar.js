function toggleMobileSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar.classList.contains('-translate-x-full')) {
        // Open Sidebar
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
        }, 20);
    } else {
        // Close Sidebar
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        overlay.addEventListener('transitionend', function handler() {
            overlay.classList.add('hidden');
            overlay.removeEventListener('transitionend', handler);
        });
    }
}