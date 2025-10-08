# Dragon

Dragon is a scale chart creation tool

## Why

I was trying to learn the blues scale with drop D tuning but couldn't find one online, thought it would be nice to have a flexible tool that can show you scales for your tuning or what the pattern for a custom scale would look like.

<small>This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.4.</small>

# Global TODO

- fretboard layout (guitars usually have 24 frets max)
  - blip layout
  - blip positioning/layout inside fretboard
  - add fretboard markers (dots)
- add more scales and make sure current ones are correct
  - add tuning options
  - add string options (6, 7, or 8 for guitar, maybe 4 or 5 for ukuleles)
- general layout
  - options dropdwns at the top horizontally
    - root note dropdown grid (when minimized shows note/letter)
    - scale dropdown
      - defaults list, custom checkbox at the top
        - when minimized shows scale name
        - if custom minimized text is "Custom"
          - when expanded shows interval multiselect grid
    - left or right handed option
    - color palette dropdown (v2, v1 will have dark mode defaults)
      - ui component selection bubbles at the top, color wheel with rgb at the bottom, user can click to select or enter manually
        - edit background, blip root, blip text root, string colors, fret colors, fretboard color, fretboard marker colors, etc.
  - fretboard below, reflects selected config

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
