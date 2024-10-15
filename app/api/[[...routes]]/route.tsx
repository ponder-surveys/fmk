/** @jsxImportSource frog/jsx */

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

app.frame("/start/:id", (c) => {
  const options = ["horsefacts", "varun", "dan"];
  const id = c.req.param('id')

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

app.frame("/f/:id", (c) => {
  const options = ["horsefacts", "varun", "dan"];
  const id = c.req.param('id')

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

app.frame("/m/:id", (c) => {
  let options = ["horsefacts", "varun", "dan"];
  const index = parseInt(c.buttonValue!);
  const id = c.req.param('id')

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

app.frame("/end/:id", (c) => {
  let options = ["horsefacts", "varun", "dan"];
  const id = c.req.param('id')
  const index = parseInt(c.buttonValue!);
  const { deriveState } = c;
  const state = deriveState((previousState) => {
    console.log("previousState", previousState);
    previousState.m = index;
    previousState.k = [0, 1, 2].filter(
      (i) => i !== index && i !== previousState.f
    )[0]; // use previous inputs to compute k
  });

  const fuck = options[state.f];
  const marry = options[state.m];
  const kill = options[state.k];

  // todo add FMK to backend aggregation / redis

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

app.frame("/res/:id", (c) => {
  let options = ["horsefacts", "varun", "dan"];

  const id = c.req.param('id')

  // Define fmkStats with the correct type
  const fmkStats: FmkStats = {
    option0: {
      f: 1000,
      m: 500,
      k: 2000,
    },
    option1: {
      f: 1000,
      m: 500,
      k: 2000,
    },
    option2: {
      f: 1000,
      m: 500,
      k: 2000,
    },
  };

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
          {options.map((option, index) => (
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
                Fuck: {fmkStats[`option${index}`].f}
              </p>
              <p style={{ color: "white", fontSize: "35px" }}>
                Marry: {fmkStats[`option${index}`].m}
              </p>
              <p style={{ color: "white", fontSize: "35px" }}>
                Kill: {fmkStats[`option${index}`].k}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
    intents: [<Button.Link href={`https://warpcast.com/~/compose?text=I+just+played+ponder+FMK!+Here's+the+results,+play+by+using+the+frame!&embeds[]=${c.req.url}`}>Share</Button.Link>],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
