document.addEventListener("DOMContentLoaded", () => {
    /* ========== Navigation (Hamburger-Menü) ========== */
    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.getElementById("nav-links");
  
    menuIcon.addEventListener("click", () => {
      navLinks.classList.toggle("show-menu");
    });
  
    /* Schließen des Menüs, wenn ein Link geklickt wird (auf Mobile) */
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show-menu");
      });
    });
  
    /* ========== Intersection Observer für Reveal-Effekte ========== */
    const revealSections = document.querySelectorAll(".reveal");
    const revealOptions = {
      threshold: 0.1
    };
  
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);
  
    revealSections.forEach(section => {
      revealOnScroll.observe(section);
    });
  
    /* ========== Animierte Skill-Balken, wenn der Bereich in den Viewport kommt ========== */
    const skillSection = document.getElementById("skills");
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
  
    skillObserver.observe(skillSection);
  
    /* ========== Projekte dynamisch erzeugen ========== */
    const projectsData = [
      {
        title: "Portfolio Website",
        category: "web",
        description: "Eine moderne One-Page-Webseite mit persönlichen Vorstellungen.",
        imageUrl: "https://via.placeholder.com/600x400"
      },
      {
        title: "Mobile Fitness App",
        category: "mobile",
        description: "Workouts und Ernährungstipps direkt auf dem Smartphone.",
        imageUrl: "https://via.placeholder.com/600x400"
      },
      {
        title: "KI-Bilderkennung",
        category: "ai",
        description: "Ein Projekt zur Objekterkennung mit neuronalen Netzen.",
        imageUrl: "https://via.placeholder.com/600x400"
      },
      {
        title: "React E-Commerce",
        category: "web",
        description: "Ein Shop-System mit Warenkorb und Produktlisten in React.",
        imageUrl: "https://via.placeholder.com/600x400"
      },
      {
        title: "Chatbot mit NLP",
        category: "ai",
        description: "Ein Chatbot, der natürliche Sprache verarbeiten kann.",
        imageUrl: "https://via.placeholder.com/600x400"
      },
      {
        title: "AR-Möbel-App",
        category: "3d",
        description: "AR-App zum virtuellen Platzieren von Möbeln im Raum.",
        imageUrl: "https://via.placeholder.com/600x400"
      }
    ];
    generateProjectCards(projectsData);
  
    /* ========== Filter-Buttons ========== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((button) => button.classList.remove("active"));
        btn.classList.add("active");
  
        const filterValue = btn.getAttribute("data-filter");
        filterProjects(filterValue, projectsData);
      });
    });
  
    /* ========== Kontaktformular rudimentär auswerten ========== */
    const contactForm = document.querySelector(".contact-form");
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      
      // Hier könntest du dein Backend aufrufen oder eine Mail-Funktion einbinden
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Nachricht:", message);
  
      alert("Vielen Dank für deine Nachricht!");
      contactForm.reset();
    });
  
    /* ========== Animierte Timeline (Lebenslauf) ========== */
    const timelineItems = document.querySelectorAll(".timeline-item");
    const timelineOptions = {
      threshold: 0.3
    };
  
    const timelineObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, timelineOptions);
  
    timelineItems.forEach(item => {
      timelineObserver.observe(item);
    });
  
  });
  
  /**
   * Skill-Balken animieren
   */
  function animateSkillBars() {
    const skillLevels = document.querySelectorAll(".skill-level");
    skillLevels.forEach((level) => {
      const skillValue = level.getAttribute("data-skill");
      // Animierte Breite setzen
      setTimeout(() => {
        level.style.width = skillValue + "%";
      }, 300);
    });
  }
  
  /**
   * Dynamische Erstellung der Projekt-Karten
   */
  function generateProjectCards(projects) {
    const gallery = document.querySelector(".project-gallery");
    gallery.innerHTML = ""; // Vor dem Neubefüllen leeren
  
    projects.forEach((project) => {
      const card = document.createElement("div");
      card.classList.add("project-card");
      card.setAttribute("data-category", project.category);
  
      card.innerHTML = `
        <div class="project-image">
          <img src="${project.imageUrl}" alt="${project.title}">
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      `;
      gallery.appendChild(card);
    });
  }
  
  /**
   * Filter-Funktion für Projekte
   */
  function filterProjects(filterValue, projectsData) {
    if (filterValue === "all") {
      generateProjectCards(projectsData);
    } else {
      const filtered = projectsData.filter((proj) => proj.category === filterValue);
      generateProjectCards(filtered);
    }
  }