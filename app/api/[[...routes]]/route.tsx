/** @jsxImportSource frog/jsx */
import { getGameData, updateStats } from "@/app/utils/redis";
import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";

type State = {
  f: number;
  m: number;
  k: number;
};

type FmkStats = {
  [key: string]: {
    f: number;
    m: number;
    k: number;
  };
};

const app = new Frog<{ State: State }>({
  title: "Ponder FMK",
  assetsPath: "/",
  basePath: "/api",
  initialState: {
    f: -1,
    m: -1,
    k: -1,
  },
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

app.frame("/start/:id", async (c) => {
  const id = c.req.param("id");
  const gameData = await getGameData(id);
  const options = [gameData.option1, gameData.option2, gameData.option3];

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #432889, #17101F)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 88,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {"FMK"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                style={{
                  color: "white",
                  fontSize: 52,
                  fontStyle: "normal",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.4,
                  padding: "20px",
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    intents: [<Button action={`/f/${id}`}>Start</Button>],
  });
});

app.frame("/f/:id", async (c) => {
  const id = c.req.param("id");
  const gameData = await getGameData(id);
  const options = [gameData.option1, gameData.option2, gameData.option3];

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #432889, #17101F)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 88,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {"Who to Fuck?"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                style={{
                  color: "white",
                  fontSize: 52,
                  fontStyle: "normal",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.4,
                  padding: "20px",
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button action={`/m/${id}`} value="0">
        {options[0]}
      </Button>,
      <Button action={`/m/${id}`} value="1">
        {options[1]}
      </Button>,
      <Button action={`/m/${id}`} value="2">
        {options[2]}
      </Button>,
    ],
  });
});

app.frame("/m/:id", async (c) => {
  const id = c.req.param("id");
  const gameData = await getGameData(id);
  const options = [gameData.option1, gameData.option2, gameData.option3];

  const index = parseInt(c.buttonValue!);
  const { deriveState } = c;
  const state = deriveState((previousState) => {
    previousState.f = index;
  });

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #432889, #17101F)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 88,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {"Who to Marry?"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                style={{
                  color: "white",
                  fontSize: 52,
                  fontStyle: "normal",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.4,
                  padding: "20px",
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    intents: [
      ...options.map((option, index) => (
        <Button key={index} action={`/end/${id}`} value={index.toString()}>
          {option}
        </Button>
      )),
    ],
  });
});

app.frame("/end/:id", async (c) => {
  const id = c.req.param("id");
  const gameData = await getGameData(id);
  const options = [gameData.option1, gameData.option2, gameData.option3];

  const index = parseInt(c.buttonValue!);
  const { deriveState } = c;
  const state = deriveState((previousState) => {
    previousState.m = index;
    previousState.k = [0, 1, 2].filter(
      (i) => i !== index && i !== previousState.f
    )[0]; // use previous inputs to compute k
  });

  console.log(`state /end/${id}`, state);
  const fuck = options[state.f];
  const marry = options[state.m];
  const kill = options[state.k];

  await updateStats(id, `option${state.f + 1}`, "f");
  await updateStats(id, `option${state.m + 1}`, "m");
  await updateStats(id, `option${state.k + 1}`, "k");

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #432889, #17101F)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 88,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {"You picked"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 52,
                fontStyle: "normal",
                letterSpacing: "-0.025em",
                lineHeight: 1.4,
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              Fuck: {fuck}
            </div>
            <div
              style={{
                color: "white",
                fontSize: 52,
                fontStyle: "normal",
                letterSpacing: "-0.025em",
                lineHeight: 1.4,
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              Marry: {marry}
            </div>
            <div
              style={{
                color: "white",
                fontSize: 52,
                fontStyle: "normal",
                letterSpacing: "-0.025em",
                lineHeight: 1.4,
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              Kill: {kill}
            </div>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button action={`/res/${id}`}>Results</Button>,
      <Button action={`/f/${id}`}>Change Pick</Button>,
    ],
  });
});

app.frame("/res/:id", async (c) => {
  const id = c.req.param("id");
  const gameData = await getGameData(id);
  const options = [gameData.option1, gameData.option2, gameData.option3];

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #432889, #17101F)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div style={{ color: "white", fontSize: "70px", marginBottom: "20px" }}>
          FMK Results
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {options.map((option, index) => {
            const stats = gameData.stats[`option${index + 1}`]; // Access stats directly
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "0 100px",
                }}
              >
                <h1 style={{ color: "white", fontSize: "50px" }}>{option}</h1>
                <p style={{ color: "white", fontSize: "35px" }}>
                  {`Fuck: ${stats.f}`}
                </p>
                <p style={{ color: "white", fontSize: "35px" }}>
                  {`Marry: ${stats.m}`}
                </p>
                <p style={{ color: "white", fontSize: "35px" }}>
                  {`Kill: ${stats.k}`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    ),
    intents: [
      <Button.Link
        href={`https://warpcast.com/~/compose?text=I+just+played+ponder+FMK!+Here's+the+results,+play+by+using+the+frame!&embeds[]=${c.req.url}`}
      >
        Share
      </Button.Link>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
