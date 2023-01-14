require("dotenv").config();
const { Client, IntentsBitField, ComponentType } = require("discord.js");

const Sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildPresences,
  ],
});

client.on("ready", (_client) => {
  console.log(`🟢 ${_client.user.tag} is online.`);

  const guild = _client.guilds.cache.get("1051072893720727552");
  const channel = guild.channels.cache.get("1062427635029913711");
  channel.send({
    content: null,
    embeds: [
      {
        description:
          "‐<:dark:1062872461705748510>╒ ➛ <@&1062508152228171787>\n\n‐<:coconut:1062872457880551505>╞ ➛ <@&1062508131399249951>\n\n‐<:ansel:1062872453749166211>╞ ➛ <@&1062823175064391771>\n\n‐<:purple:1062872432878297248>╞ ➛ <@&1062873509124112404>\n\n‐<:pink:1062872429036326982>╞ ➛ <@&1062873459459375275>\n\n‐<:sky:1062872442978181202>╞ ➛ <@&1062821348159783023>\n\n‐<:nasa:1062872487341338654>╞ ➛ <@&1062874591955013752>\n\n‐<:ocean:1062872493678927943>╞ ➛ <@&1062874292318126180>\n\n‐<:sexyice:1062872439182340148>╞ ➛ <@&1062874201431756881>\n\n‐<:diamond:1062872463857422436>╞ ➛ <@&1062874113439445032>\n\n‐<:lightgreen:1062872479208570952>╞ ➛ <@&1062821468095918090>\n\n‐<:emerald:1062872467116404847>╞ ➛ <@&1062874028672561182>\n\n‐<:lemon:1062872473504325742>╞ ➛ <@&1062508159559815241>\n\n‐<:spongebob:1062872445377335307>╞ ➛ <@&1062873834665021450>\n\n‐<:gold:1062872469695905822>╞ ➛ <@&1062873692327116830>\n\n‐<:nescafe:1062872489828565012>╞ ➛ <@&1062873755627556954>\n\n‐<:peach:1062872499345428652>╞ ➛ <@&1062873590963388437>\n\n‐<:marlboro:1062872483205754930>╞ ➛ <@&1062508136935739463>\n\n‐<:red:1062872435248091257>╞ ➛ <@&1062508145701834763>\n\n‐<:wantos:1062872449496121404>╞ ➛ <@&1062873356711514182>\n\n‐<:light:1062872477367287898>╘ ➛ <@&1062508124235386942>",
        color: null,
        image: {
          url: "https://cdn.discordapp.com/attachments/829814434255208518/1063555632709521548/logo1_348568692329.png",
        },
      },
    ],
    attachments: [],
    components: [
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.StringSelect,
            label: "select",
            customId: "select",
            emoji: "🚌",
            disabled: false,
            options: require("./test.json").map((opt) => {
              return {
                label: opt.name,
                value: opt.value,
                emoji: opt.emoji,
              };
            }),
          },
        ],
      },
    ],
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isAnySelectMenu() || interaction.customId !== "select")
    return;

  interaction.message.components.forEach((row) => {
    row.components.forEach((menu) => {
      menu.options.forEach(async (opt) => {
        if (
          interaction.member.roles.cache.has(opt.value) &&
          !interaction.values.includes(opt.value)
        )
          await interaction.member.roles.remove(opt.value);
      });
    });
  });

  await Sleep(650);
  if (interaction.values[0])
    await interaction.member.roles.add(interaction.values);

  try {
    let roles = interaction.values.map(
      (v) => interaction.guild.roles.cache.get(v).name
    );
    await interaction.reply({
      embeds: [
        {
          color: 0xf1f1f1,
          title: "رول های مورد نظر انتخاب شد.",
          description: `رول(های) انتخاب شده: "${roles.join('" و "')}"`,
        },
      ],
      ephemeral: true,
    });
  } catch (_err) {}
});

client.login(process.env.TOKEN);
