document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Логика формы регистрации (register.html) ---
  const regForm = document.getElementById('register-form');
  const regMessage = document.getElementById('reg-message');

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Получаем реальное значение ника из поля ввода
      const nickname = document.getElementById('reg-nickname').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      
      // Простая валидация: проверяем, что поля не пустые
      if (!nickname || !email || !password) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
      }

      if (regMessage) {
        // Формируем сообщение, подставляя реальный ник
        regMessage.textContent = `Добро пожаловать, \${nickname}! Ваша учетная запись успешно создана. Теперь вы можете сохранять избранные номера и получать персональные предложения.`;
        regMessage.style.display = 'block';
        regMessage.style.color = '#2e7d32';
        regMessage.style.backgroundColor = '#e8f5e9';
        regMessage.style.padding = '15px';
        regMessage.style.borderRadius = '8px';
        
        // Опционально: сбрасываем форму после успеха, чтобы пользователь мог зарегистрировать другого
        // regForm.reset(); 
      }
    });
  }

  // --- 2. Логика формы входа (login.html) ---
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nickname = document.getElementById('login-nickname').value.trim();
      const password = document.getElementById('login-password').value;

      if (!nickname || !password) {
        alert('Пожалуйста, введите никнейм и пароль.');
        return;
      }
      
      // Имитация успешного входа:
      // Сохраняем никнейм в браузере (localStorage), чтобы другие страницы могли его видеть
      localStorage.setItem('user_nickname', nickname);
      
      // Перенаправляем на главную страницу
      window.location.href = 'index.html';
    });
  }

  // --- 3. Логика отображения приветствия на главной (index.html) ---
  // Если пользователь вошел (никнейм есть в localStorage), покажем приветствие
  const userNickname = localStorage.getItem('user_nickname');
  const headerActions = document.querySelector('.header-actions');

  if (userNickname && headerActions) {
    // Находим кнопку "Регистрация" в шапке
    const regBtn = headerActions.querySelector('a.btn-outline');
    
    if (regBtn) {
      // Заменяем текст кнопки на приветствие
      regBtn.textContent = `Привет, \${userNickname}!`;
      regBtn.href = '#'; // Ссылка никуда не ведет, это просто статус
      regBtn.style.pointerEvents = 'none'; // Чтобы нельзя было кликнуть
      regBtn.style.opacity = '0.9';
      regBtn.style.cursor = 'default';
      
      // Добавляем кнопку "Выйти" рядом
      const logoutBtn = document.createElement('a');
      logoutBtn.className = 'btn-outline';
      logoutBtn.textContent = 'Выйти';
      logoutBtn.style.marginLeft = '15px';
      logoutBtn.style.padding = '8px 16px';
      logoutBtn.style.textDecoration = 'none';
      logoutBtn.style.display = 'inline-block';
      
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Удаляем данные пользователя
        localStorage.removeItem('user_nickname');
        // Перезагружаем страницу, чтобы шапка обновилась
        window.location.reload();
      });
      
      headerActions.appendChild(logoutBtn);
    }
  }

  // --- 4. Логика формы обратного звонка (callback-form) ---
  // Работает на любой странице, где есть эта форма (например, в index.html)
  const callbackForm = document.getElementById('callback-form');
  const callbackMessage = document.getElementById('callback-message');

  if (callbackForm) {
    callbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('cb-name').value.trim();
      const phone = document.getElementById('cb-phone').value.trim();

      if (!name || !phone) {
        alert('Пожалуйста, заполните имя и номер телефона.');
        return;
      }
      
      if (callbackMessage) {
        callbackMessage.style.display = 'block';
        callbackMessage.style.color = '#2e7d32';
        callbackMessage.style.marginTop = '15px';
        callbackMessage.style.fontWeight = 'bold';
        callbackMessage.textContent = `Спасибо, ${name}! Менеджер перезвонит вам на номер ${phone} в течение 15 минут.`;
        
        // Очищаем форму после отправки
        callbackForm.reset();
      }
    });
  }
});
