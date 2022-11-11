## Pet-project: Lite Bank System

### Используемые технологии:
* NPM
* WebPack 5
* Vanilla JS
* SASS

### Тестирование:
* prettier
* jest

### Качество кода:
* eslint
* editorconfig

### Дополнительные расширения:
* yamaps api
* Chart.js


### Запуск проекта:
Для того, чтобы запустить проект на локальном или виртуальном хосте, требуется:
1. Клонировать репозиторий из GitHub в нужную папку.
2. В папке открыть консоль (GitBash) и ввести команду ` npm i ` - тем самым установятся все необходимые расширения.
3. После установки всех необходимых расширений выполняем команду ` npm build ` - тем самым собираем наш проект в Production режиме.
4. После установки всех требуемых расширений и сборки проекта, через командную строку запускаем локальный сервер ` npm start `.
5. Зайти на локальный/виртуальный сервер и перейти в папку /dist.
6. Для авторизации доступны следующие учетные данные:
	* Логин: `developer`
	* Пароль: `skillbox`

Бэкенд генерирует на одном из пользователей искуственные переводы, что позволяет отследить корректность рендера таблиц переводов а так же генерацию таблиц статистики.

**Обратите внимание:** Локальным веб сервером по умолчанию слушается 3000 порт.
