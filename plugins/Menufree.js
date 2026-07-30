// plugins/Menufree.js — Menú Free Fire.
// El diseño, la imagen/video y el nombre salen de la personalización (setmenu).
import { enviarMenu } from "../disenos.js";

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const p = global.prefixes?.[0] || ".";

  try { await conn.sendMessage2(chatId, { react: { text: "📋", key: msg.key } }, msg); } catch {}

  return enviarMenu(conn, chatId, msg, "menufree", {
    titulo: "ARENA DE BATALLA",
    info: [
      ["Prefijo actual", p],
      ["Úsalo", "en cada comando"]
    ],
    secciones: [
      { titulo: "🍉 MAPAS", items: [`${p}mapas`] },
      { titulo: "📃 REGLAS", items: [`${p}reglas`, `${p}setreglas`] },
      {
        titulo: "🛡️ LISTA DE VERSUS",
        items: [
          `${p}4vs4`,
          `${p}6vs6`,
          `${p}12vs12`,
          `${p}16vs16`,
          `${p}20vs20`,
          `${p}24vs24`,
          `${p}guerr`
        ]
      }
    ],
    nota: "Escuadrones de batalla listos ⚔️☘️"
  });
};

handler.command = ['menufree'];
handler.help = ['menufree'];
handler.tags = ['menu'];
handler.register = true;

export default handler;
