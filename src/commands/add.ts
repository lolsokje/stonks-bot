import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseCommandInteraction, Permissions } from 'discord.js';
import Command from '../interfaces/command.interface';

class Add implements Command {
	data: SlashCommandBuilder;
	requiredPermissions: Array<bigint>;

	constructor() {
		const command = new SlashCommandBuilder()
			.setName('add')
			.setDescription('Attaches a symbol to a channel')
			.addChannelOption(option => option.setName('channel')
				.setDescription('The channel you want to link to a symbol')
				.setRequired(true))
			.addStringOption(option => option.setName('channel_symbol')
				.setDescription('The channel symbol name')
				.setRequired(true))
			.addStringOption(option => option.setName('real_symbol')
				.setDescription('The real symbol you want to link to this channel')
				.setRequired(true));

		this.data = command as SlashCommandBuilder;
		this.requiredPermissions = [
			Permissions.FLAGS.MANAGE_GUILD,
		];
	}

	async execute(interaction: BaseCommandInteraction) {
		await interaction.reply({ content: 'Add command' });
	}
}

export default new Add;
