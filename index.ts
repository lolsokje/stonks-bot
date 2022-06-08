import {Permissions, Interaction} from "discord.js";
import {client} from './src/utils/client';
import path from 'node:path';
import Command from './src/interfaces/command.interface';

require('dotenv').config();

client.initialiseCommands(path.join(__dirname, 'src/commands'));

client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const command = client.commands.get(interaction.commandName) as Command;

    if (!command) {
        return;
    }

    const requiredPermissions = command.requiredPermissions;
    const memberPermissions = interaction.member?.permissions as Readonly<Permissions>;

    const hasRequiredPermissions = requiredPermissions.every((permission: bigint) => memberPermissions?.has(permission));

    if (!hasRequiredPermissions) {
        return await interaction.reply({
            content: 'You do not have the required permissions to run this command',
            ephemeral: true
        });
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error executing this command.', ephemeral: true});
    }
});

client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log('connected'));
