import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction } from "discord.js";

interface Command {
	data: SlashCommandBuilder;

	requiredPermissions: Array<bigint>;

	execute(interaction: BaseCommandInteraction): void;
}

export default Command;
