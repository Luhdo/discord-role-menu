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
  console.log(`š¢ ${_client.user.tag} is online.`);

  const guild = _client.guilds.cache.get("1051072893720727552");
  const channel = guild.channels.cache.get("1062427633100533851");
  channel.send({
    content: null,
    embeds: [
      {
        description:
          "ā āā ā <@&1064256590376611960>\n\nā āā ā <@&1064256913413521440>",
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
            emoji: "š",
            disabled: false,
            options: [
              {
                label: "ź°į“į“į“Źį“",
                value: "1064256590376611960",
                emoji: "šŗ",
              },
              {
                label: "į“į“Źį“",
                value: "1064256913413521440",
                emoji: "š¹",
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
          title: "Ų±ŁŁ ŁŲ§Ū ŁŁŲ±ŲÆ ŁŲøŲ± Ų§ŁŲŖŲ®Ų§ŲØ Ų“ŲÆ.",
          description: `Ų±ŁŁ(ŁŲ§Ū) Ų§ŁŲŖŲ®Ų§ŲØ Ų“ŲÆŁ: "${roles.join('" Ł "')}"`,
        },
      ],
      ephemeral: true,
    });
  } catch (_err) {}
});

client.login(process.env.TOKEN);
