let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                let activeLink = document.querySelector(`header nav a[href*="${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            });
        }
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Projects Carousel Functionality
const projectsContainer = document.getElementById('projectsContainer');
const projectCards = document.querySelectorAll('.project-card');
const projectsPrevBtn = document.getElementById('projectsPrevBtn');
const projectsNextBtn = document.getElementById('projectsNextBtn');
const projectsIndicators = document.getElementById('projectsIndicators');
const currentProjectIndex = document.getElementById('currentProjectIndex');
const totalProjects = document.getElementById('totalProjects');

let currentProjectSlide = 0;
let projectsPerView = getProjectsPerView();
let totalProjectSlides = Math.ceil(projectCards.length / projectsPerView);

// Función para determinar cuántos proyectos mostrar por vista
function getProjectsPerView() {
    if (window.innerWidth <= 768) return 1;
    return 2;
}

// Crear indicadores dinámicamente
function createProjectsIndicators() {
    projectsIndicators.innerHTML = '';
    for (let i = 0; i < totalProjectSlides; i++) {
        const indicator = document.createElement('button');
        indicator.classList.add('projects-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToProjectSlide(i));
        projectsIndicators.appendChild(indicator);
    }
}

// Actualizar carrusel de proyectos
function updateProjectsCarousel() {
    if (projectCards.length === 0) return;
    
    // Obtener el ancho de una tarjeta más el gap
    const cardWidth = projectCards[0].offsetWidth;
    const gap = 22; // 2.2rem = 22px
    const containerWidth = (cardWidth + gap) * projectsPerView;
    
    // Calcular el desplazamiento basado en proyectos mostrados por vista
    const translateX = -currentProjectSlide * containerWidth;
    projectsContainer.style.transform = `translateX(${translateX}px)`;
    
    // Actualizar indicadores
    const indicators = document.querySelectorAll('.projects-indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentProjectSlide);
    });
    
    // Actualizar contador
    currentProjectIndex.textContent = currentProjectSlide + 1;
    totalProjects.textContent = totalProjectSlides;
    
    // Actualizar botones de navegación
    projectsPrevBtn.disabled = currentProjectSlide === 0;
    projectsNextBtn.disabled = currentProjectSlide === totalProjectSlides - 1;
}

// Ir a slide específico
function goToProjectSlide(slideIndex) {
    currentProjectSlide = slideIndex;
    updateProjectsCarousel();
}

// Siguiente slide
function nextProjectSlide() {
    if (currentProjectSlide < totalProjectSlides - 1) {
        currentProjectSlide++;
        updateProjectsCarousel();
    }
}

// Slide anterior
function prevProjectSlide() {
    if (currentProjectSlide > 0) {
        currentProjectSlide--;
        updateProjectsCarousel();
    }
}

// Event listeners para el carrusel de proyectos
projectsPrevBtn.addEventListener('click', prevProjectSlide);
projectsNextBtn.addEventListener('click', nextProjectSlide);

// Redimensionar ventana
window.addEventListener('resize', () => {
    const newProjectsPerView = getProjectsPerView();
    if (newProjectsPerView !== projectsPerView) {
        projectsPerView = newProjectsPerView;
        totalProjectSlides = Math.ceil(projectCards.length / projectsPerView);
        
        // Asegurar que currentProjectSlide no exceda el nuevo límite
        if (currentProjectSlide >= totalProjectSlides) {
            currentProjectSlide = Math.max(0, totalProjectSlides - 1);
        }
        
        createProjectsIndicators();
        updateProjectsCarousel();
    }
});

// Función de inicialización
function initializeProjectsCarousel() {
    setTimeout(() => {
        if (projectCards.length === 0) return;
        
        projectsPerView = getProjectsPerView();
        totalProjectSlides = Math.ceil(projectCards.length / projectsPerView);
        currentProjectSlide = 0;
        
        createProjectsIndicators();
        updateProjectsCarousel();
    }, 100);
}

// Inicializar carrusel de proyectos
initializeProjectsCarousel();

// Projects Modal Functionality
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const indicators = document.querySelectorAll('.indicator');

let currentSlide = 0;
let totalSlides = 3;

// Project data
const projectsData = {
    finance: {
        title: "Campusano Rent Cars",
        description: "designed to provide seamless vehicle rentals for every need. Browse a wide selection of cars, from economy models to luxury SUVs, with transparent pricing and flexible rental periods. Enjoy instant online bookings, secure payment processing, and real-time availability checks.",
        technologies: ["ASP.NET Core", "C#", "SQL Server", "Entity Framework", "HTML/CSS", "JavaScript", "Chart.js"],
        liveLink: "https://campusanorentcars.com",
        githubLink: "https://github.com/AlbertJun10r/finance-dashboard",
        images: [
            "assets/images/Pages/Campusano2.PNG",
            "assets/images/Pages/Campusano3.PNG",
            "assets/images/Pages/Campusano4.PNG",
        ]
    },
    ecommerce: {
        title: "DGA Vehicles Platform",
        description: "(¡IMPORTANT!. For contract and security terms, the code or the application cannot be visualized.) A comprehensive application for the management and tracking of customs vehicles, designed to automate key processes such as unit registration and classification (including license plate assignment, cargo types, and legal status), control of arrivals and departures in customs clearance zones, and the generation of automated reports for audits and regulatory compliance.",
        technologies: [".NET Core", "Blazor", "SQL Server", "Vue.Js", "APIREST", "SignalR", ""],
        liveLink: "https://github.com/AlbertJun10r/DGA-Vehicles-Platform",
        githubLink: "https://github.com/AlbertJun10r/DGA-Vehicles-Platform",
        images: [
            "assets/images/Pages/DGA2.PNG",
            "assets/images/Pages/DGA3.PNG",
            "assets/images/Pages/DGA4.PNG"
        ]
    }
};

function showProjectModal(project) {
    // Update modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalLiveLink').href = project.liveLink;
    document.getElementById('modalGithubLink').href = project.githubLink;
    
    // Update images
    document.getElementById('modalImage1').src = project.images[0];
    document.getElementById('modalImage2').src = project.images[1];
    document.getElementById('modalImage3').src = project.images[2];
    
    // Update technologies
    const techContainer = document.getElementById('modalTechnologies');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.classList.add('tech-tag');
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });
    
    // Reset carousel
    currentSlide = 0;
    updateCarousel();
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
closeModal.addEventListener('click', closeProjectModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProjectModal();
    }
});

function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Carousel functionality (para el modal)
function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlide) {
            indicator.classList.add('active');
        }
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeProjectModal();
    }
});

// Auto-advance carousel del modal (opcional)
setInterval(() => {
    if (modal.style.display === 'block') {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
}, 10000);

// Event listener ÚNICO para abrir modal de proyectos
projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Verificar si es un proyecto "Coming Soon"
        if (card.classList.contains('third') || 
            card.classList.contains('fourth') || 
            card.classList.contains('fifth') || 
            card.classList.contains('sixth')) {
            e.preventDefault();
            return false;
        }
        
        const projectId = card.getAttribute('data-project');
        const project = projectsData[projectId];
        
        if (project) {
            showProjectModal(project);
        }
    });
});