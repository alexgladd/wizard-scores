import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal")({
  component: Legal,
});

function Legal() {
  return (
    <main className="p-4 grow overflow-y-auto">
      <section className="mb-10">
        <h1 className="text-xl font-bold tracking-wide text-center mb-4">
          Legal Stuff
        </h1>
        <p className="text-center">
          Copyright © {new Date().getFullYear()} Alex Gladd. All rights
          reserved.
        </p>
        <p>
          This scorekeeping app is not affiliated with any official Wizard Card
          Game or any other game. It is not an official product of Wizard Cards
          International Inc., Waddington Publishing, or U.S. Games Systems, Inc.
        </p>
        <p>
          The Wizard card back logo and Wizard card game logo are trademarks of
          their respective owners. These logos are used here via Fair Use. For
          more information about the Wizard Card Game please click or tap the
          logo below to visit the official website.
        </p>
      </section>
      <section className="mb-10 w-full">
        <a
          href="https://www.wizardcards.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img
            src="/wizard-game-logo.svg"
            alt="Wizard card game logo"
            className="h-32 m-auto"
          />
        </a>
      </section>
      <section>
        <p>
          The source code and its license are available on{" "}
          <a
            href="https://github.com/alexgladd/wizard-scores"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            GitHub
          </a>
          .
        </p>
        <p>
          THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
      </section>
    </main>
  );
}
