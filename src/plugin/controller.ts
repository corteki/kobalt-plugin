import { tap, of, mergeMap, iif, throwError } from "rxjs";
import { CommandMessage, EventMessage, MessageType } from "../core/message";
import { PluginCommand } from "../core/plugin-command";
import { PluginEvent } from "../core/plugin-event";
import { createNamespacePipeline } from "./pipelines/create-namespace-pipeline";
import { createTokenPipeline } from "./pipelines/create-token-pipeline";
import { pluginLoadedPipeline } from "./pipelines/plugin-loaded-pipeline";
import { retreiveNamespacesPipeline } from "./pipelines/retreive-namespaces-pipeline";
import { retreivePagesPipeline } from "./pipelines/retreive-pages-pipeline";
import { selectPagePipeline } from "./pipelines/select-page-pipeline";
import type {
  CreateNamespaceInput,
  CreateTokenInput,
  DeleteTokenInput,
  SelectPageInput,
  UpdateTokenInput,
} from "../core/models/inputs";
import { updateTokenPipeline } from "./pipelines/update-token-pipeline";
import { deleteTokenPipeline } from "./pipelines/delete-token-pipeline";

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
          selectPagePipeline(message.payload as SelectPageInput);
          break;
        }

        case PluginCommand.Retreive.Namespaces: {
          retreiveNamespacesPipeline();
          break;
        }

        case PluginCommand.Create.Namespace: {
          createNamespacePipeline(message.payload as CreateNamespaceInput);
          break;
        }

        case PluginCommand.Create.Token: {
          createTokenPipeline(message.payload as CreateTokenInput);
          break;
        }

        case PluginCommand.Update.Token: {
          updateTokenPipeline(message.payload as UpdateTokenInput);
          break;
        }
        case PluginCommand.Delete.Token: {
          deleteTokenPipeline(message.payload as DeleteTokenInput);
          break;
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
      tap(console.log),
      mergeMap((message) =>
        iif(
          () => message.type === MessageType.Event,
          handleEventMessage(message as EventMessage),
          handleCommandMessage(message as CommandMessage)
        )
      )
    )
    .subscribe();
