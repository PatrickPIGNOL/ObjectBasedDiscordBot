/*
    Object Based Discord Bot, a simple Object Based Discord Bot squeleton.
    Copyright ©️ 2020 Patrick PIGNOL <mailto:patrick.pignol@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
/* Available Permissions :
"ADMINISTRATOR", // (implicitly has all permissions, and bypasses all channel overwrites)
"CREATE_INSTANT_INVITE", // (create invitations to the guild)
"KICK_MEMBERS",
"BAN_MEMBERS",
"MANAGE_CHANNELS",// (edit and reorder channels)
"MANAGE_GUILD",// (edit the guild information, region, etc.)
"ADD_REACTIONS",// (add new reactions to messages)
"VIEW_AUDIT_LOG",
"PRIORITY_SPEAKER",
"STREAM",
"VIEW_CHANNEL",
"SEND_MESSAGES",
"SEND_TTS_MESSAGES",
"MANAGE_MESSAGES",// (delete messages and reactions)
"EMBED_LINKS",// (links posted will have a preview embedded)
"ATTACH_FILES",
"READ_MESSAGE_HISTORY",// (view messages that were posted prior to opening Discord)
"MENTION_EVERYONE",
"USE_EXTERNAL_EMOJIS",// (use emojis from different guilds)
"VIEW_GUILD_INSIGHTS",
"CONNECT",// (connect to a voice channel)
"SPEAK",// (speak in a voice channel)
"MUTE_MEMBERS",// (mute members across all voice channels)
"DEAFEN_MEMBERS",// (deafen members across all voice channels)
"MOVE_MEMBERS",// (move members between voice channels)
"USE_VAD",// (use voice activity detection)
"CHANGE_NICKNAME",
"MANAGE_NICKNAMES",// (change other members' nicknames)
"MANAGE_ROLES",
"MANAGE_WEBHOOKS",
"MANAGE_EMOJIS"
*/
class Command {
  constructor(
    pName,
    pAliases,
    pPermissions,
    pArgs,
    pMentions,
    pUsage,
    pDescription,
    pGuildOnly,
    pCooldown
  ) {
    this.aName = pName;
    this.aAliases = pAliases;
    this.aPermissions = pPermissions;
    this.aArgs = pArgs;
    this.aMentions = pMentions;
    this.aUsage = pUsage;
    this.aDescription = pDescription;
    this.aGuildOnly = pGuildOnly;
    this.aCooldown = pCooldown;
  }
  mName() {
    return this.aName;
  }
  mAliases() {
    return this.aAliases;
  }
  mPermissions() {
    return this.aPermissions;
  }
  mHavePermission(pDiscordBot, pMessage) {
    let vHavePermission = true;
    if (this.aPermission.length > 0) {
      vHavePermission = false;
      const vMemberAuthor = pMessage.member;
      if (vMemberAuthor) {
        this.aPermission.forEach(vPermissionFound => {
          if (vMemberAuthor.hasPermission(vPermissionFound)) {
            return true;
          }
        });
      } else {
        console.log("Erreur pas d'auteur pour le message");
        return false;
      }
    }
    return vHavePermission;
  }
  mArgs() {
    return this.aArgs;
  }
  mMentions() {
    return this.aMentions;
  }
  mUsage() {
    return this.aUsage;
  }
  mDescription() {
    return this.aDescription;
  }
  mGuildOnly() {
    return this.aGuildOnly();
  }
  mCooldown() {
    return this.aCooldown();
  }
  async mExecute(pDiscordBot, message, args) {
    if (!this.mHavePermission(pDiscordBot, message)) {
      console.log("Vous n'avez pas la permission d'executer cette commande.");        
      message.reply("Vous n'avez pas la permission d'executer cette commande.");
      message.delete();
      return;
    }
    if (this.aMentions > message.mentions.members.length) {      
      console.log(`Vous devez mentionner au moins ${this.aMentions} membre(s).`);
      message.reply(`Vous devez mentionner au moins ${this.aMentions} membre(s).`);
      message.delete();
      return;
    }
    if (this.aArgs > 0 && args.length < this.aArgs) {
      console.log(`Vous devez fournir au moins ${this.aArgs} paramètres !`);
      message.reply(`Vous devez fournir au moins ${this.aArgs} paramètres !`);
      message.delete();
      return;
    }
    if (this.aGuildOnly && message.channel.type !== "text") {
      console.log("Je ne peux pas executer cette commande dans un cannal privé !");
      message.reply("Je ne peux pas executer cette commande dans un cannal privé !");
      message.delete();
      return;
    }
  }
}

module.exports = Command;
