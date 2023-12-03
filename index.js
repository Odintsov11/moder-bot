const TelegramApi = require('node-telegram-bot-api');
const  {gameOptions} = require('./options');

const token = '6578534246:AAH-RmxqS0Rr896qDmnbDlJzLU8F6yXOfsc';

const bot = new TelegramApi(token, {polling: true});

const chats = {}



const start = () => {
    bot.setMyCommands([
        {
            command: '/start', description: 'Начать'
        },
        {
            command: '/info', description: 'Правила использования'
        },
        {
            command: '/game', description: 'Начать игру'
        },
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if(text === '/start'){
            return bot.sendMessage(chatId, `👋🏻 Привет!\n\n📝 Чтобы опубликовать пост в нашем канале, нажмите «Опубликовать» и добавьте необходимую информацию в рамках одного сообщения.\n\n🖼️ Вы можете прикреплять изображение к вашей публикации в форматах .jpg или .png\n\n💰 На вкладке «Баланс» вы можете проверить количество доступных публикаций до конца дня. Всего доступно 3 публикации в день.\n\n🛑 Внимательно ознакомьтесь с правилами публикации перед отправкой.`);
        }
        if(text === '/info'){
            return bot.sendMessage(chatId, `Правила использования бота`)
        }
        if(text === '/game'){
            await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9 тебе нудно отгадать');
            const randomNumber = Math.floor(Math.random() * 10); 
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId, 'Отгадывай', gameOptions);
        }
        return bot.sendMessage(chatId, 'Вы не выбрали ни одной команды')
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if(data === chats[chatId]){
            return bot.sendMessage(chatId, `Поздравляю ты отгадал цифру ${data}`)
        } else {
            return bot.sendMessage(chatId, `К сожалению цифра ${data} не правильная`)
        }

        bot.sendMessage(chatId, `Ты выбрал цифру ${data}`)
    })
};

start()