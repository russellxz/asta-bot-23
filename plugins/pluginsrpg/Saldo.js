import fs from 'fs';
import path from 'path';

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;
  const numero = sender.replace(/[^0-9]/g, "");

  // 💰 Reacción inicial
  await conn.sendMessage(chatId, {
    react: { text: "💰", key: msg.key }
  });

  const blackcloverrpgPath = path.join(process.cwd(), "blackcloverrpg.json");

  let db = {};
  if (fs.existsSync(blackcloverrpgPath)) {
    db = JSON.parse(fs.readFileSync(blackcloverrpgPath));
  }

  const usuarios = db.usuarios || [];
  const user = usuarios.find(u => u.numero === numero);

  if (!user) {
    return conn.sendMessage(chatId, {
      text: "⚠️ No estás registrado en el RPG.\nUsa `.rpg nombre apellido edad fechaNacimiento` para comenzar tu aventura.",
      quoted: msg
    });
  }

  const caption = `💳 *TU SALDO EN EL RPG DE BLACK CLOVER BOT* 💳\n\n` +
                  `👤 *Bienvenido ${user.nombre} ${user.apellido}*\n\n` +
                  `💸 *Saldo actual:* ${user.creditos} créditos\n` +
                  `🏦 *Saldo guardado:* ${user.guardado} créditos\n\n` +
                  `🛠️ Usa comandos como:\n- *.dep o .depositar* para guardar tu saldo\n- *.retirar o .ret* para mover créditos guardados\n\n` +
                  `✨ ¡Sigue progresando en el mundo RPG de Black Clover Bot!`;

  await conn.sendMessage(chatId, {
    image: { url: "https://cdn.russellxz.click/43f6a610.jpg" },
    caption
  }, { quoted: msg });

  await conn.sendMessage(chatId, {
    react: { text: "✅", key: msg.key }
  });
};

handler.command = ["saldo", "bal"];
export default handler;
