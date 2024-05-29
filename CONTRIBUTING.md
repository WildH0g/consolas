# Contributing

First off, thanks for taking the time to contribute! ❤️

When contributing to this repository, please first discuss the change you wish to make via issue. You may pick an existing issue if it hasn't been assigned yet, or suggest your own.

See also the [Code of Conduct](CODE_OF_CONDUCT.md)

## Creating Issues

Issues should be used to report problems with the library, request a new feature, or to discuss potential changes before a PR is created. When you create a new Issue, a template will be loaded that will guide you through collecting and providing the information we need to investigate.

Search for existing Issues and PRs before creating your own.

If you find an Issue that addresses the problem you're having, please add your own reproduction information to the existing issue rather than creating a new one. Adding a reaction can also help be indicating to our maintainers that a particular problem is affecting more than just the reporter.

## GitHub Flow

- Fork the repository to your own Github account
- Clone the project to your machine
- Create a branch locally with a succinct but descriptive name
- Commit changes to the branch
- Following any formatting and testing guidelines specific to this repo
- Push changes to your fork
- Open a PR in our repository and follow the PR template so that we can efficiently review the changes. 

## Check List

0. Make sure that code you merge is fully covered by unit tests, otherwise your pull request will not be merged. I strongly suggest using TDD.
1. Make sure to set up git hooks on your machine by running `npm run install:husky` be
2. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
3. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
4. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
5. Make sure your code is clean, readable, linted and prettified. 
6. Remember to add JSDoc comments. 
7. Every function must reside in its own file. 
8. As a general guideline, no function should be longer than 40 lines; shorter is better.

## Understanding the Project Architecture

You may want to read my [blog post series on Medium](https://medium.com/@dmitry-kostyuk/ever-felt-like-youre-bringing-a-knife-to-a-gunfight-a39042d9793d) for a deeper understanding of the project architecture.
