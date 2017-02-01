# Tech Forward
Sharing tech-focused organizations and tools working for social progress.

Built by @stauffermatt and @anildash

## To do
- [x] Figure out the timeouts; is there a rate limit on the Google Sheet? If so, can we cache it? (race condition, not timeout)
- [x] Hook up a github project for backups
- [x] How do we handle image uploads? (answer: require a URL for now)

### Must do for launch
- [ ] Set up Google Forms and properly lock down the spreadsheet
- [x] Redirect domain (in progress... dns propagating...)
- [x] Try to add these: http://up.stauffe.red/0a3X0n0X1F0Q and consider a separate phone section
- [x] Move all logos onto gomix cdn
- [x] Manually import all ProgCode projects
- [x] Manually import all DevProgress projects
- [x] Make a fallback logo
- [x] Fix the join links 👀

### Nice to have
- [x] Add OG & twitter card
- [x] Add favico
- [x] Slap some fonts and centering on that suggestion page
- [x] Import lots of logos
- [x] Bring over any files we need from Phantom
- [x] Determine whether we can survive without a build step; if not, move source files into the built CSS files here so we have the originals
- [ ] Tests
- [ ] Redirect old GitHub
- [ ] For all resources, track whether they're vetted (will they sell your phone number? Is it open source?)

### Content stuff
* [x] Show skills for tools
* [ ] Add some content or qualifiers for who should be in here
* [ ] Handle multi-location (e.g. Tech Solidarity)
* [ ] Get real intro content that is compelling
* [ ] Build a "what's best for me" tool



## Getting started
- `cp .env.example .env`
- Open `.env` in your editor. You may need to fill in some values for your dev. See comments in that file.
- `npm install`
- `npm start`
- `open http://localhost:3030`