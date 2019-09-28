# AEB Rus Mobile APP

## React Native. iOS + Android.

### Development

Для развёртывания окружения локальной разработки следует выполнить следующие команды:

1. `git clone git@bitbucket.org:zavarkateam/aeb.git; cd aeb;`
2. `npm i; cd ios; pod update; pod install; cd ../;`

После выполнения шагов далее для запуска приложения на эмуляторе следует использовать команды:

- `npm run react;` - Рекомендуется выполнить в отдельном окне терминала для запуска JS-сборщика React.

### iOS
- `npm run iphone;` - для запуска приложения на эмуляторе iPhone 11
- `npm run iphonePro;` - для запуска приложения на эмуляторе iPhone 11 Pro
- `npm run iphoneProMax;` - для запуска приложения на эмуляторе iPhone 11 Pro Max

### Android
- `npm run android;` - для запуска приложения на эмуляторе Android