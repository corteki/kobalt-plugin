import { tap, of, mergeMap, iif, throwError } from "rxjs";
import { CommandMessage, EventMessage, MessageType } from "../core/message";
import { PluginCommand } from "../core/plugin-command";
import { PluginEvent } from "../core/plugin-event";
import { pluginLoadedPipeline } from "./pipelines/plugin-loaded-pipeline";
import { retreiveNamespacesPipeline } from "./pipelines/retreive-namespaces-pipeline";
import { retreivePagesPipeline } from "./pipelines/retreive-pages-pipeline";
import { selectPagePipeline } from "./pipelines/select-page-pipeline";

figma.showUI(__html__, {
  title: "Kobalt",
  themeColors: true,
  width: 600,
  height: 800,
});

const handleEventMessage = (message: EventMessage) =>
  of(message).pipe(
    tap((message) => {
      switch (message.event) {
        case PluginEvent.Loaded.Plugin: {
          pluginLoadedPipeline();
          break;
        }
        default: {
          throwError(
            () => `[plugin - handleEventMessage]: "${message.event}" unhandled.`
          );
          break;
        }
      }
    })
  );

const handleCommandMessage = (message: CommandMessage) =>
  of(message).pipe(
    tap((message) => {
      switch (message.command) {
        case PluginCommand.Retreive.Pages: {
          retreivePagesPipeline();
          break;
        }

        case PluginCommand.Select.Page: {
          selectPagePipeline(message.payload as string);
          break;
        }

        case PluginCommand.Retreive.Namespaces: {
          retreiveNamespacesPipeline(message.payload as string);
        }

        case PluginCommand.Create.Namespace: {
          // createNamespacePipeline()
        }
        default: {
          throwError(
            () =>
              `[plugin - handleCommandMessage]: "${message.command}" unhandled.`
          );
          break;
        }
      }
    })
  );

figma.ui.onmessage = (e: EventMessage | CommandMessage) =>
  of(e)
    .pipe(
      mergeMap((message) =>
        iif(
          () => message.type === MessageType.Event,
          handleEventMessage(message as EventMessage),
          handleCommandMessage(message as CommandMessage)
        )
      )
    )
    .subscribe();
