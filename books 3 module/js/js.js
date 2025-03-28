document.addEventListener("DOMContentLoaded", () => {
    const books = document.querySelectorAll('.book1, .book2, .book3, .book4, .book5, .book6, .book7, .book8');
    const lockButton = document.getElementById('lockButton');
    const exitButton = document.querySelector('.exit');
    const popup = document.getElementById("popup");
    const closeBtn = document.querySelector(".close");
    const okBtn = document.getElementById("closePopup");
    let isLocked = false;

    // Размещение книг в случайном порядке
    books.forEach(book => {
        book.style.position = "absolute";
        const maxWidth = window.innerWidth - book.clientWidth;
        const maxHeight = window.innerHeight - book.clientHeight;
        book.style.left = `${Math.random() * maxWidth}px`;
        book.style.top = `${Math.random() * maxHeight}px`;

        let offsetX = 0, offsetY = 0, isDragging = false;

        // Перемещение книг перед фиксацией
        book.addEventListener('pointerdown', (e) => {
            if (isLocked) return;
            isDragging = true;
            offsetX = e.clientX - book.getBoundingClientRect().left;
            offsetY = e.clientY - book.getBoundingClientRect().top;
            book.style.cursor = "grabbing";
        });

        document.addEventListener('pointermove', (e) => {
            if (!isDragging || isLocked) return;
            book.style.left = `${Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - book.clientWidth))}px`;
            book.style.top = `${Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - book.clientHeight))}px`;
        });

        document.addEventListener('pointerup', () => {
            isDragging = false;
            book.style.cursor = "grab";
        });
    });

    // Кнопка фиксации
    lockButton.addEventListener('click', () => {
        if (isLocked) return;
        isLocked = true;

        books.forEach(book => {
            book.style.pointerEvents = "auto";
            book.style.cursor = "pointer";
        });

        // Добавляем класс "locked" для увеличения при наведении
        document.querySelector('.book2')?.classList.add('locked');
        document.querySelector('.book3')?.classList.add('locked');
        document.querySelector('.book5')?.classList.add('locked');
        document.querySelector('.book8')?.classList.add('locked');

        lockButton.disabled = true;
        lockButton.innerText = "Зафиксировано!";
    });

    // Всплывающее окно при загрузке страницы
    if (popup && closeBtn && okBtn) {
        popup.style.display = "flex";

        okBtn.addEventListener("click", () => {
            popup.style.display = "none";
        });

        closeBtn.addEventListener("click", () => {
            popup.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });
    }

    // Обработчики всплывающего окна 2
    const popup2 = document.getElementById("popup2");
    const openBtn2 = document.getElementById("openPopup2");
    const closeBtn2 = document.getElementById("closePopup2");

    if (popup2 && openBtn2 && closeBtn2) {
        openBtn2.addEventListener("click", () => {
            popup2.style.display = "flex";
        });

        closeBtn2.addEventListener("click", () => {
            popup2.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === popup2) {
                popup2.style.display = "none";
            }
        });
    }

    // Скрываем все секции, кроме главной (mainpage)
    document.querySelectorAll(".firstbook, .secondbook, .thirdbook, .fourbook").forEach(section => {
        section.style.display = "none";
    });

    // Обработчик клика на книги
    document.querySelectorAll(".book img[data-url]").forEach(book => {
        book.addEventListener("click", () => {
            const targetId = book.getAttribute("data-url");

            // Скрываем все секции
            document.querySelectorAll(".mainpage, .firstbook, .secondbook, .thirdbook, .fourbook").forEach(section => {
                section.style.display = "none";
            });

            // Показываем нужную секцию
            document.querySelector(`.${targetId}`).style.display = "flex";
        });
    });

    // Обработчик клика на кнопку выхода (возвращает на главную страницу)
    document.querySelectorAll(".exit").forEach(exitButton => {
        exitButton.addEventListener("click", () => {
            document.querySelectorAll(".firstbook, .secondbook, .thirdbook, .fourbook").forEach(section => {
                section.style.display = "none";
            });
            document.querySelector(".mainpage").style.display = "flex";
        });
    });
});
