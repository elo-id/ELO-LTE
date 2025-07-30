<template>
  <div>
    <div class="content">
      <h1>ELO LTE Docs</h1>
      <p>Welcome to ELO's Vue.js@2 Front-End Repository.</p>

      <h3>What is ELO LTE?</h3>
      <p>
        ELO LTE is a Front-End repository for ELO Digital Office Indonesia.
        Every code saved in this repository are written in Vue JS version 2.
        This repository was made by intern batch February 2025 - August 2025.
        You can use available Components to build user interfaces
      </p>

      <h3>System Requirements</h3>
      <p>
        Before you begin, make sure your system meets the following
        requirements:
      </p>
      <ul>
        <li>Node.js 18.18 or later.</li>
        <li>macOS, Windows (including WSL), or Linux.</li>
      </ul>

      <h3>Vue 2 Installation</h3>
      <p>
        NPM is the recommended installation method when building large scale
        applications with Vue. It pairs nicely with module bundlers such as
        Webpack or Browserify. Vue also provides accompanying tools for
        authoring Single File Components.
      </p>
      <pre><code class="language-bash">$ npm install vue@^2 #latest stable</code></pre>
      <p>If you have an issues, try to use this :</p>
      <pre><code class="language-bash">$ npx @vue/cli create project-name</code></pre>
      <p>Or, you can clone a dashboard template from this repository:</p>
      <pre><code class="language-bash">git clone https://github.com/elo-id/dashboard-template.git</code></pre>
      <pre><code class="language-bash">npm install</code></pre>

      <h3>Run the Development Server</h3>
      <pre><code class="language-bash">npm run serve</code></pre>

      <h3>ELO NPX Installation</h3>
      <p>Don't forget tp turn on the NEXUS APPS</p>
      <pre><code class="language-bash">npm config set @elo:registry=http://localhost:8081/repository/npm-elo/</code></pre>
      <pre><code class="language-bash">npm install @elo/elo-cli</code></pre>
      <pre><code class="language-bash">npm install @elo/session</code></pre>

      <h3>ELO Setup</h3>
      <pre><code class="language-bash">npx elo setup</code></pre>
      <ul>
        <li>
          Url to the ELOwf instance, e.g.:
          <b>http://myServer:9090/wf-Repository/</b>
        </li>
        <li>The name of the index.html, e.g.: <b>index.html</b></li>
        <li>
          The relative path where the source files, like the index.html, are,
          e.g.: <b>src/</b>
        </li>
        <li>
          The relative path where the output files, like the index.html, will
          be, e.g.: <b>dist/</b>
        </li>
        <li>
          The app namespace, e.g.: <b>my.example.namespace</b> (you can't use
          '-' for separator, only use '.')
        </li>
        <li>The default language, e.g.: <b>en</b></li>
        <li>
          Url of the ix, e.g.: <b>http://myServer:9090/ix-Repository/ix</b>
        </li>
        <li>Username of an administrator for a ix login, e.g.: <b>admin</b></li>
        <li>
          According administrator password. This password will be stored
          encrypted<br />but the key is not secure and can be read from the
          current machines hard drive.<br />Only use test installations. E.g.:
          <b>elo</b>
        </li>
      </ul>

      <h3>ELO Init</h3>
      <pre><code class="language-bash">npx elo init</code></pre>
      <ul>
        <li>
          Are 'ELO Sordtype Icons' required for this project? E.g.: <b>n</b>
        </li>
        <li>Are 'Archive Icons' required for this project? E.g.: <b>n</b></li>
        <li>
          The relative path where the index.html file is located, e.g.:
          <b>public/</b>
        </li>
        <li>The app id, e.g.: <b>exampleId</b></li>
        <li>The build number of the app, e.g.: <b>0</b></li>
        <li>Enable, to use elo session, e.g.: <b>y</b></li>
        <li>
          Dev URL of the app, which the login site of the ELOwf will redirect
          after<br />successful login. Necessary if ELO session is enabled,
          e.g.:<br /><b>http://localhost:4200/</b>
        </li>
        <li>
          Does the app needs an admin login during development (in some
          environments<br />the Login App does not work and the app does not
          support a relative path<br />during development). E.g.: <b>y</b>
        </li>
      </ul>
      <p class="mb-0">
        Once elo init is complete, we must modify a few files for our app to
        work properly.<br />The following code has not yet been integrated into
        elo init, therefore we must add it by hand.
      </p>
      <div class="doc-canvas" v-if="mainJs && vueConfig">
        <pre><code class="language-js" v-html="highlightedMain"></code></pre>
        <pre><code class="language-js" v-html="highlightedVueConfig"></code></pre>
      </div>

      <h3 class="mt-0">Build to Development Server</h3>
      <pre><code class="language-bash">npm run build && npx elo build && npx elo deploy</code></pre>

      <h3 class="mb-0">Library Version & Installation Guide</h3>
      <div class="doc-canvas" v-if="libraryVersion">
        <pre><code class="language-bash" v-html="highlightedLibraryVersion"></code></pre>
      </div>

      <h3 class="mt-0">VueJS @2 File Structure & Extract Tutorial</h3>
      <img
        :src="fileStructureImage"
        alt="VueJS File Structure"
        class="full-width-image"
      />

      <h3 class="mb-0">Possible Error (Static Dummy Data doesn't loaded)</h3>
      <p class="mt-0">
        If you have an issues where your data not loaded when build you
        application into ELO-wf, try to add baseURL on your fetch method. See
        the example below :
      </p>
      <pre><code class="language-bash" v-html="highlightedBaseURL"></code></pre>
    </div>
    <footer class="site-footer">
      &copy; 2025 ELO Digital Office Indonesia. All rights reserved.
    </footer>
  </div>
</template>

<script>
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import fileStructureImage from "@/assets/file-structure.png";

export default {
  data() {
    return {
      mainJs: "",
      vueConfig: "",
      libraryVersion: "",
      baseURL: "",
      fileStructureImage,
    };
  },
  computed: {
    highlightedMain() {
      return Prism.highlight(this.mainJs, Prism.languages.js, "js");
    },
    highlightedVueConfig() {
      return Prism.highlight(this.vueConfig, Prism.languages.js, "js");
    },
    highlightedLibraryVersion() {
      return Prism.highlight(this.libraryVersion, Prism.languages.js, "js");
    },
    highlightedBaseURL() {
      return Prism.highlight(this.baseURL, Prism.languages.js, "js");
    },
  },
  async mounted() {
    const baseURL =
      window.location.origin +
      "/ix-Contelo/plugin/de.elo.ix.plugin.proxy/wf/apps/app/elo.lte/snippets";

    Promise.all([
      fetch(`${baseURL}/mainjs.txt`).then((res) => res.text()),
      fetch(`${baseURL}/vueconfigjs.txt`).then((res) => res.text()),
      fetch(`${baseURL}/libraryversion.txt`).then((res) => res.text()),
      fetch(`${baseURL}/base_url.txt`).then((res) => res.text()),
    ])
      .then(([main, vue, libraryVersion, baseURL]) => {
        this.mainJs = main;
        this.vueConfig = vue;
        this.libraryVersion = libraryVersion;
        this.baseURL = baseURL;

        this.$nextTick(() => {
          Prism.highlightAll();
        });
      })
      .catch((error) => {
        console.error("Error loading snippets:", error);
      });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");

.content {
  text-align: justify;
  width: calc(100vw - 40px);
  margin: 20px;
  font-family: "Fira Code", monospace;
  color: var(--text);
}

h1,
h3 {
  color: var(--text);
  margin-bottom: 0;
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.doc-canvas {
  width: calc(100vw - 40px);
  margin: 0 auto;
  font-family: "Fira Code", monospace;
  color: #c9d1d9;
  border-radius: 0.5rem;
  box-shadow: none;
  box-sizing: border-box;
  overflow-x: auto;
}

pre[class*="language-"] {
  background: #343434;
  padding: 1rem;
  border-radius: 0.4rem;
  overflow-x: auto;
  margin: 1rem 0;
  font-size: 0.9rem;
}

code[class*="language-"] {
  font-family: "Fira Code", monospace;
  white-space: pre;
  color: #c9d1d9;
  display: block;
}

.site-footer {
  background-color: #0d1117;
  color: #c9d1d9;
  text-align: center;
  padding: 1rem;
  font-size: 0.875rem;
}

.full-width-image {
  width: 100%;
  border-radius: 0.5rem;
  margin-top: 10px;
}

.mt-0 {
  margin-top: 0;
}

.mb-0 {
  margin-bottom: 0;
}

.mb-20 {
  margin-bottom: 20px;
}
</style>
