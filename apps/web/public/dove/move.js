self.importScripts("/dove/dove.js");

const EVENTS = {
  WORKER_MESSAGE_PING_PONG: "WORKER_MESSAGE_PING_PONG",
  WORKER_MESSAGE_CONSOLE: "WORKER_MESSAGE_CONSOLE",
  WORKER_MESSAGE_TEST: "WORKER_MESSAGE_TEST",
};

let dove;

let logging = false;

for (const type of ["log", "error", "debug", "warn", "info", "trace"]) {
  const fn = console[type];

  console[type] = function (...messages) {
    fn.call(console, ...messages);

    logging &&
      self.postMessage({
        event: EVENTS.WORKER_MESSAGE_CONSOLE,
        data: {
          type,
          messages: messages.map((message) =>
            message.replace
              ? message.replace(
                  /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
                  ""
                )
              : JSON.stringify(message)
          ),
        },
      });
  };
}

self.onmessage = async function (message) {
  if (message.data?.event === EVENTS.WORKER_MESSAGE_PING_PONG) {
    await wasm_bindgen("/dove/dove_bg.wasm");

    dove = await wasm_bindgen.Dove.new();

    self.postMessage({ event: EVENTS.WORKER_MESSAGE_PING_PONG });
  }

  if (message.data?.event === EVENTS.WORKER_MESSAGE_TEST) {
    logging = true;
    await MOVE_TEST(message.data.data);
    logging = false;
  }
};

const MOVE_TEST = async (files) => {
  const project = await dove.create_project("project");

  await dove.select_project(project.id);

  for (const [path, content] of Object.entries(files))
    await dove.write_project_file(path.trim(), content.trim());

  try {
    const test = await dove.test_project();

    self.postMessage({
      event: EVENTS.WORKER_MESSAGE_TEST,
      data: {
        test,
      },
    });
  } catch (error) {
    self.postMessage({
      event: EVENTS.WORKER_MESSAGE_TEST,
      data: {
        error,
      },
    });
  }

  const projects = await dove.projects();

  for (const project of projects) {
    await dove.remove_project(project.id);
  }
};
