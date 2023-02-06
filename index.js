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
  const channel = guild.channels.cache.get("1062427633100533851");
  channel.send({
    content: null,
    embeds: [
      {
        description:
          "‐ ♀╒ ➛ <@&1064256590376611960>\n\n‐ ♂╘ ➛ <@&1064256913413521440>",
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
            options: [
              {
                label: "ꜰᴇᴍᴀʟᴇ",
                value: "1064256590376611960",
                emoji: "🚺",
              },
              {
                label: "ᴍᴀʟᴇ",
                value: "1064256913413521440",
                emoji: "🚹",
              },
            ],
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
