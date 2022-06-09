import Command from "../interfaces/command.interface";
import {SlashCommandBuilder} from "@discordjs/builders";
import {BaseCommandInteraction} from "discord.js";
import User from "../models/user";

class Join implements Command {
    data: SlashCommandBuilder;
    requiredPermissions: Array<bigint>;

    constructor() {
        this.data = new SlashCommandBuilder()
            .setName('join')
            .setDescription('Creates a StonksBot account');

        this.requiredPermissions = [];
    }

    async execute(interaction: BaseCommandInteraction) {
        const member = interaction.member;

        const user = await User.findOne({where: {discord_id: member.user.id}});

        if (!user) {
            await User.create({username: member.user.username, discord_id: member.user.id})
            await interaction.reply({content: 'User created'});
        } else {
            await interaction.reply({content: 'User already exists'});
        }
    }
}

export default new Join;
