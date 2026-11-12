# M2A1: Anatomy of a Page

**Kind:** demo, built live in the lab. Follow along, type the markup yourself, and push before you leave. Searching, AI and helping each other are all allowed.

In this demo you build a complete page from an empty file, with a proper head, a semantic body and a linked style sheet.

## Before you start

Start the activity with the shared-lab launcher, exactly as in M1A0: follow the [setup guide](SETUP.md) to download and run `start-activity.sh` in Mac Terminal or Windows Git Bash, then clone your private repository `m2a1-CLASSCODE-USERNAME` in VS Code. Check the branch, remote and author before you start. Then install the test tools once:

```sh
npm ci
```

## What you build with the instructor

A notice page for a student club in `src/index.html`:

- the HTML5 skeleton with `lang="en"`, UTF-8, the viewport meta element and the title **Club Notice**;
- a meta description;
- `header` with the club name as the one `h1`, `main` with two `section` elements, each with an `h2`, and a `footer`;
- a comment before each part saying what it is;
- a link to `src/style.css`, which stays empty this week.

See `content/m2-html-document/LAB.md` for the syntax.

## How it is graded

5 test points. The tests check the skeleton, the head, the semantic elements and the style sheet link.

Every activity also checks `student.json`: fill in your full name, student number, school email, class code **2006**, GitHub username, `room` and `pcNumber`, all as text.

## Check and save your work

Open your page in the browser and look at it in the developer tools' device toolbar at phone size. Then run the checks:

```sh
npm test
```

The tests in your repository are a guide. The instructor grades from the course's own copy of the tests, so do not edit the tests to make them pass. In VS Code, open **Source Control**, commit your files with a short message, choose **Push**, and check that the commit appears on GitHub.

## Submit the exact commit link in Canvas

Open your repository's commit history on GitHub, open the commit with your finished work, copy its full URL (it contains **/commit/**), and submit it in the Canvas assignment for M2A1 using the Website URL option. Submit the commit page, not the repository home page or a screenshot.
