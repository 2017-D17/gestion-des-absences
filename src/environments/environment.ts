// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // urlBackEndAbsences: 'http://localhost:8080/absences/',
  // urlBackEndAbsencesStatut: 'http://localhost:8080/absences?statut=',
  // urlBackEndJoursFeries: 'http://localhost:8080/jours_feries/',
  // urlBackEndLogin: 'http://localhost:8080/login'
  urlBackEndAbsences: 'https://gda-absences.herokuapp.com/absences/',
  urlBackEndAbsencesStatut: 'https://gda-absences.herokuapp.com/absences?statut=',
  urlBackEndJoursFeries: 'https://gda-absences.herokuapp.com/jours_feries/',
  urlBackEndLogin: 'https://gda-absences.herokuapp.com/login'
};
