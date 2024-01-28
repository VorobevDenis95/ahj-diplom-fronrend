[![Build status](https://ci.appveyor.com/api/projects/status/4154mtfu5q8r85i7?svg=true)](https://ci.appveyor.com/project/VorobevDenis95/ahj-diplom-fronrend)

 # Chaos Organaizer

## Ключевая идея
Приложение для хранения информации. Вы можете хранить информации, как в виде текста, ссылок, видео и аудио.
Также вы самостоятельно можете записывать свои аудио и видео сообщения.

## Основные функции 
 - сохранение в истории ссылок и текстовых сообщений;
![about app](./src//img//imageForReadme/main.png)
 - ссылки (http://) или (https://) кликабельны и отображаются как ссылки;
 ![links](./src/img/imageForReadme/links.png)
 - сохранение в истории изображений, аудио и видео (как файлов) - через Drag & Drop и через иконку загрузки;
 ![drag&drop](./src/img/imageForReadme/drag&drop.png)
 ![clip](./src//img/imageForReadme/addClip.png)
 - скачивание файлов на компьютер пользователя (при нажатии на файл в окне сообщений или в соответствующей категории бокового меню);
 ![download](./src/img/imageForReadme/download.png)
 - ленивая подгрузка сначала подгружаются последние 10 сообщений, при прокрутке вверх подгружаются следующие 10 и т.д;
 ![lazyload1](./src/img/imageForReadme/lazyload1.png)
 ![lazyload2](./src/img/imageForReadme/lazyload2.png)
  
## Дополнительные функции

- поиск по сообщениям (интерфейс + реализация на сервере);
![search](./src/img/imageForReadme/search.png)
- воспроизведение видео/аудио через API браузера;
![play](./src/img/imageForReadme/play.png)
- запись видео/аудио, используя API браузера;
![rec1](./src/img/imageForReadme/rec1.png)
![rec2](./src/img/imageForReadme/rec2.png)
- закрепление (pin) сообщений: закреплять можно только одно сообщение, оно прикрепляется к верхней части страницы:
![pin](./src/img/imageForReadme/pin.png)
- добавление сообщения в избранное, должен быть интерфейс для просмотра избранного;
![favorite](./src/img/imageForReadme/favorites.png)