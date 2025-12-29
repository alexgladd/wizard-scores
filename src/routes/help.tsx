import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/help")({
  component: Help,
});

function Help() {
  return (
    <main className="p-4 grow overflow-y-auto">
      <section className="mb-10">
        <h1 className="text-xl font-bold tracking-wide text-center mb-4">
          Help
        </h1>
        <h2 className="mb-4 text-lg font-bold tracking-wide">
          Navigating the app
        </h2>
        <p>
          Click or tap on the Wizard card back logo in the top left to go back
          to the home page.
        </p>
        <p>
          The app uses URL-based routing and browser history to navigate between
          pages. You can use a combination of the browser's back button and the
          app's navigation buttons at the bottom of the screen to navigate
          through the rounds in a game.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          vulputate augue et enim egestas, ac facilisis dolor vehicula.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Pellentesque ac iaculis erat. In euismod
          efficitur nunc, non cursus erat cursus non.
        </p>
      </section>
    </main>
  );
}
