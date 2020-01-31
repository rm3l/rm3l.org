<!-- <div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/bchiang7/v4/master/src/images/logo.png" width="100" />
</div> -->
<h1 align="center">
  rm3l.org
</h1>
<p align="center">
  The static website behind <a href="https://rm3l.org" target="_blank">rm3l.org</a>,
  hosted with <a href="https://www.netlify.com/" target="_blank">Netlify</a>, built with <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a>, and leveraging a headless <a href="https://ghost.org/" target="_blank">Ghost</a> CMS running in a <a href="https://kubernetes.io/" target="_blank">Kubernetes</a> cluster
</p>
<p align="center">
  <span>
    <a href="https://circleci.com/gh/rm3l/rm3l.org" target="_blank">
        <img src="https://circleci.com/gh/rm3l/rm3l.org.svg?style=svg&circle-token=27e77b8fe75dbc64897ec72ba5d260629aed57c6" alt="Netlify Status" />
    </a>
    &nbsp;
    <a href="https://app.netlify.com/sites/rm3l-org/deploys" target="_blank">
        <img src="https://api.netlify.com/api/v1/badges/da8ff8df-c248-4af5-bd6b-21bb60b4c0bb/deploy-status" alt="Netlify Status" />
    </a>
    &nbsp;
    <a href="https://dependabot.com" target="_blank">
        <img src="https://api.dependabot.com/badges/status?host=github&repo=rm3l/rm3l.org&identifier=226579562" alt="Dependabot Status" />
    </a>
  </span>
</p>

![demo](https://raw.githubusercontent.com/rm3l/rm3l.org/master/src/images/home_screenshot.png)

## 🛠 Tech Stack

* Backend
  * [Ghost](https://ghost.org/) provides the headless Content Management System (CMS). It runs in my own self-hosted [Kubernetes](https://kubernetes.io/) cluster.
* Frontend
  * [Gatsby](https://www.gatsbyjs.org/) pulls data from the Ghost blog [GraphQL](https://graphql.org/) API, and builds this static site. Initial version has been created using the [gatsby-starter-ghost](https://www.gatsbyjs.org/starters/TryGhost/gatsby-starter-ghost/) starter, then customized to include additional pages such as a Portfolio.
* End-to-end tests with [Cypress](https://www.cypress.io/)
* Continuously tested (CI) on [CircleCI](https://circleci.com/gh/rm3l/rm3l.org)
* Continuously deployed (CD) on [Netlify](https://www.netlify.com/), with support for Deploy previews of Pull Requests
* [Dependabot](https://dependabot.com) to keep dependencies secure and up-to-date


## 🛠 Installation & Set Up

1. Install the Gatsby CLI

   ```sh
   npm install -g gatsby-cli
   ```

2. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm)

   ```sh
   nvm install
   ```

3. Install dependencies

   ```sh
   yarn
   ```

4. Start the development server

   ```sh
   gatsby develop
   ```

Gatsby `develop` uses the `development` config in `.ghost.json`.

## 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
    # Run a production build, locally
    gatsby build
   ```

2. Preview the site as it will appear once deployed

   ```sh
   # Serve a production build, locally
   gatsby serve
   ```

Gatsby `build` uses the `production` config in `.ghost.json`.

## 🚨 Testing

This repository contains few Cypress end-to-end tests that not only make sure the website renders as expected,
but also test accessibility (also known as [a11y](https://a11yproject.com/)).
To do so, the `test` commands spin up the Gatsby development server and run all the Cypress test specs against the former.
You can run the tests using the following command:

   ```sh
    # Runs the tests right away, with no user interaction
    yarn test
   ```

or :

   ```sh
    # Interactive test launcher: opens up a Cypress browser for interactively running the tests
    yarn test:open
   ```

## Deploying with Netlify

This contains 3 config files specifically for deploying with Netlify. A `netlify.toml` file for build settings, a `/static/_headers` file with default security headers set for all routes, and `/static/_redirects` to set Netlify custom domain redirects.

To deploy to your Netlify account, hit the button below.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/rm3l/rm3l.org)

You need however to leverage your own Ghost Content API Keys which allow Gatsby to communicate with your Ghost headless blog.
For this, I currently set [Netlify ENV variables](https://www.netlify.com/docs/continuous-deployment/#build-environment-variables) for production builds instead.

Once deployed, I also set up a [Ghost + Netlify Integration](https://docs.ghost.org/integrations/netlify/) to use deploy hooks from Ghost to trigger Netlify rebuilds. That way, any time data changes (e.g., new post published) in the headless Ghost CMS, my website will rebuild on Netlify.

## Developed by

* Armel Soro
  * [keybase.io/rm3l](https://keybase.io/rm3l)
  * [rm3l.org](https://rm3l.org) - &lt;armel@rm3l.org&gt; - [@rm3l](https://twitter.com/rm3l)
  * [paypal.me/rm3l](https://paypal.me/rm3l)
  * [coinbase.com/rm3l](https://www.coinbase.com/rm3l)

## License

    The MIT License (MIT)

    Copyright (c) 2020 Armel Soro

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
