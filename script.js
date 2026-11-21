// 1. Тёмная тема (сохраняется при переходе между страницами)
const themeBtn = document.querySelector('#theme');

function applyTheme(isDark) {
  document.body.classList.toggle('dark-theme', isDark);
  if (themeBtn) {
    themeBtn.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';
  }
}

applyTheme(localStorage.getItem('theme') === 'dark');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme(isDark);
  });
}

// 2. Кнопка «Подробнее» / «Скрыть» на главной странице
const showMoreBtn = document.querySelector('#showMore');
const moreText = document.querySelector('#moreText');

if (showMoreBtn && moreText) {
  showMoreBtn.addEventListener('click', () => {
    moreText.classList.toggle('d-none');
    showMoreBtn.textContent = moreText.classList.contains('d-none')
      ? 'Подробнее'
      : 'Скрыть';
  });
}

// 3. Загрузка и вывод карточек проектов из data/projects.json
const projectsContainer = document.querySelector('#projects');

function renderProjects(projects) {
  projectsContainer.innerHTML = projects
    .map(
      (project) => `
        <div class="col-md-4">
          <article class="card h-100 p-4 shadow-sm project-card">
            <h3 class="h5">${project.title}</h3>
            <p class="text-secondary mb-3">${project.description}</p>
            <a href="${project.link}" class="mt-auto btn btn-sm btn-outline-primary">Открыть</a>
          </article>
        </div>
      `
    )
    .join('');
}

if (projectsContainer) {
  fetch('./data/projects.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((projects) => renderProjects(projects))
    .catch(() => {
      projectsContainer.innerHTML =
        '<p class="text-danger">Не удалось загрузить проекты. Проверяй сайт на GitHub Pages или через Live Server.</p>';
    });
}

// 4. Проверка формы обратной связи на contacts.html
const contactForm = document.querySelector('#contactForm');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const commentInput = document.querySelector('#comment');
const formMessage = document.querySelector('#formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const comment = commentInput.value.trim();

    if (!name || !email.includes('@') || !comment) {
      formMessage.textContent = 'Заполни все поля и проверь email';
      formMessage.className = 'mt-3 mb-0 fw-semibold text-danger';
      return;
    }

    formMessage.textContent = `Спасибо, ${name}! Сообщение принято.`;
    formMessage.className = 'mt-3 mb-0 fw-semibold text-success';
    contactForm.reset();
  });
}
