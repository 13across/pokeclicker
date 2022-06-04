import {
    Observable as KnockoutObservable,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';
import * as GameConstants from '../GameConstants';
import Notifier from '../notifications/Notifier';
import Rand from '../utilities/Rand';

export default class Profile implements Saveable {
    public static MAX_TRAINER = 119;
    public static MAX_BACKGROUND = 40;

    saveKey = 'profile';

    defaults: Record<string, any> = {};

    public name: KnockoutObservable<string>;
    public trainer: KnockoutObservable<number>;
    public pokemon: KnockoutObservable<number>;
    public pokemonShiny: KnockoutObservable<boolean>;
    public shinySelected: KnockoutObservable<boolean>;
    public background: KnockoutObservable<number>;
    public textColor: KnockoutObservable<string>;

    constructor(
        name = 'Trainer',
        trainer = Rand.floor(Profile.MAX_TRAINER),
        pokemon = 0,
        background = Rand.floor(Profile.MAX_BACKGROUND),
        textColor = '#f5f5f5',
    ) {
        this.name = ko.observable(name);
        this.trainer = ko.observable(trainer).extend({ numeric: 0 });
        this.pokemon = ko.observable(pokemon).extend({ numeric: 2 });
        this.pokemonShiny = ko.observable(false).extend({ boolean: null });
        this.shinySelected = ko.observable(false).extend({ boolean: null });
        this.background = ko.observable(background).extend({ numeric: 0 });
        this.textColor = ko.observable(textColor);
    }

    static getTrainerCard(
        name = 'Trainer',
        trainer = Rand.floor(Profile.MAX_TRAINER),
        pokemon = Rand.intBetween(1, 151),
        pokemonShiny = false,
        background = Rand.floor(Profile.MAX_BACKGROUND),
        textColor = 'whitesmoke',
        badges = 0,
        pokedex = 0,
        seconds = 0,
        version = '0.0.0',
        challenges = {},
        key?: string,
    ): Element {
        const template: HTMLTemplateElement = document.querySelector('#trainerCardTemplate');
        const node: DocumentFragment = template.content.cloneNode(true) as DocumentFragment;

        // Our container
        const container: HTMLElement = node.querySelector('.trainer-card-container');
        container.dataset.key = key;

        // Our trainer card
        const card: HTMLElement = node.querySelector('.trainer-card');
        card.classList.add(`trainer-bg-${background}`);
        card.style.color = textColor;
        card.dataset.key = key;
        card.addEventListener('click', () => {
            // If no key provided, this is a preview
            if (key === undefined) {
                if (pokemon === 169) {
                    Notifier.notify({ message: '<img src="assets/images/based-department.jpg"> ' });
                } else {
                    Notifier.notify({ message: 'What a lovely profile!' });
                }
                return;
            }
            document.querySelector('#saveSelector').remove();
            Save.key = key;
            App.start();
        });
        const trainerImage: HTMLImageElement = node.querySelector('.trainer-image');
        trainerImage.src = `assets/images/profile/trainer-${trainer}.png`;
        const trainerName: HTMLElement = node.querySelector('.trainer-name');
        trainerName.innerText = name;
        const table: HTMLElement = node.querySelector('.table');
        table.style.color = textColor;
        const trainerBadges: HTMLElement = node.querySelector('.trainer-badges');
        trainerBadges.innerText = `${badges}`;
        const trainerPokedex: HTMLElement = node.querySelector('.trainer-pokedex');
        trainerPokedex.innerText = `${pokedex}`;
        const trainerTime: HTMLElement = node.querySelector('.trainer-time');
        trainerTime.innerText = GameConstants.formatTimeFullLetters(seconds);
        const trainerPokemonImage: HTMLImageElement = node.querySelector('.trainer-pokemon-image');
        trainerPokemonImage.src = `assets/images/${pokemonShiny ? 'shiny' : ''}pokemon/${pokemon}.png`;
        const trainerVersion: HTMLElement = node.querySelector('.trainer-version');
        trainerVersion.innerText = `v${version}`;
        const badgeContainer = node.querySelector('.challenge-badges');
        Object.entries(challenges)
            .filter(([, v]) => v)
            .forEach(([c]) => {
                const img: HTMLImageElement = document.createElement('img');
                img.onerror = () => img.remove();
                img.className = 'm-1';
                img.width = 24;
                img.src = `assets/images/challenges/${c}.png`;
                img.title = GameConstants.camelCaseToString(c);
                img.dataset.toggle = 'tooltip';
                img.dataset.placement = 'top';
                badgeContainer.appendChild(img);
            });
        return container;
    }

    initialize() {
        // Load trainer card preview
        this.name.subscribe(() => this.updatePreview());
        this.trainer.subscribe((val) => {
            this.updatePreview();
            // Update trainer image in css
            document.documentElement.style.setProperty('--trainer-image', `url('../assets/images/profile/trainer-${val}.png')`);
        });
        this.pokemon.subscribe((value: number) => {
            // const shiny = App.game.party.alreadyCaughtPokemon(value, true);
            App.game.party.alreadyCaughtPokemon(value, false);
            // Update preview after checking for shiny
            this.pokemonShiny(false);
            this.shinySelected(false);
            this.updatePreview();
        });
        this.shinySelected.subscribe((isShiny: boolean) => {
            let shiny = false;
            if (isShiny) {
                shiny = App.game.party.alreadyCaughtPokemon(this.pokemon(), true);
            }
            this.pokemonShiny(shiny);
            this.updatePreview();
        });
        this.background.subscribe(() => this.updatePreview());
        this.textColor.subscribe(() => this.updatePreview());
        this.updatePreview();
    }

    updatePreview(): void {
        document.getElementById('profile-trainer-card').innerHTML = '';
        document.getElementById('profile-trainer-card').appendChild(Profile.getTrainerCard(
            this.name(),
            this.trainer(),
            this.pokemon(),
            this.pokemonShiny(),
            this.background(),
            this.textColor(),
            App.game.badgeCase.badgeList.filter((b: () => boolean) => b()).length,
            App.game.party.caughtPokemon.length,
            App.game.statistics.secondsPlayed(),
            App.game.update.version,
            App.game.challenges.toJSON().list,
        ));
    }

    fromJSON(json): void {
        if (!json || !json.name) {
            return;
        }

        if (json.name) this.name(decodeURI(json.name));
        if (json.trainer !== undefined) this.trainer(json.trainer);
        if (json.pokemon !== undefined) this.pokemon(json.pokemon);
        if (json.pokemonShiny !== undefined) this.pokemonShiny(json.pokemonShiny);
        if (json.shinySelected !== undefined) this.shinySelected(json.shinySelected);
        if (json.background !== undefined) this.background(json.background);
        if (json.textColor) this.textColor(json.textColor);
    }

    toJSON(): Record<string, any> {
        return {
            name: encodeURI(this.name()),
            trainer: this.trainer(),
            pokemon: this.pokemon(),
            pokemonShiny: this.pokemonShiny(),
            shinySelected: this.shinySelected(),
            background: this.background(),
            textColor: this.textColor(),
        };
    }
}
