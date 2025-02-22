import Changelog, { changelogType } from './Changelog';
import ChangelogUpdate from './ChangelogUpdate';

/**
 * Add your changes to the top of the changelog. Please do not increase the version number.
 *
 * MAJOR - Will stay at 0 during development, 1 after the first public release
 * MINOR - Will increment for each feature refactor or large changes to a feature
 * PATCH - Increment for small changes, bugfixes, UI changes.
 */
const ChangelogCrobatItems = [
    // note that month is 0 indexed, that's why -1
    new Changelog(changelogType.DEFAULT, '<div class="w-100 d-flex justify-content-around"><a href="https://github.com/Crobat4/pokeclicker" target="_blank">Repository</a><a href="https://github.com/Crobat4/Pokeclicker-desktop" target="_blank">Desktop build</a><a href="https://github.com/Crobat4/pokeclicker/wiki" target="_blank">Github Wiki</a></div>'),
    new Changelog(changelogType.DEFAULT, 'This will keep being updated as long as the thread is alive...'),
    // ⥂⥄
    new ChangelogUpdate('v0.2.4', new Date(2022, 6 - 1, 14)),
    new Changelog(changelogType.NEW, 'Added setting to increase the game width'),
    new Changelog(changelogType.NEW, 'Pokémon shows Rare Hold Item image in the Pokédex'),
    new Changelog(changelogType.NEW, 'Battle Frontier now shows highest stage cleared before enter'),
    new Changelog(changelogType.CHANGE, 'Discord codes are now generic codes (Check codes <a href="https://github.com/Crobat4/pokeclicker/wiki/Codes">here</a>)'),
    new Changelog(changelogType.CHANGE, 'Rotom (discord) changed to Rotom (Crobat)'),
    new Changelog(changelogType.CHANGE, 'Some Unown letters from Discord codes changed'),
    new Changelog(changelogType.CHANGE, 'Pokédex width increased'),
    new Changelog(changelogType.CHANGE, 'Pokémon seen but not caught are now darkened and greyed out in the Pokédex'),
    new Changelog(changelogType.CHANGE, 'Added ID number to Pokémon list in the Profile menu'),
    new Changelog(changelogType.CHANGE, 'Dock is now locked if you are inside a dungeon'),
    new Changelog(changelogType.CHANGE, 'Added Wimpod to the wild'),
    new Changelog(changelogType.FIXED, 'Pokémon list in Profile is now sorted by ID'),
    new Changelog(changelogType.FIXED, 'Shiny selection in Profile not working correctly'),
    new Changelog(changelogType.REMOVED, 'Removed flashing effect on highlighted locations (quests)'),
    new ChangelogUpdate('v0.2.3', new Date(2022, 6 - 1, 4)),
    new Changelog(changelogType.CHANGE, 'Changed sort icons: ⥂ to <i class="bi bi-sort-up"></i> (asc) and ⥄ to <i class="bi bi-sort-down"></i> (desc)'),
    new Changelog(changelogType.CHANGE, 'Pokémon in Profile Card can now be selected as either normal or shiny (if possible)'),
    new Changelog(changelogType.CHANGE, 'Locations highlighted due to active quest now blinks infinitely'),
    new Changelog(changelogType.CHANGE, 'Dock is now locked if you are inside the Battle Frontier'),
    new Changelog(changelogType.CHANGE, 'Some changes in the styles'),
    new Changelog(changelogType.CHANGE, 'Castform now changes its form depending on the current weather'),
    new Changelog(changelogType.CHANGE, 'Sliggoo now also evolves if the weather is Thunderstorm'),
    new Changelog(changelogType.CHANGE, 'Fomantis/Tyrunt/Yungoos now evolves only at day'),
    new Changelog(changelogType.CHANGE, 'Gligar/Sneasel/Amaura/Alolan Rattata now evolves only at night'),
    new Changelog(changelogType.CHANGE, 'Cubone now evolves into Alolan Marowak only in Alola at night'),
    new Changelog(changelogType.CHANGE, 'Cubone now evolves into Marowak only outside Alola'),
    new Changelog(changelogType.CHANGE, 'Charjabug now evolves in areas with special magnetic field from Sinnoh/Unova/Kalos'),
    // v0.2.2
    new ChangelogUpdate('v0.2.2', new Date(2022, 5 - 1, 26)),
    new Changelog(changelogType.NEW, 'Added Official update v0.9.4 and v0.9.5 (bug fixes)'),
    new Changelog(changelogType.CHANGE, 'Reverted update: Gen 3+ berries removal from dungeon chests'),
    // v0.2.1
    new ChangelogUpdate('v0.2.1', new Date(2022, 5 - 1, 25)),
    new Changelog(changelogType.FIXED, 'Height of dungeon tiles now works as intended in the desktop build'),
    // v0.2.0
    new ChangelogUpdate('v0.2.0', new Date(2022, 5 - 1, 24)),
    new Changelog(changelogType.NEW, 'Added changelog for this fork'),
    new Changelog(changelogType.NEW, 'Trainer ID added (Menu > Save > Generate Trainer ID)'),
    new Changelog(changelogType.CHANGE, 'Added some egg exclusives to the wild (<a href="https://github.com/Crobat4/pokeclicker/blob/master/eggExclusives.md">List</a>)'),
    new Changelog(changelogType.CHANGE, 'Height of dungeons tiles now changes dynamically'),
    new Changelog(changelogType.CHANGE, 'Locked bosses now show the unlock requirement in the tooltip'),
    new Changelog(changelogType.CHANGE, 'Enigma Berry: Discord not required anymore but it requires Trainer ID'),
    new Changelog(changelogType.CHANGE, '"Pokéball (by type)" menu is now collapsed by default'),
    new Changelog(changelogType.CHANGE, '"Uncaptured Shiny Pokémon" ball selection label changed from "✨" to "New✨"'),
    new Changelog(changelogType.CHANGE, 'Pikachu/Exeggcute now evolves into their alolan forms only in Alola'),
    new Changelog(changelogType.CHANGE, 'Pikachu/Exeggcute now evolves into their normal forms only outside Alola'),
    new Changelog(changelogType.REMOVED, 'Removed dungeon loot nerf on earlier regions'),

    // v0.1.0
    new ChangelogUpdate('v0.1.0', new Date(2022, 4 - 1, 28)),
    new Changelog(changelogType.NEW, 'Added "Dock" button to "Shortcuts" menu'),
    new Changelog(changelogType.NEW, 'Added Pokéball selection for each type'),
    new Changelog(changelogType.CHANGE, 'Oak\'s Items loadouts increased from 3 to 6'),
];

export default ChangelogCrobatItems;
