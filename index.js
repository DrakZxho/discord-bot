const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

client.on('ready', () => {
    console.log('The bot is ready');

    const guildId = '893987140621467648'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'Responde con pong.',
    })

    commands?.create({
        name: 'abrazo',
        description: 'Le das un abrazo a alguien.',
        options: [
            {
                name: 'usuario',
                description: 'usuario que recibe un abrazo',
                required: true,
                type: 6
            }
        ]
    })
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: true,
        })
    }

    if (commandName === 'abrazo') {
        const usuario1 = interaction.user
        const usuario2 = options.getUser('usuario')

        await interaction.deferReply({
            ephemeral:false
        })

        await new Promise(resolve => setTimeout(resolve, 2000))

        interaction.editReply({
            content: `${usuario1} le da un abrazo a ${usuario2} 🫂`,
            ephemeral: false,
        })
    }
})

client.on('messageCreate', message => {
    if (message.content === 'ping') {
        message.reply('pong')
    }
    if (message.content.includes('😔') || message.content.includes(':(')) {
        message.react('😔')
    }
    if (message.content.includes('🫂')) {
        message.react('🫂')
    }
})

client.login(process.env.TOKEN)