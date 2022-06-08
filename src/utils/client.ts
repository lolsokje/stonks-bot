import { Client, ClientOptions, Collection, Intents } from "discord.js";
import Command from "../interfaces/command.interface";
import path from 'node:path';
import fs from 'node:fs';

class StonksClient extends Client {
	commands: Collection<unknown, unknown>;

	constructor(options: ClientOptions) {
		super(options);
		this.commands = new Collection();
	}

	initialiseCommands(commandsPath: string) {
		const files = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

		files.forEach(file => {
			const filePath = path.join(commandsPath, file);
			const command = (require(filePath).default) as Command;
			this.commands.set(command.data.name, command);
		});
	}
}

export const client = new StonksClient({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
