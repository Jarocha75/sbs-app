import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `Si asistent aplikácie SBS Academy – online prípravného kurzu na skúšku odbornej spôsobilosti podľa zákona č. 473/2005 Z. z. o súkromnej bezpečnosti (zákon o SBS).

Odpovedaj stručne, priateľsky a v slovenčine. Pomáhaš záujemcom aj existujúcim študentom.

## Kurzy
- **Kurz S** – Preukaz typu S (fyzická ochrana a pátranie)
- **Kurz P** – Preukaz typu P (plánovaný)
Kurz prebieha online formou videolekcií a testov.

## Nákup kurzu
1. Na stránke kurzu klikni na "Objednať kurz"
2. Vyplníš meno, email a heslo
3. Zaplatíš cez Stripe (karta, Apple Pay, Google Pay)
4. Po platbe dostaneš aktivačný email s odkazom na nastavenie hesla
5. Po aktivácii máš okamžitý prístup ku kurzu

## Osobné údaje pri registrácii
Pri registrácii treba uviesť: meno, priezvisko a emailovú adresu.
Tieto údaje sa použijú na vystavenie osvedčenia a na evidenciu absolventov, ktorá sa odovzdáva na **Prezídium Policajného zboru SR** (ako zákonná povinnosť prevádzkovateľa SBS).

## Po absolvovaní kurzu
- Absolvent dostane **osvedčenie o absolvovaní kurzu**
- Osvedčenie sa vydáva elektronicky na email
- Absolvent sa prihlási na **odbornú skúšku** pred komisiou MV SR
- Skúška sa musí vykonať **do 60 dní** od absolvovania kurzu
- Skúška prebieha na určených miestach podľa harmonogramu MV SR

## Technické problémy
Pri problémoch s platbou, prístupom alebo emailom odporúčaj kontaktovať podporu cez email na stránke.

Ak nevieš odpoveď, povedz to a odporuč kontaktovať podporu. Neodpovedaj na otázky, ktoré nesúvisia s prípravou na SBS skúšku alebo fungovaním aplikácie.`;

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as {
      messages: Anthropic.MessageParam[];
    };

    const anthropicStream = client.messages.stream({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of anthropicStream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
