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
class OnReady {
  constructor() {
    this.aEventName = "ready";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    await this.mOnReady(pDiscordBot);
  }

  async mOnReady(pDiscordBot) {
    pDiscordBot.aClient.user.setStatus("online");
    pDiscordBot.aClient.user.setActivity("write it's source code ...", {
      type: 1
    });

    console.log(`${pDiscordBot.aClient.user.tag} - I'm online ...`);

    console.log(
      `${
        pDiscordBot.aClient.guilds.cache.first().members.cache.size
      } users, in ${
        pDiscordBot.aClient.guilds.cache.first().channels.cache.size
      } channels of ${pDiscordBot.aClient.guilds.cache.size} guilds.`
    );    
  }
}

module.exports = new OnReady();
