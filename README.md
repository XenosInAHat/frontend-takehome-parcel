# Teachable frontend takehome

## Notes on submission

### Discussion of approach
There's probably a more efficient way to tackle event handlers for nested components, but my current approach works
well enough for the purposes of this project.

I decided to use tabs to separate search results from the list of saved Gems. This looks clean but requires the user to navigate to the tab to view their saved Gems, rather than just viewing some sort of div on page load.

I also decided to forgo adding paging support for search results. This seems fine since the query results appear to be limited to 20-30 results.

It could also be worth separating the 'Saved' gems tab contents out into its own component to accommodate new features to that tab, but for the sake of this project it helped keep things DRY to just reuse the Results component.

### Areas for further improvement
While this submission handles edge cases and tackles the given problem, there are some things I'd improve given more
time:

* Add unit tests
* Add linting to help reinforce consistent styling
* Add a loading indicator during search. Request times were short enough on my computer to not really be noticeable,
but this could become an issue at some point.
* Add alerts to notify the user if something goes wrong. Currently, I'm logging errors to the console, but that doesn't
help the user's situtation when the UI doesn't seem to respond.
* Break the styling up into component-level files. This didn't seem necessary for this project since there are so few
CSS rules defined.
* Improve the 'empty'/'no results' messages. The current messages are servicable but don't look that great.

---

If you're reading this, you're likely a candidate for a frontend job at Teachable. You're going to be building a search application that takes a user's search query, hits the [Ruby Gems](https://rubygems.org/) search API endpoint, and displays the results in a list view with some added functionality (detailed below).

The application, once completed, should meet the following criteria:

1. It have a search box that lets users search for Ruby Gems.
2. It should display the results of the search in a list.
3. Each Gem should have a button that lets users "save" and "unsave" Gems.
4. It should have a way to view saved Gems, even after the browser window is refreshed (localStorage is a fine for this).

Here's a few things we'll look for in our evaluation.

1. Clean, well-organized code.
2. Sensisble architecture choices that could scale well.
3. A clean, functioning UI.
4. Bonus points if you write tests.

## Getting started

### Step 1: Fork this repo and clone it

### Step 2: Install dependencies

We have a few dependencies necessary to run the build and proxy server, the rest are up to you.

```bash
npm install
```

### Step 3: Start the development server

```bash
npm run dev
```

### Step 4: Start coding

We want to judge your ability to program UIs, not configure build tools. That's why we chose [Parcel](https://parceljs.org/) as a bundler, please consult the [documentation](https://parceljs.org/getting_started.html) if you run into any trouble.

We added a CSS file as an example, feel free to delete that.

### Step 5: Network requests

You may have noticed the server.js file at the root of this application, that's there to solve cross-origin issues when making network requests. The server automatically starts up when running "npm run dev" or "npm run start".

To see a sample request in action, run the following in your command line.

```bash
curl http://localhost:3000/api/v1/search.json?query=rails
```
