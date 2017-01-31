# Tech Forward
Sharing tech-focused organizations and tools working for social progress.

## To do
- [x] Figure out the timeouts; is there a rate limit on the Google Sheet? If so, can we cache it? (race condition, not timeout)
- [ ] Bring over any files we need from Phantom
- [ ] Determine whether we can survive without a build step; if not, move source files into the built CSS files here so we have the originals
- [ ] Tests
- [ ] Redirect domain
- [ ] Redirect old GitHub
- [ ] Hook up a github project for backups
- [ ] Set up Google Forms and properly lock down the spreadsheet
- [ ] How do we handle image uploads?

## Getting started

- `cp .env.example .env`
- Open `.env` in your editor. You may need to fill in some values for your dev. See comments in that file.
- `npm install`
- `npm start`
- `open http://localhost:3030`