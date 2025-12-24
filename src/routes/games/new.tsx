/* eslint-disable react-x/no-array-index-key */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Game } from "@/lib/storage";
import { useForm, useStore } from "@tanstack/react-form";
import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Plus,
  Trash,
} from "lucide-react";

export const Route = createFileRoute("/games/new")({
  component: NewGameComponent,
});

interface Player {
  name: string;
}

function NewGameComponent() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const form = useForm({
    defaultValues: {
      players: [{ name: "" }, { name: "" }, { name: "" }] as Player[],
    },
    validators: {
      onChange: ({ value }) => {
        if (value.players.length < 3 || value.players.length > 6) {
          return "Wizard games require 3 to 6 players";
        } else {
          const numFilled = value.players.reduce(
            (acc, player) => (player.name.length > 0 ? acc + 1 : acc),
            0
          );

          if (numFilled === value.players.length) {
            return undefined;
          } else {
            return "Please enter names for all your players";
          }
        }
      },
    },
    onSubmit: async ({ value }) => {
      const g = await Game.new(value.players);
      console.log("Created new game", g);
      void router.navigate({
        to: "/games/$gameId/rounds/$roundId/bid",
        params: { gameId: g.id.toString(), roundId: "1" },
      });
    },
  });

  const formErrorMap = useStore(form.store, (state) => state.errorMap);

  return (
    <main className="p-4 grow overflow-y-hidden flex flex-col">
      <section className="mb-10">
        <h1 className="text-xl font-bold tracking-wide text-center">
          Setup a new game!
        </h1>
      </section>
      <section className="mb-10 grow flex flex-col">
        <form
          id="newgame"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field name="players" mode="array">
            {(field) => (
              <>
                {field.state.value.map((_, idx) => (
                  <form.Field
                    key={`player${idx}`}
                    name={`players[${idx}].name`}
                  >
                    {(subfield) => (
                      <div
                        key={`player${idx}`}
                        className="grid items-center gap-3 mb-4"
                      >
                        <Label htmlFor={subfield.name} className="text-md">
                          Player {idx + 1}
                        </Label>
                        <div className="flex gap-3">
                          <Input
                            id={subfield.name}
                            name={subfield.name}
                            value={subfield.state.value}
                            onBlur={subfield.handleBlur}
                            onChange={(e) =>
                              subfield.handleChange(e.target.value)
                            }
                            className="grow"
                          />
                          {idx > 2 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => field.removeValue(idx)}
                            >
                              <Trash />
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </form.Field>
                ))}
                {field.state.value.length < 6 && (
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="secondary"
                      className="text-lg"
                      onClick={() => field.pushValue({ name: "" })}
                    >
                      <Plus className="size-6" /> Add player
                    </Button>
                  </div>
                )}
              </>
            )}
          </form.Field>
        </form>
      </section>
      <section>
        {!form.state.isPristine && (
          <div className="p-2 text-muted-foreground text-center italic">
            {formErrorMap.onChange ? formErrorMap.onChange : "Good to go!"}
          </div>
        )}
      </section>
      <section>
        <div className="flex justify-between">
          {canGoBack ? (
            <Button
              variant="outline"
              className="text-lg self-start"
              onClick={() => router.history.back()}
            >
              <ChevronLeft className="size-6" /> Back
            </Button>
          ) : (
            <div></div>
          )}
          <form.Subscribe
            selector={(state) => [
              state.isPristine,
              state.canSubmit,
              state.isSubmitting,
            ]}
          >
            {([isPristine, canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                form="newgame"
                className="text-lg self-end"
                disabled={isPristine || !canSubmit || isSubmitting}
              >
                Play{" "}
                {isSubmitting ? (
                  <LoaderCircle className="size-6 animate-spin" />
                ) : (
                  <ChevronRight className="size-6" />
                )}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </section>
    </main>
  );
}
