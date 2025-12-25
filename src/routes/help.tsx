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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          vulputate augue et enim egestas, ac facilisis dolor vehicula.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Pellentesque ac iaculis erat. In euismod
          efficitur nunc, non cursus erat cursus non.
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
