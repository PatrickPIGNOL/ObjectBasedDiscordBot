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
class OnPresenceUpdate {
  constructor() {
    this.aEventName = "presenceUpdate";
  }
  
  mEventName() {
    return this.aEventName;
  }
  
  async mExecute(pDiscordBot, ...args) {
    const oldMember = args[0];
    const newMember = args[1];
    await this.mOnPresenceUpdate(pDiscordBot, oldMember, newMember);
  }
  
  async mOnPresenceUpdate(pDiscordBot, oldMember, newMember) {
    console.log(`member presence has been updated`);
  }
}

module.exports = new OnPresenceUpdate();
