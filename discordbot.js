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
class DiscordBot {
  constructor() {
    this.aFS = require("fs");
    this.aDiscord = require("discord.js");
    this.aClient = new this.aDiscord.Client();
    this.aClient.commands = new this.aDiscord.Collection();
    const vCommandFiles = this.aFS
      .readdirSync("./commands")
      .filter(vFileFound => vFileFound.endsWith(".js"));
    for (const vFile of vCommandFiles) {
      const vCommand = require(`./commands/${vFile}`);
      this.aClient.commands.set(vCommand.mName(), vCommand);
    }
    this.aConfig = require("./config.json");
    this.aSQLite = require("better-sqlite3");
    this.aSQL = new this.aSQLite("./discordbot.sqlite");
    this.aMS = require("ms");
  } 
  mLogin() {
    this.aClient.login(process.env.TOKEN);
    this.aClient.clearImmediate();
    this.aClient.removeAllListeners();

    const vEventsFiles = this.aFS
      .readdirSync("./events")
      .filter(vFileFound => vFileFound.endsWith(".js"));
    for (const vFile of vEventsFiles) {
      const vEvent = require(`./events/${vFile}`);
      this.aClient.on(vEvent.mEventName(), (...args) => {
        vEvent.mExecute(this, ...args);
      });
    }
  }
  mDiscord() {
    return this.aDiscord();
  }
  mClient() {
    return this.aClient;
  }
  mConfig() {
    return this.aConfig;
  }
  mSQL() {
    return this.aSQL;
  }
}

module.exports = new DiscordBot();
