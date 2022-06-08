import {REST} from '@discordjs/rest';
import {RESTPostAPIApplicationCommandsJSONBody, Routes} from 'discord-api-types/v9';
import fs from 'node:fs';
import path from 'node:path';
import Command from "../src/interfaces/command.interface";

require('dotenv').config();

const commandsPath = path.join(__dirname, '../src/commands');
const commands: Array<RESTPostAPIApplicationCommandsJSONBody> = [];
const files = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

files.forEach(file => {
    const filePath = path.join(commandsPath, file);
    const command = (require(filePath).default) as Command;
    commands.push(command.data.toJSON());
});

const rest = new REST({version: '9'}).setToken(process.env.DISCORD_TOKEN as string);

const clientId: string | undefined = process.env.DISCORD_CLIENT_ID;
const guildId: string | undefined = process.env.DISCORD_GUILD_ID;

let result: Promise<unknown>;
let message = '';

if (process.env.ENVIRONMENT === 'prod') {
    result = rest.put(Routes.applicationCommands(clientId as string), {body: commands});
    message = 'Successfully registered application commands globally';
} else {
    result = rest.put(Routes.applicationGuildCommands(clientId as string, guildId as string), {body: commands});
    message = `Successfully registered application commands in guild ${guildId}`;
}

result
    .then(() => console.log(message))
    .catch(console.error);
