/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  InitializeResult,
  DocumentHighlightParams,
  ServerCapabilities,
  CancellationToken,
  DocumentHighlight,
} from 'vscode-languageserver/node';

import { TextDocument } from 'vscode-languageserver-textdocument';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);
// Create a simple text document manager.
let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;

connection.onInitialize(
  (_params: InitializeParams): InitializeResult => {
    // const initializationOptions = params.initializationOptions;
    //   let capabilities = params.capabilities;

    //   // Does the client support the `workspace/configuration` request?
    //   // If not, we fall back using global settings.
    //   hasConfigurationCapability = !!(
    //     capabilities.workspace && !!capabilities.workspace.configuration
    //   );
    //   hasWorkspaceFolderCapability = !!(
    //     capabilities.workspace && !!capabilities.workspace.workspaceFolders
    //   );
    //   hasDiagnosticRelatedInformationCapability = !!(
    //     capabilities.textDocument &&
    //     capabilities.textDocument.publishDiagnostics &&
    //     capabilities.textDocument.publishDiagnostics.relatedInformation
    //   );

    const capabilities: ServerCapabilities = {
      documentHighlightProvider: true,
      hoverProvider: true,
    };

    return { capabilities };
  }
);

connection.onInitialized(() => {});

type documentHighlight = DocumentHighlight[] | null;

connection.onDocumentHighlight(
  (
    params: DocumentHighlightParams,
    token: CancellationToken
  ): documentHighlight => {
    const document = documents.get(params.textDocument.uri);
    if (document) {
      connection.console.log(document.getText());
    }
    return [];
  }
);

// Listen on the connection
connection.listen();
