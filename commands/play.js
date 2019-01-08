const Discord = require('discord.js');

module.exports = { name: 'command-name', async run(client, message, args) {

	const embed = new Discord.RichEmbed()
	.setAuthor(message.member.user.tag, message.author.avatarURL)
	.setTitle('StarLight: Adventure')
	.setColor('RANDOM')
	.setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
	.setTimestamp()
	.addField('Would you like to play?', 'React to answer!');

	let msg = await message.channel.send(embed);

	msg.react('👍').then(() => msg.react('👎'));

	const filter = (reaction, user) => {
		return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
	};

	msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
		.then(collected => {
			const reaction = collected.first();

			if(reaction.emoji.name === '👍') return message.channel.send('Great! I\'ll get everything ready for you!');
			else message.channel.send('Ok then...');

		})
		.catch(collected => {
			console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
			message.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
		});
}};