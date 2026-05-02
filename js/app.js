const App = {
  STORAGE_KEY: 'teacher_portfolio',
  USERS_KEY: 'users',
  CURRENT_USER_KEY: 'currentUser',
  PORTFOLIO_KEY: 'portfolio_data',
  ACHIEVEMENTS_KEY: 'achievements',
  EXPERIENCE_KEY: 'experience',

  init() {
    this.initStorage();
    this.initAuth();
    this.initSmoothScroll();
    this.initCarousel();
    this.initHeadroom();
  },

  initStorage() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const defaultData = {
        teacherName: 'Соколова Ольга Михайловна',
        teacherBio: 'Преподаватель педагогического колледжа с многолетним стажем работы. Специализируюсь на методике преподавания и педагогическом мастерстве. В своей практике сочетаю классические педагогические подходы с интерактивными методами обучения. Активно участвую в профессиональных конференциях и педагогических форумах, где представляю собственные наработки. Считаю важным не только передавать знания, но и вдохновлять студентов на развитие собственного педагогического стиля.',
        achievements: [
          { title: 'Почётный работник образования', year: '2019', image: 'images/award1.jpg' },
          { title: 'Лучший методист года', year: '2020', image: 'images/award2.jpg' },
          { title: 'Педагог года', year: '2021', image: 'images/award3.jpg' },
          { title: 'Победитель конкурса инноваций', year: '2022', image: 'images/award4.jpg' },
          { title: 'Научное руководство', year: '2023', image: 'images/award5.jpg' },
          { title: 'Международная стажировка', year: '2024', image: 'images/award6.jpg' },
          { title: 'Автор учебного пособия', year: '2025', image: 'images/award7.jpg' },
          { title: 'Эксперт комиссии', year: '2026', image: 'images/award8.jpg' }
        ],
        experience: [
          { year: '2019', title: 'Преподаватель', place: 'Педагогический колледж', description: 'Веду занятия по педагогике и методике преподавания. Руковожу курсовыми и дипломными работами.' },
          { year: '2015', title: 'Старший преподаватель', place: 'Университет', description: 'Разработка учебных программ и методических пособий. Участие в научных конференциях.' },
          { year: '2010', title: 'Педагог', place: 'Школа', description: 'Преподавание в средней школе. Классное руководство. Внеклассная работа.' }
        ],
        education: [
          { year: '2008', title: 'Кандидат педагогических наук', place: 'Педагогический университет', description: 'Защита диссертации по методике преподавания.' },
          { year: '2003', title: 'Магистр педагогики', place: 'Педагогический университет', description: 'Специализация - методика преподавания.' },
          { year: '2001', title: 'Бакалавр педагогики', place: 'Педагогический колледж', description: 'Полное педагогическое образование.' }
        ],
        portfolio: [
          { title: 'Методическое пособие', image: 'images/project/project-image01.png' },
          { title: 'Учебная программа', image: 'images/project/project-image02.png' },
          { title: 'Научная статья', image: 'images/project/project-image03.png' },
          { title: 'Проект развития', image: 'images/project/project-image04.png' },
          { title: 'Конкурсная работа', image: 'images/project/project-image05.png' }
        ]
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(defaultData));
    }

    if (!localStorage.getItem(this.USERS_KEY)) {
      const defaultUsers = [
        { id: 1, login: 'admin', password: 'admin123', role: 'admin', name: 'Администратор' },
        { id: 2, login: 'student', password: 'student123', role: 'student', name: 'Студент' }
      ];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(defaultUsers));
    }
  },

  initAuth() {
    const authNav = document.getElementById('auth-nav');
    const profileButtons = document.getElementById('profile-buttons');
    const currentUser = this.getCurrentUser();

    if (!authNav) return;

    if (currentUser) {
      authNav.innerHTML = `
        <li class="nav-item">
          <a href="admin.html" class="nav-link auth-btn">Админ-панель</a>
        </li>
        <li class="nav-item">
          <span class="nav-link logout-btn" onclick="App.logout()">Выйти</span>
        </li>
      `;

      if (profileButtons) {
        profileButtons.innerHTML = `
          <a href="admin.html" class="btn mr-lg-2 custom-btn"><i class='uil uil-edit'></i> Редактировать</a>
          <a href="#" class="btn custom-btn custom-btn-bg custom-btn-link" onclick="App.logout()">Выйти</a>
        `;
      }

      this.loadPortfolioData();
    } else {
      authNav.innerHTML = `
        <li class="nav-item">
          <a href="login.html" class="nav-link auth-btn">Войти</a>
        </li>
      `;

      if (profileButtons) {
        profileButtons.innerHTML = `
          <a href="login.html" class="btn mr-lg-2 custom-btn"><i class='uil uil-user'></i> Войти</a>
          <a href="register.html" class="btn custom-btn custom-btn-bg custom-btn-link">Регистрация</a>
        `;
      }

      this.loadPortfolioData();
    }
  },

  loadPortfolioData() {
    const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY));

    const nameEl = document.getElementById('teacher-name');
    const bioEl = document.getElementById('teacher-bio');
    const achievementsEl = document.getElementById('achievements-list');
    const experienceEl = document.getElementById('experience');
    const portfolioEl = document.getElementById('portfolio-carousel');

    if (nameEl) nameEl.textContent = data.teacherName;
    // if (bioEl) bioEl.innerHTML = data.teacherBio.replace(/\. /g, '.<br>');

    if (achievementsEl && data.achievements) {
      achievementsEl.innerHTML = data.achievements.map(a => `
        <div class="col-md-3 mb-3">
          <div class="achievement-card">
            <img src="${a.image}" class="img-fluid" alt="${a.title}">
            <h4>${a.title}</h4>
            <p>${a.year}</p>
          </div>
        </div>
      `).join('');
    }

    if (portfolioEl && data.portfolio) {
      portfolioEl.innerHTML = data.portfolio.map(p => `
        <div class="item">
          <div class="project-info">
            <img src="${p.image}" class="img-fluid" alt="${p.title}">
            <h4 class="mt-2">${p.title}</h4>
          </div>
        </div>
      `).join('');
    }
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY));
  },

  setCurrentUser(user) {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    window.location.href = 'index.html';
  },

  login(login, password) {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY));
    const user = users.find(u => u.login === login && u.password === password);

    if (user) {
      this.setCurrentUser(user);
      return { success: true, user };
    }

    return { success: false, message: 'Неверный логин или пароль' };
  },

  register(userData) {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY));

    if (users.find(u => u.login === userData.login)) {
      return { success: false, message: 'Пользователь с таким логином уже существует' };
    }

    const newUser = {
      id: users.length + 1,
      login: userData.login,
      password: userData.password,
      role: 'student',
      name: userData.name
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    return { success: true, user: newUser };
  },

  initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
      const target = $(this).attr('href');
      if (target === '#') return;

      $('html, body').animate({
        scrollTop: $(target).offset().top - 70
      }, 500);

      e.preventDefault();
    });
  },

  initCarousel() {
    if ($('.owl-carousel').length) {
      $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        navText: ['<i class="uil uil-arrow-left"></i>', '<i class="uil uil-arrow-right"></i>'],
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          1024: { items: 3 }
        }
      });
    }
  },

  initHeadroom() {
    $('.navbar').headroom({
      tolerance: 5,
      offset: 70,
      classes: {
        pinned: 'pinned',
        unpinned: 'unpinned'
      }
    });
  },

  loadAdminData() {
    const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY));

    return { data, users };
  },

  savePortfolioData(newData) {
    const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    const updated = { ...data, ...newData };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    return { success: true };
  },

  saveAchievement(achievement) {
    const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    data.achievements.push(achievement);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return { success: true };
  },

  deleteAchievement(index) {
    const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    data.achievements.splice(index, 1);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return { success: true };
  },

  saveExperience(experience) {
    const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    data.experience.push(experience);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return { success: true };
  },

  deleteExperience(index) {
    const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    data.experience.splice(index, 1);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return { success: true };
  }
};

$(document).ready(function() {
  App.init();
  document.getElementById('current-year').textContent = new Date().getFullYear();
});