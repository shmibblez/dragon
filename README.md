# Dragon

Dragon is a scale chart creation tool, [go to website](https://shmibblez.github.io/dragon/)

## Why

I was trying to learn the blues scale with drop D tuning but couldn't find a scale online, thought it would be nice to have a flexible tool that can show you scales for your tuning or what the pattern for a custom scale would look like.

<small>This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.4.</small>

# Global TODO

- change menu layout:
  -  make sheet that expands when option selected, add button somewhere to hide sheet (make inline)
  -  add animation to sheet expanding and shrinking, make border around prefs that houses option content
- custom menu options
  - tunings
    - menu with First String, Second String, etc headers
    - each sub heading has chips for all notes, one selected in each
  - custom scales
    - custom chip at top
      - when not selected & default selected: normal, show default tunings available
      - when selected:
        - default tunings not visible
        - replaced by list of interval chips
        - multiple chips can be selected or deselected
        - text box between top custom chip (separator below) and interval chips below
- options
  - sharp or flat
  - low string top or bottom
  - color palette dropdown (v2, v1 will have dark mode defaults)
    - ui component selection bubbles at the top, color wheel with rgb at the bottom, user can click to select or enter manually
    - edit background, blip root, blip text root, string colors, fret colors, fretboard color, fretboard marker colors, etc.
    - use sharp or flat notes selector
- scales
  - make sure current ones are correct (double check, they _should_ be ok)
  - add more scales, japanese scale, other cool scales, etc
- tuning
  - more 4 and 5 string tunings for bass
  - 
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
